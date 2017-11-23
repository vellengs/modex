export interface EntityProperties {
	[key: string]: SchemaProperty;
}

export interface SchemaForm {
	add: Widget,
	edit: Widget,
	view: Widget
}

export interface UISchema {
	entry: EntityProperties;
	query?: EntityProperties;
	required?: string[];
	columns: ColumnItem[];
	forms: SchemaForm
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
}

export interface Widget {
	id: string;
	[key: string]: any,
	parts?: any,
	readOnly?: boolean
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
}


export interface CondictionVisibleIf {
	[key: string]: string[];
}