import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsButton, GnsSwitch } from '../../../design-system/actions/index';
import { GnsAvatar, GnsBadge, GnsStatCard, GnsTag } from '../../../design-system/data-display/index';
import { GnsBreadcrumb, GnsBreadcrumbItem } from '../../../design-system/navigation/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { GnsCard } from '../../../design-system/surfaces/index';
import { GnsPanel } from '../../../design-system/surfaces/gns-panel/gns-panel';
import { ACTIVITIES } from './lab-profile-samples';

@Component({
    selector: 'gns-lab-profile',
    templateUrl: './gns-lab-profile.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        GnsPageHeader,
        GnsButton,
        GnsSwitch,
        GnsAvatar,
        GnsBadge,
        GnsStatCard,
        GnsTag,
        GnsBreadcrumb,
        GnsBreadcrumbItem,
        GnsGrid,
        GnsSection,
        GnsCard,
        GnsPanel,
    ],
})
export class LabProfile {
    protected readonly emailNotif = signal(true);
    protected readonly pushNotif = signal(true);
    protected readonly weeklyDigest = signal(false);
    protected readonly marketing = signal(false);
    protected readonly profileVisible = signal(true);
    protected readonly activityVisible = signal(true);

    protected readonly activities = ACTIVITIES;
}
