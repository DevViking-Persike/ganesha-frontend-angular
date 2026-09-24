import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsCard, GnsCardHeader, GnsCardFooter } from '../../../design-system/surfaces/gns-card/gns-card';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsGrid } from '../../../design-system/layout/gns-grid/gns-grid';

interface NavItem {
    readonly title: string;
    readonly description: string;
    readonly href: string;
}

const COMPONENT_ITEMS: readonly NavItem[] = [
    { title: 'Buttons', description: 'Primary, secondary, ghost, danger, and outline variants.', href: '/lab/buttons' },
    { title: 'Forms', description: 'Inputs, selects, checkboxes, radios, textareas, and switches.', href: '/lab/forms' },
    { title: 'Data Display', description: 'Badges, tags, avatars, stat cards, tables, and more.', href: '/lab/data-display' },
    { title: 'Feedback', description: 'Alerts, toasts, loaders, and empty states.', href: '/lab/feedback' },
    { title: 'Navigation', description: 'Tabs, breadcrumbs, pagination, and nav items.', href: '/lab/navigation' },
    { title: 'Surfaces & Overlays', description: 'Cards, panels, modals, and drawers.', href: '/lab/surfaces' },
];

const PATTERN_ITEMS: readonly NavItem[] = [
    { title: 'Dashboard', description: 'Metrics, charts, tables, and notifications.', href: '/lab/dashboard' },
    { title: 'Table Page', description: 'Data table with search, filters, and pagination.', href: '/lab/table-page' },
    { title: 'Form Page', description: 'Registration and edit forms with validation.', href: '/lab/form-page' },
    { title: 'Profile Page', description: 'User profile with stats and activity feed.', href: '/lab/profile' },
    { title: 'Auth Page', description: 'Clean, modern login experience.', href: '/lab/auth' },
];

@Component({
    selector: 'gns-lab-home',
    templateUrl: './gns-lab-home.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsButton, GnsCard, GnsCardHeader, GnsCardFooter, GnsSection, GnsGrid],
})
export class LabHome {
    protected readonly componentItems = COMPONENT_ITEMS;
    protected readonly patternItems = PATTERN_ITEMS;
}
