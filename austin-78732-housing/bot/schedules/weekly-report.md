---
cron: "0 14 * * 1"
---

Produce this week's Austin TX ZIP 78732 housing report.

Load skill `weekly-report`. Call `get_market_filter` for today's date, then `get_prior_snapshot`. Research public listing/market sources for single-family homes about 2100 sq ft (1900–2300) that are 20–30 years old. Emphasize week-over-week price changes (median list, median sold if available, $/sq ft, inventory, sample size).

Finish by calling `save_weekly_snapshot` with structured metrics and the full markdown report so playground/HTTP readers can load it later.
