// @flow
// from: https://chromedevtools.github.io/devtools-protocol/tot/Target/

/**
 * @type {string}
 */
export type TargetID = string;

/**
 * @type {string}
 */
export type BrowserContextID = string;

/**
 * @type {Object}
 */
export type RemoteLocation = {
  host: string,
  port: Number,
};

/**
 * @type {Object}
 */
export type TargetInfo = {
  targetId: TargetID,
  type: string,
  title: string,
  url: string,
};

/**
 * @type {Object}
 */
export type Target = {
  /**
   * Controls whether to discover available targets and
   * notify via targetCreated/targetDestroyed events.
   *
   * @param {Object}
   * @return {Promise}
   */
  setDiscoverTargets(arg: { discover: boolean }): Promise<>;

  /**
   * Controls whether to automatically attach to
   * new targets which are considered to be related to this one.
   * When turned on, attaches to all existing related targets as well.
   * When turned off, automatically detaches from all currently attached targets.
   *
   * @param {Object}
   * @return {Promise}
   */
  setAutoAttach(arg: {
    authAttach: boolean,
    waitForDebuggerOnStart: boolean
  }): Promise<>;

  /**
   * @param {Object}
   * @return {Promise}
   */
  setAttachToFrames(arg: { value: boolean }): Promise<>;

  /**
   * Enables target discovery for the specified locations, when setDiscoverTargets was set to true.
   *
   * @param {Object}
   * @return {Promise}
   */
  setRemoteLocations(arg: { locations: Array<RemoteLocation> }): Promise<>;

  /**
   * Sends protocol message to the target with given id.
   *
   * @param {Object}
   * @return {Promise}
   */
  sendMessageToTarget(arg: { targetId: TargetID, message: string }): Promise<>;

  /**
   * Returns information about a target.
   *
   * @param {Object}
   * @return {Promise}
   */
  getTargetInfo(arg: { targetId: TargetID }): Promise<{ targetInfo: TargetInfo }>;

  /**
   * Activates (focuses) the target.
   *
   * @param {Object}
   * @return {Promise}
   */
  activateTarget(arg: { targetId: TargetID }): Promise<>;

  /**
   * Closes the target. If the target is a page that gets closed too.
   *
   * @param {Object}
   * @return {Promise}
   */
  closeTarget(arg: { targetId: TargetID }): Promise<{ success: boolean }>;

  /**
   * Attaches to the target with given id.
   *
   * @param {Object}
   * @return {Promise}
   */
  attachToTarget(arg: { targetId: TargetID }): Promise<{ success: boolean }>;

  /**
   * @param {Object}
   * @return {Promise}
   */
  detachFromTarget(arg: { targetId: TargetID }): Promise<>;

  /**
   * Creates a new empty BrowserContext.
   * Similar to an incognito profile but you can have more than one.
   *
   * @return {Promise}
   */
  createBrowserContext(): Promise<{ browserContextId: BrowserContextID }>;

  /**
   * Deletes a BrowserContext, will fail of any open page uses it.
   *
   * @param {Object}
   * @return {Promise}
   */
  disposeBrowserContext(arg: {
    browserContextId: BrowserContextID
  }): Promise<{ success: boolean }>;

  /**
   * Creates a new page.
   *
   * @param {Object}
   * @return {Promise}
   */
  createTarget(arg: {
    url: string,
    width?: Number,
    height?: Number,
    browserContextId?: BrowserContextID
  }): Promise<{ targetId: TargetID }>;

  /**
   * Retrieves a list of available targets.
   *
   * @return {Promise}
   */
  getTargets(): Promise<{ targetInfos: Array<TargetInfo> }>;

  /* events */

  /**
   * Issued when a possible inspection target is created.
   *
   * @param {Function}
   */
  targetCreated(callback: (targetInfo: TargetInfo) => void): void;

  /**
   * Issued when a target is destroyed.
   *
   * @param {Function}
   */
  targetDestroyed(callback: (targetId: TargetID) => void): void;

  /**
   * Issued when attached to target because of auto-attach or attachToTarget command.
   *
   * @param {Function}
   */
  attachedToTarget(callback: (
    targetInfo: TargetInfo, waitingForDebugger: boolean
  ) => void): void;

  /**
   * Issued when detached from target for any reason (including detachFromTarget command).
   *
   * @param {Function}
   */
  detachedFromTarget(callback: (targetId: TargetID) => void): void;

  /**
   * Notifies about new protocol message from attached target.
   *
   * @param {Function}
   */
  receivedMessageFromTarget(callback: (
    targetId: TargetID, message: string
  ) => void): void;
};
