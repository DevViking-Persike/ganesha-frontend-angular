import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  booleanAttribute,
  computed,
  input,
  signal,
} from '@angular/core';
import { AlertSeverity } from '../types';

/**
 * Inline alert with severity icon, optional title and dismiss action.
 * Mirrors Blazor GnsAlert.
 */
@Component({
  selector: 'gns-alert',
  templateUrl: './gns-alert.html',
  styleUrl: './gns-alert.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsAlert {
  readonly severity = input<AlertSeverity>('info');
  readonly title = input<string | null>(null);
  readonly isDismissible = input(false, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  readonly onDismiss = new EventEmitter<void>();

  protected readonly isVisible = signal(true);

  protected readonly cssClass = computed(() =>
    [
      'gns-alert',
      `gns-alert--${this.severity()}`,
      this.additionalCssClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );

  protected handleDismiss(): void {
    this.isVisible.set(false);
    this.onDismiss.emit();
  }
}
