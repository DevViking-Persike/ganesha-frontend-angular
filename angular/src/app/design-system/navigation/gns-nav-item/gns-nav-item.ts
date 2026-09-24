import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { Router } from '@angular/router';
import { cssClasses } from '../css-classes';

@Component({
  selector: 'gns-nav-item',
  imports: [NgTemplateOutlet],
  templateUrl: './gns-nav-item.html',
  styleUrl: './gns-nav-item.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsNavItem {
  readonly label = input('');
  readonly href = input<string | null>(null);
  readonly icon = input<string | null>(null);
  readonly isActive = input(false);
  readonly isExpanded = input(false);
  readonly badge = input<string | null>(null);
  readonly additionalCssClass = input<string | null>(null);

  readonly onClick = output<void>();

  private readonly router = inject(Router);

  /**
   * Equivalente ao `HasChildren` do Blazor (`ChildContent is not null`):
   * filhos projetados são `GnsNavItem` aninhados (padrão `NavigationItemModel.Children`).
   */
  private readonly childItems = contentChildren(GnsNavItem);

  private readonly _expanded = signal(false);

  readonly expanded = this._expanded.asReadonly();

  readonly hasChildren = computed(() => this.childItems().length > 0);

  readonly cssClass = computed(() =>
    cssClasses(
      'gns-nav-item',
      this.isActive() && 'gns-nav-item--active',
      this.hasChildren() && this.expanded() && 'gns-nav-item--expanded',
      this.hasChildren() && 'gns-nav-item--has-children',
      this.additionalCssClass(),
    ),
  );

  readonly iconClass = computed(() =>
    cssClasses('gns-nav-item__icon', this.icon()),
  );

  constructor() {
    effect(() => {
      this._expanded.set(this.isExpanded());
    });
  }

  protected handleClick(): void {
    if (this.hasChildren()) {
      this._expanded.update((value) => !value);
    } else if (this.href()) {
      // Paridade com o NavigationManager do Blazor: navega quando é item folha.
      void this.router.navigateByUrl(this.href()!);
    }

    this.onClick.emit();
  }
}
