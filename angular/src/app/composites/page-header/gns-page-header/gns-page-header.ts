import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  input,
  signal,
  viewChild,
} from '@angular/core';

function cssClasses(
  ...parts: Array<string | false | null | undefined>
): string {
  return parts.filter(Boolean).join(' ');
}

@Component({
  selector: 'gns-page-header',
  templateUrl: './gns-page-header.html',
  styleUrls: ['./gns-page-header.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsPageHeader {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly eyebrow = input<string | null>(null);
  readonly additionalCssClass = input<string | null>(null);

  private readonly breadcrumbRef =
    viewChild<ElementRef<HTMLElement>>('breadcrumbSlot');
  private readonly actionsRef =
    viewChild<ElementRef<HTMLElement>>('actionsSlot');

  protected readonly hasBreadcrumb = signal(false);
  protected readonly hasActions = signal(false);

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-page-header',
      this.hasBreadcrumb() && 'gns-page-header--has-breadcrumb',
      !!this.eyebrow()?.trim() && 'gns-page-header--has-eyebrow',
      !!this.description()?.trim() && 'gns-page-header--has-description',
      this.additionalCssClass(),
    ),
  );

  ngAfterViewChecked(): void {
    this.syncHasContent();
  }

  private syncHasContent(): void {
    const breadcrumbEl = this.breadcrumbRef()?.nativeElement;
    this.hasBreadcrumb.set(!!breadcrumbEl && breadcrumbEl.childNodes.length > 0);

    const actionsEl = this.actionsRef()?.nativeElement;
    this.hasActions.set(!!actionsEl && actionsEl.childNodes.length > 0);
  }
}
