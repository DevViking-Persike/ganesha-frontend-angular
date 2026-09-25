import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    TemplateRef,
    computed,
    contentChild,
    input,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

/**
 * Marks the header template: `<ng-template gnsTableHeader><th>…</th></ng-template>`.
 */
@Directive({ selector: 'ng-template[gnsTableHeader]' })
export class GnsTableHeader {
    constructor(readonly template: TemplateRef<unknown>) {}
}

/**
 * Marks the empty-state template: `<ng-template gnsTableEmpty>…</ng-template>`.
 */
@Directive({ selector: 'ng-template[gnsTableEmpty]' })
export class GnsTableEmpty {
    constructor(readonly template: TemplateRef<unknown>) {}
}

/**
 * Marks the row template. Each row receives the item as `$implicit` context:
 * `<ng-template gnsTableRow let-item><tr>…</tr></ng-template>`.
 */
@Directive({ selector: 'ng-template[gnsTableRow]' })
export class GnsTableRow<TItem> {
    static ngTemplateContextGuard<TItem>(
        _dir: GnsTableRow<TItem>,
        ctx: unknown,
    ): ctx is { $implicit: TItem } {
        return true;
    }

    constructor(readonly template: TemplateRef<{ $implicit: TItem }>) {}
}

@Component({
    selector: 'gns-table',
    templateUrl: './gns-table.html',
    styleUrls: ['./gns-table.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgTemplateOutlet],
})
export class GnsTable<TItem> {
    readonly items = input.required<readonly TItem[]>();
    readonly isStriped = input(false);
    readonly isHoverable = input(true);
    readonly isCompact = input(false);
    readonly isLoading = input(false);
    readonly additionalCssClass = input<string | null>(null);

    readonly header = contentChild(GnsTableHeader);
    readonly empty = contentChild(GnsTableEmpty);
    readonly row = contentChild(GnsTableRow<TItem>);

    readonly wrapperClass = computed(() =>
        cssClasses(
            'gns-table-wrapper',
            this.isLoading() && 'gns-table-wrapper--loading',
            this.additionalCssClass(),
        ),
    );

    readonly tableClass = computed(() =>
        cssClasses(
            'gns-table',
            this.isStriped() && 'gns-table--striped',
            this.isHoverable() && 'gns-table--hoverable',
            this.isCompact() && 'gns-table--compact',
        ),
    );

    readonly hasRows = computed(() => this.items().length > 0);
}
