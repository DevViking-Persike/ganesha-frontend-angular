/**
 * Modelos do GnsInteractiveChart.
 * Portado de InteractiveChartModels.cs.
 */

import { ChartDataPoint } from '../../design-system/charts/chart-models';

/** InteractiveChartType do Blazor: Bar | Line | Bubble. */
export type InteractiveChartType = 'bar' | 'line' | 'bubble';

/** InteractiveChartOption record do Blazor. */
export interface InteractiveChartOption {
    id: string;
    label: string;
    data: ChartDataPoint[];
}
