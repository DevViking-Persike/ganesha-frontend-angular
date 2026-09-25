import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  signal,
  untracked,
} from '@angular/core';
import { GnsEmptyState } from '../../design-system/feedback/gns-empty-state/gns-empty-state';
import {
  ProjectTimelineCategory,
  ProjectTimelineGroup,
  ProjectTimelineMonth,
  ProjectTimelineTask,
  addDays,
  clampProgress,
  dayNumber,
  dayOfWeek,
  todayIso,
} from './project-timeline-models';

const ACCENT_PALETTE: readonly string[] = [
  'var(--gns-primary-500,#3F51B5)',
  'var(--gns-violet-500,#9C27B0)',
  'var(--gns-warning-500,#FFC107)',
  'var(--gns-success-500,#4CAF50)',
  'var(--gns-danger-500,#F44336)',
  'var(--gns-info-500,#00BCD4)',
];

interface TimelineDay {
  readonly iso: string;
  readonly dayOfMonth: number;
  readonly weekday: number;
  readonly isWeekend: boolean;
  readonly isToday: boolean;
  readonly cssClass: string;
  readonly weekdayLabel: string;
}

/**
 * Gantt-style project timeline with collapsible workstreams, day/month header,
 * progress bars and a "today" marker. Mirrors Blazor GnsProjectTimeline.
 */
@Component({
  selector: 'gns-project-timeline',
  templateUrl: './gns-project-timeline.html',
  styleUrl: './gns-project-timeline.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GnsEmptyState],
})
export class GnsProjectTimeline {
  readonly title = input('Project timeline');
  readonly subtitle = input<string | null>(null);
  readonly sidebarTitle = input('Workstreams / Tasks');
  readonly tasks = input.required<readonly ProjectTimelineTask[]>();
  readonly categories = input<readonly ProjectTimelineCategory[] | null>(null);
  readonly dayWidth = input(40);
  readonly startPaddingDays = input(3);
  readonly endPaddingDays = input(10);
  readonly showTodayMarker = input(true);
  readonly today = input<string | null>(null);
  readonly cultureName = input<string | null>(null);
  readonly additionalCssClass = input<string | null>(null);

  private readonly _expanded = signal<ReadonlySet<string>>(new Set());
  private readonly _expansionInitialized = signal(false);

  private readonly culture = computed(() => {
    const name = this.cultureName();
    if (!name) {
      return this.fallbackLocale;
    }
    try {
      return Intl.DateTimeFormat.supportedLocalesOf(name).length > 0 ? name : this.fallbackLocale;
    } catch {
      return this.fallbackLocale;
    }
  });

  /** Blazor falls back to InvariantCulture, whose date formatting matches en-US. */
  private readonly fallbackLocale = 'en-US';

  protected readonly effectiveToday = computed(() => this.today() ?? todayIso());

  protected readonly groups = computed<readonly ProjectTimelineGroup[]>(() => {
    const tasks = this.tasks();
    const definitions = new Map<string, ProjectTimelineCategory>();
    for (const category of this.categories() ?? []) {
      definitions.set(category.name.toLowerCase(), category);
    }

    const ordered: string[] = [];
    for (const task of tasks) {
      if (!ordered.some((name) => name.toLowerCase() === task.category.toLowerCase())) {
        ordered.push(task.category);
      }
    }

    return ordered.map((categoryName, index) => {
      const groupTasks = tasks
        .filter((task) => task.category.toLowerCase() === categoryName.toLowerCase())
        .slice()
        .sort(
          (a, b) =>
            dayNumber(a.startDate) - dayNumber(b.startDate) ||
            dayNumber(a.endDate) - dayNumber(b.endDate),
        );

      const definition = definitions.get(categoryName.toLowerCase());
      const accentColor =
        definition?.accentColor ??
        groupTasks.find((task) => task.accentColor)?.accentColor ??
        ACCENT_PALETTE[index % ACCENT_PALETTE.length];

      return { name: categoryName, accentColor, tasks: groupTasks };
    });
  });

  private readonly range = computed(() => {
    const tasks = this.tasks();
    const todayIsoValue = this.effectiveToday();
    if (tasks.length === 0) {
      return {
        start: addDays(todayIsoValue, -this.startPaddingDays()),
        end: addDays(todayIsoValue, this.endPaddingDays()),
      };
    }
    const minStart = tasks.reduce(
      (min, task) => (dayNumber(task.startDate) < dayNumber(min) ? task.startDate : min),
      tasks[0].startDate,
    );
    const maxEnd = tasks.reduce(
      (max, task) => (dayNumber(task.endDate) > dayNumber(max) ? task.endDate : max),
      tasks[0].endDate,
    );
    return {
      start: addDays(minStart, -this.startPaddingDays()),
      end: addDays(maxEnd, this.endPaddingDays()),
    };
  });

