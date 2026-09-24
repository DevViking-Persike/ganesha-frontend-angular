import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { cssClasses, formatG, uniqueChartId } from '../chart-models';

interface GaugeViewModel {
    size: number;
    halfSize: number;
    cx: string;
    cy: string;
    valueY: string;
    labelY: string;
    minMaxY: string;
    minMaxX: string;
    trackPath: string;
    fillPath: string;
    glossPath: string;
    highlightPath: string;
    pct: number;
    valueText: string;
}

@Component({
    selector: 'gns-gauge-chart',
    templateUrl: './gns-gauge-chart.html',
    styleUrls: ['./gns-gauge-chart.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsGaugeChart {
    readonly value = input(0);
    readonly maxValue = input(100);
    readonly size = input(240, { transform: numberAttribute });
    readonly strokeWidth = input(20, { transform: numberAttribute });
    readonly startColor = input('var(--gns-info-500,#00BCD4)');
    readonly endColor = input('var(--gns-success-500,#4CAF50)');
    readonly label = input<string | null>(null);
    readonly valueLabel = input<string | null>(null);
    readonly minLabel = input<string | null>(null);
    readonly maxLabel = input<string | null>(null);
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    private readonly id = uniqueChartId('gns-gauge');
    readonly bgGradId = `gns-gauge-bg-${this.id}`;
    readonly fillGradId = `gns-gauge-fill-${this.id}`;
    readonly glossGradId = `gns-gauge-gloss-${this.id}`;
    readonly shadowFilterId = `gns-gauge-shadow-${this.id}`;

    readonly halfSize = computed(() => Math.trunc(this.size() / 2) + Math.max(28, Math.trunc(this.strokeWidth() / 2)));

    readonly cssClass = computed(() =>
        cssClasses('gns-gauge', this.additionalCssClass()),
    );

    readonly vm = computed<GaugeViewModel>(() => {
        const size = this.size();
        const strokeWidth = this.strokeWidth();
        const halfSize = this.halfSize();
        const cx = size / 2;
        const cy = halfSize - 18;
        const outerRadius = size / 2 - 10;
        const innerRadius = Math.max(outerRadius - strokeWidth, 8);
        const pct = this.maxValue() > 0
            ? Math.min(Math.max(this.value() / this.maxValue(), 0), 1)
            : 0;
        const fillEndAngle = 180 + 180 * pct;

        const trackPath = this.buildBandPath(cx, cy, outerRadius, innerRadius, 180, 360);
        const fillPath = pct > 0 ? this.buildBandPath(cx, cy, outerRadius, innerRadius, 180, fillEndAngle) : '';
        const glossPath = pct > 0
            ? this.buildBandPath(cx, cy, outerRadius - 2, Math.max(innerRadius + strokeWidth * 0.45, innerRadius + 2), 180, fillEndAngle)
            : '';
        const highlightPath = pct > 0 ? this.buildArcPath(cx, cy, outerRadius - 2, 180, fillEndAngle) : '';

        return {
            size,
            halfSize,
            cx: cx.toFixed(2),
            cy: cy.toFixed(2),
            valueY: (cy - strokeWidth * 0.6 - 2).toFixed(2),
            labelY: (cy + 18).toFixed(2),
            minMaxY: (cy + 4).toFixed(2),
            minMaxX: (size - 12).toFixed(2),
            trackPath,
            fillPath,
            glossPath,
            highlightPath,
            pct,
            valueText: this.valueLabel() ?? `${(pct * 100).toFixed(0)}%`,
        };
    });

    readonly maxText = computed(() => this.maxLabel() ?? formatG(this.maxValue(), 4));

    private buildArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
        const start = polarToCartesian(cx, cy, r, startAngle);
        const end = polarToCartesian(cx, cy, r, endAngle);
        const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
        return `M ${start.x.toFixed(2)},${start.y.toFixed(2)} A ${r.toFixed(2)},${r.toFixed(2)} 0 ${largeArc} 1 ${end.x.toFixed(2)},${end.y.toFixed(2)}`;
    }

    private buildBandPath(cx: number, cy: number, outerRadius: number, innerRadius: number, startAngle: number, endAngle: number): string {
        const outerStart = polarToCartesian(cx, cy, outerRadius, startAngle);
        const outerEnd = polarToCartesian(cx, cy, outerRadius, endAngle);
        const innerEnd = polarToCartesian(cx, cy, innerRadius, endAngle);
        const innerStart = polarToCartesian(cx, cy, innerRadius, startAngle);
        const largeArc = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;

        return `M ${outerStart.x.toFixed(2)},${outerStart.y.toFixed(2)} `
            + `A ${outerRadius.toFixed(2)},${outerRadius.toFixed(2)} 0 ${largeArc} 1 ${outerEnd.x.toFixed(2)},${outerEnd.y.toFixed(2)} `
            + `L ${innerEnd.x.toFixed(2)},${innerEnd.y.toFixed(2)} `
            + `A ${innerRadius.toFixed(2)},${innerRadius.toFixed(2)} 0 ${largeArc} 0 ${innerStart.x.toFixed(2)},${innerStart.y.toFixed(2)} Z`;
    }
}

function polarToCartesian(cx: number, cy: number, radius: number, angle: number): { x: number; y: number } {
    const radians = (angle * Math.PI) / 180.0;
    return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}
