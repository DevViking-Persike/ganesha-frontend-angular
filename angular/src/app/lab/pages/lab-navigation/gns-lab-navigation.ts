import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GnsBreadcrumb } from '../../../design-system/navigation/gns-breadcrumb/gns-breadcrumb';
import { GnsBreadcrumbItem } from '../../../design-system/navigation/gns-breadcrumb-item/gns-breadcrumb-item';
import { GnsNavItem } from '../../../design-system/navigation/gns-nav-item/gns-nav-item';
import { GnsPagination } from '../../../design-system/navigation/gns-pagination/gns-pagination';
import { GnsTab } from '../../../design-system/navigation/gns-tab/gns-tab';
import { GnsTabs } from '../../../design-system/navigation/gns-tabs/gns-tabs';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsCard } from '../../../design-system/surfaces/gns-card/gns-card';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';

/**
 * Showcase de navegação. Mirrors Blazor LabNavigation (`/lab/navigation`).
 */
@Component({
  selector: 'gns-lab-navigation',
  templateUrl: './gns-lab-navigation.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GnsPageHeader,
    GnsSection,
    GnsCard,
    GnsTabs,
    GnsTab,
    GnsBreadcrumb,
    GnsBreadcrumbItem,
    GnsPagination,
    GnsNavItem,
  ],
})
export class LabNavigation {
  protected readonly tabIndex = signal(0);
  protected readonly currentPage = signal(3);
}
