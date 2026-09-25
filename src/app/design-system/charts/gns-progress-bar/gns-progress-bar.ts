import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { cssClasses, ProgressBarSize, ProgressBarVariant } from '../chart-models';

@Component({
    selector: 'gns-progress-bar',
    templateUrl: './gns-progress-bar.html',
    styleUrls: ['./gns-progress-bar.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsProgressBar {
    readonly value = input(0);
    readonly max = input<number | null>(100);
    readonly label = input<string | null>(null);
    readonly showValue = input(true);
    readonly variant = input<ProgressBarVariant>('default');
    readonly size = input<ProgressBarSize>('medium');
    readonly isAnimated = input(true);
    readonly isStriped = input(false);
    readonly additionalCssClass = input<string | null>(null);

    readonly pct = computed(() => {
        const max = this.max();
        if (max !== null && max > 0) {
            return Math.min(Math.max((this.value() / max) * 100, 0), 100);
        }
        return Math.min(Math.max(this.value(), 0), 100);
    });

    readonly wrapperClass = computed(() =>
        cssClasses('gns-progress-bar', this.additionalCssClass()),
    );

    readonly fillClass = computed(() => {
        const variant = this.variant();
        const size = this.size();
        return cssClasses(
            'gns-progress-bar__fill',
            variant === 'default' && 'gns-progress-bar__fill--default',
            variant === 'success' && 'gns-progress-bar__fill--success',
            variant === 'warning' && 'gns-progress-bar__fill--warning',
            variant === 'danger' && 'gns-progress-bar__fill--danger',
            variant === 'info' && 'gns-progress-bar__fill--info',
            size === 'small' && 'gns-progress-bar__fill--sm',
            size === 'medium' && 'gns-progress-bar__fill--md',
            size === 'large' && 'gns-progress-bar__fill--lg',
            this.isStriped() && 'gns-progress-bar__fill--striped',
            this.isAnimated() && 'gns-progress-bar__fill--animated',
        );
    });

    readonly pctText = computed(() => this.pct().toFixed(2));
    readonly pctRounded = computed(() => this.pct().toFixed(0));
}
