import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    GnsBubbleChart,
    GnsFunnelChart,
    GnsGaugeChart,
    GnsLineChart,
    GnsPieChart,
    GnsProcessChart,
    GnsStackedBarChart,
} from '../../../design-system/charts/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';
import {
    FUNNEL_DATA,
    HIRING_FUNNEL_DATA,
    MARKET_ANALYSIS,
    MONTH_LABELS,
    PIE_EXPENSES,
    PIE_MARKET_SHARE,
    PROCESS_STEPS,
    REVENUE_VS_EXPENSES,
    STACKED_LABELS,
    STACKED_SERIES,
    SUPPORT_FUNNEL_DATA,
} from './lab-charts-samples';

@Component({
    selector: 'gns-lab-charts-infographic-section',
    templateUrl: './lab-charts-infographic-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        GnsBubbleChart,
        GnsFunnelChart,
        GnsGaugeChart,
        GnsLineChart,
        GnsPieChart,
        GnsProcessChart,
        GnsStackedBarChart,
        GnsGrid,
        GnsSection,
        GnsCard,
    ],
})
export class LabChartsInfographicSection {
    protected readonly pieMarketShare = PIE_MARKET_SHARE;
    protected readonly pieExpenses = PIE_EXPENSES;
    protected readonly funnelData = FUNNEL_DATA;
    protected readonly hiringFunnelData = HIRING_FUNNEL_DATA;
    protected readonly supportFunnelData = SUPPORT_FUNNEL_DATA;
    protected readonly stackedSeries = STACKED_SERIES;
    protected readonly stackedLabels = STACKED_LABELS;
    protected readonly processSteps = PROCESS_STEPS;
    protected readonly monthLabels = MONTH_LABELS;
    protected readonly revenueVsExpenses = REVENUE_VS_EXPENSES;
    protected readonly marketAnalysis = MARKET_ANALYSIS;
}
