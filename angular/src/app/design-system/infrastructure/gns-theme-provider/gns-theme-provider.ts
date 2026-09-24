import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

/**
 * Applies the current theme as [data-theme] on a wrapper div.
 * Mirrors Blazor GnsThemeProvider.
 */
@Component({
  selector: 'gns-theme-provider',
  template: `<div [attr.data-theme]="theme.currentTheme()" class="gns-theme-provider"><ng-content /></div>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsThemeProvider {
  protected readonly theme = inject(ThemeService);
}
