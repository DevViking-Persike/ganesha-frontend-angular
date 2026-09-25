import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    BubbleDataPoint,
    CHART_PALETTE_8,
    cssClasses,
    formatG,
    formatGridValue,
    paletteColor,
    truncateLabel,
    uniqueChartId,
} from '../chart-models';

interface BubbleLayout {
    paddingLeft: number;
    paddingTop: number;
    plotW: number;
    plotH: number;
    viewW: number;
    viewH: number;
    xMin: number;
    xRange: number;
    yMax: number;
    yRange: number;
    sizeMin: number;
    sizeRange: number;
    gridLines: number;
}

interface GridLine {
    pos: number;
    edge: number;
    labelPos: number;
    label: string;
}

interface BubbleConnector {
    color: string;
    cx: number;
    y1: number;
    y2: number;
    labelY: number;
    labelText: string;
}

interface BubbleItem {
    color: string;
    cx: number;
    cy: number;
    r: number;
    gradientId: string;
    animDelay: string;
    title: string;
    showValue: boolean;
    valueText: string;
}

interface BubbleViewModel {
    viewW: number;
    viewH: number;
    paddingLeft: number;
    paddingTop: number;
    plotW: number;
    plotH: number;
    gridH: GridLine[];
    gridV: GridLine[];
    connectors: BubbleConnector[];
    bubbles: BubbleItem[];
}

