import {
    ChangeDetectionStrategy,
    Component,
    Directive,
    computed,
    contentChild,
    effect,
    input,
    output,
    signal,
} from '@angular/core';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

/** Marks projected content as the actions slot of `gns-panel`. */
@Directive({
    selector: '[actions]',
})
export class GnsPanelActions {}

@Component({
    selector: 'gns-panel',
    templateUrl: './gns-panel.html',
    styleUrls: ['./gns-panel.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsPanelActions],
})
export class GnsPanel {
    readonly title = input<string | null>(null);
    readonly isCollapsible = input(false);
    readonly isCollapsed = input(false);
    readonly additionalCssClass = input<string | null>(null);

    readonly isCollapsedChanged = output<boolean>();

    readonly actionsContent = contentChild(GnsPanelActions);

    private readonly _collapsed = signal(this.isCollapsed());

    constructor() {
        effect(() => {
            this._collapsed.set(this.isCollapsed());
        });
    }

    readonly hasHeader = computed(
        () => !!this.title() || !!this.actionsContent() || this.isCollapsible(),
    );

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-panel',
            this.isCollapsible() && 'gns-panel--collapsible',
            this.isCollapsible() && this._collapsed() && 'gns-panel--collapsed',
            this.additionalCssClass(),
        ),
    );

    readonly bodyClass = computed(() =>
        cssClasses(
            'gns-panel__body',
            this.isCollapsible() && this._collapsed() && 'gns-panel__body--hidden',
        ),
    );

    readonly ariaExpanded = computed(() => String(!this._collapsed()));

    readonly toggleAriaLabel = computed(() =>
        this._collapsed() ? 'Expand panel' : 'Collapse panel',
    );

    protected toggleCollapse(): void {
        this._collapsed.set(!this._collapsed());
        this.isCollapsedChanged.emit(this._collapsed());
    }
}
