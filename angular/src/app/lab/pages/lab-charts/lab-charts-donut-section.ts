import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsDonutChart } from '../../../design-system/charts/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';
import { BUDGET_ALLOCATION, TASK_STATUS } from './lab-charts-samples';

@Component({
    selector: 'gns-lab-charts-donut-section',
    templateUrl: './lab-charts-donut-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsDonutChart, GnsGrid, GnsSection, GnsCard],
})
export class LabChartsDonutSection {
    protected readonly budgetAllocation = BUDGET_ALLOCATION;
    protected readonly taskStatus = TASK_STATUS;
}
