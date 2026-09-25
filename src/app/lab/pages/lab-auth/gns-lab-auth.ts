import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsCheckbox } from '../../../design-system/form/gns-checkbox/gns-checkbox';
import { GnsInputPassword } from '../../../design-system/form/gns-input-password/gns-input-password';
import { GnsInputText } from '../../../design-system/form/gns-input-text/gns-input-text';
import { GnsCard } from '../../../design-system/surfaces/gns-card/gns-card';

/**
 * Showcase de página de autenticação. Mirrors Blazor LabAuth (`/lab/auth`).
 */
@Component({
  selector: 'gns-lab-auth',
  templateUrl: './gns-lab-auth.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GnsCard, GnsInputText, GnsInputPassword, GnsCheckbox, GnsButton],
})
export class LabAuth {
  protected readonly authEmail = signal('');
  protected readonly authPassword = signal('');
  protected readonly rememberMe = signal(false);
}
