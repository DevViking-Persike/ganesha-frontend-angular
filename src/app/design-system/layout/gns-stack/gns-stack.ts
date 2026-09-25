import {
    ChangeDetectionStrategy,
    Component,
    booleanAttribute,
    computed,
    input,
} from '@angular/core';

export type StackDirection = 'horizontal' | 'vertical';
export type ContentAlignment = 'start' | 'center' | 'end' | 'stretch' | 'space-between';

const ALIGN_CLASS: Record<ContentAlignment, string> = {
    'start': 'start',
    'center': 'center',
    'end': 'end',
    'stretch': 'stretch',
    'space-between': 'between',
};

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-stack',
    templateUrl: './gns-stack.html',
    styleUrls: ['./gns-stack.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsStack {
    readonly direction = input<StackDirection>('vertical');
    readonly gap = input('4');
    readonly align = input<ContentAlignment>('stretch');
    readonly wrap = input(false, { transform: booleanAttribute });
    readonly additionalCssClass = input<string | null>(null);

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-stack',
            `gns-stack--${this.direction()}`,
            this.wrap() && 'gns-stack--wrap',
            `gns-stack--align-${ALIGN_CLASS[this.align()]}`,
            this.additionalCssClass(),
        ),
    );

    readonly style = computed(() => `gap: var(--gns-space-${this.gap()});`);
}
