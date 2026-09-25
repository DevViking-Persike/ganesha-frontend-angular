import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  booleanAttribute,
  computed,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'danger'
  | 'outline';

/**
 * Aceita as duas convenções usadas no DS: nomes longos (small/medium/large,
 * espelho do enum Blazor) e curtos (sm/md/lg, como avatar/badge/modal).
 */
export type ButtonSize =
  | 'small' | 'medium' | 'large'
  | 'sm' | 'md' | 'lg';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-button',
  templateUrl: './gns-button.html',
  styleUrls: ['./gns-button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsButton {
  readonly label = input<string | null>(null);
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('medium');
  readonly isLoading = input(false, { transform: booleanAttribute });
  readonly isDisabled = input(false, { transform: booleanAttribute });
  readonly iconLeft = input<string | null>(null);
  readonly iconRight = input<string | null>(null);
  readonly type = input('button');
  readonly loadingAssetPath = input<string | null>(null);
  readonly loadingAspectRatio = input('1 / 1');
  readonly additionalCssClass = input<string | null>(null);

  readonly onClick = output<void>();

  private readonly projectedRef =
    viewChild<ElementRef<HTMLElement>>('projected');
  private readonly hasContent = signal(false);

  private readonly variantClass = computed(
    () => `gns-button--${this.variant()}` as const,
  );

  private readonly sizeClass = computed(() => {
    const map: Record<ButtonSize, string> = {
      small: 'sm',
      medium: 'md',
      large: 'lg',
      sm: 'sm',
      md: 'md',
      lg: 'lg',
    };
    return `gns-button--${map[this.size()] ?? 'md'}`;
  });

  protected readonly svgMaskStyle = computed(() => {
    const asset = this.loadingAssetPath();
    return [
      `-webkit-mask-image:url('${asset}')`,
      `mask-image:url('${asset}')`,
      '-webkit-mask-repeat:no-repeat',
      'mask-repeat:no-repeat',
      '-webkit-mask-position:center',
      'mask-position:center',
      '-webkit-mask-size:contain',
      'mask-size:contain',
    ].join(';');
  });

  protected readonly isIconOnly = computed(() => {
    const hasIcon =
      !!this.iconLeft()?.trim() || !!this.iconRight()?.trim();
    return !this.label()?.trim() && !this.hasContent() && hasIcon;
  });

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-button',
      this.variantClass(),
      this.sizeClass(),
      this.isLoading() && 'gns-button--loading',
      this.isDisabled() && 'gns-button--disabled',
      this.isIconOnly() && 'gns-button--icon-only',
      this.additionalCssClass(),
    ),
  );

  ngAfterViewChecked(): void {
    const el = this.projectedRef()?.nativeElement;
    this.hasContent.set(!!el && el.childNodes.length > 0);
  }

  protected handleClick(): void {
    if (!this.isDisabled() && !this.isLoading()) {
      this.onClick.emit();
    }
  }
}
