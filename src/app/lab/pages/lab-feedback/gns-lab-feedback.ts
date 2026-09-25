import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsAlert } from '../../../design-system/feedback/gns-alert/gns-alert';
import { GnsEmptyState } from '../../../design-system/feedback/gns-empty-state/gns-empty-state';
import { GnsLoader } from '../../../design-system/feedback/gns-loader/gns-loader';
import { GnsSvgLoader } from '../../../design-system/feedback/gns-svg-loader/gns-svg-loader';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsCard } from '../../../design-system/surfaces/gns-card/gns-card';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { ToastService } from '../../../services/toast.service';

const LOADER_A = 'assets/loaders/loader-ganesha-a.svg';
const LOADER_B = 'assets/loaders/loader-ganesha-b.svg';
const LOADER_C = 'assets/loaders/loader-ganesha-c.svg';

/**
 * Showcase de feedback. Mirrors Blazor LabFeedback (`/lab/feedback`).
 * Toasts usam o ToastService global (renderizado pelo GnsToastContainer do LabLayout).
 */
@Component({
  selector: 'gns-lab-feedback',
  templateUrl: './gns-lab-feedback.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GnsPageHeader,
    GnsSection,
    GnsCard,
    GnsButton,
    GnsAlert,
    GnsLoader,
    GnsSvgLoader,
    GnsEmptyState,
  ],
})
export class LabFeedback {
  protected readonly toastService = inject(ToastService);

  protected readonly loaderA = LOADER_A;
  protected readonly loaderB = LOADER_B;
  protected readonly loaderC = LOADER_C;
  protected readonly ratioA = '2816 / 1536';
  protected readonly ratioB = '1664 / 2514';

  protected showSuccessToast(): void {
    this.toastService.showSuccess('Operation completed successfully!', 'Success');
  }

  protected showErrorToast(): void {
    this.toastService.showError('Something went wrong. Please try again.', 'Error');
  }

  protected showWarningToast(): void {
    this.toastService.showWarning('Your session is about to expire.', 'Warning');
  }

  protected showInfoToast(): void {
    this.toastService.showInfo('A new version is available.', 'Update');
  }
}
