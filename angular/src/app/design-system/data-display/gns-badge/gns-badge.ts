import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type BadgeSeverity = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-badge',
    templateUrl: './gns-badge.html',
    styleUrls: ['./gns-badge.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsBadge {
    readonly severity = input<BadgeSeverity>('default');
    readonly size = input<BadgeSize>('md');
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-badge',
            `gns-badge--${this.severity()}`,
            this.size() === 'sm' && 'gns-badge--sm',
            this.size() === 'md' && 'gns-badge--md',
            this.additionalCssClass(),
        ),
    );
}
