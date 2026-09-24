import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    CHART_PALETTE_8,
    ChartDataPoint,
    cssClasses,
    formatG,
    paletteColor,
    uniqueChartId,
} from '../chart-models';

interface PieSlice {
    path: string;
    fill: string;
    gradientId: string;
    animDelay: string;
    title: string;
}

interface PieLegendItem {
    color: string;
    label: string;
    pct: string;
}

interface PieViewModel {
    cx: number;
    cy: number;
    slices: PieSlice[];
    gradients: Array<{ id: string; baseColor: string }>;
    legend: PieLegendItem[];
}

@Component({
    selector: 'gns-pie-chart',
    templateUrl: './gns-pie-chart.html',
    styleUrls: ['./gns-pie-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsPieChart {
    readonly data = input.required<ChartDataPoint[]>();
    readonly size = input(220, { transform: numberAttribute });
    readonly showLegend = input(true);
    readonly showGradient = input(true);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    private readonly chartId = uniqueChartId('gns-pie');

    readonly cssClass = computed(() =>
        cssClasses('gns-pie-chart', this.additionalCssClass()),
    );

    readonly vm = computed<PieViewModel | null>(() => {
        const data = this.data();
        if (!data || data.length === 0) return null;

        const total = data.reduce((sum, d) => sum + d.value, 0);
        const size = this.size();
        const cx = size / 2;
        const cy = size / 2;
        const r = size / 2 - 4;

        const gradients = data.map((point, i) => ({
            id: this.gradientId(i),
            baseColor: point.color ?? paletteColor(CHART_PALETTE_8, i),
        }));

        let startAngle = -90;
        const slices: PieSlice[] = data.map((point, i) => {
            const fraction = total > 0 ? point.value / total : 0;
            const sweep = fraction * 360.0;
            const endAngle = startAngle + sweep;
            const path = this.buildSlicePath(cx, cy, r, startAngle, endAngle, sweep);
            const slice: PieSlice = {
                path,
                fill: this.showGradient() ? `url(#${this.gradientId(i)})` : point.color ?? paletteColor(CHART_PALETTE_8, i),
                gradientId: this.gradientId(i),
                animDelay: this.isAnimated() ? `${i * 100}ms` : '0ms',
                title: `${point.label}: ${formatG(point.value, 4)} (${(fraction * 100).toFixed(1)}%)`,
            };
            startAngle = endAngle;
            return slice;
        });

        const legend: PieLegendItem[] = data.map((point, i) => ({
            color: point.color ?? paletteColor(CHART_PALETTE_8, i),
            label: point.label,
            pct: (total > 0 ? (point.value / total) * 100 : 0).toFixed(1),
        }));

        return { cx, cy, slices, gradients, legend };
    });

    private gradientId(index: number): string {
        return `gns-pie-grad-${this.chartId}-${index}`;
    }

    private buildSlicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number, sweep: number): string {
        const startRad = (startAngle * Math.PI) / 180.0;
        const endRad = (endAngle * Math.PI) / 180.0;

        const x1 = cx + r * Math.cos(startRad);
        const y1 = cy + r * Math.sin(startRad);
        const x2 = cx + r * Math.cos(endRad);
        const y2 = cy + r * Math.sin(endRad);

        const largeArc = sweep > 180 ? 1 : 0;

        return `M ${cx.toFixed(2)},${cy.toFixed(2)} L ${x1.toFixed(2)},${y1.toFixed(2)} `
            + `A ${r.toFixed(2)},${r.toFixed(2)} 0 ${largeArc} 1 ${x2.toFixed(2)},${y2.toFixed(2)} Z`;
    }
}
