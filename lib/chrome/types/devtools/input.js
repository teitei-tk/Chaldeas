// @flow
// from: https://chromedevtools.github.io/devtools-protocol/tot/Input/

/**
 * Type of the key event. Allowed values: keyDown, keyUp, rawKeyDown, char.
 *
 * @type {String}
 */
export type KeyTypes = "keyDown" | "keyUp" | "rawKeyDown" | "char";

/**
 * Type of the mouse event. Allowed values: mousePressed, mouseReleased, mouseMoved.
 *
 * @type {String}
 */
export type MouseTypes = "mousePressed" | "mouseReleased" | "mouseMoved" | "mouseWheel";

/**
 * Mouse button (default: "none"). Allowed values: none, left, middle, right.
 *
 * @type {String}
 */
export type ButtonTypes = "none" | "left" | "middle" | "right";


/**
 * Dispatches a touch event to the page.
 *
 * @type {String}
 */
export type TouchTypes = "touchStart" | "touchEnd" | "touchMove";

/**
 * State of the touch point.
 * Allowed values: touchPressed, touchReleased, touchMoved, touchStationary, touchCancelled.
 *
 * @type {String}
 */
export type TouchStateTypes = "touchPressed" | "touchReleased" | "touchMoved" | "touchStationary" | "touchCancelled";

/**
 * @type {String}
 */
export type GestureSourceType = "default" | "touch" | "mouse";

/**
 * @type {Object}
 */
export type TouchPoint = {
  state: TouchStateTypes,
  x: Number,
  y: Number,
  radiusX?: Number,
  radiusY?: Number,
  rotationAngle?: Number,
  force?: Number,
  id?: Number,
};

/**
 * @type {Object}
 */
export type Input = {
  /**
   * Ignores input events (useful while auditing page).
   *
   * @param {Object}
   * @return {Promise}
   */
  setIgnoreInputEvents(arg: { ignore: boolean }): Promise<>;

  /**
   * Dispatches a key event to the page.
   *
   * @param {Object}
   * @return {Promise}
   */
  dispatchKeyEvent(arg: {
    type: KeyTypes,
    modifiers?: Number,
    timestamp?: Number,
    text?: String,
    unmodifiedText?: String,
    keyIdentifier?: String,
    code?: String,
    key?: String,
    windowsVirtualKeyCode?: Number,
    nativeVirtualKeyCode?: Number,
    autoRepeat?: boolean,
    isKeypad?: boolean,
    isSystemKey?: boolean
  }): Promise<>;

  /**
   * Dispatches a mouse event to the page.
   *
   * @param {Object}
   * @return {Promise}
   */
  dispatchMouseEvent(arg: {
    type: MouseTypes,
    x: Number,
    y: Number,
    modifiers?: Number,
    timestamp?: Number,
    button?: ButtonTypes,
    clickCount?: Number
  }): Promise<>;

  /**
   * Dispatches a touch event to the page.
   *
   * @param {Object}
   * @return {Promise}
   */
  dispatchTouchEvent(arg: {
    type: TouchTypes,
    touchPoints: Array<TouchPoint>,
    modifiers?: Number,
    timestamp?: Number
  }): Promise<>;

  /**
   * Emulates touch event from the mouse event parameters.
   *
   * @param {Object}
   * @return {Promise}
   */
  emulateTouchFromMouseEvent(arg: {
    type: MouseTypes,
    x: Number,
    y: Number,
    timestamp: Number,
    button: ButtonTypes,
    deltaX?: Number,
    deltaY?: Number,
    modifiers?: Number,
    clickCount?: Number
  }): Promise<>;

  /**
   * Synthesizes a pinch gesture over a time period by issuing appropriate touch events.
   *
   * @param {Object}
   * @return {Promise}
   */
  synthesizePinchGesture(arg: {
    x: Number,
    y: Number,
    scaleFactor: Number,
    relativeSpeed?: Number,
    gestureSourceType?: GestureSourceType
  }): Promise<>;

  /**
   * Synthesizes a scroll gesture over a time period by issuing appropriate touch events.
   *
   * @param {Object}
   * @return {Promise}
   */
  synthesizeScrollGesture(arg: {
    x: Number,
    y: Number,
    xDistance?: Number,
    yDistance?: Number,
    xOverscroll?: Number,
    yOverscroll?: Number,
    preventFling?: boolean,
    speed?: Number,
    gestureSourceType?: GestureSourceType,
    repeatCount?: Number,
    repeatDelayMs?: Number,
    interactionMarkerName?: String
  }): Promise<>;

  /**
   * Synthesizes a tap gesture over a time period by issuing appropriate touch events.:w
   *
   * @param {Object}
   * @return {Promise}
   */
  synthesizeTapGesture(arg: {
    x: Number,
    y: Number,
    duration?: Number,
    tapCount?: Number,
    gestureSourceType?: GestureSourceType
  }): Promise<>;
};
