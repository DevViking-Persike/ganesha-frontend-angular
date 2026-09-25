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

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-action-list-item',
  templateUrl: './gns-action-list-item.html',
  styleUrls: ['./gns-action-list-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsActionListItem {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly icon = input<string | null>(null);
  readonly isSelected = input(false, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  readonly onClick = output<void>();

  private readonly actionsRef =
    viewChild<ElementRef<HTMLElement>>('actionsSlot');
  private readonly metaRef = viewChild<ElementRef<HTMLElement>>('metaSlot');

  protected readonly hasActions = signal(false);
  protected readonly hasMeta = signal(false);

  /** Blazor decides "clickable" quando OnClick é atribuído; no Angular o
   * consumidor declara `clickable` ao usar `(onClick)`. */
  readonly clickable = input(false, { transform: booleanAttribute });

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-action-list-item',
      this.isSelected() && 'gns-action-list-item--selected',
      this.clickable() && 'gns-action-list-item--clickable',
      !!this.icon()?.trim() && 'gns-action-list-item--has-icon',
      this.hasActions() && 'gns-action-list-item--has-actions',
      this.additionalCssClass(),
    ),
  );

  ngAfterViewChecked(): void {
    this.syncHasContent();
  }

  protected handleClick(): void {
    if (this.clickable()) {
      this.onClick.emit();
    }
  }

  protected handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleClick();
    }
  }

  private syncHasContent(): void {
    const actionsEl = this.actionsRef()?.nativeElement;
    this.hasActions.set(!!actionsEl && actionsEl.childNodes.length > 0);

    const metaEl = this.metaRef()?.nativeElement;
    this.hasMeta.set(!!metaEl && metaEl.childNodes.length > 0);
  }
}
