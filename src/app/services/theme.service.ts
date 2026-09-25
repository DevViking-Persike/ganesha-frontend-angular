import { Injectable, signal } from '@angular/core';

export type GnsTheme = 'light' | 'dark';

const THEMES: GnsTheme[] = ['light', 'dark'];

/**
 * Global theme state. Mirrors Blazor ThemeService: light/dark via [data-theme].
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly _currentTheme = signal<GnsTheme>('light');

  readonly currentTheme = this._currentTheme.asReadonly();
  readonly availableThemes: readonly GnsTheme[] = THEMES;

  setTheme(theme: string): void {
    if (!THEMES.includes(theme as GnsTheme) || this._currentTheme() === theme) {
      return;
    }
    this._currentTheme.set(theme as GnsTheme);
  }

  toggleTheme(): void {
    this.setTheme(this._currentTheme() === 'light' ? 'dark' : 'light');
  }
}
