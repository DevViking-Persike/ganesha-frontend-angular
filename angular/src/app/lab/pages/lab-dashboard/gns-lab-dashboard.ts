import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsButton } from '../../../design-system/actions/index';
import { GnsAvatar, GnsBadge, GnsStatCard, GnsTable, GnsTableHeader, GnsTableRow } from '../../../design-system/data-display/index';
import { GnsAlert } from '../../../design-system/feedback/index';
import { GnsSelect } from '../../../design-system/form/gns-select/gns-select';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { ORDERS } from './lab-dashboard-samples';

@Component({
    selector: 'gns-lab-dashboard',
    templateUrl: './gns-lab-dashboard.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CurrencyPipe, GnsPageHeader, GnsButton, GnsAvatar, GnsBadge, GnsStatCard, GnsTable, GnsTableHeader, GnsTableRow, GnsAlert, GnsSelect, GnsGrid, GnsSection],
})
export class LabDashboard {
    protected readonly dateRange = signal('30d');
    protected readonly orders = ORDERS;
}
