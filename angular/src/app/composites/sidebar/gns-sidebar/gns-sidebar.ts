import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  input,
  TemplateRef,
} from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { cssClasses } from '../../../design-system/navigation/index';

@Component({
  selector: 'gns-sidebar',
  imports: [NgTemplateOutlet],
  templateUrl: './gns-sidebar.html',
  styleUrl: './gns-sidebar.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsSidebar {
  readonly brandName = input<string | null>(null);
  readonly brandLogoUrl = input<string | null>(null);
  readonly isCollapsed = input(false);
  readonly additionalCssClass = input<string | null>(null);

  /** `Header` RenderFragment opcional: `<ng-template #gnsSidebarHeader>`. */
  protected readonly headerTpl = contentChild(
    'gnsSidebarHeader',
    { read: TemplateRef },
  );

  /** `Footer` RenderFragment opcional: `<ng-template #gnsSidebarFooter>`. */
  protected readonly footerTpl = contentChild(
    'gnsSidebarFooter',
    { read: TemplateRef },
  );

  protected readonly hasHeader = computed(() => this.headerTpl() !== undefined);
  protected readonly hasFooter = computed(() => this.footerTpl() !== undefined);

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-sidebar',
      this.isCollapsed() && 'gns-sidebar--collapsed',
      this.additionalCssClass(),
    ),
  );

  protected readonly ariaLabel = computed(() =>
    this.isCollapsed() ? 'Navigation (collapsed)' : 'Navigation',
  );

  protected readonly logoAlt = computed(() => this.brandName() ?? 'Logo');
  protected readonly logoAriaHidden = computed(() =>
    this.brandName() === null || this.brandName() === '' ? null : 'true',
  );
}
