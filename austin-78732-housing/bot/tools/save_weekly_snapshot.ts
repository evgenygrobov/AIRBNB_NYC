import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod";
import {
  HISTORY_KEY,
  LATEST_KEY,
  LATEST_REPORT_KEY,
  MARKET_FILTER,
  computeDeltas,
  isSnapshot,
  trimHistory,
  yearBuiltBounds,
  type MarketSnapshot,
} from "../lib/market.js";

const metricsSchema = z.object({
  medianListPrice: z.number().nullable(),
  medianSoldPrice: z.number().nullable(),
  medianPricePerSqFt: z.number().nullable(),
  sampleSize: z.number().int().nonnegative(),
  activeListings: z.number().int().nonnegative().nullable(),
  sources: z.array(z.string()).min(1),
});

export default defineTool({
  description:
    "Persist this week's 78732 housing metrics, compute week-over-week deltas against the prior snapshot, and store the markdown report for playground/HTTP readers.",
  effect: "write",
  inputSchema: z.object({
    weekOf: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe("Monday of the report week (YYYY-MM-DD)."),
    metrics: metricsSchema,
    notes: z
      .string()
      .describe("Short caveats: thin sample, filter mismatches, data freshness."),
    reportMarkdown: z
      .string()
      .describe("Full weekly report in markdown, ready for a human to read."),
  }),
  async execute({ weekOf, metrics, notes, reportMarkdown }, ctx) {
    if (ctx.session.purpose === "eval") {
      const years = yearBuiltBounds(weekOf);
      const prior = null;
      const deltas = computeDeltas(prior, metrics);
      return {
        saved: false,
        dryRun: true,
        weekOf,
        filter: { ...MARKET_FILTER, ...years },
        deltas,
        message: "Eval session: snapshot not written.",
      };
    }

    const years = yearBuiltBounds(weekOf);
    const priorRaw = await ctx.host.kv.get(LATEST_KEY);
    const prior = isSnapshot(priorRaw) ? priorRaw : null;
    const historyRaw = await ctx.host.kv.get(HISTORY_KEY);
    const history: MarketSnapshot[] = Array.isArray(historyRaw)
      ? historyRaw.filter(isSnapshot)
      : [];

    const snapshot: MarketSnapshot = {
      weekOf,
      capturedAt: new Date().toISOString(),
      zip: MARKET_FILTER.zip,
      yearBuiltMin: years.yearBuiltMin,
      yearBuiltMax: years.yearBuiltMax,
      sqFtMin: MARKET_FILTER.sqFtMin,
      sqFtMax: MARKET_FILTER.sqFtMax,
      metrics,
      notes,
    };

    const deltas = computeDeltas(prior, metrics);
    const nextHistory = trimHistory(history, snapshot);

    await ctx.host.kv.put(LATEST_KEY, snapshot);
    await ctx.host.kv.put(HISTORY_KEY, nextHistory);
    await ctx.host.kv.put(LATEST_REPORT_KEY, reportMarkdown);

    return {
      saved: true,
      weekOf,
      priorWeekOf: prior?.weekOf ?? null,
      deltas,
      historyLength: nextHistory.length,
    };
  },
});
