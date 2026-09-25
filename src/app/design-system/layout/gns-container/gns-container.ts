import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

export type ContainerSize = 'default' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-container',
    templateUrl: './gns-container.html',
    styleUrls: ['./gns-container.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsContainer {
    readonly size = input<ContainerSize>('default');
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-container',
            `gns-container--${this.size()}`,
            this.additionalCssClass(),
        ),
    );
}
