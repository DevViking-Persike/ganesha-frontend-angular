import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { GnsSwitch } from '../../design-system/actions/index';
import { GnsThemeProvider } from '../../design-system/infrastructure/index';
import { GnsToastContainer } from '../../design-system/feedback/index';
import { ThemeService } from '../../services/theme.service';

/**
 * Showcase layout for the Design Lab: topbar with theme toggle, sidebar
 * navigation and routed content. Mirrors Blazor LabLayout.
 */
@Component({
  selector: 'gns-lab-layout',
  templateUrl: './lab-layout.html',
  styleUrl: './lab-layout.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, GnsThemeProvider, GnsSwitch, GnsToastContainer],
})
export class LabLayout {
  protected readonly themeService = inject(ThemeService);

  protected readonly isDarkTheme = computed(() => this.themeService.currentTheme() === 'dark');

  protected handleThemeToggle(isDark: boolean): void {
    this.themeService.setTheme(isDark ? 'dark' : 'light');
  }
}
