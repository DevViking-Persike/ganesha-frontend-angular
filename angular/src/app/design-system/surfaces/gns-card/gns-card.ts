import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    computed,
    contentChild,
    input,
} from '@angular/core';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

/** Marks projected content as the header slot of `gns-card`. */
@Directive({
    selector: '[header]',
})
export class GnsCardHeader {}

/** Marks projected content as the footer slot of `gns-card`. */
@Directive({
    selector: '[footer]',
})
export class GnsCardFooter {}

@Component({
    selector: 'gns-card',
    templateUrl: './gns-card.html',
    styleUrls: ['./gns-card.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsCardHeader, GnsCardFooter],
})
export class GnsCard {
    readonly isHoverable = input(false);
    readonly isCompact = input(false);
    readonly additionalCssClass = input<string | null>(null);

    readonly headerContent = contentChild(GnsCardHeader);
    readonly footerContent = contentChild(GnsCardFooter);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-card',
            this.isHoverable() && 'gns-card--hoverable',
            this.isCompact() && 'gns-card--compact',
            this.additionalCssClass(),
        ),
    );
}
