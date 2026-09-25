import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GnsButton } from '../../../design-system/actions/gns-button/gns-button';
import { GnsCard } from '../../../design-system/surfaces/gns-card/gns-card';
import { GnsContainer } from '../../../design-system/layout/gns-container/gns-container';
import type { ContainerSize } from '../../../design-system/layout/gns-container/gns-container';
import { GnsGrid } from '../../../design-system/layout/gns-grid/gns-grid';
import { GnsSection } from '../../../design-system/layout/gns-section/gns-section';
import { GnsStack } from '../../../design-system/layout/gns-stack/gns-stack';
import { boxStyle } from './lab-grid-style';

interface ContainerDemo {
    readonly label: string;
    readonly size: ContainerSize;
    readonly boxText: string;
    readonly color: string;
}

interface FeatureCard {
    readonly title: string;
    readonly description: string;
    readonly color: string;
    readonly icon: string;
}

interface FormField {
    readonly label: string;
    readonly placeholder: string;
}

interface NavItem {
    readonly label: string;
    readonly active: boolean;
}

interface SummaryCard {
    readonly caption: string;
    readonly value: string;
    readonly color: string;
}

const CONTAINER_DEMOS: readonly ContainerDemo[] = [
    { label: 'Size=Sm — max-width 640px', size: 'sm', boxText: 'Sm · 640px', color: 'var(--gns-primary-500)' },
    { label: 'Size=Md — max-width 768px', size: 'md', boxText: 'Md · 768px', color: 'var(--gns-primary-400)' },
    { label: 'Size=Lg — max-width 1024px', size: 'lg', boxText: 'Lg · 1024px', color: 'var(--gns-primary-300)' },
    { label: 'Size=Default — max-width 1280px', size: 'default', boxText: 'Default · 1280px', color: 'var(--gns-info-500)' },
    { label: 'Size=Xl — max-width 1440px', size: 'xl', boxText: 'Xl · 1440px', color: 'var(--gns-success-500)' },
    { label: 'Size=Full — max-width 100%', size: 'full', boxText: 'Full · 100%', color: 'var(--gns-warning-500)' },
];

const GAP_VALUES: readonly string[] = ['1', '2', '4', '6', '8'];

const FEATURE_CARDS: readonly FeatureCard[] = [
    { title: 'Components', description: 'Reusable UI building blocks with consistent APIs.', color: 'var(--gns-primary-500)', icon: '⬡' },
    { title: 'Tokens', description: 'Design tokens for color, spacing, and typography.', color: 'var(--gns-info-500)', icon: '◈' },
    { title: 'Patterns', description: 'Common layout and interaction patterns.', color: 'var(--gns-success-500)', icon: '⬟' },
    { title: 'Accessibility', description: 'WCAG 2.1 AA compliant from the ground up.', color: 'var(--gns-warning-500)', icon: '◎' },
    { title: 'Theming', description: 'Light, dark, and custom themes with CSS variables.', color: 'var(--gns-danger-500)', icon: '◑' },
    { title: 'Responsive', description: 'Mobile-first layouts that adapt to any screen size.', color: 'var(--gns-primary-400)', icon: '⬠' },
    { title: 'Motion', description: 'Subtle, purposeful animations that respect preferences.', color: 'var(--gns-primary-300)', icon: '◉' },
    { title: 'Icons', description: 'Consistent icon set aligned to the design language.', color: 'var(--gns-info-500)', icon: '⬡' },
];

const FORM_FIELDS: readonly FormField[] = [
    { label: 'Full name', placeholder: 'Jane Doe' },
    { label: 'Email address', placeholder: 'jane@example.com' },
    { label: 'Organisation', placeholder: 'Acme Corp' },
    { label: 'Role', placeholder: 'Lead Designer' },
    { label: 'Time zone', placeholder: 'UTC+00:00 London' },
];

const NAV_ITEMS: readonly NavItem[] = [
    { label: 'General', active: true },
    { label: 'Account', active: false },
    { label: 'Security', active: false },
    { label: 'Notifications', active: false },
    { label: 'Billing', active: false },
    { label: 'Integrations', active: false },
    { label: 'Advanced', active: false },
];

const SUMMARY_CARDS: readonly SummaryCard[] = [
    { caption: 'Total Users', value: '24,891', color: 'var(--gns-primary-500)' },
    { caption: 'Monthly Revenue', value: '$142,500', color: 'var(--gns-success-600)' },
    { caption: 'Pending Orders', value: '318', color: 'var(--gns-warning-600)' },
];

const GAP_BOXES: readonly { text: string; color: string }[] = [
    { text: 'A', color: 'var(--gns-primary-500)' },
    { text: 'B', color: 'var(--gns-primary-400)' },
    { text: 'C', color: 'var(--gns-primary-300)' },
    { text: 'D', color: 'var(--gns-info-500)' },
];

@Component({
    selector: 'gns-lab-grid-composition',
    templateUrl: './gns-lab-grid-composition.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [GnsButton, GnsCard, GnsContainer, GnsGrid, GnsSection, GnsStack],
})
export class LabGridComposition {
    protected readonly containerDemos = CONTAINER_DEMOS;
    protected readonly gapValues = GAP_VALUES;
    protected readonly gapBoxes = GAP_BOXES;
    protected readonly featureCards = FEATURE_CARDS;
    protected readonly formFields = FORM_FIELDS;
    protected readonly navItems = NAV_ITEMS;
    protected readonly summaryCards = SUMMARY_CARDS;

    protected boxStyle(color: string, height = '4rem', extra = ''): string {
        return boxStyle(color, height, extra);
    }

    protected navItemStyle(active: boolean): string {
        return active
            ? 'padding: var(--gns-space-2) var(--gns-space-3); border-radius: var(--gns-radius-md); font-size: var(--gns-text-sm); cursor: pointer; background: var(--gns-primary-50); color: var(--gns-primary-700); font-weight: var(--gns-font-weight-medium);'
            : 'padding: var(--gns-space-2) var(--gns-space-3); border-radius: var(--gns-radius-md); font-size: var(--gns-text-sm); cursor: pointer; color: var(--gns-color-text-secondary);';
    }
}
