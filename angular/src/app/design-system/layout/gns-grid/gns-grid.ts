import { ChangeDetectionStrategy, Component, computed, input, numberAttribute } from '@angular/core';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-grid',
    templateUrl: './gns-grid.html',
    styleUrls: ['./gns-grid.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsGrid {
    readonly columns = input(12, { transform: numberAttribute });
    readonly gap = input('4');
    readonly templateColumns = input<string | null>(null);
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses('gns-grid', this.additionalCssClass()),
    );

    readonly style = computed(() => {
        const templateColumns = this.templateColumns();
        const gridTemplate =
            templateColumns && templateColumns.length > 0
                ? templateColumns
                : `repeat(${this.columns()}, minmax(0, 1fr))`;

        return `grid-template-columns: ${gridTemplate}; gap: var(--gns-space-${this.gap()});`;
    });
}
