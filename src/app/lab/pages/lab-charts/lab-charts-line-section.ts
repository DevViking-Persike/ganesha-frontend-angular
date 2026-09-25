import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsLineChart, GnsSparkline } from '../../../design-system/charts/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';
import {
    MONTH_LABELS,
    REVENUE_VS_EXPENSES,
    SPARK_CONVERSION,
    SPARK_ORDERS,
    SPARK_REVENUE,
    SPARK_USERS,
    WEEKLY_VISITORS_SERIES,
    WEEK_LABELS,
} from './lab-charts-samples';

@Component({
    selector: 'gns-lab-charts-line-section',
    templateUrl: './lab-charts-line-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsLineChart, GnsSparkline, GnsGrid, GnsSection, GnsCard],
})
export class LabChartsLineSection {
    protected readonly weekLabels = WEEK_LABELS;
    protected readonly weeklyVisitorsSeries = WEEKLY_VISITORS_SERIES;
    protected readonly monthLabels = MONTH_LABELS;
    protected readonly revenueVsExpenses = REVENUE_VS_EXPENSES;
    protected readonly sparkRevenue = SPARK_REVENUE;
    protected readonly sparkUsers = SPARK_USERS;
    protected readonly sparkOrders = SPARK_ORDERS;
    protected readonly sparkConversion = SPARK_CONVERSION;
}
