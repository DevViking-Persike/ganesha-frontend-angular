import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    CHART_PALETTE_8,
    ChartSeries,
    cssClasses,
    formatG,
    formatGridValue,
    paletteColor,
    truncateLabel,
    uniqueChartId,
} from '../chart-models';

interface LineLayout {
    paddingLeft: number;
    paddingTop: number;
    viewW: number;
    viewH: number;
    plotW: number;
    plotH: number;
    niceMax: number;
    valueRange: number;
    pointCount: number;
    stepX: number;
    gridLines: number;
}

interface LineGrid {
    y: number;
    x2: number;
    labelX: number;
    label: string;
}

interface LineVGrid {
    x: number;
    y2: number;
}

interface LineSeriesVm {
    color: string;
    polylinePoints: string;
    areaPoints: string;
    areaFill: string;
    areaFillOpacity: string;
    approxLength: string;
    animDelay: string;
    dots: Array<{ cx: number; cy: number; title: string }>;
}

interface XLabel {
    x: number;
    y: number;
    text: string;
}

interface LineViewModel {
    viewW: number;
    viewH: number;
    paddingLeft: number;
    paddingTop: number;
    gridH: LineGrid[];
    gridV: LineVGrid[];
    series: LineSeriesVm[];
    xLabels: XLabel[];
}

