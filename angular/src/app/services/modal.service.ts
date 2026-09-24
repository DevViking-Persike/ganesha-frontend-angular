import { Injectable, signal, TemplateRef, Type } from '@angular/core';

export type ModalContent = TemplateRef<unknown> | Type<unknown>;

export interface ModalOptions {
  title?: string;
  maxWidth?: string;
  closeOnBackdropClick?: boolean;
  closeOnEsc?: boolean;
}

/**
 * Global modal state. Mirrors Blazor ModalService: one modal at a time,
 * content as TemplateRef (Angular equivalent of RenderFragment).
 */
@Injectable({ providedIn: 'root' })
export class ModalService {
  private readonly _isOpen = signal(false);
  private readonly _content = signal<ModalContent | null>(null);
  private readonly _options = signal<ModalOptions | null>(null);

  readonly isOpen = this._isOpen.asReadonly();
  readonly content = this._content.asReadonly();
  readonly options = this._options.asReadonly();

  open(content: ModalContent, options?: ModalOptions): void {
    this._content.set(content);
    this._options.set(options ?? {});
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
    this._content.set(null);
    this._options.set(null);
  }
}
