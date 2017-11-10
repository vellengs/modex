import { SchemaDefinition, Schema, model } from "mongoose";
const textSearch = require('mongoose-text-search'),
	paginate = require('mongoose-paginate'),
	fieldsAlias = require('mongoose-aliasfield');


export class Entity extends Schema {
	extend(modelName: any, autoIncrease?: boolean) {
		this.method('flat', function () {  //TODO maybe better name pojo;
			var obj = this.toObject();
			obj.id = obj._id;
			delete obj._id;
			delete obj._v;
			return obj;
		});

		this.method('toDoc', function () { //TODO maybe better name fixUid;
			var obj = this.toObject();
			obj.id = obj._id.toString();
			return obj;
		});

		this.plugin(textSearch);
		this.plugin(paginate);
		this.plugin(fieldsAlias);

		model(modelName, this);
	}
}

export function create(schemaDefine: SchemaDefinition, name: string, autoIncrease?: boolean, strict?: boolean) {
	let isStrict = strict !== false;
	let schema = new Entity(schemaDefine, { strict: isStrict });
	schema.extend(name, autoIncrease);
	return schema;
}