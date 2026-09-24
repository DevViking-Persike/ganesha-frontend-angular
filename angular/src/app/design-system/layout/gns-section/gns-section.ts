import { ChangeDetectionStrategy, Component, computed, contentChild, input } from '@angular/core';
import { GnsSectionActions } from './gns-section-actions';


function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-section',
    templateUrl: './gns-section.html',
    styleUrls: ['./gns-section.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsSection {
    readonly title = input<string | null>(null);
    readonly subtitle = input<string | null>(null);
    readonly additionalCssClass = input<string | null>(null);

    readonly actionsContent = contentChild(GnsSectionActions);

    readonly hasHeader = computed(
        () => !!this.title() || !!this.subtitle() || !!this.actionsContent(),
    );

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-section',
            this.hasHeader() && 'gns-section--has-header',
            this.additionalCssClass(),
        ),
    );
}
