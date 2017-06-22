// @flow
// from: https://chromedevtools.github.io/devtools-protocol/tot/Security/

/**
 * An internal certificate ID value.
 *
 * @type {Number}
 */
export type CertificateId = Number;

/**
 * The action to take when a certificate error occurs.
 * continue will continue processing the request and cancel will cancel the request.
 *
 * @type {String}
 */
export type CertificateErrorAction = "continue" | "cancel";

/**
 * The security level of a page or resource.
 *
 * @type {String}
 */
export type SecurityState = "unknown" | "neutral" | "insecure" | "warning" | "secure" | "info";

/**
 * An explanation of an factor contributing to the security state.
 *
 * @type {Object}
 */
export type SecurityStateExplanation = {
  securityState: SecurityState,
  summary: String,
  description: String,
  hasCertificate: boolean,
};

/**
 * Information about insecure content on the page.
 *
 * @type {Object}
 */
export type InsecureContentStatus = {
  ranMixedContent: boolean,
  displayedMixedContent: boolean,
  containedMixedForm: boolean,
  ranContentWithCertErrors: boolean,
  displayedContentWithCertErrors: boolean,
  ranInsecureContentStyle: SecurityState,
  displayedInsecureContentStyle: SecurityState,
};

/**
 * @type {Object}
 */
export type Security = {
  /**
   * Enables tracking security state changes.
   *
   * @return {Promise}
   */
  enable(): Promise<>;

  /**
   * Disables tracking security state changes.
   *
   * @return {Promise}
   */
  disable(): Promise<>;

  /**
   * Displays native dialog with the certificate details.
   *
   * @return {Promise}
   */
  showCertificateViewer(): Promise<>;

  /**
   * Handles a certificate error that fired a certificateError event.
   */
  handleCertificateError(arg: {
    eventId: Number, action: CertificateErrorAction
  }): Promise<>;

  /**
   * Enable/disable overriding certificate errors. If enabled,
   * all certificate error events need to be handled by the DevTools client and
   * should be answered with handleCertificateError commands.
   *
   * @param {Object}
   * @return {Promise}
   */
  setOverrideCertificateErrors(arg: { override: boolean }): Promise<>;

  /* events */

  /**
   * The security state of the page changed.
   *
   * @param {Function}
   */
  securityStateChanged(callback: (
    securityState: SecurityState,
    schemeIsCryptographic: boolean,
    explanations: Array<SecurityStateExplanation>,
    insecureContentStatus: InsecureContentStatus,
    summary?: String
  ) => void): void;

  /**
   * There is a certificate error.
   * If overriding certificate errors is enabled,
   * then it should be handled with the handleCertificateError command.
   * Note: this event does not fire if the certificate error has been allowed internally.
   *
   * @param {Function}
   */
  certificateError(callback: (
    eventId: Number, errorType: String, requestURL: String
  ) => void): void;
};
