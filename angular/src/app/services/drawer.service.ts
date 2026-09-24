import { Injectable, signal, TemplateRef, Type } from '@angular/core';

export type DrawerContent = TemplateRef<unknown> | Type<unknown>;
export type DrawerPosition = 'left' | 'right';

/**
 * Global drawer state. Mirrors Blazor DrawerService: one drawer at a time.
 */
@Injectable({ providedIn: 'root' })
export class DrawerService {
  private readonly _isOpen = signal(false);
  private readonly _content = signal<DrawerContent | null>(null);
  private readonly _position = signal<DrawerPosition>('right');
  private readonly _title = signal<string | null>(null);

  readonly isOpen = this._isOpen.asReadonly();
  readonly content = this._content.asReadonly();
  readonly position = this._position.asReadonly();
  readonly title = this._title.asReadonly();

  open(content: DrawerContent, position: DrawerPosition = 'right', title?: string): void {
    this._content.set(content);
    this._position.set(position);
    this._title.set(title ?? null);
    this._isOpen.set(true);
  }

  close(): void {
    this._isOpen.set(false);
    this._content.set(null);
    this._title.set(null);
  }
}
