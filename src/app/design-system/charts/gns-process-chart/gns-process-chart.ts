import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CHART_PALETTE_6, cssClasses, paletteColor, ProcessStep } from '../chart-models';

interface ProcessStepVm {
    color: string;
    animDelay: string;
    title: string;
    value: string;
    description: string | null;
}

@Component({
    selector: 'gns-process-chart',
    templateUrl: './gns-process-chart.html',
    styleUrls: ['./gns-process-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsProcessChart {
    readonly steps = input.required<ProcessStep[]>();
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses('gns-process-chart', this.additionalCssClass()),
    );

    readonly stepVms = computed<ProcessStepVm[]>(() =>
        (this.steps() ?? []).map((step, i) => ({
            color: step.color ?? paletteColor(CHART_PALETTE_6, i),
            animDelay: this.isAnimated() ? `${i * 150}ms` : '0ms',
            title: step.title,
            value: step.value,
            description: step.description && step.description.length > 0 ? step.description : null,
        })),
    );
}
