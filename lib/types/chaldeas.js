// @flow
import type { chrome as chromeType, devToolsProtocolClient } from './../chrome/types/chrome';
import type { launcher as launcherType } from './../chrome/types/launcher';
import DevToolsInterface from './../chrome/devtools';

import ChaldeasClass from './../chaldeas';

export type chaldeas = {
  /* properties */
  chrome: chromeType;
  launcher: launcherType;

  /* methods */
  constructor(chrome: chromeType, launcher: launcherType): void;
  new(chromeOption?: Object, launcherOption?: Object): ChaldeasClass;
  dispatch(): Promise<ChaldeasClass>;
  fetchProtocol(): Promise<devToolsProtocolClient>;
  getDevtoolsInterface(): Promise<DevToolsInterface>;
  terminate(): Promise<ChaldeasClass>;
};
