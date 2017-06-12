// @flow
// from: https://chromedevtools.github.io/devtools-protocol/1-2/Runtime/

/**
 * @type {Object}
 */
export type CallFrame = Object;

/**
 * Call frames for assertions or error messages.
 *
 * @type {Object}
 */
export type StackTrace = {
  description?: string,
  CallFrames: Array<CallFrame>,
  parent?: StackTrace,
};


/**
 * Object type. Allowed values: object, function, undefined, string, number, boolean, symbol.

 * @type {String}
 */
export type RemoteObjectType = "object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol"

/**
 * Object subtype hint. Specified for object type values only
 *
 * @type {String}
 */
export type RemoteObjectSubType = "array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray";

/**
 * Primitive value which cannot be JSON-stringified.
 *
 * @type {String}
 */
export type UnserializableValue = "Infinity" | "NaN" | "-Infinity" | "-0";

/**
 * Unique object identifier.
 *
 * @type {String}
 */
export type RemoteObjectId = String;

/**
 * @type {String}
 */
export type PropertyObjectType = "object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "accessor";

export type EntryPreview = {
};

/**
 * @type {Object}
 */
export type PropertyPreview = {
  name: String,
  type: PropertyObjectType,
  value: String,
  valuePreview?: {
    type: RemoteObjectType,
    subType?: RemoteObjectSubType,
    description?: String,
    overflow: boolean,
    properties: Array<PropertyPreview>,
    entries: Array<EntryPreview>,
  },
};


/**
 * Obj
 *
 * @type {Object}
 */
export type ObjectPreview = {
  type: RemoteObjectType,
  subType?: RemoteObjectSubType,
  description?: String,
  overflow: boolean,
  properties: Array<PropertyPreview>,
  entries: Array<EntryPreview>,
};

/**
 * Mirror object referencing original JavaScript object.
 *
 * @type {Object}
 */
export type RemoteObject = {
  type: RemoteObjectType,
  subType?: RemoteObjectSubType,
  className?: String,
  value?: any,
  unserializableValue?: UnserializableValue,
  description?: String,
  objectId?: RemoteObjectId,
}
