// @flow
// from: https://chromedevtools.github.io/devtools-protocol/tot/Network/

import type { FrameId, ResourceType } from './page';
import type { StackTrace } from './runtime';

export type LoaderId = string;
export type Headers = Object;
export type RequestId = string;
export type ConnectionType = "none" | "cellular2g" | "cellular3g" | "cellular4g" | "bluetooth" | "ethernet" | "wifi" | "wimax" | "other"
export type Timestamp = Number;

export type InterceptionId = string;
export type ErrorReason = "Failed" | "Aborted" | "TimedOut" | "AccessDenied" |
                   "ConnectionClosed" | "ConnectionReset" | "ConnectionRefused" |
                   "ConnectionAborted" | "ConnectionFailed" | "NameNotResolved" |
                   "InternetDisconnected" | "AddressUnreachable";

export type ResourcePriority = "VeryLow" | "Low" | "Medium" | "High" | "VeryHigh";
export type ReferrerPolicy = "unsafe-url" | "no-referrer-when-downgrade" | "no-referrer" | "origin" | "origin-when-cross-origin" | "no-referrer-when-downgrade-origin-when-cross-origin";
export type BlockedReason = "csp" | "mixed-content" | "origin" | "inspector" | "subresource-filter" | "other"


export type IntiatorType = "parser" | "script" | "other";
export type Initiator = {
  type: IntiatorType,
  stack?: StackTrace,
  url?: string,
  lineNumber?: Number
};

export type MixiedContentType = "blockable" | "optionally-blockable" | "none";
export type Request = {
  url: string,
  method: string,
  headers: Headers,
  postData?: string,
  mixedContentType?: MixiedContentType,
  initialPriority: ResourcePriority,
  referrerPolicy: ReferrerPolicy,
  isLinkPreload?: boolean,
};
export type Response = Object;

type CookieSameSite = "Strict" | "Lax"
export type Cookie = {
  name: string,
  value: string,
  domain: string,
  path: string,
  expires: Number,
  size: Number,
  httpOnly: boolean,
  secure: boolean,
  session: boolean,
  sameSite?: CookieSameSite
}

export type WebSocketRequest = {
  headers: Headers,
};

export type WebSocketResponse = {
  status: Number,
  statusText: string,
  headers: Headers,
  headersText?: string,
  requestHeaders?: Headers,
  requestHeadersText?: string,
};

export type WebSocketFrame = {
  opcode: Number,
  mask: boolean,
  payloadData: string,
};

