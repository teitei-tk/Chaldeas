// @flow
// from: https://chromedevtools.github.io/devtools-protocol/tot/Emulation/

import type { RGBA } from './dom';

/**
 * Screen orientation.
 *
 * @type {Object}
 */
export type ScreenOrientation = {
  type: "portraitPrimary" | "portraitSecondary" | "landscapePrimary" | "landscapeSecondary",
  angle: Number,
};

/**
 * advance: If the scheduler runs out of immediate work,
 * the virtual time base may fast forward to allow the next delayed task (if any) to run;
 * pause: The virtual time base may not advance;
 * pauseIfNetworkFetchesPending: The virtual time base may not advance
 * if there are any pending resource fetches.
 *
 * @type {String}
 */
export type VirtualTimePolicy = "advance" | "pause" | "pauseIfNetworkFetchesPending";

/**
 * Emultation Domain
 *
 * @type {Object}
 */
export type Emulation = {
  /**
   * Overrides the values of device screen dimensions
   * (window.screen.width, window.screen.height, window.innerWidth, window.innerHeight,
   * and "device-width"/"device-height"-related CSS media query results).
   *
   * @param {Object}
   * @return {Promise}
   */
  setDeviceMetricsOverride(arg: {
    width: Number,
    height: Number,
    deviceScaleFactor: Number,
    mobile: boolean,
    fitWindow: boolean,
    scale?: Number,
    offsetX?: Number,
    offsetY?: Number,
    screenWidth?: Number,
    screenHeight?: Number,
    positionX?: Number,
    positionY?: Number,
    screenOrientation?: ScreenOrientation
  }): Promise<>;

  /**
   * Clears the overriden device metrics.
   *
   * @return {Promise}
   */
  clearDeviceMetricsOverride(): Promise<>;

  /**
   * Overrides the visible area of the page.
   * The change is hidden from the page,
   * i.e. the observable scroll position and page scale does not change.
   * In effect, the command moves the specified area of
   * the page into the top-left corner of the frame.
   *
   * @param {Object}
   * @return {Promise}
   */
  forceViewport(arg: {
    x: Number,
    y: Number,
    scale: Number
  }): Promise<>;

  /**
   * Resets the visible area of the page to the original viewport,
   * undoing any effects of the forceViewport command.
   *
   * @return {Promise}
   */
  resetViewport(): Promise<>;

  /**
   * Requests that page scale factor is reset to initial values.
   *
   * @return {Promise}
   */
  resetPageScaleFactor(): Promise<>;

  /**
   * Sets a specified page scale factor.
   *
   * @param {Object}
   * @return {Promise}
   */
  setPageScaleFactor(arg: { pageScaleFactor: Number }): Promise<>;

  /**
   * Resizes the frame/viewport of the page.
   * Note that this does not affect the frame's container (e.g. browser window).
   * Can be used to produce screenshots of the specified size. Not supported on Android.
   *
   * @param {Object}
   * @return {Promise}
   */
  setVisibleSize(arg: { width: Number, height: Number }): Promise<>;

  /**
   * Switches script execution in the page.
   *
   * @param {Object}
   * @return {Promise}
   */
  setScriptExecutionDisabled(arg: { value: boolean }): Promise<>;

  /**
   * Overrides the Geolocation Position or Error.
   * Omitting any of the parameters emulates position unavailable.
   *
   * @param {Object}
   * @return {Promise}
   */
  setGeolocationOverride(arg: {
    latitude?: Number,
    longitude?: Number,
    accuracy?: Number
  }): Promise<>;


  /**
   * Clears the overriden Geolocation Position and Error.
   *
   * @return {Promise}
   */
  clearGeolocationOverride(): Promise<>;

  /**
   * Toggles mouse event-based touch event emulation.
   *
   * @param {Object}
   * @return {Promise}
   */
  setTouchEmulationEnabled(arg: {
    enabled: boolean,
    configuration?: "mobile" | "desktop"
  }): Promise<>;

  /**
   * Emulates the given media for CSS media queries.
   *
   * @param {Object}
   * @return {Promise}
   */
  setEmulatedMedia(arg: { media: String }): Promise<>;

  /**
   * Enables CPU throttling to emulate slow CPUs.
   *
   * @param {Object}
   * @return {Promise}
   */
  setCPUThrottlingRate(arg: { rate: Number }): Promise<>;

  /**
   * Tells whether emulation is supported.
   *
   * @param {Object}
   * @return {Promise}
   */
  canEmulate(arg: { result: boolean }): Promise<>;

  /**
   * Turns on virtual time for all frames (replacing real-time with a synthetic time source)
   * and sets the current virtual time policy. Note this supersedes any previous time budget.
   *
   * @param {Object}
   * @return {Promise}
   */
  setVirtualTimePolicy(arg: {
    policy: VirtualTimePolicy,
    budget?: Number
  }): Promise<>;

  /**
   * Sets or clears an override of the default background color of the frame.
   * This override is used if the content does not specify one.
   *
   * @param {Object}
   * @return {Promise}
   */
  setDefaultBackgroundColorOverride(arg: { color?: RGBA }): Promise<>;

  /* events */

  /**
   * Notification sent after the virual time budget for the current VirtualTimePolicy has run out.
   *
   * @param {Function}
   */
  virtualTimeBudgetExpired(callback: Function): void;
};
