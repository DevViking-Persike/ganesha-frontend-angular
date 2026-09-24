// Categoria data-display — migração de Components/DesignSystem/DataDisplay.
//
// Decisão GnsTable: o Blazor expõe RenderFragments (RowTemplate<TItem>,
// HeaderTemplate, EmptyTemplate). O padrão Angular mais simples e funcional é
// ng-template filhos marcados por diretivas (`ng-template[gnsTableRow]`,
// `ng-template[gnsTableHeader]`, `ng-template[gnsTableEmpty]`) lidos via
// contentChild() e instanciados com NgTemplateOutlet — o row template recebe
// cada item via contexto `$implicit` com ngTemplateContextGuard tipado
// (equivalente direto de RenderFragment<TItem>).
// Os modelos TableColumn/TableState/SortDirection ficam em ./models/table.ts.

export { GnsAvatar } from './gns-avatar/gns-avatar';
export type { AvatarSize } from './gns-avatar/gns-avatar';
export { GnsBadge } from './gns-badge/gns-badge';
export type { BadgeSeverity, BadgeSize } from './gns-badge/gns-badge';
export { GnsSectionHeader, GnsSectionHeaderActions } from './gns-section-header/gns-section-header';
export { GnsStatCard } from './gns-stat-card/gns-stat-card';
export type { TrendDirection } from './gns-stat-card/gns-stat-card';
export { GnsTable, GnsTableRow, GnsTableHeader, GnsTableEmpty } from './gns-table/gns-table';
export { GnsTag } from './gns-tag/gns-tag';
export type { TagVariant } from './gns-tag/gns-tag';
export type { TableColumn, TableState } from './models/table';
export type { SortDirection } from './models/table';
