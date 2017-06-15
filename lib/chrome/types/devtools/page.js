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

export type FrameResource = {
  url: String,
  type: ResourceType,
  mimeType: String,
  lasModified?: Timestamp,
  contentSize?: Number,
  failed: Boolean,
  canceled: Boolean
};

export type FrameResourceTree = {
  frame: Frame,
  childFrames: Array<FrameResourceTree>,
  resources: Array<FrameResource>
}

export type TransitionType = "link" | "typed" | "auto_bookmark" | "auto_subframe" |
                      "manual_subframe" | "generated" | "auto_toplevel" |
                      "form_submit" | "reload" | "keyword" | "keyword_generated" | "other";

export type NavigationEntry = {
  id: Number,
  url: String,
  userTypedURL: String,
  title: String,
  transitionType: TransitionType
};

export type AppManifestError = {
  message: String,
  critical: Number,
  line: Number,
  column: Number,
};

export type NavigationResponse = "Proceed" | "Cancel" | "CancelAndIgnore";

export type LayoutViewport = {
  pageX: Number,
  pageY: Number,
  clientWidth: Number,
  clientHeight: Number
};

export type VisualViewport = {
  offsetX: Number,
  offsetY: Number,
  pageX: Number,
  pageY: Number,
  clientWidth: Number,
  clientHeight: Number,
  scale: Number,
};

