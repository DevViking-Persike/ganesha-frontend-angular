import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsProgressBar, GnsRadialProgress } from '../../../design-system/charts/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';

@Component({
    selector: 'gns-lab-charts-progress-section',
    templateUrl: './lab-charts-progress-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsProgressBar, GnsRadialProgress, GnsGrid, GnsSection, GnsCard],
})
export class LabChartsProgressSection {}
