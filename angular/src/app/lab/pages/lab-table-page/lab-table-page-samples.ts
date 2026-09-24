import type { BadgeSeverity, TagVariant } from '../../../design-system/data-display/index';

export interface UserRecord {
    readonly name: string;
    readonly initials: string;
    readonly email: string;
    readonly role: string;
    readonly roleVariant: TagVariant;
    readonly status: string;
    readonly statusSeverity: BadgeSeverity;
    readonly joinDate: string;
}

export const ALL_USERS: readonly UserRecord[] = [
    { name: 'Alice Thompson', initials: 'AT', email: 'alice@example.com', role: 'Admin', roleVariant: 'primary', status: 'Active', statusSeverity: 'success', joinDate: 'Jan 2024' },
    { name: 'Bob Martinez', initials: 'BM', email: 'bob@example.com', role: 'Editor', roleVariant: 'info', status: 'Active', statusSeverity: 'success', joinDate: 'Feb 2024' },
    { name: 'Carol White', initials: 'CW', email: 'carol@example.com', role: 'Viewer', roleVariant: 'default', status: 'Inactive', statusSeverity: 'danger', joinDate: 'Mar 2024' },
    { name: 'David Lee', initials: 'DL', email: 'david@example.com', role: 'Admin', roleVariant: 'primary', status: 'Active', statusSeverity: 'success', joinDate: 'Apr 2024' },
    { name: 'Emma Johnson', initials: 'EJ', email: 'emma@example.com', role: 'Editor', roleVariant: 'info', status: 'Pending', statusSeverity: 'warning', joinDate: 'May 2024' },
    { name: 'Frank Garcia', initials: 'FG', email: 'frank@example.com', role: 'Viewer', roleVariant: 'default', status: 'Active', statusSeverity: 'success', joinDate: 'Jun 2024' },
    { name: 'Grace Kim', initials: 'GK', email: 'grace@example.com', role: 'Editor', roleVariant: 'info', status: 'Active', statusSeverity: 'success', joinDate: 'Jul 2024' },
    { name: 'Henry Chen', initials: 'HC', email: 'henry@example.com', role: 'Admin', roleVariant: 'primary', status: 'Inactive', statusSeverity: 'danger', joinDate: 'Aug 2024' },
    { name: 'Ivy Wilson', initials: 'IW', email: 'ivy@example.com', role: 'Viewer', roleVariant: 'default', status: 'Active', statusSeverity: 'success', joinDate: 'Sep 2024' },
    { name: 'Jack Brown', initials: 'JB', email: 'jack@example.com', role: 'Editor', roleVariant: 'info', status: 'Pending', statusSeverity: 'warning', joinDate: 'Oct 2024' },
    { name: 'Karen Davis', initials: 'KD', email: 'karen@example.com', role: 'Viewer', roleVariant: 'default', status: 'Active', statusSeverity: 'success', joinDate: 'Nov 2024' },
    { name: 'Leo Taylor', initials: 'LT', email: 'leo@example.com', role: 'Admin', roleVariant: 'primary', status: 'Active', statusSeverity: 'success', joinDate: 'Dec 2024' },
];
