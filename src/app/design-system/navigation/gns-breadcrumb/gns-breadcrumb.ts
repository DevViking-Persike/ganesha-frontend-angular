import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChildren,
  effect,
  input,
} from '@angular/core';
import { cssClasses } from '../css-classes';
import { GnsBreadcrumbItem } from '../gns-breadcrumb-item/gns-breadcrumb-item';

@Component({
  selector: 'gns-breadcrumb',
  templateUrl: './gns-breadcrumb.html',
  styleUrl: './gns-breadcrumb.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsBreadcrumb {
  /** Equivalente ao `CascadingValue Name="BreadcrumbSeparator"` do Blazor. */
  readonly separator = input('/');
  readonly additionalCssClass = input<string | null>(null);

  private readonly items = contentChildren(GnsBreadcrumbItem);

  readonly cssClass = computed(() =>
    cssClasses('gns-breadcrumb', this.additionalCssClass()),
  );

  constructor() {
    effect(() => {
      const separator = this.separator();
      for (const item of this.items()) {
        item.setSeparator(separator);
      }
    });
  }
}
