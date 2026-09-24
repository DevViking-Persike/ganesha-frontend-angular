import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    CHART_PALETTE_6,
    ChartDataPoint,
    cssClasses,
    paletteColor,
    uniqueChartId,
} from '../chart-models';

interface FunnelStep {
    points: string;
    gradientId: string;
    titleY: number;
    valueY: number;
    title: string;
    valueText: string;
    animDelay: string;
}

interface FunnelViewModel {
    svgWidth: number;
    svgHeight: number;
    cx: number;
    steps: FunnelStep[];
    gradients: Array<{ id: string; color: string }>;
}

function formatValue(value: number): string {
    const trim = (n: number) => n.toFixed(1).replace(/\.0$/, '');
    if (Math.abs(value) >= 1_000_000) return `${trim(value / 1_000_000)}M`;
    if (Math.abs(value) >= 1_000) return `${trim(value / 1_000)}K`;
    return value.toFixed(2).replace(/\.?0+$/, '');
}

@Component({
    selector: 'gns-funnel-chart',
    templateUrl: './gns-funnel-chart.html',
    styleUrls: ['./gns-funnel-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsFunnelChart {
    readonly data = input.required<ChartDataPoint[]>();
    readonly width = input(400, { transform: numberAttribute });
    readonly stepHeight = input(52, { transform: numberAttribute });
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    private readonly chartId = uniqueChartId('gns-funnel');

    readonly cssClass = computed(() =>
        cssClasses('gns-funnel', this.additionalCssClass()),
    );

    readonly vm = computed<FunnelViewModel | null>(() => {
        const data = this.data();
        if (!data || data.length === 0) return null;

        const maxVal = Math.max(...data.map(d => d.value));
        const svgWidth = this.width();
        const stepH = this.stepHeight();
        const gap = 4;
        const svgHeight = data.length * (stepH + gap) - gap;
        const cx = svgWidth / 2;

        const gradients = data.map((point, i) => ({
            id: this.gradientId(i),
            color: point.color ?? paletteColor(CHART_PALETTE_6, i),
        }));

        const steps: FunnelStep[] = data.map((point, i) => {
            const fraction = maxVal > 0 ? point.value / maxVal : 0;
            const nextFrac = i + 1 < data.length && maxVal > 0 ? data[i + 1].value / maxVal : fraction * 0.7;
            const topW = fraction * (svgWidth - 40);
            const botW = nextFrac * (svgWidth - 40);
            const yTop = i * (stepH + gap);
            const yBot = yTop + stepH;

            const x1 = cx - topW / 2;
            const x2 = cx + topW / 2;
            const x3 = cx + botW / 2;
            const x4 = cx - botW / 2;

            const f1 = (n: number) => n.toFixed(1);
            return {
                points: `${f1(x1)},${f1(yTop)} ${f1(x2)},${f1(yTop)} ${f1(x3)},${f1(yBot)} ${f1(x4)},${f1(yBot)}`,
                gradientId: this.gradientId(i),
                titleY: yTop + stepH / 2 - 6,
                valueY: yTop + stepH / 2 + 10,
                title: point.label,
                valueText: formatValue(point.value),
                animDelay: this.isAnimated() ? `${i * 120}ms` : '0ms',
            };
        });

        return { svgWidth, svgHeight, cx, steps, gradients };
    });

    private gradientId(index: number): string {
        return `gns-funnel-grad-${this.chartId}-${index}`;
    }
}
