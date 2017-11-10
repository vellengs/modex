/**
 * Simple model class
 */
export declare class Paginate {
    page: number;
    size: number;
    sort: string;
}

export declare class Error {
    code?: string
    message?: string
    [key: string]: any
}


export declare class PaginateResponse<T> {
    error?: Error;
    docs: T;
    total: number;
}