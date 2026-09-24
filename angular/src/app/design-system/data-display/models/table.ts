export type SortDirection = 'none' | 'ascending' | 'descending';

export interface TableColumn<TItem> {
    header: string;
    valueSelector: (item: TItem) => unknown;
    sortable?: boolean;
    width?: string | null;
    cssClass?: string | null;
}

export class TableState {
    constructor(
        readonly currentPage: number,
        readonly pageSize: number,
        readonly totalItems: number,
        readonly sortColumn: string | null = null,
        readonly sortDescending = false,
    ) {}

    get totalPages(): number {
        return this.pageSize > 0 ? Math.ceil(this.totalItems / this.pageSize) : 0;
    }

    get hasPreviousPage(): boolean {
        return this.currentPage > 1;
    }

    get hasNextPage(): boolean {
        return this.currentPage < this.totalPages;
    }
}
