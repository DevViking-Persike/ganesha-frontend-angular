import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type TrendDirection = 'up' | 'down' | 'neutral';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-stat-card',
    templateUrl: './gns-stat-card.html',
    styleUrls: ['./gns-stat-card.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsStatCard {
    readonly title = input.required<string>();
    readonly value = input.required<string>();
    readonly description = input<string | null>(null);
    readonly trend = input<string | null>(null);
    readonly trendDirection = input<TrendDirection>('neutral');
    readonly icon = input<string | null>(null);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses('gns-stat-card', this.additionalCssClass()),
    );

    readonly trendClass = computed(() =>
        cssClasses(
            'gns-stat-card__trend',
            `gns-stat-card__trend--${this.trendDirection()}`,
        ),
    );
}
