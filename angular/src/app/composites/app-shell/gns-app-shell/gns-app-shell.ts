import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { cssClasses } from '../../../design-system/navigation/index';

@Component({
  selector: 'gns-app-shell',
  templateUrl: './gns-app-shell.html',
  styleUrl: './gns-app-shell.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsAppShell {
  /** Equivalente a `IsSidebarCollapsed` + `IsSidebarCollapsedChanged` (@bind). */
  readonly isSidebarCollapsed = input(false);
  readonly isSidebarCollapsedChanged = output<boolean>();
  readonly additionalCssClass = input<string | null>(null);

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-app-shell',
      this.isSidebarCollapsed() && 'gns-app-shell--collapsed',
      this.additionalCssClass(),
    ),
  );

  protected handleOverlayClick(): void {
    this.isSidebarCollapsedChanged.emit(true);
  }
}
