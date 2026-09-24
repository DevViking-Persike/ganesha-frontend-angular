import { ChangeDetectionStrategy, Component, Directive, computed, contentChild, input } from '@angular/core';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

/** Marks the projected actions block of a GnsSectionHeader. */
@Directive({ selector: '[gnsSectionHeaderActions]' })
export class GnsSectionHeaderActions {}

@Component({
    selector: 'gns-section-header',
    templateUrl: './gns-section-header.html',
    styleUrls: ['./gns-section-header.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsSectionHeader {
    readonly title = input.required<string>();
    readonly subtitle = input<string | null>(null);
    readonly additionalCssClass = input<string | null>(null);

    private readonly actions = contentChild(GnsSectionHeaderActions);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-section-header',
            this.actions() && 'gns-section-header--with-actions',
            this.additionalCssClass(),
        ),
    );
}
