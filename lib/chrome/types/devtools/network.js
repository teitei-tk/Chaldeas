// @flow
// from: https://chromedevtools.github.io/devtools-protocol/1-2/Network/

import type { frameId, ResourceType } from './page';
import type { StackTrace } from './runtime';

export type LoaderId = string;
export type Headers = Object;
export type RequestId = String;
export type ConnectionType = "none" | "cellular2g" | "cellular3g" | "cellular4g" | "bluetooth" | "ethernet" | "wifi" | "wimax" | "other."
export type Timestamp = Number;

export type IntiatorType = "parser" | "script" | "other";
export type Initiator = {
  type: IntiatorType,
  stack?: StackTrace,
  url?: string,
  lineNumber?: Number
};

export type Response = {
};

export type network = {
  /* methods */
  enable(
    maxTotalBufferSize?: Number,
    maxResourceBufferSize?: Number
  ): Promise<{}>;
  disable(): Promise<{}>;
  setUserAgentOverride(userAgent: String): Promise<{}>;
  setExtraHTTPHeaders(headers: Headers): Promise<{}>;
  getResponseBody(requestId: RequestId): Promise<{}>;
  canClearBrowserCache(result: boolean): Promise<{}>;
  clearBrowserCache(): Promise<{}>;
  canClearBrowserCookies(result: boolean): Promise<{}>;
  emulateNetworkConditions(
    offline: boolean,
    latency: Number,
    downloadThroughput: Number,
    uploadThroughput: Number,
    connectionType: ConnectionType
  ): Promise<{}>;
  setCacheDisabled(cacheDisabled: boolean): Promise<{}>;

  /* Events */
  requestWillBeSent(
    requestId: RequestId,
    frameId: frameId,
    loaderId: LoaderId,
    timestamp: Timestamp,
    wallTime: Timestamp,
    initiator: Initiator,
    redirectResponse?: Response,
    type: ResourceType
  ): void;
  requestServedFromCache(requestId: RequestId): void;
  responseReceived(
    requestId: RequestId,
    frameId: frameId,
    loaderId: LoaderId,
    timestamp: Timestamp
  ): void
};
