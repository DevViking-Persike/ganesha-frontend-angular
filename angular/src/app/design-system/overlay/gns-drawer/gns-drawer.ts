import { ChangeDetectionStrategy, Component, TemplateRef, Type, booleanAttribute, computed, inject, input, output } from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { DrawerService } from '../../../services/drawer.service';
import { DrawerPosition } from '../models';

/**
 * Migration of `GnsDrawer.razor`. Keeps the Blazor parameter contract
 * (`IsOpen` two-way, `Title`, `Position`, ...) and additionally acts as the
 * host for `DrawerService` content (`TemplateRef` or component `Type`),
 * rendered with NgTemplateOutlet / NgComponentOutlet.
 */
@Component({
  selector: 'gns-drawer',
  imports: [NgTemplateOutlet, NgComponentOutlet],
  templateUrl: './gns-drawer.html',
  styleUrl: './gns-drawer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsDrawer {
  private readonly drawerService = inject(DrawerService);

  readonly isOpen = input(false, { transform: booleanAttribute });
  readonly isOpenChange = output<boolean>();
  readonly title = input<string | null>(null);
  readonly position = input<DrawerPosition>('right');
  readonly width = input('400px');
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  readonly closeOnBackdropClick = input(true, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  /** Service-driven state takes part in visibility (single global drawer). */
  protected readonly serviceOpen = this.drawerService.isOpen;
  protected readonly visible = computed(() => this.isOpen() || this.drawerService.isOpen());
  protected readonly effectiveTitle = computed(() =>
    this.drawerService.isOpen() ? this.drawerService.title() : this.title(),
  );
  protected readonly effectiveShowClose = computed(() => {
    if (this.drawerService.isOpen()) return true;
    return this.showCloseButton();
  });
  protected readonly effectiveCloseOnBackdrop = computed(() => {
    if (this.drawerService.isOpen()) return true;
    return this.closeOnBackdropClick();
  });
  protected readonly serviceContent = this.drawerService.content;

  protected readonly titleId = `drawer-title-${crypto.randomUUID().replace(/-/g, '')}`;

  protected readonly cssClass = computed(() =>
    cssClasses(
      'gns-drawer',
      this.effectivePosition() === 'left' && 'gns-drawer--left',
      this.effectivePosition() === 'right' && 'gns-drawer--right',
      this.additionalCssClass(),
    ),
  );

  protected readonly widthStyle = computed(() => `width: ${this.width()}; max-width: 100vw;`);

  private effectivePosition(): DrawerPosition {
    return this.drawerService.isOpen() ? this.drawerService.position() : this.position();
  }

  protected isTemplate(content: unknown): content is TemplateRef<unknown> {
    return content instanceof TemplateRef;
  }

  protected asTemplate(content: unknown): TemplateRef<unknown> | null {
    return this.isTemplate(content) ? content : null;
  }

  protected asComponent(content: unknown): Type<unknown> | null {
    return content && !this.isTemplate(content) ? (content as Type<unknown>) : null;
  }

  protected closeDrawer(): void {
    if (this.drawerService.isOpen()) {
      this.drawerService.close();
      return;
    }
    this.isOpenChange.emit(false);
  }

  protected handleBackdropClick(): void {
    if (this.effectiveCloseOnBackdrop()) {
      this.closeDrawer();
    }
  }
}

/** Local port of `Extensions/CssClassBuilder.cs`. */
export function cssClasses(...parts: Array<string | false | null | undefined>): string {
  return parts.filter((part): part is string => typeof part === 'string' && part.length > 0).join(' ');
}
