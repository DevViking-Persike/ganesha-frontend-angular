import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsSwitch } from '../../../design-system/actions/gns-switch/gns-switch';
import { GnsCheckbox } from '../../../design-system/form/gns-checkbox/gns-checkbox';
import { GnsInputPassword } from '../../../design-system/form/gns-input-password/gns-input-password';
import { GnsInputText } from '../../../design-system/form/gns-input-text/gns-input-text';
import { GnsRadioGroup } from '../../../design-system/form/gns-radio-group/gns-radio-group';
import { GnsRadioOption } from '../../../design-system/form/gns-radio-option/gns-radio-option';
import { GnsSelect } from '../../../design-system/form/gns-select/gns-select';
import { GnsTextarea } from '../../../design-system/form/gns-textarea/gns-textarea';
import { GnsGrid } from '../../../design-system/layout/gns-grid/gns-grid';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsCard } from '../../../design-system/surfaces/gns-card/gns-card';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';

/**
 * Showcase de controles de formulário. Mirrors Blazor LabForms (`/lab/forms`).
 */
@Component({
  selector: 'gns-lab-forms',
  templateUrl: './gns-lab-forms.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GnsPageHeader,
    GnsSection,
    GnsCard,
    GnsGrid,
    GnsButton,
    GnsSwitch,
    GnsInputText,
    GnsInputPassword,
    GnsSelect,
    GnsCheckbox,
    GnsRadioGroup,
    GnsRadioOption,
    GnsTextarea,
  ],
})
export class LabForms {
  protected readonly name = signal('');
  protected readonly email = signal('');
  protected readonly password = signal('');
  protected readonly country = signal('');
  protected readonly status = signal('');
  protected readonly sizeSm = signal('');
  protected readonly sizeMd = signal('');
  protected readonly sizeLg = signal('');
  protected readonly terms = signal(false);
  protected readonly newsletter = signal(true);
  protected readonly radioValue = signal('email');
  protected readonly bio = signal('');
  protected readonly notes = signal('');
  protected readonly switchNotif = signal(true);
  protected readonly switchDark = signal(false);
  protected readonly firstName = signal('');
  protected readonly lastName = signal('');
  protected readonly formEmail = signal('');
  protected readonly formPassword = signal('');
  protected readonly formRole = signal('');
  protected readonly formBio = signal('');
  protected readonly formTerms = signal(false);
}
