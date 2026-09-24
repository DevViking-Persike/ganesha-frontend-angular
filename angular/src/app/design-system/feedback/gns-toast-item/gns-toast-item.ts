import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { ToastMessage } from '../../../services/toast.service';

/**
 * Single toast notification with severity icon, progress bar and dismiss.
 * Mirrors Blazor GnsToastItem.
 */
@Component({
  selector: 'gns-toast-item',
  templateUrl: './gns-toast-item.html',
  styleUrl: './gns-toast-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsToastItem {
  readonly toast = input.required<ToastMessage>();

  readonly onDismiss = output<string>();

  protected readonly cssClass = computed(() =>
    ['gns-toast-item', `gns-toast-item--${this.toast().severity}`].join(' '),
  );

  protected handleDismiss(): void {
    this.onDismiss.emit(this.toast().id);
  }
}
