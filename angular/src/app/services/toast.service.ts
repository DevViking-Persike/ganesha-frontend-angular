import { Injectable, signal } from '@angular/core';

export type ToastSeverity = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  message: string;
  title?: string;
  severity: ToastSeverity;
  durationMs: number;
  createdAt: number;
}

const DEFAULT_DURATION_MS = 4000;

/**
 * Global toast state. Mirrors Blazor ToastService: add + auto-dismiss.
 */
@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<ToastMessage[]>([]);

  readonly toasts = this._toasts.asReadonly();

  showSuccess(message: string, title?: string, durationMs?: number): void {
    this.add(message, title, 'success', durationMs ?? DEFAULT_DURATION_MS);
  }

  showError(message: string, title?: string, durationMs?: number): void {
    this.add(message, title, 'error', durationMs ?? DEFAULT_DURATION_MS);
  }

  showWarning(message: string, title?: string, durationMs?: number): void {
    this.add(message, title, 'warning', durationMs ?? DEFAULT_DURATION_MS);
  }

  showInfo(message: string, title?: string, durationMs?: number): void {
    this.add(message, title, 'info', durationMs ?? DEFAULT_DURATION_MS);
  }

  dismissToast(id: string): void {
    this._toasts.update((list) => list.filter((t) => t.id !== id));
  }

  private add(message: string, title: string | undefined, severity: ToastSeverity, durationMs: number): void {
    const toast: ToastMessage = {
      id: crypto.randomUUID(),
      message,
      title,
      severity,
      durationMs,
      createdAt: Date.now(),
    };

    this._toasts.update((list) => [...list, toast]);

    if (durationMs > 0) {
      setTimeout(() => this.dismissToast(toast.id), durationMs);
    }
  }
}
