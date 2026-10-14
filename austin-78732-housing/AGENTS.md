# austin-78732-housing

Weekly Austin TX ZIP **78732** housing reporter (BDK / `@cursor/bdk`).
Served prompt: `bot/instructions.md`.

## Loop

```bash
npx --yes "@cursor/bdk@0.2.24" validate --dir .
npx --yes "@cursor/bdk@0.2.24" info --dir . --json
npx --yes "@cursor/bdk@0.2.24" call get_market_filter --dir . --input '{"asOfDate":"2026-10-13"}'
npx --yes "@cursor/bdk@0.2.24" run --dir . --message "Produce this week's 78732 report"
npx --yes "@cursor/bdk@0.2.24" eval --dir .
npm run check
```

Node only — never Bun.

## Layout

- `bot/tools/` — filter, prior snapshot, save + WoW deltas (KV)
- `bot/schedules/weekly-report.md` — Mondays 14:00 UTC (~9am Central CDT)
- `bot/skills/weekly-report.md` — report procedure
- `evals/` — filesystem evals (`evals.config.ts` required)

## Delivery

Playground + HTTP. Scheduled runs persist the markdown report in KV
(`housing/78732/latest-report`); open the playground to read it.
Schedules do not auto-fire under `--dev` — use
`POST /v1/dev/schedules/weekly-report`.