  constructor() {
    effect(() => {
      const names = this.groups().map((group) => group.name.toLowerCase());
      const active = new Set(names);
      const known = new Set<string>();
      // Lê o estado anterior FORA do tracking: escrever _expanded dentro do
      // próprio effect que o lê criaria um loop reativo infinito (NG0200-like).
      const { previous, wasInitialized } = untracked(() => ({
        previous: this._expanded(),
        wasInitialized: this._expansionInitialized(),
      }));

      for (const name of names) {
        if (!wasInitialized || !previous.has(name)) {
          known.add(name);
        }
      }
      for (const name of previous) {
        if (active.has(name)) {
          known.add(name);
        }
      }

      this._expanded.set(known);
      this._expansionInitialized.set(true);
    });
  }

  protected readonly cssClass = computed(() =>
    ['gns-project-timeline', this.additionalCssClass()].filter(Boolean).join(' '),
  );

  protected readonly days = computed<readonly TimelineDay[]>(() => {
    const width = this.dayWidth();
    const todayIsoValue = this.effectiveToday();
    const days: TimelineDay[] = [];
    let current = this.range().start;
    const end = this.range().end;

    while (dayNumber(current) <= dayNumber(end)) {
      if (days.length >= 400) {
        break; // guarda de segurança contra ranges patológicos
      }
      const weekday = dayOfWeek(current);
      const isWeekend = weekday === 0 || weekday === 6;
      const isToday = current === todayIsoValue;
      days.push({
        iso: current,
        dayOfMonth: Number(current.slice(8, 10)),
        weekday,
        isWeekend,
        isToday,
        cssClass: [
          'gns-project-timeline__day',
          isWeekend ? 'gns-project-timeline__day--weekend' : null,
          isToday ? 'gns-project-timeline__day--today' : null,
        ]
          .filter(Boolean)
          .join(' '),
        weekdayLabel: this.weekdayLabel(weekday),
      });
      current = addDays(current, 1);
    }

    return days;
  });

  protected readonly months = computed<readonly ProjectTimelineMonth[]>(() => {
    const formatter = new Intl.DateTimeFormat(this.culture(), {
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    });
    const months: ProjectTimelineMonth[] = [];
    for (const day of this.days()) {
      const raw = formatter.format(new Date(`${day.iso}T00:00:00Z`));
      const label = raw.charAt(0).toUpperCase() + raw.slice(1);
      const last = months[months.length - 1];
      if (last && last.label === label) {
        months[months.length - 1] = { label, dayCount: last.dayCount + 1 };
      } else {
        months.push({ label, dayCount: 1 });
      }
    }
    return months;
  });

  protected readonly timelineWidth = computed(() => this.days().length * this.dayWidth());

  protected readonly completedTasks = computed(
    () => this.tasks().filter((task) => clampProgress(task.progress) >= 100).length,
  );

  protected readonly showTodayLine = computed(() => {
    if (!this.showTodayMarker()) {
      return false;
    }
    const range = this.range();
    const todayNumber = dayNumber(this.effectiveToday());
    return todayNumber >= dayNumber(range.start) && todayNumber <= dayNumber(range.end);
  });

  protected isExpanded(categoryName: string): boolean {
    return this._expanded().has(categoryName.toLowerCase());
  }

  protected toggleCategory(categoryName: string): void {
    const key = categoryName.toLowerCase();
    const next = new Set(this._expanded());
    if (!next.delete(key)) {
      next.add(key);
    }
    this._expanded.set(next);
  }

  protected clampProgress(progress: number): number {
    return clampProgress(progress);
  }

  protected getPosition(isoDate: string): number {
    const days = this.days();
    if (days.length === 0) {
      return 0;
    }
    return (dayNumber(isoDate) - dayNumber(this.range().start)) * this.dayWidth();
  }

  protected getTaskWidth(task: ProjectTimelineTask): number {
    const spanDays = Math.max(1, dayNumber(task.endDate) - dayNumber(task.startDate) + 1);
    return spanDays * this.dayWidth();
  }

  protected buildBarStyle(task: ProjectTimelineTask, accentColor: string): string {
    return `left:${this.getPosition(task.startDate)}px;width:${this.getTaskWidth(
      task,
    )}px;--gns-project-timeline-accent:${accentColor};`;
  }

  protected buildTaskTitle(task: ProjectTimelineTask): string {
    return `${task.name} (${task.startDate} -> ${task.endDate})`;
  }

  private weekdayLabel(weekday: number): string {
    const formatter = new Intl.DateTimeFormat(this.culture(), {
      weekday: 'short',
      timeZone: 'UTC',
    });
    const abbreviated = formatter.format(
      new Date(`2024-01-${String(7 + weekday).padStart(2, '0')}T00:00:00Z`),
    );
    return abbreviated.length > 0 ? abbreviated.charAt(0).toUpperCase() : '?';
  }
}