export type ScreencastFrameMetadata = {
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
   * @return {Promise}
   */
  enable(): Promise<{}>;

  /**
   * Disables page domain notifications.
   * @return {Promise}
   */
  disable(): Promise<{}>;

  /**
   * Reloads given page optionally ignoring the cache.
   *
   * @param {Object}
   * @return {Promise}
   */
  reload(arg?: {ignoreCache?: Boolean, scriptToEvaluateOnLoad?: String}): Promise<>;

  /**
   * Navigates current page to the given URL.
   *
   * @param {Object}
   * @return {Promise}
   */
  navigate(arg: {
    url: String,
    referrer?: String,
    trasitionType?: TransitionType
  }): Promise<{ frameId: FrameId }>;

  /**
   * Force the page stop all navigations and pending resource fetches.
   *
   * @return {Promise}
   */
  stopLoading(): Promise<>;

  /**
   * Returns navigation history for the current page. EXPERIMENTAL
   * @return {Promise}
   */
  getNavigationHistory(): Promise<{currentIndex: Number, entries: Array<NavigationEntry>}>;

  /**
   * Navigates current page to the given history entry.
   * @return {Promise}
   */
  navigateToHistoryEntry(arg: { entryId: Number }): Promise<>;

  /**
   * Returns present frame / resource tree structure.
   * @return {Promise}
   */
  getResourceTree(): Promise<{ frameTree: FrameResourceTree }>;

  /**
   * Returns content of the given resource.
   *
   * @param {Object}
   * @return {Promise}
   */
  getResourceContent(arg: { frameId: FrameId, url: String }): Promise<{
    content: String, base64Encoded: String
  }>;

  /**
   * Searches for given string in resource content.
   * @param {Object}
   * @return {Promise}
   */
  searchInResource(arg: {
    frameId: FrameId,
    url: String,
    query: String,
    caseSensitive?: boolean,
    isRegex?: boolean
  }): Promise<{result: Array<SearchMatch>}>;

  /**
   * Sets given markup as the document's HTML.
   * @param {Object}
   * @return {Promise}
   */
  setDocumentContent(arg: {frameId: FrameId, html: String}): Promise<>;

  /**
   * Capture page screenshot.
   *
   * @param {Object}
   * @return {Promise}
   */
  captureScreenshot(arg?: {
    format?: "jpeg" | "png",
    quality?: Number,
    fromSurface?: boolean
  }): Promise<{data: String}>;

  /**
   * Print page as PDF.
   *
   * @param {Object}
   * @return {Promise}
   */
  printToPDF(arg?: {
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
  }): Promise<{data: String}>;

  /**
   * Starts sending each frame using the screencastFrame event.
   *
   * @param {Object}
   * @return {Promise}
   */
  startScreencast(arg?: {
    format?: "jpeg" | "png",
    quality?: Number,
    maxWidth?: Number,
    maxHeight?: Number,
    everyNthFrame?: Number
  }): Promise<>;

  /**
   * Stops sending each frame in the screencastFrame
   * @return {Promise}
   */
  stopScreencast(): Promise<>;

  /**
   * Acknowledges that a screencast frame has been received by the frontend.
   *
   * @param {Object}
   * @return {Promise}
   */
  screencastFrameAck(arg: {seccionId: Number}): Promise<>;

  /**
   * Accepts or dismisses a JavaScript initiated dialog (alert, confirm, prompt, or onbeforeunload).
   *
   * @param {Object}
   * @return {Promise}
   */
  handleJavaScriptDialog(arg: {accept: boolean, promptText?: String}): Promise<>;

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
   * @param {Object}
   * @return {Promise}
   */
  setControlNavigations(arg: {enable: boolean}): Promise<>;

  /**
   * Should be sent in response to a navigationRequested or a redirectRequested event,
   * telling the browser how to handle the navigation.
   *
   * @param {Object}
   * @return {Promise}
   */
  processNavigation(arg: {response: NavigationResponse, navigationId: Number}): Promise<>;

  /**
   * Returns metrics relating to the layouting of the page, such as viewport bounds/scale.
   *
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
   * @param {Object}
   * @return {Promise}
   */
  createIsolatedWorld(arg: {
    frameId: FrameId,
    worldName?: String,
    grantUniveralAccess: boolean
  }): Promise<>;

  /* -- events -- */

  /**
   * @param {Function}
   */
  domContentEventFired(
    callback: (timestamp: Timestamp) => void
  ): void;

  /**
   * @param {Function}
   */
  loadEventFired(
    callback: (timestamp: Timestamp) => void
  ): void;

  /**
   * Fired when frame has been attached to its parent.
   *
   * @param {Function}
   */
  frameAttached(callback: (
    frameId: FrameId,
    parentFrameId: FrameId,
    stack?: StackTrace
  ) => void): void;

  /**
   * Fired once navigation of the frame has completed.
   * Frame is now associated with the new loader.
   *
   * @param {Function}
   */
  frameNavigated(callback: (frame: Frame) => void): void;

  /**
   * Fired when frame has been detached from its parent.
   *
   * @param {Function}
   */
  frameDetached(callback: (frameId: FrameId) => void): void;

  /**
   * Fired when frame has started loading.
   *
   * @param {Function} frameId
   */
  frameStartedLoading(callback: (frameId: FrameId) => void): void;

  /**
   * Fired when frame has stopped loading.
   *
   * @param {Function} frameId
   */
  frameStoppedLoading(callback: (frameId: FrameId) => void): void;

  /**
   * Fired when frame schedules a potential navigation.
   *
   * @param {Function}
   */
  frameScheduledNavigation(callback: (frameId: FrameId, delay: Number) => void): void;

  /**
   * Fired when frame no longer has a scheduled navigation.
   *
   * @param {Function}
   */
  frameClearedScheduledNavigation(callback: (frameId: FrameId) => void): void;

  /**
   * @param {Function}
   */
  frameResized(callback: Function): void;

  /**
   * Fired when a JavaScript initiated dialog
   * (alert, confirm, prompt, or onbeforeunload) has been closed.
   *
   * @param {Function}
   */
  javascriptDialogClosed(callback: (result: boolean) => void): void;

  /**
   * Compressed image data requested by the startScreencast.
   *
   * @param {Function}
   */
  screencastFrame(
    callback: (
      data: String,
      metadata: ScreencastFrameMetadata,
      sessionId: Number
    ) => void
  ): void;

  /**
   * Fired when the page with currently enabled screencast was shown or hidden .
   *
   * @param {Function}
   */
  screencastVisibilityChanged(callback: (visible: boolean) => void): void;

  /**
   * Fired when interstitial page was shown
   *
   * @param {Function}
   */
  interstitialShown(callback: Function): void;

  /**
   * Fired when interstitial page was hidden
   *
   * @param {Function}
   */
  interstitialHidden(callback: Function): void;

  /**
   * Fired when a navigation is started if navigation throttles are enabled.
   * The navigation will be deferred until processNavigation is called.
   *
   * @param {Function}
   */
  navigationRequested(
    callback: (
      isInMainFrame: boolean,
      isRedirect: boolean,
      navigationId: Number,
      url: String
    ) => void
  ): void;
};
