/** Shared inline-style helpers for the Lab Grid page (ported from BoxStyle in LabGrid.razor). */
export function boxStyle(color: string, height = '4rem', extra = ''): string {
    return `background: ${color}; border-radius: var(--gns-radius-md); height: ${height}; display: flex; align-items: center; justify-content: center; color: white; font-weight: var(--gns-font-weight-semibold); font-size: var(--gns-text-sm);${extra ? ' ' + extra : ''}`;
}
