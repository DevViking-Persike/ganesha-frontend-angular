import type { BadgeSeverity } from '../../../design-system/data-display/index';

export interface OrderRecord {
    readonly id: string;
    readonly customer: string;
    readonly customerInitials: string;
    readonly product: string;
    readonly amount: number;
    readonly status: string;
    readonly statusSeverity: BadgeSeverity;
    readonly date: string;
}

export const ORDERS: readonly OrderRecord[] = [
    { id: 'ORD-7842', customer: 'Sarah Johnson', customerInitials: 'SJ', product: 'Pro Subscription', amount: 299.00, status: 'Completed', statusSeverity: 'success', date: 'Mar 28, 2026' },
    { id: 'ORD-7841', customer: 'Michael Chen', customerInitials: 'MC', product: 'Team License', amount: 899.00, status: 'Processing', statusSeverity: 'warning', date: 'Mar 28, 2026' },
    { id: 'ORD-7840', customer: 'Emily Davis', customerInitials: 'ED', product: 'Enterprise Plan', amount: 2499.00, status: 'Completed', statusSeverity: 'success', date: 'Mar 27, 2026' },
    { id: 'ORD-7839', customer: 'James Wilson', customerInitials: 'JW', product: 'Pro Subscription', amount: 299.00, status: 'Refunded', statusSeverity: 'danger', date: 'Mar 27, 2026' },
    { id: 'ORD-7838', customer: 'Lisa Park', customerInitials: 'LP', product: 'Starter Pack', amount: 49.00, status: 'Completed', statusSeverity: 'success', date: 'Mar 26, 2026' },
    { id: 'ORD-7837', customer: 'Robert Kim', customerInitials: 'RK', product: 'Team License', amount: 899.00, status: 'Processing', statusSeverity: 'warning', date: 'Mar 26, 2026' },
    { id: 'ORD-7836', customer: 'Anna Martinez', customerInitials: 'AM', product: 'Pro Subscription', amount: 299.00, status: 'Completed', statusSeverity: 'success', date: 'Mar 25, 2026' },
    { id: 'ORD-7835', customer: 'David Brown', customerInitials: 'DB', product: 'Enterprise Plan', amount: 2499.00, status: 'Pending', statusSeverity: 'info', date: 'Mar 25, 2026' },
];
