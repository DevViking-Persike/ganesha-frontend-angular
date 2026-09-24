import type {
    BubbleDataPoint,
    ChartDataPoint,
    ChartSeries,
    ProcessStep,
} from '../../../design-system/charts/index';
import type {
    ProjectTimelineCategory,
    ProjectTimelineTask,
} from '../../../composites/project-timeline/project-timeline-models';

// ── Section 1: Bar Charts ──────────────────────────────────────────

export const MONTHLY_REVENUE: ChartDataPoint[] = [
    { label: 'Jan', value: 64.2 },
    { label: 'Feb', value: 71.8 },
    { label: 'Mar', value: 58.4 },
    { label: 'Apr', value: 83.6 },
    { label: 'May', value: 91.2 },
    { label: 'Jun', value: 84.7 },
];

export const TOP_PRODUCTS: ChartDataPoint[] = [
    { label: 'Enterprise Suite', value: 4_812 },
    { label: 'Pro License', value: 3_540 },
    { label: 'Team Add-on', value: 2_190 },
    { label: 'Starter Pack', value: 1_876 },
    { label: 'API Access', value: 1_103 },
];

// ── Section 2: Line Charts ─────────────────────────────────────────

export const WEEK_LABELS = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8'];

export const WEEKLY_VISITORS_SERIES: ChartSeries[] = [
    { name: 'Visitors', values: [12_400, 14_200, 13_100, 15_800, 17_200, 16_500, 19_300, 21_400] },
];

export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

export const REVENUE_VS_EXPENSES: ChartSeries[] = [
    { name: 'Revenue', values: [84.2, 91.6, 78.4, 102.3, 115.8, 128.4], color: 'var(--gns-primary-500)' },
    { name: 'Expenses', values: [61.0, 64.5, 59.2, 72.1, 80.4, 88.7], color: 'var(--gns-danger-400)' },
];

export const SPARK_REVENUE = [61.0, 64.5, 58.2, 72.1, 67.4, 73.9, 79.3, 75.1, 82.6, 78.4, 80.9, 84.2];

export const SPARK_USERS = [9_100, 9_840, 10_200, 10_740, 10_380, 11_200, 11_570, 11_930, 12_100, 12_410, 12_680, 12_847];

export const SPARK_ORDERS = [3_820, 3_910, 3_650, 3_730, 3_980, 4_050, 3_870, 3_760, 3_540, 3_620, 3_450, 3_421];

export const SPARK_CONVERSION = [3.9, 4.1, 3.8, 4.2, 4.0, 4.3, 4.5, 4.4, 4.6, 4.5, 4.7, 4.82];

// ── Section 3: Donut Charts ────────────────────────────────────────

export const BUDGET_ALLOCATION: ChartDataPoint[] = [
    { label: 'Engineering', value: 1_680_000, color: 'var(--gns-primary-500)' },
    { label: 'Marketing', value: 756_000, color: 'var(--gns-info-400)' },
    { label: 'Sales', value: 630_000, color: 'var(--gns-success-500)' },
    { label: 'Operations', value: 882_000, color: 'var(--gns-warning-500)' },
    { label: 'R&D', value: 252_000, color: 'var(--gns-danger-400)' },
];

export const TASK_STATUS: ChartDataPoint[] = [
    { label: 'Completed', value: 94, color: 'var(--gns-success-500)' },
    { label: 'In Progress', value: 31, color: 'var(--gns-warning-500)' },
    { label: 'Pending', value: 23, color: 'var(--gns-color-border-default)' },
];

// ── Section 5: Infographic Charts ──────────────────────────────────

export const PIE_MARKET_SHARE: ChartDataPoint[] = [
    { label: 'Platform', value: 38, color: 'var(--gns-primary-500)' },
    { label: 'Services', value: 24, color: 'var(--gns-info-500)' },
    { label: 'Partners', value: 18, color: 'var(--gns-success-500)' },
    { label: 'SMB', value: 12, color: 'var(--gns-warning-500)' },
    { label: 'Other', value: 8, color: 'var(--gns-rosa-300)' },
];

export const PIE_EXPENSES: ChartDataPoint[] = [
    { label: 'Payroll', value: 42, color: 'var(--gns-primary-500)' },
    { label: 'Infra', value: 21, color: 'var(--gns-violet-500)' },
    { label: 'Marketing', value: 17, color: 'var(--gns-warning-500)' },
    { label: 'Support', value: 12, color: 'var(--gns-success-500)' },
    { label: 'Ops', value: 8, color: 'var(--gns-danger-500)' },
];

