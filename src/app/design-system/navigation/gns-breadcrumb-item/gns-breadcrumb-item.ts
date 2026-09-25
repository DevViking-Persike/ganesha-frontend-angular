import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
} from '@angular/core';

@Component({
  selector: 'gns-breadcrumb-item',
  templateUrl: './gns-breadcrumb-item.html',
  styleUrl: './gns-breadcrumb-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsBreadcrumbItem {
  readonly label = input('');
  readonly href = input<string | null>(null);
  readonly isActive = input(false);

  /** Recebido do `GnsBreadcrumb` pai (cascata do Blazor). */
  private readonly _separator = signal('/');

  readonly separator = this._separator.asReadonly();

  setSeparator(separator: string): void {
    this._separator.set(separator);
  }
}
