// @flow
// from: https://chromedevtools.github.io/devtools-protocol/tot/Page/

import type { LoaderId, Timestamp } from './network';
import type { SearchMatch } from './debugger';
import type { Rect } from './dom';
import type { StackTrace } from './runtime';

export type ResourceType = "Document" | "Stylesheet" | "Image" | "Media" |
                           "Font" | "Script" | "TextTrack" | "XHR" | "Fetch" |
                           "EventSource" | "WebSocket" | "Manifest" | "Other";
export type FrameId = String;
export type Frame = {
  id: string,
  parentId?: string,
  loaderId: LoaderId,
  name?: String,
  securityOrigin: String,
  mimeType: String,
};

type FrameResource = {
  url: String,
  type: ResourceType,
  mimeType: String,
  lasModified?: Timestamp,
  contentSize?: Number,
  failed: Boolean,
  canceled: Boolean
};

type FrameResourceTree = {
  frame: Frame,
  childFrames: Array<FrameResourceTree>,
  resources: Array<FrameResource>
}

type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" |
                      "manual_subframe" | "generated" | "auto_toplevel" |
                      "form_submit" | "reload" | "keyword" | "keyword_generated" | "other";

type NavigationEntry = {
  id: Number,
  url: String,
  userTypedURL: String,
  title: String,
  transitionType: TransitionType
};

type AppManifestError = {
  message: String,
  critical: Number,
  line: Number,
  column: Number,
};

type NavigationResponse = "Proceed" | "Cancel" | "CancelAndIgnore";

type LayoutViewport = {
  pageX: Number,
  pageY: Number,
  clientWidth: Number,
  clientHeight: Number
};

type VisualViewport = {
  offsetX: Number,
  offsetY: Number,
  pageX: Number,
  pageY: Number,
  clientWidth: Number,
  clientHeight: Number,
  scale: Number,
};

type ScreencastFrameMetadata = {
  offsetTop: Number,
  pageScaleFactor: Number,
  deviceWidth: Number,
  deviceHeight: Number,
  scrollOffsetX: Number,
  scrollOffsetY: Number,
  timestamp: Number
};

