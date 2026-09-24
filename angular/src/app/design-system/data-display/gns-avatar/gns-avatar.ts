import { ChangeDetectionStrategy, Component, computed, input, signal } from '@angular/core';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

@Component({
    selector: 'gns-avatar',
    templateUrl: './gns-avatar.html',
    styleUrls: ['./gns-avatar.css'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsAvatar {
    readonly src = input<string | null>(null);
    readonly alt = input<string | null>(null);
    readonly initials = input<string | null>(null);
    readonly size = input<AvatarSize>('md');
    readonly additionalCssClass = input<string | null>(null);

    private readonly imgError = signal(false);

    readonly hasImage = computed(() => !!this.src() && !this.imgError());

    readonly truncatedInitials = computed(() => {
        const value = this.initials();
        if (!value) return '';
        return value.length > 2 ? value.slice(0, 2).toUpperCase() : value.toUpperCase();
    });

    readonly ariaLabel = computed(() => this.alt() ?? this.initials() ?? 'User avatar');

    readonly cssClass = computed(() =>
        cssClasses(
            'gns-avatar',
            this.size() === 'sm' && 'gns-avatar--sm',
            this.size() === 'md' && 'gns-avatar--md',
            this.size() === 'lg' && 'gns-avatar--lg',
            this.size() === 'xl' && 'gns-avatar--xl',
            this.hasImage() && 'gns-avatar--image',
            !this.hasImage() && !!this.initials() && 'gns-avatar--initials',
            this.additionalCssClass(),
        ),
    );

    protected handleImageError(): void {
        this.imgError.set(true);
    }
}
