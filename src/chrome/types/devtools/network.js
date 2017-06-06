// @flow

export type LoaderId = string;

export type Headers = Object;

export type network = {
  /* methods */
  enable(
    maxTotalBufferSize?: Number,
    maxResourceBufferSize?: Number
  ): Promise<{}>;
  disable(): Promise<{}>;
  setUserAgentOverride(userAgent: String): Promise<{}>;
  setExtraHTTPHeaders(headers: Headers): Promise<{}>;
};
