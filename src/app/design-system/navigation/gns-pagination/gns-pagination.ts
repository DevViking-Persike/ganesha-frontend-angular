import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  numberAttribute,
  output,
} from '@angular/core';
import { cssClasses } from '../css-classes';

/** Página inexistente representada como ellipsis (valor -1 no Blazor). */
export const ELLIPSIS_PAGE = -1;

@Component({
  selector: 'gns-pagination',
  templateUrl: './gns-pagination.html',
  styleUrl: './gns-pagination.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsPagination {
  readonly currentPage = input(0, { transform: numberAttribute });
  readonly totalPages = input(0, { transform: numberAttribute });
  readonly currentPageChanged = output<number>();
  readonly maxVisiblePages = input(5, { transform: numberAttribute });
  readonly showFirstLast = input(true);
  readonly additionalCssClass = input<string | null>(null);

  readonly cssClass = computed(() =>
    cssClasses('gns-pagination', this.additionalCssClass()),
  );

  readonly visiblePages = computed<number[]>(() => this.buildVisiblePages());

  protected goToPage(page: number): void {
    if (page < 1 || page > this.totalPages() || page === this.currentPage()) {
      return;
    }
    this.currentPageChanged.emit(page);
  }

  protected isCurrentPage(page: number): boolean {
    return page === this.currentPage();
  }

  protected pageButtonClass(type: 'first' | 'prev' | 'next' | 'last'): string {
    return cssClasses('gns-pagination__btn', `gns-pagination__btn--${type}`);
  }

  protected numberButtonClass(page: number): string {
    return cssClasses(
      'gns-pagination__btn',
      'gns-pagination__btn--number',
      this.isCurrentPage(page) && 'gns-pagination__btn--active',
    );
  }

  private buildVisiblePages(): number[] {
    const totalPages = this.totalPages();
    const maxVisiblePages = Math.max(1, this.maxVisiblePages());
    const currentPage = this.currentPage();

    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: number[] = [];
    const half = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - half);
    const end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end === totalPages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push(ELLIPSIS_PAGE);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) pages.push(ELLIPSIS_PAGE);
      pages.push(totalPages);
    }

    return pages;
  }
}