export type Page = {
  /**
   * Enables page domain notifications.
   */
  enable(): Promise<{}>;

  /**
   * Disables page domain notifications.
   */
  disable(): Promise<{}>;

  /**
   * Reloads given page optionally ignoring the cache.
   * @param {Object}
   * @return {Promise}
   */
  reload(opt?: {
    ignoreCache?: Boolean,
    scriptToEvaluateOnLoad?: String,
  }): Promise<{}>;

  /**
   * Navigates current page to the given URL.
   * @param {String} url
   * @return {FrameId}
   */
  navigate(url: String): FrameId;

  /**
   * Force the page stop all navigations and pending resource fetches.
   */
  stopLoading(): void;

  /**
   * Returns navigation history for the current page. EXPERIMENTAL
   * @return {Promise}
   */
  getNavigationHistory(): Promise<{currentIndex: Number, entries: Array<NavigationEntry>}>;

  /**
   * Navigates current page to the given history entry.
   * @param {Number} entryId
   * @return {Promise}
   */
  navigateToHistoryEntry(entryId: Number): Promise<{}>;

  /**
   * Returns present frame / resource tree structure.
   * @return {Promise}
   */
  getResourceTree(): Promise<{ frameTreee: FrameResourceTree }>;

  /**
   * Returns content of the given resource.
   *
   * @param frameId FrameId
   * @param {String} url
   * @return {Promise}
   */
  getResourceContent(frameId: FrameId, url: String): Promise<{
    content: String,
    base64Encoded: String
  }>;

  /**
   * Searches for given string in resource content.
   * @param {FrameId} frameId
   * @param {String} url
   * @param {String} query
   * @param {boolean} caseSensitive
   * @param {boolean} isRegex
   * @return {Promise}
   */
  searchInResource(
    frameId: FrameId,
    url: String,
    query: String,
    caseSensitive?: boolean,
    isRegex?: boolean
  ): Promise<{result: Array<SearchMatch>}>;

  /**
   * Sets given markup as the document's HTML.
   * @param {FrameId} frameId
   * @param  {String} html
   * @return {Promise}
   */
  setDocumentContent(frameId: FrameId, html: String): Promise<>;

  /**
   * Capture page screenshot.
   * @param {String} jpeg or png only.
   * @param {Number}
   * @param {booean}
   * @return {Promise}
   */
  captureScreenshot(
    format?: "jpeg" | "png",
    quality?: Number,
    fromSurface?: boolean
  ): Promise<{data: String}>;

  /**
   * Print page as PDF.
   * @param {boolean} landscape
   * @param {boolean} displayHeaderFooter
   * @param {boolean} printBackground
   * @param {Number} scale
   * @param {Number} paperWidth
   * @param {Number} marginTop
   * @param {Number} marginBottom
   * @param {Number} marginLeft
   * @param {Number} marginRight
   * @param {String} pageRanges
   * @return {Promise} {data: String}
   */
  printToPDF(
    landscape?: boolean,
    displayHeaderFooter?: boolean,
    printBackground?: boolean,
    scale?: Number,
    paperWidth?: Number,
    paperHeight?: Number,
    marginTop?: Number,
    marginBottom?: Number,
    marginLeft?: Number,
    marginRight?: Number,
    pageRanges?: String
  ): Promise<{data: String}>;

  /**
   * Starts sending each frame using the screencastFrame event.
   * @param {String} jpeg or png only.
   * @param {Number} quality
   * @param {Number} maxWidth
   * @param {Number} maxHeight
   * @param {Number} everyNthFrame
   * @return {Promise}
   */
  startScreencast(
    format?: "jpeg" | "png",
    quality?: Number,
    maxWidth?: Number,
    maxHeight?: Number,
    everyNthFrame?: Number
  ): Promise<>;

  /**
   * Stops sending each frame in the screencastFrame
   * @return {Promise}
   */
  stopScreencast(): Promise<>;

  /**
   * Acknowledges that a screencast frame has been received by the frontend.
   * @param {Number} seccionId
   * @return {Promise}
   */
  screencastFrameAck(seccionId: Number): Promise<>;

  /**
   * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
   * @param {boolean} accept
   * @param {String} promptText
   * @return {Promise}
   */
  handleJavaScriptDialog(accept: boolean, promptText?: String): Promise<{}>;

  /**
   * @return {Promise} { url: String, errors: Array<AppManifestError>, data?: String}
   */
  getAppManifest(): Promise<{ url: String, errors: Array<AppManifestError>, data?: String}>;

  /**
   */
  requestAppBanner(): Promise<>;

  /**
   * Toggles navigation throttling
   * which allows programatic control over navigation and redirect response.
   *
   * @param {boolean}
   * @return {Promise}
   */
  setControlNavigations(enable: boolean): Promise<{}>;

  /**
   * Should be sent in response to a navigationRequested or a redirectRequested event,
   * telling the browser how to handle the navigation.
   *
   * @param {Object} NavigationResponse
   * @param {Number} navigationId
   * @return {Promise}
   */
  processNavigation(response: NavigationResponse, navigationId: Number): Promise<>;

  /**
   * Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   * @return {Promise}
   */
  getLayoutMetrics(): Promise<{
    layoutViewport: LayoutViewport,
    visualViewport: VisualViewport,
    contentSize: Rect
  }>;

  /**
   * Creates an isolated world for the given frame
   *
   * @param {String} frameId
   * @param {String} worldName
   * @param {boolean} grantUniveralAccess
   * @return {Promise}
   */
  createIsolatedWorld(
    frameId: FrameId,
    worldName?: String,
    grantUniveralAccess: boolean
  ): Promise<>;

  /* -- events -- */

  /**
   * @param {Function}
   */
  domContentEventFired(
    callback: Function
  ): void;

  /**
   * @param {Function}
   */
  loadEventFired(
    callback: Function
  ): void;

  /**
   * Fired when frame has been attached to its parent.
   *
   * @param {String} frameId
   * @param {String} frameId
   * @param {Object} StackTrace
   */
  frameAttached(
    frameId: FrameId,
    parentFrameId: FrameId,
    stack: StackTrace
  ): void;

  /**
   * Fired once navigation of the frame has completed.
   * Frame is now associated with the new loader.
   *
   * @param {Object} frame
   */
  frameNavigated(frame: Frame): void;

  /**
   * Fired when frame has been detached from its parent.
   *
   * @param {String}
   */
  frameDetached(frameId: FrameId): void;

  /**
   * Fired when frame has started loading.
   *
   * @param {String} frameId
   */
  frameStartedLoading(frameId: FrameId): void;

  /**
   * Fired when frame has stopped loading.
   *
   * @param {String} frameId
   */
  frameStoppedLoading(frameId: FrameId): void;

  /**
   * Fired when frame schedules a potential navigation.
   *
   * @param {String} frameId
   * @param {Number} delay
   */
  frameScheduledNavigation(
    frameId: FrameId,
    delay: Number
  ): void;

  /**
   * Fired when frame no longer has a scheduled navigation.
   *
   * @type {String} frameId
   */
  frameClearedScheduledNavigation(frameId: FrameId): void;

  /**
   */
  frameResized(): void;

  /**
   * Fired when a JavaScript initiated dialog
   * (alert, confirm, prompt, or onbeforeunload) has been closed.
   *
   * @param {boolean} result
   */
  javascriptDialogClosed(result: boolean): void;

  /**
   * Compressed image data requested by the startScreencast.
   *
   * @param {String} data
   * @param {Object} ScreencastFrameMetadata
   * @param {Number} sessionId
   */
  screencastFrame(
    data: String,
    metadata: ScreencastFrameMetadata,
    sessionId: Number
  ): void;

  /**
   * Fired when the page with currently enabled screencast was shown or hidden .
   *
   * @param {Boolean} visible
   */
  screencastVisibilityChanged(
    visible: boolean
  ): void;

  /**
   * Fired when interstitial page was shown
   */
  interstitialShown(): void;

  /**
   * Fired when interstitial page was hidden
   */
  interstitialHidden(): void;

  /**
   * Fired when a navigation is started if navigation throttles are enabled.
   * The navigation will be deferred until processNavigation is called.
   *
   * @param {Boolean} isInMainFrame
   * @param {Boolean} isRedirect
   * @param {Number} navigationId
   * @param {String} url
   */
  navigationRequested(
    isInMainFrame: boolean,
    isRedirect: boolean,
    navigationId: Number,
    url: String
  ): void;
};
