// @flow
// from: https://chromedevtools.github.io/devtools-protocol/1-2/Runtime/

export type CallFrame = {

};
export type StackTrace = {
  description?: string,
  CallFrames: Array<CallFrame>,
  parent?: StackTrace,
};
