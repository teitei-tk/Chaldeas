// @flow
// from: https://chromedevtools.github.io/devtools-protocol/tot/Runtime/

import type { ConsoleType } from './console';

export type Timestamp = Number;

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

 * @type {string}
 */
export type RemoteObjectType = "object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol"

/**
 * Object subtype hint. Specified for object type values only
 *
 * @type {string}
 */
export type RemoteObjectSubType = "array" | "null" | "node" | "regexp" | "date" | "map" | "set" | "weakmap" | "weakset" | "iterator" | "generator" | "error" | "proxy" | "promise" | "typedarray";

/**
 * Primitive value which cannot be JSON-stringified.
 *
 * @type {string}
 */
export type UnserializableValue = "Infinity" | "NaN" | "-Infinity" | "-0";

/**
 * Unique object identifier.
 *
 * @type {string}
 */
export type RemoteObjectId = string;

/**
 * @type {string}
 */
export type PropertyObjectType = "object" | "function" | "undefined" | "string" | "number" | "boolean" | "symbol" | "accessor";

export type EntryPreview = {
};

/**
 * @type {Object}
 */
export type PropertyPreview = {
  name: string,
  type: PropertyObjectType,
  value: string,
  valuePreview?: {
    type: RemoteObjectType,
    subType?: RemoteObjectSubType,
    description?: string,
    overflow: boolean,
    properties: Array<PropertyPreview>,
    entries: Array<EntryPreview>,
  },
};

/**
 * @type {Object}
 */
export type ObjectPreview = {
  type: RemoteObjectType,
  subType?: RemoteObjectSubType,
  description?: string,
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
  className?: string,
  value?: any,
  unserializableValue?: UnserializableValue,
  description?: string,
  objectId?: RemoteObjectId,
};


/**
 * Unique script identifier.
 *
 * @type {string}
 */
export type ScriptId = string;

/**
 * Id of an execution context.
 *
 * @type {Number}
 */
export type ExecutionContextId = Number;

/**
 * Detailed information about exception (or error)
 * that was thrown during script compilation or execution.
 *
 * @type {Object}
 */
export type ExceptionDetails = {
  exceptionId: Number,
  text: string,
  lineNumber: Number,
  columnNumber: Number,
  scriptId?: ScriptId,
  url?: string,
  stackTrace?: StackTrace,
  exception?: RemoteObject,
  executionContextId?: ExecutionContextId,
};

/**
 * Represents function call argument. Either remote object id objectId,
 * primitive value, unserializable primitive value or
 * neither of (for undefined) them should be specified.
 *
 * @type {Object}
 */
export type CallArgument = {
  value?: any,
  unserializableValue?: UnserializableValue,
  objectId?: RemoteObjectId,
};

/**
 * Object internal property descriptor. This property isn't normally visible in JavaScript code.
 *
 * @type {Object}
 */
export type InternalPropertyDescriptor = {
  name: string,
  value?: RemoteObject,
};

/**
 * Object property descriptor.
 *
 * @type {Object}
 */
export type PropertyDescriptor = {
  name: string,
  value?: RemoteObject,
  writable?: boolean,
  get?: RemoteObject,
  set?: RemoteObject,
  configurable: boolean,
  enumerable: boolean,
  wasThrown?: boolean,
  isOwn?: boolean,
  symbol?: RemoteObject,
};

/**
 * @type {Object}
 */
