/**
 * Modelos de feedback migrados de `Models/Feedback` (Blazor).
 * Enums C# → union types TS com os mesmos valores usados nas classes CSS.
 */

/** Equivalent to C# `DrawerPosition` (`Left`, `Right`). */
export type DrawerPosition = 'left' | 'right';

/** Equivalent to C# record `DrawerState(bool IsOpen, DrawerPosition Position, string? Title)`. */
export interface DrawerState {
  isOpen: boolean;
  position: DrawerPosition;
  title?: string | null;
}

/** Equivalent to C# record `ModalOptions(string? Title, bool ShowCloseButton, bool CloseOnBackdropClick, string Size = "md")`. */
export interface ModalOptions {
  title?: string | null;
  showCloseButton?: boolean;
  closeOnBackdropClick?: boolean;
  size?: string;
}

export const DEFAULT_MODAL_OPTIONS: Required<Pick<ModalOptions, 'showCloseButton' | 'closeOnBackdropClick' | 'size'>> = {
  showCloseButton: true,
  closeOnBackdropClick: true,
  size: 'md',
};
