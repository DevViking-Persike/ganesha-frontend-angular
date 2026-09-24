/**
 * Modelos e helpers compartilhados dos componentes de chart.
 * Portado de ChartModels.cs + helpers comuns dos .razor.
 */

export interface ChartDataPoint {
    label: string;
    value: number;
    color?: string | null;
}

export interface ChartSeries {
    name: string;
    values: number[];
    color?: string | null;
}

export interface BubbleDataPoint {
    label: string;
    x: number;
    y: number;
    size: number;
    color?: string | null;
}

export interface ProcessStep {
    title: string;
    value: string;
    description?: string | null;
    color?: string | null;
}

/** ChartSize do Blazor: Small | Medium | Large. */
export type ChartSize = 'small' | 'medium' | 'large';

/** ProgressBarVariant do Blazor: Default | Success | Warning | Danger | Info. */
export type ProgressBarVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

/** ProgressBarSize do Blazor: Small | Medium | Large. */
export type ProgressBarSize = 'small' | 'medium' | 'large';

export function cssClasses(...parts: Array<string | false | null | undefined>): string {
    return parts.filter(Boolean).join(' ');
}

export const CHART_PALETTE_8 = [
    'var(--gns-primary-500,#3F51B5)',
    'var(--gns-success-500,#4CAF50)',
    'var(--gns-warning-500,#FFC107)',
    'var(--gns-danger-500,#F44336)',
    'var(--gns-info-500,#00BCD4)',
    'var(--gns-violet-500,#9C27B0)',
    'var(--gns-rosa-300,#F06292)',
    'var(--gns-ouro-500,#D4AF37)',
] as const;

export const CHART_PALETTE_6 = [
    'var(--gns-primary-500,#3F51B5)',
    'var(--gns-info-500,#00BCD4)',
    'var(--gns-success-500,#4CAF50)',
    'var(--gns-warning-500,#FFC107)',
    'var(--gns-danger-500,#F44336)',
    'var(--gns-violet-500,#9C27B0)',
] as const;

export function paletteColor(palette: readonly string[], index: number): string {
    return palette[index % palette.length];
}

/** Equivalente de `value.ToString("G#", InvariantCulture)`. */
export function formatG(value: number, significantDigits: number): string {
    if (!Number.isFinite(value)) return '0';
    const abs = Math.abs(value);
    if (abs !== 0 && (abs >= 1e21 || abs < 1e-4)) {
        return value.toExponential(significantDigits - 1);
    }
    let text = value.toPrecision(significantDigits);
    if (text.includes('.')) {
        text = text.replace(/0+$/, '').replace(/\.$/, '');
    }
    return text;
}

/** Formato compacto de eixos: 1.2M / 3.4K / valor cru (G4). */
export function formatGridValue(value: number): string {
    if (value >= 1_000_000) return `${formatG(value / 1_000_000, 3)}M`;
    if (value >= 1_000) return `${formatG(value / 1_000, 3)}K`;
    return formatG(value, 4);
}

export function truncateLabel(label: string, maxLength: number): string {
    return label.length > maxLength ? label.slice(0, maxLength) + '…' : label;
}

/** ID curto único por instância para gradientes/filtros SVG. */
let nextChartId = 0;
export function uniqueChartId(prefix: string): string {
    nextChartId += 1;
    return `${prefix}-${nextChartId.toString(36)}${Math.random().toString(36).slice(2, 6)}`;
}

/** Fórmato numérico "F1" com ponto decimal (independente de locale). */
export function inv1(value: number): string {
    return value.toFixed(1);
}

/** Fórmato numérico "F2" com ponto decimal (independente de locale). */
export function inv2(value: number): string {
    return value.toFixed(2);
}
