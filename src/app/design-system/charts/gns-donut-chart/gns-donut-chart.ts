import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    CHART_PALETTE_8,
    ChartDataPoint,
    cssClasses,
    formatG,
    paletteColor,
} from '../chart-models';

interface DonutSegment {
    color: string;
    dashLen: string;
    dashGap: string;
    dashOffset: string;
    animDelay: string;
    title: string;
}

interface DonutLegendItem {
    color: string;
    label: string;
    valueText: string;
    pct: string;
}

interface DonutViewModel {
    radius: string;
    cx: string;
    cy: string;
    circumference: string;
    segments: DonutSegment[];
    legend: DonutLegendItem[];
}

@Component({
    selector: 'gns-donut-chart',
    templateUrl: './gns-donut-chart.html',
    styleUrls: ['./gns-donut-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsDonutChart {
    readonly data = input.required<ChartDataPoint[]>();
    readonly size = input(200, { transform: numberAttribute });
    readonly strokeWidth = input(32, { transform: numberAttribute });
    readonly centerLabel = input<string | null>(null);
    readonly centerSubLabel = input<string | null>(null);
    readonly showLegend = input(true);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-donut-chart',
            this.isAnimated() && 'gns-donut-chart--animated',
            this.additionalCssClass(),
        ),
    );

    readonly vm = computed<DonutViewModel | null>(() => {
        const data = this.data();
        if (!data || data.length === 0) return null;

        const size = this.size();
        const strokeWidth = this.strokeWidth();
        const radius = size / 2 - strokeWidth / 2;
        const circumference = 2 * Math.PI * radius;
        const cx = size / 2;
        const cy = size / 2;
        const total = data.reduce((sum, d) => sum + d.value, 0);

        let cumulative = 0;
        const segments: DonutSegment[] = data.map((point, i) => {
            const color = point.color ?? paletteColor(CHART_PALETTE_8, i);
            const fraction = total > 0 ? point.value / total : 0;
            const dashLen = fraction * circumference;
            const dashOffset = total > 0 ? circumference - (cumulative * circumference) / total : 0;
            cumulative += point.value;
            const pctText = total > 0 ? ((point.value / total) * 100).toFixed(1) : '0';
            return {
                color,
                dashLen: dashLen.toFixed(2),
                dashGap: (circumference - dashLen).toFixed(2),
                dashOffset: dashOffset.toFixed(2),
                animDelay: this.isAnimated() ? `${i * 80}ms` : '0ms',
                title: `${point.label}: ${formatG(point.value, 4)} (${pctText}%)`,
            };
        });

        const legend: DonutLegendItem[] = data.map((point, i) => ({
            color: point.color ?? paletteColor(CHART_PALETTE_8, i),
            label: point.label,
            valueText: formatG(point.value, 4),
            pct: (total > 0 ? (point.value / total) * 100 : 0).toFixed(1),
        }));

        return {
            radius: radius.toFixed(2),
            cx: cx.toFixed(1),
            cy: cy.toFixed(1),
            circumference: circumference.toFixed(2),
            segments,
            legend,
        };
    });
}
