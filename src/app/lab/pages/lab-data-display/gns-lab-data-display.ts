import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsButton } from '../../../design-system/actions/index';
import {
    GnsAvatar,
    GnsBadge,
    GnsSectionHeader,
    GnsSectionHeaderActions,
    GnsStatCard,
    GnsTable,
    GnsTableHeader,
    GnsTableRow,
    GnsTag,
} from '../../../design-system/data-display/index';
import { GnsGrid, GnsSection } from '../../../design-system/layout/index';
import { PRODUCTS } from './lab-data-display-samples';

@Component({
    selector: 'gns-lab-data-display',
    templateUrl: './gns-lab-data-display.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CurrencyPipe,
        GnsPageHeader,
        GnsButton,
        GnsAvatar,
        GnsBadge,
        GnsSectionHeader,
        GnsStatCard,
        GnsTable,
        GnsTableHeader,
        GnsTableRow,
        GnsTag,
        GnsGrid,
        GnsSection,
    ],
})
export class LabDataDisplay {
    protected readonly products = PRODUCTS;
}
