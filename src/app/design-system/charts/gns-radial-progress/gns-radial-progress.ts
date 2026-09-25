import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';
import { cssClasses, ProgressBarVariant } from '../chart-models';

const ARC_COLORS: Record<ProgressBarVariant, string> = {
    default: 'var(--gns-primary-500,#3F51B5)',
    success: 'var(--gns-success-500,#4CAF50)',
    warning: 'var(--gns-warning-500,#FFC107)',
    danger: 'var(--gns-danger-500,#F44336)',
    info: 'var(--gns-info-500,#00BCD4)',
};

@Component({
    selector: 'gns-radial-progress',
    templateUrl: './gns-radial-progress.html',
    styleUrls: ['./gns-radial-progress.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsRadialProgress {
    readonly value = input(0);
    readonly size = input(80, { transform: numberAttribute });
    readonly strokeWidth = input(8, { transform: numberAttribute });
    readonly label = input<string | null>(null);
    readonly variant = input<ProgressBarVariant>('default');
    readonly isAnimated = input(true);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-radial-progress',
            this.isAnimated() && 'gns-radial-progress--animated',
            this.additionalCssClass(),
        ),
    );

    readonly arcColor = computed(() => ARC_COLORS[this.variant()]);

    readonly vm = computed(() => {
        const size = this.size();
        const radius = size / 2 - this.strokeWidth() / 2 - 2;
        const circumference = 2 * Math.PI * radius;
        const pct = Math.min(Math.max(this.value(), 0), 100);
        const dashOffset = circumference * (1 - pct / 100);
        const cx = size / 2;
        const cy = size / 2;
        const hasLabel = !!this.label();

        return {
            radius: radius.toFixed(2),
            circumference: circumference.toFixed(2),
            dashOffset: dashOffset.toFixed(2),
            cx: cx.toFixed(1),
            cy: cy.toFixed(1),
            rotate: `rotate(-90 ${cx.toFixed(1)} ${cy.toFixed(1)})`,
            labelY: (cy - (hasLabel ? 8 : 0)).toFixed(1),
            subLabelY: (cy + 10).toFixed(1),
            pctRounded: pct.toFixed(0),
            ariaLabel: hasLabel ? `${this.label()} progress` : `${pct.toFixed(0)}% progress`,
            pct,
        };
    });
}
