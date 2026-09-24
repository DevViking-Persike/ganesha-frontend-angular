import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsButton, ButtonVariant } from '../../../design-system/actions/gns-button/gns-button';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';

const LOADER_A = '_content/Ganesha.DesignLab.Shared/assets/loaders/loader-ganesha-a.svg';
const LOADER_B = '_content/Ganesha.DesignLab.Shared/assets/loaders/loader-ganesha-b.svg';
const LOADER_C = '_content/Ganesha.DesignLab.Shared/assets/loaders/loader-ganesha-c.svg';

/**
 * Showcase de botões. Mirrors Blazor LabButtons (`/lab/buttons`).
 */
@Component({
  selector: 'gns-lab-buttons',
  templateUrl: './gns-lab-buttons.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [GnsPageHeader, GnsSection, GnsButton],
})
export class LabButtons {
  protected readonly loaderA = LOADER_A;
  protected readonly loaderB = LOADER_B;
  protected readonly loaderC = LOADER_C;
  protected readonly ratioA = '2816 / 1536';
  protected readonly ratioB = '1664 / 2514';

  /** Same order as the Blazor ButtonVariant enum values. */
  protected readonly variants: readonly ButtonVariant[] = [
    'primary',
    'secondary',
    'outline',
    'ghost',
    'danger',
  ];
}
