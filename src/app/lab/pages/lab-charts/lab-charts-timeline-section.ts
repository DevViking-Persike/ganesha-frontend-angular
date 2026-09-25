import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsProjectTimeline } from '../../../composites/project-timeline/index';
import { GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';
import { TIMELINE_CATEGORIES, TIMELINE_TASKS } from './lab-charts-samples';

@Component({
    selector: 'gns-lab-charts-timeline-section',
    templateUrl: './lab-charts-timeline-section.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsProjectTimeline, GnsSection, GnsCard],
})
export class LabChartsTimelineSection {
    protected readonly timelineTasks = TIMELINE_TASKS;
    protected readonly timelineCategories = TIMELINE_CATEGORIES;
    protected readonly today = '2026-04-04';
}
