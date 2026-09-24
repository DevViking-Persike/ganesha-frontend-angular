import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  input,
  model,
  signal,
  viewChild,
} from '@angular/core';
import { GnsInputText } from '../../../design-system/form/gns-input-text/gns-input-text';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-search-filter',
  templateUrl: './gns-search-filter.html',
  styleUrls: ['./gns-search-filter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [GnsInputText],
})
export class GnsSearchFilter {
  readonly searchValue = model<string | null>(null);
  readonly searchPlaceholder = input<string | null>('Search...');
  readonly additionalCssClass = input<string | null>(null);

  private readonly filtersRef =
    viewChild<ElementRef<HTMLElement>>('filtersSlot');
  private readonly actionsRef =
    viewChild<ElementRef<HTMLElement>>('actionsSlot');

  protected readonly hasFilters = signal(false);
  protected readonly hasActions = signal(false);

  protected readonly resolvedPlaceholder = computed(
    () => this.searchPlaceholder() ?? 'Search...',
  );

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-search-filter',
      this.hasFilters() && 'gns-search-filter--has-filters',
      this.hasActions() && 'gns-search-filter--has-actions',
      this.additionalCssClass(),
    ),
  );

  ngAfterViewChecked(): void {
    this.syncHasContent();
  }

  protected handleSearchChanged(value: string): void {
    this.searchValue.set(value);
  }

  private syncHasContent(): void {
    const filtersEl = this.filtersRef()?.nativeElement;
    this.hasFilters.set(!!filtersEl && filtersEl.childNodes.length > 0);

    const actionsEl = this.actionsRef()?.nativeElement;
    this.hasActions.set(!!actionsEl && actionsEl.childNodes.length > 0);
  }
}
