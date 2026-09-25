import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsPageHeader } from '../../../composites/page-header/gns-page-header/gns-page-header';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';

interface ShadowItem {
    readonly token: string;
    readonly description: string;
}

interface ComponentShadow {
    readonly token: string;
    readonly mapsTo: string;
    readonly usage: string;
}

const SHADOWS: readonly ShadowItem[] = [
    { token: 'none', description: 'No shadow' },
    { token: 'xs', description: 'Focused inputs, active states' },
    { token: 'sm', description: 'Cards, slight lift' },
    { token: 'md', description: 'Floating elements, popovers' },
    { token: 'lg', description: 'Modals, drawers' },
    { token: 'xl', description: 'Elevated panels' },
    { token: '2xl', description: 'Page-level overlays' },
    { token: 'inner', description: 'Recessed / inset elements' },
];

const COMPONENT_SHADOWS: readonly ComponentShadow[] = [
    { token: '--gns-shadow-card', mapsTo: 'shadow-sm', usage: 'Cards and panels' },
    { token: '--gns-shadow-card-hover', mapsTo: 'shadow-md', usage: 'Card hover elevation' },
    { token: '--gns-shadow-dropdown', mapsTo: 'shadow-lg', usage: 'Dropdown menus' },
    { token: '--gns-shadow-modal', mapsTo: 'shadow-2xl', usage: 'Modals and dialogs' },
    { token: '--gns-shadow-button', mapsTo: 'shadow-xs', usage: 'Button resting state' },
    { token: '--gns-shadow-input', mapsTo: 'shadow-inner', usage: 'Input fields inset' },
];

@Component({
    selector: 'gns-lab-shadows',
    templateUrl: './gns-lab-shadows.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsPageHeader, GnsSection],
})
export class LabShadows {
    protected readonly shadows = SHADOWS;
    protected readonly componentShadows = COMPONENT_SHADOWS;
}