export type Network = {
  /**
   * Enables network tracking, network events will now be delivered to the client.
   *
   * @param {Object}
   * @return {Promise}
   */
  enable(arg?: {
    maxTotalBufferSize?: Number,
    maxResourceBufferSize?: Number
  }): Promise<{}>;

  /**
   * Disables network tracking, prevents network events from being sent to the client.
   *
   * @return {Promise}
   */
  disable(): Promise<{}>;

  /**
   * Allows overriding user agent with the given string.
   *
   * @param {Object}
   * @return {Promise}
   */
  setUserAgentOverride(arg: {userAgent: string}): Promise<{}>;

  /**
   * Specifies whether to always send extra HTTP headers with the requests from this page.
   *
   * @param {Object}
   * @return {Promise}
   */
  setExtraHTTPHeaders(arg: {headers: Headers}): Promise<{}>;

  /**
   * Returns content served for the given request.
   *
   * @param {Object}
   * @return {Promise}
   */
  getResponseBody(arg: {requestId: RequestId}): Promise<{
    body: string,
    base64Encoded: boolean
  }>;

  /**
   * Blocks URLs from loading.
   *
   * @return {Promise}
   */
  setBlockedURLs(): Promise<{urls: Array<string>}>;

  /**
   * This method sends a new XMLHttpRequest which is identical to the original one.
   * The following parameters should be identical:
   * method, url, async, request body, extra headers, withCredentials attribute, user, password.
   *
   * @param {Object}
   * @return {Promise}
   */
  replayXHR(arg: {requestId: RequestId}): Promise<>;

  /**
   * Tells whether clearing browser cache is supported.
   *
   * @return {Promise}
   */
  canClearBrowserCache(): Promise<{result: boolean}>;

  /**
   * Clears browser cache.
   *
   * @return {Promise}
   */
  clearBrowserCache(): Promise<{}>;

  /**
   * Tells whether clearing browser cookies is supported.
   *
   * @return {Promise}
   */
  canClearBrowserCookies(): Promise<{result: boolean}>;

  /**
   * Clears browser cookies.
   *
   * @return {Promise}
   */
  clearBrowserCookies(): Promise<>;

  /**
   * Returns all browser cookies for the current URL.
   * Depending on the backend support, will return detailed cookie information in the cookies field.
   *
   * @param {Object}
   * @return {Promise}
   */
  getCookies(arg: {urls?: Array<string>}): Promise<{cookies: Array<Cookie>}>;

  /**
   * Returns all browser cookies. Depending on the backend support,
   * will return detailed cookie information in the cookies field. EXPERIMENTAL
   *
   * @type {Object}
   */
  getAllCookies(): Promise<{cookies: Array<Cookie>}>;

  /**
   * Deletes browser cookie with given name, domain and path.
   *
   * @param {Object}
   * @return {Promise}
   */
  deleteCookie(arg: {cookieName: string, url: string}): Promise<>;

  /**
   * Sets a cookie with the given cookie data; may overwrite equivalent cookies if they exist.
   *
   * @param {Object}
   * @return {Promise}
   */
  setCookie(arg: {
    url: string,
    name: string,
    value: string,
    domain?: string,
    path?: string,
    secure?: boolean,
    httpOnly?: boolean,
    sameSite?: CookieSameSite,
    expirationDate?: Timestamp
  }): Promise<{success: boolean}>;

  /**
   * Tells whether emulation of network conditions is supported.
   *
   * @return {Promise}
   */
  canEmulateNetworkConditions(): Promise<{result: boolean}>;

  /**
   * Activates emulation of network conditions.
   *
   * @param {Object}
   * @return {Promise}
   */
  emulateNetworkConditions(arg: {
    offline: boolean,
    latency: Number,
    downloadThroughput: Number,
    uploadThroughput: Number,
    connectionType?: ConnectionType
  }): Promise<{}>;

  /**
   * Toggles ignoring cache for each request. If true, cache will not be used.
   *
   * @param {Object}
   * @return {Promise}
   */
  setCacheDisabled(arg: { cacheDisabled: boolean }): Promise<{}>;

  /**
   * Toggles ignoring of service worker for each request.
   *
   * @param {Object}
   * @return {Promise}
   */
  setBypassServiceWorker(arg: {bypass: boolean}): Promise<{}>;

  /**
   * For testing.
   *
   * @param {Object}
   * @return {Promise}
   */
  setDataSizeLimitsForTest(arg: {maxTotalSize: Number, maxResourceSize: Number}): Promise<{}>;

  /**
   * Returns the DER-encoded certificate.
   *
   * @param {Object}
   * @return {Promise}
   */
  getCertificate(arg: {origin: string}): Promise<{ tableNames: Array<string> }>;

  /**
   * Whether or not HTTP requests
   * should be intercepted and Network.requestIntercepted events sent.
   *
   * @param {Object}
   * @return {Promise}
   */
  enableRequestInterception(arg: {enabled: boolean}): Promise<>;

  /**
   * Response to Network.requestIntercepted
   * which either modifies the request
   * to continue with any modifications, or blocks it, or completes
   * it with the provided response bytes.
   * If a network fetch occurs as a result which encounters a redirect an additional
   * Network.requestIntercepted event will be sent with the same InterceptionId.
   *
   * @param {Object}
   * @return {Promise}
   */
  continueInterceptedRequest(arg: {
    interceptionId: InterceptionId,
    errorReason?: ErrorReason,
    rawResponse?: string,
    url?: string,
    method?: string,
    postData?: string,
    headers?: Headers
  }): Promise<>;


  /* Events */

  /**
   * Fired when resource loading priority is changed
   *
   * @param {Function} [callback(requestId, newPriority, timestamp)]
   */
  resourceChangedPriority(callback: (
    requestId: RequestId,
    newPriority: ResourcePriority,
    timestamp: Timestamp
  ) => void): void;

  /**
   * Fired when page is about to send HTTP request.
   *
   * @param {Function} [callback(
   *    requestId, frameId, loaderId,
   *    documentURL, request, timestamp,
   *    wallTime, initiator, redirectResponse?, type?
   * )]
   */
  requestWillBeSent(callback: (
    requestId: RequestId,
    frameId: FrameId,
    loaderId: LoaderId,
    documentURL: string,
    request: Request,
    timestamp: Timestamp,
    wallTime: Timestamp,
    initiator: Initiator,
    redirectResponse?: Response,
    type?: ResourceType
  ) => void): void;

  /**
   * Fired if request ended up loading from cache.
   *
   * @param {Function} [callback(requestId)]
   */
  requestServedFromCache(callback: (
    requestId: RequestId
  ) => void): void;

  /**
   * Fired when HTTP response is available.
   *
   * @param {Function} [callback(
   *   requestId, frameid, loaderId,
   *   timestamp, type, response
   * )]
   */
  responseReceived(callback: (
    requestId: RequestId,
    frameid: FrameId,
    loaderId: LoaderId,
    timestamp: Timestamp,
    type: ResourceType,
    response: Response
  ) => void): void;

  /**
   * Fired when data chunk was received over the network.
   *
   * @param {Function} [callback(
   *   requestId, timestamp, dataLength, encodedDataLength
   * )]
   */
  dataReceived(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    dataLength: Number,
    encodedDataLength: Number
  ) => void): void;

  /**
   * Fired when HTTP request has finished loading.
   *
   * @param {Function} [callback(
   *   requestId, timestamp, encodedDataLength
   * )]
   */
  loadingFinished(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    encodedDataLength: Number
  ) => void): void;

  /**
   * Fired when HTTP request has failed to load.
   *
   * @type {Function} [callback(
   *   requestid, timestamp, type,
   *   errorText, canceled?, blockedReason?
   * )]
   */
  loadingFailed(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    type: ResourceType,
    errorText: string,
    canceled?: boolean,
    blockedReason?: BlockedReason
  ) => void): void;

  /**
   * Fired when WebSocket is about to initiate handshake.
   *
   * @param {Function} [callback(
   *   requestId, timestamp, wallTime, request
   * )]
   */
  webSocketWillSendHandshakeRequest(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    wallTime: Timestamp,
    request: WebSocketRequest
  ) => void): void;

  /**
   * Fired when WebSocket handshake response becomes available.
   *
   * @param {Function} [callback(
   *   requestId, timestamp, response
   * )]
   */
  webSocketHandshakeResponseReceived(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    response: WebSocketResponse
  ) => void): void;

  /**
   * Fired upon WebSocket creation.
   *
   * @param {Function} [callback(
   *   requestId, url, initiator
   * )]
   */
  webSocketCreated(callback: (
    requestId: RequestId,
    url: string,
    initiator: Initiator
  ) => void): void;

  /**
   * Fired when WebSocket is closed.
   *
   * @param {Function} [callback(
   *   requestId, timestamp
   * )]
   */
  webSocketClosed(callback: (
    requestId: RequestId,
    timestamp: Timestamp
  ) => void): void;

  /**
   * Fired when WebSocket frame is received.
   *
   * @param {Function} [callback(
   *   requestId, timestamp, response
   * )]
   */
  webSocketFrameReceived(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    response: WebSocketFrame
  ) => void): void;

  /**
   * Fired when WebSocket frame error occurs.
   *
   * @type {Function} [callback(
   *  requestId, timestamp, errorMessage
   * )]
   */
  webSocketFrameError(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    errorMessage: string,
  ) => void): void;

  /**
   * Fired when WebSocket frame is sent.
   *
   * @type {Function} [callback(
   *  requestId, timestamp, response
   * )]
   */
  webSocketFrameSent(callback: (
    requestId: RequestId,
    timestamp: Timestamp,
    response: WebSocketFrame
  ) => void): void;

  /**
   * Details of an intercepted HTTP request,
   * which must be either allowed, blocked, modified or mocked.
   *
   * @param {Function} [callback(
   *  InterceptionId, request, resourceType,
   *  redirectHeaders?, redirectStatusCode?, redirectUrl?
   * )]
   */
  requestIntercepted(callback: (
    InterceptionId: InterceptionId,
    request: Request,
    resourceType: ResourceType,
    redirectHeaders?: Headers,
    redirectStatusCode?: Number,
    redirectUrl: string
  ) => void): void;
};
