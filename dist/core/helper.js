"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var lodash = require("lodash");
var Helper = /** @class */ (function () {
    function Helper() {
    }
    Helper.getUISchema = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var columns, schema, querySchema, cols, required, key, col, key, config, key, config;
            return __generator(this, function (_a) {
                name = lodash.snakeCase(name);
                columns = require("./models/" + name + ".columns").columns;
                schema = require("./models/" + name + ".properties").schema;
                querySchema = require("./models/" + name + ".query").query;
                cols = [];
                required = [];
                for (key in columns) {
                    col = columns[key];
                    col.field = key;
                    cols.push(col);
                }
                for (key in schema) {
                    config = schema[key];
                    if (!config.type) {
                        config.type = 'string';
                    }
                    if (config.required) {
                        required.push(key);
                    }
                    config.title = config.title || (columns[key] || { header: '' }).header;
                }
                for (key in querySchema) {
                    config = querySchema[key];
                    if (!config.type) {
                        config.type = 'string';
                    }
                    if (config.required) {
                        required.push(key);
                    }
                    config.title = config.title || (columns[key] || { header: '' }).header;
                }
                return [2 /*return*/, {
                        entry: schema,
                        query: querySchema,
                        required: required,
                        columns: cols
                    }];
            });
        });
    };
    Helper.create = function (modelName, entry) {
        return __awaiter(this, void 0, void 0, function () {
            var model, doc;
            return __generator(this, function (_a) {
                model = mongoose_1.model(modelName);
                doc = new model(entry);
                return [2 /*return*/, doc.save()];
            });
        });
    };
    Helper.update = function (modelName, entry) {
        return __awaiter(this, void 0, void 0, function () {
            var model, doc;
            return __generator(this, function (_a) {
                model = mongoose_1.model(modelName);
                doc = model.findByIdAndUpdate(entry.uid, entry);
                return [2 /*return*/, doc.exec()];
            });
        });
    };
    Helper.get = function (modelName, id) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                model = mongoose_1.model(modelName);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        model.findOne({ _id: id }).exec(function (err, res) {
                            if (err)
                                reject(err);
                            else
                                resolve(res);
                        });
                    })];
            });
        });
    };
    Helper.remove = function (modelName, id) {
        return __awaiter(this, void 0, void 0, function () {
            var model, ids;
            return __generator(this, function (_a) {
                model = mongoose_1.model(modelName);
                ids = id.split(',');
                if (ids.length > 1) {
                    return [2 /*return*/, this.removeItems(modelName, ids)];
                }
                else {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            model.findOneAndRemove({ _id: id }).exec(function (err, res) {
                                if (err)
                                    reject(err);
                                else
                                    resolve(true);
                            });
                        })];
                }
                return [2 /*return*/];
            });
        });
    };
    Helper.removeItems = function (modelName, ids) {
        return __awaiter(this, void 0, void 0, function () {
            var model;
            return __generator(this, function (_a) {
                model = mongoose_1.model(modelName);
                return [2 /*return*/, new Promise(function (resolve, reject) {
                        model.remove({ _id: { $in: ids } }).exec(function (err, res) {
                            if (err)
                                reject(err);
                            else
                                resolve(true);
                        });
                    })];
            });
        });
    };
    Helper.getPagedData = function (model, page, limit, populates, sort, params) {
        return __awaiter(this, void 0, void 0, function () {
            var option, modelDoc, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        option = {
                            page: page,
                            limit: limit,
                            sort: { "_id": -1 }
                        };
                        option.page = option.page ? option.page : 1;
                        option.limit = option.limit === 0 ? 10 : option.limit;
                        option.sort = option.sort ? { "_id": -1 } : option.sort;
                        if (populates && populates.length) {
                            option.populate = populates;
                        }
                        params = params || {};
                        params = lodash.pickBy(params);
                        modelDoc = mongoose_1.model(model);
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                modelDoc.paginate(params, option, function (err, data) {
                                    data = data || { docs: [], total: 0 };
                                    var result = {
                                        error: err,
                                        docs: data.docs.map(function (doc) { return doc.toClient(); }),
                                        total: data.total
                                    };
                                    resolve(result);
                                });
                            })];
                    case 1:
                        response = _a.sent();
                        return [2 /*return*/, response];
                }
            });
        });
    };
    return Helper;
}());
exports.Helper = Helper;
//# sourceMappingURL=helper.js.map