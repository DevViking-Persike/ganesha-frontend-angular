import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';

export type TagVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'outline';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-tag',
    templateUrl: './gns-tag.html',
    styleUrls: ['./gns-tag.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsTag {
    readonly label = input.required<string>();
    readonly variant = input<TagVariant>('default');
    readonly isRemovable = input(false);
    readonly additionalCssClass = input<string | null>(null);

    readonly onRemove = output<void>();

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-tag',
            `gns-tag--${this.variant()}`,
            this.isRemovable() && 'gns-tag--removable',
            this.additionalCssClass(),
        ),
    );

    protected handleRemove(): void {
        this.onRemove.emit();
    }
}
