---
description: Use when producing or refreshing the weekly Austin 78732 housing price report.
---

# Weekly 78732 housing report

## Filter (locked)

- ZIP: 78732 · Austin, TX · single-family
- Living area: ~2100 sq ft (1900–2300)
- Age: 20–30 years → year built from `get_market_filter`

## Research

- Pull active listings and recent sales matching the filter.
- Record source names/URLs in `metrics.sources`.
- If fewer than 3 solid comps, set uncertain price fields to null and explain in `notes`.

## Report markdown shape

```markdown
# 78732 weekly housing report — week of YYYY-MM-DD

## Filter
- …

## Headline
One sentence on price direction vs last week.

## Metrics
| Metric | This week | Prior week | Δ | Δ% |
| … |

## Sample
- Active listings / sales count
- How well comps matched sq ft + year built

## Sources
- …

## Caveats
- …
```

## Tools

1. `get_market_filter`
2. `get_prior_snapshot`
3. Research
4. `save_weekly_snapshot` (required before ending a scheduled run)
