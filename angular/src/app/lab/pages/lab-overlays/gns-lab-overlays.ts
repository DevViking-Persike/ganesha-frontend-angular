import { ChangeDetectionStrategy, Component, inject, signal, viewChild } from '@angular/core';
import { TemplateRef } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsAlert } from '../../../design-system/feedback/gns-alert/gns-alert';
import { GnsCheckbox } from '../../../design-system/form/gns-checkbox/gns-checkbox';
import { GnsInputText } from '../../../design-system/form/gns-input-text/gns-input-text';
import { GnsSelect } from '../../../design-system/form/gns-select/gns-select';
import { GnsTextarea } from '../../../design-system/form/gns-textarea/gns-textarea';
import { GnsGrid } from '../../../design-system/layout/gns-grid/gns-grid';
import { GnsAvatar } from '../../../design-system/data-display/gns-avatar/gns-avatar';
import { GnsDrawer } from '../../../design-system/overlay/gns-drawer/gns-drawer';
import { GnsModal } from '../../../design-system/overlay/gns-modal/gns-modal';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { DrawerService } from '../../../services/drawer.service';

/**
 * Showcase de overlays. Mirrors Blazor LabOverlays (`/lab/overlays`).
 * Modais seguem o modo declarativo (isOpen local + footer via #footer,
 * igual ao IsOpen/IsOpenChanged/Footer do Blazor). Drawers usam o
 * DrawerService global com TemplateRef, exercitando o modo serviço.
 */
@Component({
  selector: 'gns-lab-overlays',
  templateUrl: './gns-lab-overlays.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GnsPageHeader,
    GnsSection,
    GnsButton,
    GnsModal,
    GnsDrawer,
    GnsAlert,
    GnsGrid,
    GnsInputText,
    GnsSelect,
    GnsTextarea,
    GnsCheckbox,
    GnsAvatar,
  ],
})
export class LabOverlays {
  protected readonly drawerService = inject(DrawerService);

  protected readonly showSmallModal = signal(false);
  protected readonly showMediumModal = signal(false);
  protected readonly showLargeModal = signal(false);

  protected readonly modalName = signal('');
  protected readonly modalEmail = signal('');
  protected readonly modalBio = signal('');
  protected readonly lgFirst = signal('');
  protected readonly lgLast = signal('');
  protected readonly lgEmail = signal('');
  protected readonly lgDept = signal('');
  protected readonly lgCover = signal('');
  protected readonly drawerSearch = signal('');
  protected readonly drawerStatus = signal('');
  protected readonly drawerCategory = signal('');
  protected readonly drawerInStock = signal(false);

  private readonly filtersDrawerTemplate =
    viewChild.required<TemplateRef<unknown>>('filtersDrawer');
  private readonly detailsDrawerTemplate =
    viewChild.required<TemplateRef<unknown>>('detailsDrawer');

  protected openFiltersDrawer(): void {
    this.drawerService.open(this.filtersDrawerTemplate(), 'left', 'Filters');
  }

  protected openDetailsDrawer(): void {
    this.drawerService.open(this.detailsDrawerTemplate(), 'right', 'Item Details');
  }

  protected closeDrawer(): void {
    this.drawerService.close();
  }
}