export const FUNNEL_DATA: ChartDataPoint[] = [
    { label: 'Visitors', value: 18_400, color: 'var(--gns-primary-500)' },
    { label: 'Leads', value: 7_260, color: 'var(--gns-info-500)' },
    { label: 'Qualified', value: 2_940, color: 'var(--gns-success-500)' },
    { label: 'Proposal', value: 1_140, color: 'var(--gns-warning-500)' },
    { label: 'Closed', value: 420, color: 'var(--gns-danger-500)' },
];

export const HIRING_FUNNEL_DATA: ChartDataPoint[] = [
    { label: 'Applicants', value: 1_260, color: 'var(--gns-violet-500)' },
    { label: 'Screened', value: 420, color: 'var(--gns-info-500)' },
    { label: 'Interviews', value: 164, color: 'var(--gns-success-500)' },
    { label: 'Finalists', value: 48, color: 'var(--gns-warning-500)' },
    { label: 'Offers', value: 12, color: 'var(--gns-danger-500)' },
];

export const SUPPORT_FUNNEL_DATA: ChartDataPoint[] = [
    { label: 'Tickets', value: 3_920, color: 'var(--gns-primary-500)' },
    { label: 'Triaged', value: 2_870, color: 'var(--gns-info-500)' },
    { label: 'In Progress', value: 1_140, color: 'var(--gns-warning-500)' },
    { label: 'Resolved', value: 760, color: 'var(--gns-success-500)' },
    { label: 'Escalated', value: 96, color: 'var(--gns-danger-500)' },
];

export const STACKED_LABELS = ['Q1', 'Q2', 'Q3', 'Q4'];

export const STACKED_SERIES: ChartSeries[] = [
    { name: 'North America', values: [180, 220, 260, 310], color: 'var(--gns-primary-500)' },
    { name: 'Europe', values: [130, 160, 180, 210], color: 'var(--gns-info-500)' },
    { name: 'LATAM', values: [90, 120, 135, 168], color: 'var(--gns-success-500)' },
    { name: 'APAC', values: [70, 95, 124, 152], color: 'var(--gns-warning-500)' },
];

export const PROCESS_STEPS: ProcessStep[] = [
    { title: 'Discover', value: '01', description: 'Audience and data mapping', color: 'var(--gns-primary-500)' },
    { title: 'Model', value: '02', description: 'Structure signals into metrics', color: 'var(--gns-info-500)' },
    { title: 'Design', value: '03', description: 'Turn metrics into visual stories', color: 'var(--gns-success-500)' },
    { title: 'Decide', value: '04', description: 'Act on the trend and anomalies', color: 'var(--gns-warning-500)' },
];

// ── Section 6: Planning Timeline ───────────────────────────────────

export const TIMELINE_CATEGORIES: ProjectTimelineCategory[] = [
    { name: 'Planning', accentColor: 'var(--gns-primary-500)' },
    { name: 'Design', accentColor: 'var(--gns-violet-500)' },
    { name: 'Infrastructure', accentColor: 'var(--gns-warning-500)' },
    { name: 'Development', accentColor: 'var(--gns-success-500)' },
    { name: 'QA & Delivery', accentColor: 'var(--gns-danger-500)' },
];

