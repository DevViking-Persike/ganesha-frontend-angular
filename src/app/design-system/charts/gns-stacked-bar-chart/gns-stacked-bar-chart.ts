import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    CHART_PALETTE_6,
    ChartSeries,
    cssClasses,
    formatG,
    formatGridValue,
    paletteColor,
    truncateLabel,
} from '../chart-models';

interface StackedGridLine {
    y: number;
    x2: number;
    labelX: number;
    label: string;
}

interface StackedBar {
    x: number;
    y: number;
    width: number;
    height: number;
    rx: string;
    fill: string;
    transformOrigin: string;
    animDelay: string;
    title: string;
}

interface StackedLegendItem {
    x: number;
    rectY: number;
    textX: number;
    textY: number;
    color: string;
    name: string;
}

interface StackedViewModel {
    chartWidth: number;
    chartHeight: number;
    gridLines: StackedGridLine[];
    bars: StackedBar[];
    xLabels: Array<{ x: number; y: number; text: string }>;
    legend: StackedLegendItem[];
}

@Component({
    selector: 'gns-stacked-bar-chart',
    templateUrl: './gns-stacked-bar-chart.html',
    styleUrls: ['./gns-stacked-bar-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsStackedBarChart {
    readonly series = input.required<ChartSeries[]>();
    readonly labels = input.required<string[]>();
    readonly maxValue = input<number | null>(null);
    readonly height = input(320, { transform: numberAttribute });
    readonly showLabels = input(true);
    readonly showLegend = input(true);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses('gns-stacked-bar', this.additionalCssClass()),
    );

    readonly vm = computed<StackedViewModel | null>(() => {
        const series = this.series();
        const labels = this.labels();
        if (!series || series.length === 0 || !labels || labels.length === 0) return null;

        const paddingLeft = 80;
        const paddingRight = 24;
        const paddingTop = 24;
        const paddingBottom = this.showLabels() ? (this.showLegend() ? 60 : 40) : (this.showLegend() ? 40 : 20);
        const chartWidth = 640;
        const chartHeight = this.height();
        const plotWidth = chartWidth - paddingLeft - paddingRight;
        const plotHeight = chartHeight - paddingTop - paddingBottom;

        let effectiveMax: number;
        if (this.maxValue() != null) {
            effectiveMax = this.maxValue()!;
        } else {
            effectiveMax = 0;
            for (let i = 0; i < labels.length; i++) {
                let stackTotal = 0;
                for (const s of series) {
                    if (i < s.values.length) stackTotal += s.values[i];
                }
                if (stackTotal > effectiveMax) effectiveMax = stackTotal;
            }
        }
        if (effectiveMax <= 0) effectiveMax = 1;

        const groupWidth = plotWidth / labels.length;
        const barWidth = Math.max(4, groupWidth * 0.6);
        const gridLineCount = 5;

        const gridLines: StackedGridLine[] = [];
        for (let g = 0; g <= gridLineCount; g++) {
            const fraction = g / gridLineCount;
            const gridValue = effectiveMax * (1 - fraction);
            gridLines.push({
                y: paddingTop + fraction * plotHeight,
                x2: paddingLeft + plotWidth,
                labelX: paddingLeft - 8,
                label: formatGridValue(gridValue),
            });
        }

        const bars: StackedBar[] = [];
        const xLabels: Array<{ x: number; y: number; text: string }> = [];
        for (let i = 0; i < labels.length; i++) {
            const xCenter = paddingLeft + (i + 0.5) * groupWidth;
            const xBar = xCenter - barWidth / 2;
            let cumY = 0;

            for (let si = series.length - 1; si >= 0; si--) {
                const s = series[si];
                if (i >= s.values.length) continue;

                const val = s.values[i];
                const color = s.color ?? paletteColor(CHART_PALETTE_6, si);
                const ratio = effectiveMax > 0 ? Math.min(Math.max(val / effectiveMax, 0), 1) : 0;
                const barH = ratio * plotHeight;
                cumY += barH;
                const yBar = paddingTop + plotHeight - cumY;
                const animDelay = this.isAnimated() ? `${(i * series.length + si) * 40}ms` : '0ms';

                bars.push({
                    x: xBar,
                    y: yBar,
                    width: barWidth,
                    height: barH,
                    rx: si === series.length - 1 ? '3' : '0',
                    fill: color,
                    transformOrigin: `${xCenter.toFixed(1)}px ${(paddingTop + plotHeight).toFixed(1)}px`,
                    animDelay,
                    title: `${s.name} — ${labels[i]}: ${formatG(val, 4)}`,
                });
            }

            if (this.showLabels()) {
                xLabels.push({
                    x: xCenter,
                    y: paddingTop + plotHeight + 22,
                    text: truncateLabel(labels[i], 10),
                });
            }
        }

        const legend: StackedLegendItem[] = [];
        if (this.showLegend()) {
            const legendY = chartHeight - 8;
            for (let si = 0; si < series.length; si++) {
                const lx = paddingLeft + si * 120;
                legend.push({
                    x: lx,
                    rectY: legendY - 10,
                    textX: lx + 18,
                    textY: legendY,
                    color: series[si].color ?? paletteColor(CHART_PALETTE_6, si),
                    name: series[si].name,
                });
            }
        }

        return { chartWidth, chartHeight, gridLines, bars, xLabels, legend };
    });
}
