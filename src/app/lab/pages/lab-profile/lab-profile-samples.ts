import type { BadgeSeverity } from '../../../design-system/data-display/index';

export interface ActivityItem {
    readonly icon: string;
    readonly action: string;
    readonly target: string;
    readonly time: string;
    readonly badge: BadgeSeverity | null;
    readonly badgeLabel: string | null;
}

export const ACTIVITIES: readonly ActivityItem[] = [
    { icon: 'D', action: 'Published design', target: 'Component Library v2.0', time: '2 hours ago', badge: 'success', badgeLabel: 'Published' },
    { icon: 'C', action: 'Commented on', target: 'Navigation redesign proposal', time: '4 hours ago', badge: null, badgeLabel: null },
    { icon: 'R', action: 'Reviewed', target: 'Pull request #342 - Button updates', time: '6 hours ago', badge: 'info', badgeLabel: 'Approved' },
    { icon: 'U', action: 'Updated', target: 'Design tokens color scale', time: 'Yesterday at 3:15 PM', badge: null, badgeLabel: null },
    { icon: 'A', action: 'Assigned to', target: 'Accessibility audit Q1 2026', time: 'Yesterday at 11:00 AM', badge: 'warning', badgeLabel: 'In Progress' },
    { icon: 'C', action: 'Created', target: 'User profile wireframes', time: '2 days ago', badge: null, badgeLabel: null },
    { icon: 'M', action: 'Mentioned in', target: 'Sprint planning meeting notes', time: '3 days ago', badge: null, badgeLabel: null },
];
