/**
 * Simple model class
 */
export declare class Paginate {
	page: number;
	size: number;
	sort: string;
}

export declare class Error {
	code?: string;
	message?: string;
	[key: string]: any;
}


export declare class PaginateResponse<T> {
	error?: Error;
	docs: T;
	total: number;
}

export interface PaginateOption {
	select?: Object | string;
	sort?: Object | string;
	populate?: any[] | Object | String;
	lean?: boolean;
	leanWithId?: boolean;
	offset?: number;
	page?: number;
	limit?: number;
}


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
	[key: string]: any;
	type?: string;
	title?: string;
	description?: string;
	widget?: string | Widget;
	minimum?: number;
	maximum?: number;
	minLength?: number;
	visibleIf?: CondictionVisibleIf;
	pattern?: string;
	index?: string;
	format?: string;
	items?: any;
	placeholder?: string;
	required?: boolean;
	default?: any;
	readOnly?: boolean;
	validationMessage?: string;
	oneOf?: any;
}

export interface ColumnsDefine {
	[key: string]: ColumnItem;
}

export interface StyleObject {
	[key: string]: any;
}

export interface ColumnItem {
	[key: string]: any;
	control?: string;
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
	filterMaxLength?: string;
	rowspan?: string;
	colspan?: string;
	style?: StyleObject;
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

export { WidgetTypes, DataTypes } from './enums';
