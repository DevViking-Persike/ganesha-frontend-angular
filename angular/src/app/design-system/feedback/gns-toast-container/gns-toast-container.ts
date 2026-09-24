import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { ToastService } from '../../../services/toast.service';
import { GnsToastItem } from '../gns-toast-item/gns-toast-item';
import { ToastPosition } from '../types';

/**
 * Fixed-position toast host rendering the active toasts from ToastService.
 * Mirrors Blazor GnsToastContainer. Auto-dismiss timers live in ToastService.
 */
@Component({
  selector: 'gns-toast-container',
  templateUrl: './gns-toast-container.html',
  styleUrl: './gns-toast-container.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GnsToastItem],
})
export class GnsToastContainer {
  readonly position = input<ToastPosition>('top-right');

  protected readonly toastService = inject(ToastService);

  protected readonly containerClass = computed(() =>
    ['gns-toast-container', `gns-toast-container--${this.position()}`].join(' '),
  );

  protected handleDismiss(toastId: string): void {
    this.toastService.dismissToast(toastId);
  }
}
