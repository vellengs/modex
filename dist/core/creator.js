"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var textSearch = require('mongoose-text-search'), paginate = require('mongoose-paginate');
// fieldsAlias = require('mongoose-aliasfield');
var Entity = /** @class */ (function (_super) {
    __extends(Entity, _super);
    function Entity() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Entity.prototype.extend = function (modelName, autoIncrease) {
        this.method('flat', function () {
            var obj = this.toObject();
            obj.id = obj._id;
            delete obj._id;
            delete obj._v;
            return obj;
        });
        this.method('toDoc', function () {
            var obj = this.toObject();
            obj.id = obj._id.toString();
            return obj;
        });
        this.plugin(textSearch);
        this.plugin(paginate);
        // this.plugin(fieldsAlias);
        mongoose_1.model(modelName, this);
    };
    return Entity;
}(mongoose_1.Schema));
exports.Entity = Entity;
function create(schemaDefine, name, autoIncrease, strict) {
    var isStrict = strict !== false;
    var schema = new Entity(schemaDefine, { strict: isStrict });
    schema.extend(name, autoIncrease);
    return schema;
}
exports.create = create;
//# sourceMappingURL=creator.js.map