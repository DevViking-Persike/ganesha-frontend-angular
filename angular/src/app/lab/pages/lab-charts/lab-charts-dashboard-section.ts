import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/index';
import { GnsDonutChart, GnsHorizontalBarChart, GnsLineChart, GnsSparkline } from '../../../design-system/charts/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';
import {
    DASH_MONTH_LABELS,
    DASH_PRODUCT_REVENUE,
    DASH_REVENUE_SERIES,
    DASH_SPARK_CONVERSION,
    DASH_SPARK_ORDERS,
    DASH_SPARK_REVENUE,
    DASH_SPARK_USERS,
    TRAFFIC_SOURCES,
} from './lab-charts-samples';

@Component({
    selector: 'gns-lab-charts-dashboard-section',
    templateUrl: './lab-charts-dashboard-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsButton, GnsDonutChart, GnsHorizontalBarChart, GnsLineChart, GnsSparkline, GnsGrid, GnsSection, GnsCard],
})
export class LabChartsDashboardSection {
    protected readonly dashSparkRevenue = DASH_SPARK_REVENUE;
    protected readonly dashSparkUsers = DASH_SPARK_USERS;
    protected readonly dashSparkOrders = DASH_SPARK_ORDERS;
    protected readonly dashSparkConversion = DASH_SPARK_CONVERSION;
    protected readonly dashMonthLabels = DASH_MONTH_LABELS;
    protected readonly dashRevenueSeries = DASH_REVENUE_SERIES;
    protected readonly trafficSources = TRAFFIC_SOURCES;
    protected readonly dashProductRevenue = DASH_PRODUCT_REVENUE;
}
