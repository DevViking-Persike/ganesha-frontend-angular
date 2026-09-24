import { ChangeDetectionStrategy, Component, TemplateRef, Type, booleanAttribute, computed, contentChild, inject, input, output } from '@angular/core';
import { NgComponentOutlet, NgTemplateOutlet } from '@angular/common';
import { ModalService } from '../../../services/modal.service';
import { cssClasses } from '../gns-drawer/gns-drawer';

/**
 * Migration of `GnsModal.razor`. Keeps the Blazor parameter contract
 * (`IsOpen` two-way, `Title`, `Size`, `Footer` projection) and additionally
 * acts as the host for `ModalService` content (`TemplateRef` or component
 * `Type`), rendered with NgTemplateOutlet / NgComponentOutlet.
 */
@Component({
  selector: 'gns-modal',
  imports: [NgTemplateOutlet, NgComponentOutlet],
  templateUrl: './gns-modal.html',
  styleUrl: './gns-modal.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GnsModal {
  private readonly modalService = inject(ModalService);

  readonly isOpen = input(false, { transform: booleanAttribute });
  readonly isOpenChange = output<boolean>();
  readonly title = input<string | null>(null);
  readonly size = input('md');
  readonly showCloseButton = input(true, { transform: booleanAttribute });
  readonly closeOnBackdropClick = input(true, { transform: booleanAttribute });
  readonly additionalCssClass = input<string | null>(null);

  /** `Footer` RenderFragment → project as `<ng-template footer>`. */
  protected readonly footerRef = contentChild<'footer', TemplateRef<unknown>>('footer', {
    read: TemplateRef,
  });

  /** Service-driven state takes part in visibility (single global modal). */
  protected readonly serviceOpen = this.modalService.isOpen;
  protected readonly serviceContent = this.modalService.content;
  protected readonly visible = computed(() => this.isOpen() || this.modalService.isOpen());
  protected readonly effectiveTitle = computed(() =>
    this.modalService.isOpen() ? this.modalService.options()?.title ?? null : this.title(),
  );
  protected readonly effectiveShowClose = computed(() => {
    if (this.modalService.isOpen()) return true;
    return this.showCloseButton();
  });
  protected readonly effectiveCloseOnBackdrop = computed(() => {
    if (this.modalService.isOpen()) {
      return this.modalService.options()?.closeOnBackdropClick ?? true;
    }
    return this.closeOnBackdropClick();
  });

  protected readonly titleId = `modal-title-${crypto.randomUUID().replace(/-/g, '')}`;

  protected readonly cssClass = computed(() =>
    cssClasses('gns-modal', `gns-modal--${this.size()}`, this.additionalCssClass()),
  );

  protected isTemplate(content: unknown): content is TemplateRef<unknown> {
    return content instanceof TemplateRef;
  }

  protected asTemplate(content: unknown): TemplateRef<unknown> | null {
    return this.isTemplate(content) ? content : null;
  }

  protected asComponent(content: unknown): Type<unknown> | null {
    return content && !this.isTemplate(content) ? (content as Type<unknown>) : null;
  }

  protected closeModal(): void {
    if (this.modalService.isOpen()) {
      this.modalService.close();
      return;
    }
    this.isOpenChange.emit(false);
  }

  protected handleBackdropClick(): void {
    if (this.effectiveCloseOnBackdrop()) {
      this.closeModal();
    }
  }
}
