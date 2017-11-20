import { UISchema } from './schema';
import { PaginateResponse } from './paginate';
export declare class Helper {
    static getUISchema(folder: string, name: string): Promise<UISchema>;
    static create(modelName: string, entry: any): Promise<any>;
    static update(modelName: string, entry: any): Promise<any>;
    static get(modelName: string, id: string): Promise<any>;
    static remove(modelName: string, id: string): Promise<any>;
    static removeItems(modelName: string, ids: string[]): Promise<any>;
    static getPagedData<T>(model: string, page: number, limit: number, populates?: any[], sort?: any, params?: object): Promise<PaginateResponse<T[]>>;
}
