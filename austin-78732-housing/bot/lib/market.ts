/** Locked market filter and durable snapshot helpers for ZIP 78732. */

export const MARKET_FILTER = {
  zip: "78732",
  city: "Austin",
  state: "TX",
  propertyType: "single_family" as const,
  /** Target living area; comps may range ±200 sq ft. */
  targetSqFt: 2100,
  sqFtMin: 1900,
  sqFtMax: 2300,
  /** Age band relative to the report week. */
  ageYearsMin: 20,
  ageYearsMax: 30,
} as const;

export type MarketMetrics = {
  medianListPrice: number | null;
  medianSoldPrice: number | null;
  medianPricePerSqFt: number | null;
  sampleSize: number;
  activeListings: number | null;
  sources: string[];
};

export type MarketSnapshot = {
  weekOf: string;
  capturedAt: string;
  zip: string;
  yearBuiltMin: number;
  yearBuiltMax: number;
  sqFtMin: number;
  sqFtMax: number;
  metrics: MarketMetrics;
  notes: string;
};

export type MetricDelta = {
  field: string;
  prior: number | null;
  current: number | null;
  absoluteChange: number | null;
  percentChange: number | null;
};

export const LATEST_KEY = "housing/78732/latest";
export const HISTORY_KEY = "housing/78732/history";
export const LATEST_REPORT_KEY = "housing/78732/latest-report";
export const HISTORY_LIMIT = 12;

export function yearBuiltBounds(asOfIsoDate: string): {
  yearBuiltMin: number;
  yearBuiltMax: number;
} {
  const year = Number.parseInt(asOfIsoDate.slice(0, 4), 10);
  if (!Number.isFinite(year)) {
    throw new Error(`Invalid as-of date: ${asOfIsoDate}`);
  }
  return {
    yearBuiltMin: year - MARKET_FILTER.ageYearsMax,
    yearBuiltMax: year - MARKET_FILTER.ageYearsMin,
  };
}

function delta(
  field: string,
  prior: number | null,
  current: number | null,
): MetricDelta {
  if (prior === null || current === null) {
    return {
      field,
      prior,
      current,
      absoluteChange: null,
      percentChange: null,
    };
  }
  const absoluteChange = current - prior;
  const percentChange =
    prior === 0 ? null : Number(((absoluteChange / prior) * 100).toFixed(2));
  return { field, prior, current, absoluteChange, percentChange };
}

export function computeDeltas(
  prior: MarketSnapshot | null,
  current: MarketMetrics,
): MetricDelta[] {
  if (!prior) return [];
  const p = prior.metrics;
  return [
    delta("medianListPrice", p.medianListPrice, current.medianListPrice),
    delta("medianSoldPrice", p.medianSoldPrice, current.medianSoldPrice),
    delta(
      "medianPricePerSqFt",
      p.medianPricePerSqFt,
      current.medianPricePerSqFt,
    ),
    delta("sampleSize", p.sampleSize, current.sampleSize),
    delta("activeListings", p.activeListings, current.activeListings),
  ];
}

export function trimHistory(
  history: MarketSnapshot[],
  next: MarketSnapshot,
): MarketSnapshot[] {
  const withoutDup = history.filter((row) => row.weekOf !== next.weekOf);
  return [...withoutDup, next].slice(-HISTORY_LIMIT);
}

export function isSnapshot(value: unknown): value is MarketSnapshot {
  if (!value || typeof value !== "object") return false;
  const row = value as Record<string, unknown>;
  return (
    typeof row.weekOf === "string" &&
    typeof row.capturedAt === "string" &&
    typeof row.zip === "string" &&
    typeof row.metrics === "object" &&
    row.metrics !== null
  );
}
