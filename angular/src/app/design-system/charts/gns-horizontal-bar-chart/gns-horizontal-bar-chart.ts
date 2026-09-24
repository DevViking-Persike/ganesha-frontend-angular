import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import {
    CHART_PALETTE_8,
    ChartDataPoint,
    cssClasses,
    formatGridValue,
    paletteColor,
    truncateLabel,
} from '../chart-models';

interface HBarRow {
    color: string;
    pct: string;
    barStyle: string;
    labelText: string;
    fullLabel: string;
    ariaValueNow: string;
    ariaValueMax: string;
    ariaLabel: string;
    valueText: string;
}

@Component({
    selector: 'gns-horizontal-bar-chart',
    templateUrl: './gns-horizontal-bar-chart.html',
    styleUrls: ['./gns-horizontal-bar-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsHorizontalBarChart {
    readonly data = input.required<ChartDataPoint[]>();
    readonly maxValue = input<number | null>(null);
    readonly barHeight = input(32, { transform: numberAttribute });
    readonly showValues = input(true);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-hbar-chart',
            this.isAnimated() && 'gns-hbar-chart--animated',
            this.additionalCssClass(),
        ),
    );

    readonly rows = computed<HBarRow[] | null>(() => {
        const data = this.data();
        if (!data || data.length === 0) return null;

        const effectiveMax = this.maxValue() ?? Math.max(...data.map(d => d.value));

        return data.map((point, i) => {
            const barColor = point.color ?? paletteColor(CHART_PALETTE_8, i);
            const pct = effectiveMax > 0
                ? Math.min(Math.max((point.value / effectiveMax) * 100, 0), 100)
                : 0;
            const pctText = pct.toFixed(2);
            const animDelay = this.isAnimated() ? `${i * 60}ms` : '0ms';
            const valueText = formatGridValue(point.value);

            return {
                color: barColor,
                pct: pctText,
                barStyle: `width: ${pctText}%; background-color: ${barColor}; `
                    + `--gns-hbar-target-width: ${pctText}%; --gns-hbar-delay: ${animDelay};`,
                labelText: truncateLabel(point.label, 20),
                fullLabel: point.label,
                ariaValueNow: valueText,
                ariaValueMax: formatGridValue(effectiveMax),
                ariaLabel: `${point.label}: ${valueText}`,
                valueText,
            };
        });
    });
}
