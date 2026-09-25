/**
 * Models for the project timeline composite.
 * Mirrors Blazor `ProjectTimelineModels.cs`.
 *
 * Dates are ISO strings (`yyyy-MM-dd`) — the natural wire format for
 * `DateOnly` — and are handled in UTC to avoid timezone drift.
 */
export interface ProjectTimelineTask {
  readonly id: number;
  readonly name: string;
  /** ISO date `yyyy-MM-dd`. */
  readonly startDate: string;
  /** ISO date `yyyy-MM-dd`. */
  readonly endDate: string;
  readonly progress: number;
  readonly category: string;
  readonly accentColor?: string | null;
}

export interface ProjectTimelineCategory {
  readonly name: string;
  readonly accentColor?: string | null;
  readonly shortLabel?: string | null;
}

export interface ProjectTimelineGroup {
  readonly name: string;
  readonly accentColor: string;
  readonly tasks: readonly ProjectTimelineTask[];
}

export interface ProjectTimelineMonth {
  readonly label: string;
  readonly dayCount: number;
}

const MS_PER_DAY = 86_400_000;

/** Days since epoch (UTC) — equivalent of `DateOnly.DayNumber`. */
export function dayNumber(isoDate: string): number {
  return Date.parse(`${isoDate}T00:00:00Z`) / MS_PER_DAY;
}

/** Adds `days` to an ISO date, mirroring `DateOnly.AddDays`. */
export function addDays(isoDate: string, days: number): string {
  const result = new Date(dayNumber(isoDate) * MS_PER_DAY + days * MS_PER_DAY);
  return result.toISOString().slice(0, 10);
}

/** Today as an ISO date, mirroring `DateOnly.FromDateTime(DateTime.Today)`. */
export function todayIso(): string {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
    now.getDate(),
  ).padStart(2, '0')}`;
}

/** 0 (Sunday) .. 6 (Saturday), mirroring `DayOfWeek`. */
export function dayOfWeek(isoDate: string): number {
  return new Date(`${isoDate}T00:00:00Z`).getUTCDay();
}

/** Clamps progress to 0..100, mirroring `Math.Clamp(progress, 0, 100)`. */
export function clampProgress(progress: number): number {
  return Math.min(100, Math.max(0, progress));
}
