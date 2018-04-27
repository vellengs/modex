import { SchemaDefinition, Schema, model } from 'mongoose';
const paginate = require('mongoose-paginate');
const toJson = require('@meanie/mongoose-to-json');


export class Entity extends Schema {
	extend(modelName: any, autoIncrease?: boolean) {
		this.method('flat', function () {
			const obj = this.toJSON();
			obj.uid = obj.id;
			return obj;
		});

		this.method('toDoc', function () {
			const obj = this.toObject();
			obj.id = obj._id.toString();
			return obj;
		});

		this.plugin(paginate);
		this.plugin(toJson);
		model(modelName, this);
	}
}

export function create(schemaDefine: SchemaDefinition, name: string, autoIncrease?: boolean, strict?: boolean) {
	const schema = new Entity(schemaDefine, { strict: strict !== false });
	schema.extend(name, autoIncrease);
	return schema;
}

export function createEntity(schemaDefine: SchemaDefinition, strict?: boolean) {
	const schema = new Entity(schemaDefine, { strict: strict !== false });
	return schema;
}
