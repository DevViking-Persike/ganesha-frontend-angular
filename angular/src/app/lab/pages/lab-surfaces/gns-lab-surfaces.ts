import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsAvatar } from '../../../design-system/data-display/gns-avatar/gns-avatar';
import { GnsBadge } from '../../../design-system/data-display/gns-badge/gns-badge';
import { GnsGrid } from '../../../design-system/layout/gns-grid/gns-grid';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsCard, GnsCardHeader, GnsCardFooter } from '../../../design-system/surfaces/gns-card/gns-card';
import { GnsPanel, GnsPanelActions } from '../../../design-system/surfaces/gns-panel/gns-panel';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';

/**
 * Showcase de superfícies. Mirrors Blazor LabSurfaces (`/lab/surfaces`).
 */
@Component({
  selector: 'gns-lab-surfaces',
  templateUrl: './gns-lab-surfaces.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    GnsPageHeader,
    GnsSection,
    GnsGrid,
    GnsCard,
    GnsCardHeader,
    GnsCardFooter,
    GnsPanel,
    GnsPanelActions,
    GnsBadge,
    GnsAvatar,
    GnsButton,
  ],
})
export class LabSurfaces {}