@Component({
    selector: 'gns-bubble-chart',
    templateUrl: './gns-bubble-chart.html',
    styleUrls: ['./gns-bubble-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsBubbleChart {
    readonly data = input.required<BubbleDataPoint[]>();
    readonly height = input(400, { transform: numberAttribute });
    readonly minBubbleRadius = input(8);
    readonly maxBubbleRadius = input(48);
    readonly showGrid = input(true);
    readonly showLabels = input(true);
    readonly showValues = input(true);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    private readonly chartId = uniqueChartId('gns-bubble');
    private readonly shadowFilterId = `gns-bubble-shadow-${this.chartId}`;
    private readonly glowFilterId = `gns-bubble-glow-${this.chartId}`;

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-bubble-chart',
            this.isAnimated() && 'gns-bubble-chart--animated',
            this.additionalCssClass(),
        ),
    );

    readonly inlineStyle = computed(() => `--gns-bubble-hover-filter: url(#${this.glowFilterId});`);

    readonly vm = computed<BubbleViewModel | null>(() => {
        const data = this.data();
        if (!data || data.length === 0) return null;

        const layout = this.computeLayout(data);
        const gridH: GridLine[] = [];
        const gridV: GridLine[] = [];

        if (this.showGrid()) {
            for (let g = 0; g <= layout.gridLines; g++) {
                const frac = g / layout.gridLines;
                const yValue = layout.yMax - frac * layout.yRange;
                const yPos = layout.paddingTop + frac * layout.plotH;
                gridH.push({
                    pos: yPos,
                    edge: layout.paddingLeft,
                    labelPos: layout.paddingLeft - 8,
                    label: formatGridValue(yValue),
                });
            }
            for (let g = 0; g <= layout.gridLines; g++) {
                const frac = g / layout.gridLines;
                const xValue = layout.xMin + frac * layout.xRange;
                const xPos = layout.paddingLeft + frac * layout.plotW;
                gridV.push({
                    pos: xPos,
                    edge: layout.paddingTop + layout.plotH,
                    labelPos: layout.paddingTop + layout.plotH + 22,
                    label: formatGridValue(xValue),
                });
            }
        }

        const connectors: BubbleConnector[] = [];
        if (this.showLabels()) {
            for (let i = 0; i < data.length; i++) {
                const point = data[i];
                const cx = this.mapX(point.x, layout);
                const cy = this.mapY(point.y, layout);
                const r = this.mapRadius(point.size, layout);
                const color = point.color ?? paletteColor(CHART_PALETTE_8, i);
                let lineEndY = cy - r - 24;
                if (lineEndY < layout.paddingTop + 4) lineEndY = cy + r + 24;
                connectors.push({
                    color,
                    cx,
                    y1: cy - r - 2,
                    y2: lineEndY + 12,
                    labelY: lineEndY + 6,
                    labelText: truncateLabel(point.label, 12),
                });
            }
        }

        const bubbles: BubbleItem[] = data.map((point, i) => {
            const color = point.color ?? paletteColor(CHART_PALETTE_8, i);
            const cx = this.mapX(point.x, layout);
            const cy = this.mapY(point.y, layout);
            const r = this.mapRadius(point.size, layout);
            return {
                color,
                cx,
                cy,
                r,
                gradientId: this.bubbleGradientId(i),
                animDelay: this.isAnimated() ? `${i * 80}ms` : '0ms',
                title: `${point.label}: ${formatG(point.x, 4)} × ${formatG(point.y, 4)} (${formatG(point.size, 4)})`,
                showValue: this.showValues() && r >= 16,
                valueText: formatG(point.size, 3),
            };
        });

        return {
            viewW: layout.viewW,
            viewH: layout.viewH,
            paddingLeft: layout.paddingLeft,
            paddingTop: layout.paddingTop,
            plotW: layout.plotW,
            plotH: layout.plotH,
            gridH,
            gridV,
            connectors,
            bubbles,
        };
    });

    readonly gradients = computed(() => {
        const data = this.data() ?? [];
        return data.map((point, i) => ({
            id: this.bubbleGradientId(i),
            baseColor: point.color ?? paletteColor(CHART_PALETTE_8, i),
        }));
    });

    readonly shadowFilter = this.shadowFilterId;
    readonly glowFilter = this.glowFilterId;

    private bubbleGradientId(index: number): string {
        return `gns-bubble-grad-${this.chartId}-${index}`;
    }

    private mapX(value: number, l: BubbleLayout): number {
        return l.paddingLeft + (l.xRange > 0 ? ((value - l.xMin) / l.xRange) * l.plotW : l.plotW / 2);
    }

    private mapY(value: number, l: BubbleLayout): number {
        return l.paddingTop + (l.yRange > 0 ? ((l.yMax - value) / l.yRange) * l.plotH : l.plotH / 2);
    }

    private mapRadius(size: number, l: BubbleLayout): number {
        return l.sizeRange > 0
            ? this.minBubbleRadius() + ((size - l.sizeMin) / l.sizeRange) * (this.maxBubbleRadius() - this.minBubbleRadius())
            : (this.minBubbleRadius() + this.maxBubbleRadius()) / 2;
    }

    private computeLayout(data: BubbleDataPoint[]): BubbleLayout {
        const paddingLeft = 80;
        const paddingRight = 40;
        const paddingTop = 40;
        const paddingBottom = 48;
        const viewW = 640;
        const viewH = this.height();
        const plotW = viewW - paddingLeft - paddingRight;
        const plotH = viewH - paddingTop - paddingBottom;

        let xMin = Math.min(...data.map(d => d.x));
        let xMax = Math.max(...data.map(d => d.x));
        let yMin = Math.min(...data.map(d => d.y));
        let yMax = Math.max(...data.map(d => d.y));
        const sizeMin = Math.min(...data.map(d => d.size));
        const sizeMax = Math.max(...data.map(d => d.size));

        // 10% de margem para as bolhas não encostarem nas bordas
        let xMargin = (xMax - xMin) * 0.1;
        let yMargin = (yMax - yMin) * 0.1;
        if (xMargin === 0) xMargin = Math.abs(xMin) * 0.1 + 1;
        if (yMargin === 0) yMargin = Math.abs(yMin) * 0.1 + 1;

        xMin -= xMargin;
        xMax += xMargin;
        yMin -= yMargin;
        yMax += yMargin;

        return {
            paddingLeft, paddingTop, plotW, plotH, viewW, viewH,
            xMin, xRange: xMax - xMin,
            yMax, yRange: yMax - yMin,
            sizeMin, sizeRange: sizeMax - sizeMin,
            gridLines: 5,
        };
    }
}
