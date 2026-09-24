import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsButton } from '../../../design-system/actions/index';
import { GnsAvatar, GnsBadge, GnsTable, GnsTableHeader, GnsTableRow, GnsTag } from '../../../design-system/data-display/index';
import { GnsInputText } from '../../../design-system/form/gns-input-text/gns-input-text';
import { GnsSelect } from '../../../design-system/form/gns-select/gns-select';
import { GnsSection } from '../../../design-system/layout/index';
import { GnsPagination } from '../../../design-system/navigation/index';
import { ALL_USERS } from './lab-table-page-samples';

@Component({
    selector: 'gns-lab-table-page',
    templateUrl: './gns-lab-table-page.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        GnsPageHeader,
        GnsButton,
        GnsAvatar,
        GnsBadge,
        GnsTable,
        GnsTableHeader,
        GnsTableRow,
        GnsTag,
        GnsInputText,
        GnsSelect,
        GnsSection,
        GnsPagination,
    ],
})
export class LabTablePage {
    protected readonly search = signal('');
    protected readonly statusFilter = signal('');
    protected readonly roleFilter = signal('');
    protected readonly currentPage = signal(1);

    protected readonly allUsers = ALL_USERS;

    protected readonly filteredUsers = computed(() =>
        this.allUsers
            .filter(u =>
                this.search() === '' ||
                u.name.toLowerCase().includes(this.search().toLowerCase()) ||
                u.email.toLowerCase().includes(this.search().toLowerCase()))
            .filter(u =>
                this.statusFilter() === '' ||
                u.status.toLowerCase() === this.statusFilter().toLowerCase())
            .filter(u =>
                this.roleFilter() === '' ||
                u.role.toLowerCase() === this.roleFilter().toLowerCase()),
    );
}
