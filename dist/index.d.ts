export { Helper } from './core/helper';
export { PaginateResponse, PaginateOption } from './core/paginate';
export { WidgetTypes, DataTypes } from './core/enums';
export { SchemaTypes, SchemaDefinition, Schema, model } from 'mongoose';
export { create } from './core/creator';
export interface EntityProperties {
    [key: string]: SchemaProperty;
}
export interface UISchema {
    entry: EntityProperties;
    query?: EntityProperties;
    required?: string[];
    columns: ColumnItem[];
    forms?: SchemaForms;
}
export interface SchemaProperty {
    type?: string;
    title?: string;
    description?: string;
    widget?: string | Widget;
    minimum?: number;
    maximum?: number;
    minlength?: number;
    maxlength?: number;
    visibleIf?: CondictionVisibleIf;
    partten?: string;
    index?: string;
    format?: string;
    items?: any;
    placeholder?: string;
    required?: boolean;
    default?: any;
}
export interface ColumnsDefine {
    [key: string]: ColumnItem;
}
export interface ColumnItem {
    field?: string;
    sortField?: string;
    filterField?: string;
    header?: string;
    footer?: string;
    sortable?: string;
    sortFunction?: string;
    editable?: string;
    filter?: string;
    filterMatchMode?: string;
    filterType?: string;
    filterPlaceholder?: string;
    filterMaxlength?: string;
    rowspan?: string;
    colspan?: string;
    style?: string;
    styleClass?: string;
    tableStyle?: string;
    tableStyleClass?: string;
    hidden?: boolean;
    expander?: boolean;
    selectionMode?: string;
    frozen?: boolean;
    index?: number;
    format?: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    link?: string;
}
export interface CondictionVisibleIf {
    [key: string]: any;
}
export interface SchemaForms {
    add?: SchemaProperty;
    edit?: SchemaProperty;
    view?: SchemaProperty;
}
export interface Widget {
    id: string;
    parts?: {
        [key: number]: string[];
    };
    readOnly?: boolean;
    [key: string]: any;
}
