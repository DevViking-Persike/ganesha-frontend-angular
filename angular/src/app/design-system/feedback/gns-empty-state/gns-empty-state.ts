import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

/**
 * Empty-state placeholder with icon, title, description and optional actions.
 * Mirrors Blazor GnsEmptyState. Actions are projected via `<ng-content select="[actions]">`.
 */
@Component({
  selector: 'gns-empty-state',
  templateUrl: './gns-empty-state.html',
  styleUrl: './gns-empty-state.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsEmptyState {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly icon = input<string | null>(null);
  readonly additionalCssClass = input<string | null>(null);

  protected readonly cssClass = computed(() =>
    ['gns-empty-state', this.additionalCssClass()].filter(Boolean).join(' '),
  );
}