export const TIMELINE_TASKS: ProjectTimelineTask[] = [
    { id: 1, name: 'Scope definition', startDate: '2026-03-28', endDate: '2026-03-31', progress: 100, category: 'Planning' },
    { id: 2, name: 'Requirements mapping', startDate: '2026-03-30', endDate: '2026-04-03', progress: 92, category: 'Planning' },
    { id: 3, name: 'Low-fidelity wireframes', startDate: '2026-04-01', endDate: '2026-04-04', progress: 100, category: 'Design' },
    { id: 4, name: 'High-fidelity interface', startDate: '2026-04-03', endDate: '2026-04-10', progress: 64, category: 'Design' },
    { id: 5, name: 'Data model definition', startDate: '2026-04-05', endDate: '2026-04-08', progress: 45, category: 'Infrastructure' },
    { id: 6, name: 'Server provisioning', startDate: '2026-04-07', endDate: '2026-04-11', progress: 24, category: 'Infrastructure' },
    { id: 7, name: 'CI/CD pipeline', startDate: '2026-04-10', endDate: '2026-04-14', progress: 12, category: 'Infrastructure' },
    { id: 8, name: 'Repository bootstrap', startDate: '2026-04-08', endDate: '2026-04-10', progress: 100, category: 'Development' },
    { id: 9, name: 'Core API implementation', startDate: '2026-04-11', endDate: '2026-04-24', progress: 22, category: 'Development' },
    { id: 10, name: 'Authentication integration', startDate: '2026-04-15', endDate: '2026-04-21', progress: 8, category: 'Development' },
    { id: 11, name: 'Unit testing', startDate: '2026-04-22', endDate: '2026-04-28', progress: 0, category: 'QA & Delivery' },
    { id: 12, name: 'Staging deployment', startDate: '2026-04-29', endDate: '2026-05-01', progress: 0, category: 'QA & Delivery' },
];

// ── Section 7: Dashboard Composition ───────────────────────────────

export const DASH_SPARK_REVENUE = [92.1, 97.4, 88.6, 103.2, 95.8, 108.4, 112.0, 107.3, 115.6, 119.2, 122.8, 128.4];

export const DASH_SPARK_USERS = [18_200, 19_400, 20_100, 20_840, 21_300, 21_980, 22_400, 22_710, 23_080, 23_560, 23_980, 24_391];

export const DASH_SPARK_ORDERS = [4_200, 4_120, 4_310, 4_050, 3_980, 4_140, 4_070, 3_920, 3_860, 3_780, 3_690, 3_847];

export const DASH_SPARK_CONVERSION = [3.82, 3.96, 3.78, 4.04, 3.91, 4.18, 4.27, 4.19, 4.35, 4.44, 4.51, 4.62];

export const DASH_MONTH_LABELS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

export const DASH_REVENUE_SERIES: ChartSeries[] = [
    { name: 'Actual', values: [98.4, 104.2, 111.8, 108.6, 119.4, 128.4], color: 'var(--gns-primary-500)' },
    { name: 'Target', values: [100.0, 105.0, 110.0, 115.0, 120.0, 125.0], color: 'var(--gns-color-border-default)' },
];

export const TRAFFIC_SOURCES: ChartDataPoint[] = [
    { label: 'Organic Search', value: 42, color: 'var(--gns-primary-500)' },
    { label: 'Direct', value: 24, color: 'var(--gns-success-500)' },
    { label: 'Referral', value: 18, color: 'var(--gns-info-400)' },
    { label: 'Social', value: 11, color: 'var(--gns-warning-500)' },
    { label: 'Email', value: 5, color: 'var(--gns-danger-400)' },
];

export const DASH_PRODUCT_REVENUE: ChartDataPoint[] = [
    { label: 'Enterprise Suite', value: 384.6 },
    { label: 'Pro Subscriptions', value: 218.4 },
    { label: 'Team Licenses', value: 163.2 },
    { label: 'Marketplace Add-ons', value: 97.8 },
    { label: 'API & Integrations', value: 72.4 },
    { label: 'Professional Services', value: 54.1 },
];

// ── Bubble Chart: Market Analysis ───────────────────────────────────

export const MARKET_ANALYSIS: BubbleDataPoint[] = [
    { label: 'Enterprise Suite', x: 384, y: 28, size: 1240, color: 'var(--gns-primary-500)' },
    { label: 'Pro Subscriptions', x: 218, y: 42, size: 3860, color: 'var(--gns-info-500)' },
    { label: 'Team Licenses', x: 163, y: 65, size: 8200, color: 'var(--gns-success-500)' },
    { label: 'Marketplace', x: 98, y: 87, size: 2100, color: 'var(--gns-warning-500)' },
    { label: 'API & Integrations', x: 72, y: 34, size: 640, color: 'var(--gns-violet-500)' },
    { label: 'Prof. Services', x: 54, y: 12, size: 420, color: 'var(--gns-danger-500)' },
    { label: 'Starter Pack', x: 142, y: 118, size: 12400, color: 'var(--gns-rosa-300)' },
    { label: 'Education', x: 38, y: 52, size: 1800, color: 'var(--gns-ouro-500)' },
];
