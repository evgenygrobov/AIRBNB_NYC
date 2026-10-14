import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod";
import {
  HISTORY_KEY,
  LATEST_KEY,
  LATEST_REPORT_KEY,
  isSnapshot,
  type MarketSnapshot,
} from "../lib/market.js";

export default defineTool({
  description:
    "Load the prior weekly 78732 housing snapshot, recent history, and latest report text from durable storage. Call before composing week-over-week changes.",
  effect: "read",
  inputSchema: z.object({}),
  async execute(_input, ctx) {
    const latestRaw = await ctx.host.kv.get(LATEST_KEY);
    const historyRaw = await ctx.host.kv.get(HISTORY_KEY);
    const latestReport = await ctx.host.kv.get(LATEST_REPORT_KEY);

    const latest = isSnapshot(latestRaw) ? latestRaw : null;
    const history: MarketSnapshot[] = Array.isArray(historyRaw)
      ? historyRaw.filter(isSnapshot)
      : [];

    return {
      hasPrior: latest !== null,
      latest,
      history,
      latestReport:
        typeof latestReport === "string" ? latestReport : null,
    };
  },
});
