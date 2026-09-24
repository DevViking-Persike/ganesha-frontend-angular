import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    CHART_PALETTE_8,
    ChartDataPoint,
    cssClasses,
    formatG,
    formatGridValue,
    paletteColor,
    truncateLabel,
} from '../chart-models';

interface BarGridLine {
    y: number;
    x2: number;
    labelX: number;
    label: string;
}

interface BarItem {
    color: string;
    x: number;
    y: number;
    width: number;
    height: number;
    xCenter: number;
    transformOrigin: string;
    animDelay: string;
    valueText: string;
    labelText: string;
    fullLabel: string;
}

interface BarViewModel {
    chartWidth: number;
    chartHeight: number;
    paddingLeft: number;
    paddingTop: number;
    plotHeight: number;
    barWidth: number;
    gridLines: BarGridLine[];
    bars: BarItem[];
}

@Component({
    selector: 'gns-bar-chart',
    templateUrl: './gns-bar-chart.html',
    styleUrls: ['./gns-bar-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsBarChart {
    readonly data = input.required<ChartDataPoint[]>();
    readonly maxValue = input<number | null>(null);
    readonly height = input(320, { transform: numberAttribute });
    readonly showLabels = input(true);
    readonly showValues = input(true);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-bar-chart',
            this.isAnimated() && 'gns-bar-chart--animated',
            this.additionalCssClass(),
        ),
    );

    readonly vm = computed<BarViewModel | null>(() => {
        const data = this.data();
        if (!data || data.length === 0) return null;

        const effectiveMax = this.maxValue() ?? Math.max(...data.map(d => d.value));
        const paddingLeft = 80;
        const paddingRight = 24;
        const paddingTop = 32;
        const paddingBottom = this.showLabels() ? 40 : 20;
        const chartWidth = 640;
        const chartHeight = this.height();
        const plotWidth = chartWidth - paddingLeft - paddingRight;
        const plotHeight = chartHeight - paddingTop - paddingBottom;
        const barCount = data.length;
        const groupWidth = plotWidth / barCount;
        const barWidth = Math.max(4, groupWidth * 0.6);
        const gridLineCount = 5;

        const gridLines: BarGridLine[] = [];
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

        const bars: BarItem[] = data.map((point, i) => {
            const barColor = point.color ?? paletteColor(CHART_PALETTE_8, i);
            const ratio = effectiveMax > 0 ? Math.min(Math.max(point.value / effectiveMax, 0), 1) : 0;
            const barH = ratio * plotHeight;
            const xCenter = paddingLeft + (i + 0.5) * groupWidth;
            const xBar = xCenter - barWidth / 2;
            const yBar = paddingTop + plotHeight - barH;
            const animDelay = this.isAnimated() ? `${i * 60}ms` : '0ms';

            return {
                color: barColor,
                x: xBar,
                y: yBar,
                width: barWidth,
                height: barH,
                xCenter,
                transformOrigin: `${xCenter.toFixed(1)}px ${(paddingTop + plotHeight).toFixed(1)}px`,
                animDelay,
                valueText: formatG(point.value, 4),
                labelText: truncateLabel(point.label, 10),
                fullLabel: point.label,
            };
        });

        return { chartWidth, chartHeight, paddingLeft, paddingTop, plotHeight, barWidth, gridLines, bars };
    });
}