export type Runtime = {
  /**
   * Evaluates expression on global object.
   *
   * @param {Object}
   * @return {Promise}
   */
  evaluate(arg: {
    expression: string,
    objectGroup?: string,
    includeCommandLineAPI?: boolean,
    silent?: boolean,
    contextId?: ExecutionContextId,
    returnByValue?: boolean,
    generatePreview?: boolean,
    userGesture?: boolean,
    awaitPromise?: boolean
  }): Promise<{ result: RemoteObject, exceptionDetails?: ExceptionDetails }>;

  /**
   * Add handler to promise with given promise object id.
   *
   * @param {Object}
   * @return {Promise}
   */
  awaitPromise(arg: {
    promiseObjectId: RemoteObjectId,
    returnByValue?: boolean,
    generatePreview?: boolean
  }): Promise<{ result: RemoteObject, exceptionDetails?: ExceptionDetails }>;

  /**
   * Calls function with given declaration on the given object.
   * Object group of the result is inherited from the target object.
   *
   * @param {Object}
   * @return {Promise}
   */
  callFunctionOn(arg: {
    objectId: RemoteObjectId,
    functionDeclaration: string,
    arguments?: Array<CallArgument>,
    silent?: boolean,
    returnByValue?: boolean,
    generatePreview?: boolean,
    userGesture?: boolean,
    awaitPromise?: boolean,
  }): Promise<{ result: RemoteObject, exceptionDetails?: ExceptionDetails }>;

  /**
   * Returns properties of a given object.
   * Object group of the result is inherited from the target object.
   *
   * @param {Object}
   * @return {Promise}
   */
  getProperties(arg: {
    objectId: RemoteObjectId,
    ownProperties?: boolean,
    accessorPropertiesOnly?: boolean,
    generatePreview?: boolean
  }): Promise<{
    result: Array<PropertyDescriptor>,
    internalProperties?: Array<InternalPropertyDescriptor>,
    exceptionDetails?: ExceptionDetails
  }>;

  /**
   * Releases remote object with given id.
   *
   * @param {Object}
   * @return {Promise}
   */
  releaseObject(arg: { objectid: RemoteObjectId }): Promise<>;

  /**
   * Releases all remote objects that belong to a given group.
   *
   * @param {Object}
   * @return {Promise}
   */
  releaseObjectGroup(arg: { objectGroup: string }): Promise<>;

  /**
   * Tells inspected instance to run if it was waiting for debugger to attach.
   *
   * @return {Promise}
   */
  runIfWaitingForDebugger(): Promise<>;

  /**
   * Enables reporting of execution contexts creation by means of executionContextCreated event.
   * When the reporting gets enabled
   * the event will be sent immediately for each existing execution context.
   *
   * @return {Promise}
   */
  enable(): Promise<>;

  /**
   * Disables reporting of execution contexts creation.
   *
   * @return {Promise}
   */
  disable(): Promise<>;

  /**
   * Discards collected exceptions and console API calls.
   *
   * @return {Promise}
   */
  discardConsoleEntries(): Promise<>;

  /**
   * @param {Object}
   * @return {Promise}
   */
  setCustomObjectFormatterEnabled(arg: { enabled: boolean }): Promise<>;

  /**
   * Compiles expression.
   *
   * @param {Object}
   * @return {Promise}
   */
  compileScript(arg: {
    expression: string,
    sourceURL: string,
    persistScript: boolean,
    executionContextId?: ExecutionContextId
  }): Promise<{scriptId: ScriptId, exceptionDetails?: ExceptionDetails}>;

  /**
   * Runs script with given id in a given context.
   *
   * @param {Object}
   * @return {Promise}
   */
  runScript(arg: {
    scriptId: ScriptId,
    executionContextId?: ExecutionContextId,
    objectGroup?: string,
    silent?: boolean,
    includeCommandLineAPI?: boolean,
    returnByValue?: boolean,
    generatePreview?: boolean,
    awaitPromise?: boolean
  }): Promise<{
    result: RemoteObject,
    exceptionDetails?: ExceptionDetails
  }>;

  /** events **/

  /**
   * Issued when new execution context is created.
   */
  executionContextCreated(callback: (
    context: ExecutionContextId
  ) => void): void;

  /**
   * Issued when execution context is destroyed.
   */
  executionContextDestroyed(callback: (
    executionContextId: ExecutionContextId
  ) => void): void;

  /**
   * Issued when all executionContexts were cleared in browser
   */
  executionContextsCleared(callback: Function): void;

  /**
   * Issued when exception was thrown and unhandled.
   */
  exceptionThrown(callback: (
    timestamp: Timestamp,
    exceptionDetails: ExceptionDetails
  ) => void): void;

  /**
   * Issued when unhandled exception was revoked.
   */
  exceptionRevoked(callback: (
    reason: string, exceptionId: Number
  ) => void): void;

  /**
   * Issued when console API was called.
   */
 consoleAPICalled(callback: (
   type: ConsoleType,
   args: Array<RemoteObject>,
   executionContextId: ExecutionContextId,
   timestamp: Timestamp,
   stackTrace?: StackTrace,
   context?: string
 ) => void): void;

 /**
  * Issued when object should be inspected
  * (for example, as a result of inspect() command line API call).
  */
 inspectRequested(callback: (
   object: RemoteObject,
   hints: Object
 ) => void): void;
};
