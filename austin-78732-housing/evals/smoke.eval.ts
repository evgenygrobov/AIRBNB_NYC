import { defineEval, includes } from "@cursor/bdk/evals";

export default defineEval({
  tags: ["smoke"],
  cases: [
    {
      id: "weekly-report",
      description:
        "Weekly report path loads the filter, prior snapshot, and saves metrics.",
      async test(t) {
        await t.send(
          "Produce this week's Austin 78732 housing report for homes about 2100 sq ft that are 20-30 years old. Follow the weekly-report skill. Use nulls if live comps are unavailable, but still save a snapshot with clear caveats.",
        );
        t.succeeded();
        t.calledTool("get_market_filter");
        t.calledTool("get_prior_snapshot");
        t.calledTool("save_weekly_snapshot");
        t.check(t.reply, includes(/78732/));
      },
    },
  ],
});
