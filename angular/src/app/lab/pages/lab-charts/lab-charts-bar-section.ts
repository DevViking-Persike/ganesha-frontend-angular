import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsBarChart, GnsHorizontalBarChart } from '../../../design-system/charts/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';
import { MONTHLY_REVENUE, TOP_PRODUCTS } from './lab-charts-samples';

@Component({
    selector: 'gns-lab-charts-bar-section',
    templateUrl: './lab-charts-bar-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsBarChart, GnsHorizontalBarChart, GnsGrid, GnsSection, GnsCard],
})
export class LabChartsBarSection {
    protected readonly monthlyRevenue = MONTHLY_REVENUE;
    protected readonly topProducts = TOP_PRODUCTS;
}
