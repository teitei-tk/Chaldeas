// @flow
// from: https://chromedevtools.github.io/devtools-protocol/1-2/Page/

import type { LoaderId } from './network';

export type frameId = String;

export type frame = {
  id: string,
  parentId?: string,
  loaderId: LoaderId,
  name?: String,
  securityOrigin: String,
  mimeType: String,
};

export type page = {
  /* methods */
  enable(): Promise<{}>;
  disable(): Promise<{}>;
  reload(opt?: {
    ignoreCache?: Boolean,
    scriptToEvaluateOnLoad?: String,
  }): Promise<{}>;
  navigate(url: String): frameId;
  handleJavaScriptDialog(accept: boolean, promptText?: String): Promise<{}>;

  /* events */
  domContentEventFierd(callback: Function): void;
  loadEventFired(callback: Function): void;
  frameAttached(frameId: frameId, parentFrameId: frameId): void;
  frameNavigated(frame: frame): void;
  frameDetached(frameId: frameId): void;
  javascriptDialogOpening(message: String, type: String): void;
  interstitialShown(callback: Function): void;
  interstitialHidden(callback: Function): void;
  navigationRequested(
    isInMainFrame: boolean,
    isRedirect: boolean,
    navigationId: Number,
    url: String
  ): void;
};
