import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsSwitch } from '../../../design-system/actions/gns-switch/gns-switch';
import { GnsBreadcrumb } from '../../../design-system/navigation/gns-breadcrumb/gns-breadcrumb';
import { GnsBreadcrumbItem } from '../../../design-system/navigation/gns-breadcrumb-item/gns-breadcrumb-item';
import { GnsCheckbox } from '../../../design-system/form/gns-checkbox/gns-checkbox';
import { GnsInputPassword } from '../../../design-system/form/gns-input-password/gns-input-password';
import { GnsInputText } from '../../../design-system/form/gns-input-text/gns-input-text';
import { GnsSelect } from '../../../design-system/form/gns-select/gns-select';
import { GnsTextarea } from '../../../design-system/form/gns-textarea/gns-textarea';
import { GnsGrid } from '../../../design-system/layout/gns-grid/gns-grid';
import { GnsCard } from '../../../design-system/surfaces/gns-card/gns-card';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';

/**
 * Migration of Blazor `LabFormPage` (`/lab/form-page`): registration and
 * edit form with multiple field types and validation states.
 */
@Component({
  selector: 'gns-lab-form-page',
  templateUrl: './gns-lab-form-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GnsPageHeader,
    GnsBreadcrumb,
    GnsBreadcrumbItem,
    GnsCard,
    GnsGrid,
    GnsButton,
    GnsSwitch,
    GnsInputText,
    GnsInputPassword,
    GnsSelect,
    GnsTextarea,
    GnsCheckbox,
  ],
})
export class LabFormPage {
  protected readonly firstName = signal('');
  protected readonly lastName = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly role = signal('');
  protected readonly bio = signal('');
  protected readonly emailNotif = signal(true);
  protected readonly weeklyDigest = signal(false);
  protected readonly termsAccepted = signal(false);
}
