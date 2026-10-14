import { defineTool } from "@cursor/bdk/tools";
import { z } from "zod";
import { MARKET_FILTER, yearBuiltBounds } from "../lib/market.js";

export default defineTool({
  description:
    "Return the locked Austin 78732 housing filter (sq ft band, age/year-built band). Call before researching comps.",
  effect: "read",
  inputSchema: z.object({
    asOfDate: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .describe("ISO date (YYYY-MM-DD) used to compute the year-built band."),
  }),
  async execute({ asOfDate }) {
    const years = yearBuiltBounds(asOfDate);
    return {
      ...MARKET_FILTER,
      asOfDate,
      ...years,
      guidance:
        "Prefer single-family homes in ZIP 78732 near 2100 sq ft (1900–2300) and year built in the returned band. Note when comps are thin.",
    };
  },
});
