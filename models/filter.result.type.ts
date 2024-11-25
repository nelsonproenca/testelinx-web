type FilterResultType<T> = {
    totalCount: number;
    pageSize: number;
    pageNumber: number;
    pageCount: number;
    items: Array<T>;
}

export type {
    FilterResultType
} 
