import { model as getModel } from 'mongoose';
import * as lodash from 'lodash';
import { UISchema, ColumnItem } from './schema';
import { PaginateResponse, PaginateOption } from './paginate';


export class Helper {
	static async getUISchema(folder: string, name: string): Promise<UISchema> {
		name = lodash.snakeCase(name);
		const columns: any = require(`${folder}/${name}.columns`).columns;
		const schema: any = require(`${folder}/${name}.properties`).schema;
		const forms: any = require(`${folder}/${name}.properties`).forms;

		const querySchema: any = require(`${folder}/${name}.query`).query;

		const cols: ColumnItem[] = [];
		const required: string[] = [];
		for (const key in columns) {
			const col = columns[key];
			col.field = key;
			cols.push(col);
		}

		for (const key in schema) {
			const config = schema[key];
			if (!config.type) {
				config.type = 'string';
			}
			if (config.required) {
				required.push(key);
			}
			config.title = config.title || (columns[key] || { header: '' }).header;
		}

		for (const key in querySchema) {
			const config = querySchema[key];
			if (!config.type) {
				config.type = 'string';
			}
			if (config.required) {
				required.push(key);
			}
			config.title = config.title || (columns[key] || { header: '' }).header;
		}


		return {
			entry: schema,
			query: querySchema,
			required: required,
			columns: cols,
			forms: forms
		};
	}

	static async create(modelName: string, entry: any): Promise<any> {
		const model = getModel(modelName);
		const doc = new model(entry);
		return doc.save();
	}

	static async update(modelName: string, entry: any): Promise<any> {
		const model = getModel(modelName);
		const doc = model.findByIdAndUpdate(entry.uid, entry);
		return doc.exec();
	}

	static async get(modelName: string, id: string): Promise<any> {
		const model = getModel(modelName);
		return new Promise((resolve, reject) => {

			model.findOne({ _id: id }).exec((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(res);
				}
			});
		});
	}

	static async remove(modelName: string, id: string): Promise<any> {
		const model = getModel(modelName);
		const ids = id.split(',');
		if (ids.length > 1) {
			return this.removeItems(modelName, ids);
		} else {
			return new Promise((resolve, reject) => {
				model.findOneAndRemove({ _id: id }).exec((err, res) => {
					if (err) {
						reject(err);
					} else {
						resolve(true);
					}
				});
			});
		}
	}

	static async removeItems(modelName: string, ids: string[]): Promise<any> {
		const model = getModel(modelName);
		return new Promise((resolve, reject) => {
			model.remove({ _id: { $in: ids } }).exec((err, res) => {
				if (err) {
					reject(err);
				} else {
					resolve(true);
				}
			});
		});
	}

	static async getPagedData<T>(
		model: string,
		page: number,
		limit: number,
		populates?: any[],
		sort?: any,
		params?: object
	) {

		const option: PaginateOption = {
			page: page,
			limit: limit,
			sort: { '_id': -1 }
		};

		option.page = option.page ? option.page : 1;
		option.limit = option.limit === 0 ? 10 : option.limit;
		option.sort = option.sort ? { '_id': -1 } : option.sort;

		if (populates && populates.length) {
			option.populate = populates;
		}

		params = params || {};
		params = lodash.pickBy(params);

		const modelDoc: any = getModel(model);
		const response = await new Promise((resolve, reject) => {

			modelDoc.paginate(params, option, (err: any, data: any) => {
				data = data || { docs: [], total: 0 };
				const result: PaginateResponse<T[]> = {
					error: err,
					docs: data.docs.map((doc: any) => doc.flat()),
					total: data.total
				};
				resolve(result);
			});
		});
		return response as PaginateResponse<T[]>;
	}
}
