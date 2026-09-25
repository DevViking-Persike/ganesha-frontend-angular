import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { LabChartsBarSection } from './lab-charts-bar-section';
import { LabChartsDashboardSection } from './lab-charts-dashboard-section';
import { LabChartsDonutSection } from './lab-charts-donut-section';
import { LabChartsInfographicSection } from './lab-charts-infographic-section';
import { LabChartsLineSection } from './lab-charts-line-section';
import { LabChartsProgressSection } from './lab-charts-progress-section';
import { LabChartsTimelineSection } from './lab-charts-timeline-section';

@Component({
    selector: 'gns-lab-charts',
    templateUrl: './gns-lab-charts.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        GnsPageHeader,
        LabChartsBarSection,
        LabChartsLineSection,
        LabChartsDonutSection,
        LabChartsProgressSection,
        LabChartsInfographicSection,
        LabChartsTimelineSection,
        LabChartsDashboardSection,
    ],
})
export class LabCharts {}
