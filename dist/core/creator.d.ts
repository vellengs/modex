/// <reference types="mongoose" />
import { SchemaDefinition, Schema } from 'mongoose';
export declare class Entity extends Schema {
    extend(modelName: any, autoIncrease?: boolean): void;
}
export declare function create(schemaDefine: SchemaDefinition, name: string, autoIncrease?: boolean, strict?: boolean): Entity;
export declare function createEntity(schemaDefine: SchemaDefinition, strict?: boolean): Entity;