@Component({
    selector: 'gns-line-chart',
    templateUrl: './gns-line-chart.html',
    styleUrls: ['./gns-line-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsLineChart {
    readonly series = input.required<ChartSeries[]>();
    readonly labels = input<string[] | null>(null);
    readonly height = input(320, { transform: numberAttribute });
    readonly showArea = input(false);
    readonly showAreaGradient = input(false);
    readonly showDots = input(true);
    readonly showGrid = input(true);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    private readonly chartId = uniqueChartId('gns-line');

    readonly hasXLabels = computed(() => {
        const labels = this.labels();
        return !!labels && labels.length > 0;
    });

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-line-chart',
            this.isAnimated() && 'gns-line-chart--animated',
            this.additionalCssClass(),
        ),
    );

    readonly vm = computed<LineViewModel | null>(() => {
        const series = this.series();
        if (!series || series.length === 0 || !series.some(s => s.values.length > 0)) return null;

        const layout = this.computeLayout(series);
        const gridH: LineGrid[] = [];
        const gridV: LineVGrid[] = [];

        if (this.showGrid()) {
            for (let g = 0; g <= layout.gridLines; g++) {
                const frac = g / layout.gridLines;
                const gValue = layout.niceMax - frac * layout.valueRange;
                const yPos = layout.paddingTop + frac * layout.plotH;
                gridH.push({
                    y: yPos,
                    x2: layout.paddingLeft + layout.plotW,
                    labelX: layout.paddingLeft - 8,
                    label: formatGridValue(gValue),
                });
            }
            for (let p = 0; p < layout.pointCount; p++) {
                const xPos = layout.paddingLeft + (layout.pointCount > 1 ? p * layout.stepX : layout.plotW / 2);
                gridV.push({ x: xPos, y2: layout.paddingTop + layout.plotH });
            }
        }

        const seriesVm: LineSeriesVm[] = series.map((s, si) => {
            const color = s.color ?? paletteColor(CHART_PALETTE_8, si);
            const points = s.values;
            const animDelay = this.isAnimated() ? `${si * 120}ms` : '0ms';
            const polylinePoints = this.buildPolylinePoints(points, layout);

            let areaPoints = '';
            if (this.showArea() && points.length > 0) {
                const firstX = (layout.paddingLeft + (points.length > 1 ? 0 : layout.plotW / 2)).toFixed(1);
                const lastX = (layout.paddingLeft + (points.length > 1 ? (points.length - 1) * layout.stepX : layout.plotW / 2)).toFixed(1);
                const bottomY = (layout.paddingTop + layout.plotH).toFixed(1);
                areaPoints = `${polylinePoints} ${lastX},${bottomY} ${firstX},${bottomY}`;
            }

            const approxLength = points.length > 1 ? (points.length - 1) * layout.stepX * 1.2 : layout.plotW;

            const dots = this.showDots()
                ? points.map((value, p) => {
                    const xp = layout.paddingLeft + (points.length > 1 ? p * layout.stepX : layout.plotW / 2);
                    const yp = layout.paddingTop + (layout.valueRange > 0
                        ? ((layout.niceMax - value) / layout.valueRange) * layout.plotH
                        : layout.plotH / 2);
                    const labels = this.labels();
                    const xLabel = this.hasXLabels() && labels && labels.length > p ? labels[p] : `Point ${p + 1}`;
                    return { cx: xp, cy: yp, title: `${s.name} — ${xLabel}: ${formatG(value, 4)}` };
                })
                : [];

            return {
                color,
                polylinePoints,
                areaPoints,
                areaFill: this.showAreaGradient() ? `url(#${this.areaGradientId(si)})` : color,
                areaFillOpacity: this.showAreaGradient() ? '1' : '0.12',
                approxLength: approxLength.toFixed(0),
                animDelay,
                dots,
            };
        });

        const xLabels: XLabel[] = [];
        if (this.hasXLabels()) {
            const labels = this.labels()!;
            for (let p = 0; p < labels.length && p < layout.pointCount; p++) {
                const xp = layout.paddingLeft + (layout.pointCount > 1 ? p * layout.stepX : layout.plotW / 2);
                xLabels.push({
                    x: xp,
                    y: layout.paddingTop + layout.plotH + 22,
                    text: truncateLabel(labels[p], 8),
                });
            }
        }

        return {
            viewW: layout.viewW,
            viewH: layout.viewH,
            paddingLeft: layout.paddingLeft,
            paddingTop: layout.paddingTop,
            gridH,
            gridV,
            series: seriesVm,
            xLabels,
        };
    });

    readonly areaGradients = computed(() => {
        const series = this.series() ?? [];
        return this.showAreaGradient()
            ? series.map((s, i) => ({ id: this.areaGradientId(i), color: s.color ?? paletteColor(CHART_PALETTE_8, i) }))
            : [];
    });

    private areaGradientId(index: number): string {
        return `gns-line-grad-${this.chartId}-${index}`;
    }

    private computeLayout(series: ChartSeries[]): LineLayout {
        const paddingLeft = 80;
        const paddingRight = 24;
        const paddingTop = 24;
        const paddingBottom = this.hasXLabels() ? 40 : 20;
        const viewW = 640;
        const viewH = this.height();
        const plotW = viewW - paddingLeft - paddingRight;
        const plotH = viewH - paddingTop - paddingBottom;

        const allValues = series.flatMap(s => s.values);
        const dataMin = allValues.length > 0 ? Math.min(...allValues) : 0;
        const dataMax = allValues.length > 0 ? Math.max(...allValues) : 1;
        const niceMax = dataMax <= 0 ? 1 : dataMax * 1.1;
        const niceMin = Math.min(0, dataMin);
        const valueRange = niceMax - niceMin;

        const pointCount = Math.max(...series.map(s => s.values.length));
        const stepX = pointCount > 1 ? plotW / (pointCount - 1) : plotW;

        return {
            paddingLeft, paddingTop, viewW, viewH, plotW, plotH,
            niceMax, valueRange, pointCount, stepX, gridLines: 5,
        };
    }

    private buildPolylinePoints(points: number[], layout: LineLayout): string {
        const parts: string[] = [];
        for (let p = 0; p < points.length; p++) {
            const xp = layout.paddingLeft + (points.length > 1 ? p * layout.stepX : layout.plotW / 2);
            const yp = layout.paddingTop + (layout.valueRange > 0
                ? ((layout.niceMax - points[p]) / layout.valueRange) * layout.plotH
                : layout.plotH / 2);
            parts.push(`${xp.toFixed(1)},${yp.toFixed(1)}`);
        }
        return parts.join(' ');
    }
}
