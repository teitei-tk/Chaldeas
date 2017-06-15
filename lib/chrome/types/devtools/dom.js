// @flow
// from : https://chromedevtools.github.io/devtools-protocol/tot/DOM/

import type { FrameId } from './page';
import type { RemoteObjectId, RemoteObject } from './runtime';

/**
 * Unique DOM node identifier.
 *
 * @type {Number}
 */
export type NodeId = Number;

/**
 * Unique DOM node identifier used to reference a node
 * that may not have been pushed to the front-end
 *
 * @type {Number}
 */
export type BackendNodeId = Number;

/**
 * Backend node with a friendly name.
 *
 * @type {Object}
 */
export type BackendNode = {
  nodeType: Number,
  nodeName: String,
  backendNodeId: BackendNodeId,
};

/**
 * Pseudo element type.
 *
 * @type {String}
 */
export type PseudoType = "first-line" | "first-letter" | "before" |
                         "after" | "backdrop" | "selection" | "first-line-inherited" |
                         "scrollbar" | "scrollbar-thumb" | "scrollbar-button" |
                         "scrollbar-track" | "scrollbar-track-piece" | "scrollbar-corner" |
                         "resizer" | "input-list-button";

/**
 * Shadow root type.
 *
 * @type {String}
 */
export type ShadowRootType = "user-agent" | "open" | "closed";

/**
 * DOM interaction is implemented in terms of mirror objects that represent the actual DOM nodes.
 * DOMNode is a base node mirror type.
 *
 * @type {Object}
 */
export type Node = {
  nodeId: NodeId,
  parentId?: NodeId,
  backendNodeId: BackendNodeId,
  nodeType: Number,
  nodeName: String,
  localName: String,
  nodeValue: String,
  childNodeCount?: Number,
  children?: Array<Node>,
  attributes?: Array<String>,
  documentURL?: String,
  baseURL?: String,
  publicId?: String,
  systemId?: String,
  internalSubset?: String,
  xmlVersion?: String,
  name?: String,
  value?: String,
  pseudoType?: PseudoType,
  shadowRootType?: ShadowRootType,
  frameId?: FrameId,
  contentDocument?: Node,
  shadowRoots?: Array<Node>,
  templateContent?: Node,
  pseudoElements?: Array<Node>,
  importedDocument?: Node,
  distributedNodes?: Array<BackendNode>,
  isSVG?: boolean,
};

/**
 * A structure holding an RGBA color.
 *
 * @type {Object}
 */
export type RGBA = {
  r: Number,
  g: Number,
  b: Number,
  a?: Number,
};

/**
 * An array of quad vertices, x immediately followed by y for each point, points clock-wise.
 *
 * @type {Array}
 */
export type Quad = Array<mixed>;

/**
 * Rectangle
 *
 * @type {Object}
 */
export type Rect = {
  x: Number,
  y: Number,
  width: Number,
  height: Number
};

/**
 * CSS Shape Outside details
 *
 * @type {Object}
 */
export type ShapeOutsideInfo = {
  bouds: Quad,
  shape: Array<mixed>,
  marginShape: Array<mixed>,
};

/**
 * Box model
 *
 * @type {Object}
 */
export type BoxModel = {
  content: Quad,
  padding: Quad,
  border: Quad,
  margin: Quad,
  width: Quad,
  height: Quad,
  shapeOutside: ShapeOutsideInfo,
};

/**
 * DOM events and methods
 *
 * @type {Object}
 */
export type DOM = {
  /**
   * Enables DOM agent for the given page.
   *
   * @return {Promise}
   */
  enable(): Promise<>;

  /**
   * Disables DOM agent for the given page.
   *
   * @return {Promise}
   */
  disable(): Promise<>;

  /**
   * Returns the root DOM node (and optionally the subtree) to the caller.
   *
   * @param {Object}
   * @return {Promise} Promise<{root: Node}>
   */
  getDocument(arg?: {depth?: Number, pierce?: boolean}): Promise<{root: Node}>;

  /**
   * Returns the root DOM node (and optionally the subtree) to the caller.
   *
   * @param {Object}
   * @return {Promise} Promise<{root: Node}>
   */
  getFlattenedDocument(arg?: {death?: Number, pierce?: boolean}): Promise<Array<Node>>;

  /**
   * Collects class names for the node with given id and all of it's child nodes.
   *
   * @param {Object}
   * @return {Promise} Promise<{classNames: Array<String>}>
   */
  collectClassNamesFromSubtree(arg: {nodeId: NodeId}): Promise<Array<String>>;

  /**
   * Requests that children of the node with
   * given id are returned to the caller in form of setChildNodes events
   * where not only immediate children are retrieved, but all children down to the specified depth.
   *
   * @param {Object}
   * @return {Promise}
   */
  requestChildNodes(arg: {nodeId: NodeId, depth?: Number, pierce?: boolean}): Promise<>;

  /**
   * Executes querySelector on a given node.
   *
   * @param {Object}
   * @return {Promise} Promise<{nodeId: NodeId}>
   */
  querySelector(arg: {
    nodeId: NodeId,
    selector: String
  }): Promise<{nodeId: NodeId}>;

  /**
   * Executes querySelectorAll on a given node.
   *
   * @param {Object}
   * @return {Promise} Promise<{nodeIds: NodeId}>
   */
  querySelectorAll(arg: {
    nodeId: NodeId,
    selector: String
  }): Promise<{nodeIds: Array<NodeId>}>;

  /**
   * Sets node name for a node with given id.
   *
   * @param {Object}
   * @return {Promise} Promise<{nodeId: NodeId}>
   */
  setNodeName(arg: {nodeId: NodeId, name: String}): Promise<{nodeId: NodeId}>;

  /**
   * Sets node value for a node with given id.
   *
   * @param {Object}
   * @return {Promise}
   */
  setNodeValue(arg: {nodeId: NodeId, name: String}): Promise<>;

  /**
   * Removes node with given id.
   *
   * @param {Object}
   * @return {Promise}
   */
  removeNode(arg: {nodeId: NodeId}): Promise<>;

  /**
   * Sets attribute for an element with given id.
   *
   * @param {Object}
   * @return {Promise}
   */
  setAttributeValue(arg: {nodeId: NodeId, name: String, value: String}): Promise<>;

  /**
   * Sets attributes on element with given id.
   * This method is useful when user edits some existing
   * attribute value and types in several attribute name/value pairs.
   *
   * @param {Object}
   * @return {Promise}
   */
  setAttributesAsText(arg: {nodeId: NodeId, text: String, name?: String}): Promise<>;

  /**
   * Removes attribute with given name from an element with given id.
   *
   * @param {Object}
   * @return {Promise}
   */
  removeAttribute(arg: {nodeId: NodeId, name: String}): Promise<>;

  /**
   * Returns node's HTML markup.
   *
   * @param {Object}
   * @return {Promise} Promise<{nodeHTML: String}>
   */
  getOuterHTML(arg: {nodeId: NodeId}): Promise<{outerHTML: String}>;

  /**
   * Sets node HTML markup, returns new node id.
   *
   * @param {Object}
   * @return {Promise}
   */
  setOuterHTML(arg: {nodeId: NodeId, outerHTML: String}): Promise<>;

  /**
   * Searches for a given string in the DOM tree.
   * Use getSearchResults to access search results or cancelSearch to end this search session.
   *
   * @param {Object}
   * @return {Promise} Promise<{searchid: String, resultCount: Number}>
   */
  performSearch(arg: {
    query: String, includeUserAgentShadowDOM?: boolean
  }): Promise<{searchId: String, resultCount: Number}>;

  /**
   * Returns search results
   * from given fromIndex to given toIndex from the sarch with the given identifier.
   *
   * @param {Object}
   * @return {Promise} Promise<{nodeIds: Array<NodeId>}>
   */
  getSearchResults(arg: {
    searchId: String,
    fromIndex: Number,
    toIndex: Number
  }): Promise<{nodeIds: Array<NodeId>}>;

  /**
   * Discards search results from the session with the given id.
   * getSearchResults should no longer be called for that search
   *
   * @param {Object}
   * @return {Promise}
   */
  discardSearchResults(arg: {searchId: String}): Promise<>;

  /**
   * Requests that the node is sent to the caller given the JavaScript node object reference.
   * All nodes that form the path from the node to the root are also sent to
   * the client as a series of setChildNodes notifications.
   *
   * @param {Object}
   * @return {Promise}
   */
  requestNode(arg: {objectId: RemoteObjectId}): Promise<{nodeId: NodeId}>;

  /**
   * Requests that the node is sent to the caller given its path.
   *
   * @param {Object}
   * @return {Promise}
   */
  pushNodeByPathToFrontend(arg: {path: String}): Promise<{nodeId: NodeId}>;

  /**
   * Requests that a batch of nodes is sent to the caller given their backend node ids.
   *
   * @param {Object}
   * @return {Promise}
   */
  pushNodesByBackendIdsToFrontend(arg: {
    backendNodeIds: Array<BackendNodeId>
  }): Promise<{nodeIds: Array<NodeId>}>;

  /**
   * Enables console to refer to the node with given id via
   * $x (see Command Line API for more details $x functions).
   *
   * @param {Object}
   * @return {Promise}
   */
  setInspectedNode(arg: {nodeId: NodeId}): Promise<>;

  /**
   * Resolves JavaScript node object for given node id.
   *
   * @param {Object}
   * @return {Promise}
   */
  resolveNode(arg: {nodeId: NodeId, objectGroup?: String}): Promise<{object: RemoteObject}>;

  /**
   * Returns attributes for the specified node.
   *
   * @param {Object}
   * @return {Promise} Promise<{attributes: Array<String>}>
   */
  getAttributes(arg: {nodeId: NodeId}): Promise<{attributes: Array<String>}>;

  /**
   * Creates a deep copy of the specified node and places
   * it into the target container before the given anchor.
   *
   * @param {Object}
   * @return {Promise}
   */
  copyTo(arg: {
    nodeId: NodeId, targetNodeId: NodeId, insertBeforeNodeId?: NodeId
  }): Promise<{nodeId: NodeId}>;


 /**
  * @param {Object}
  * @return {Promise}
  */
  moveTo(arg: {
   nodeId: NodeId, targetNodeId: NodeId, insertBeforeNodeId?: NodeId
 }): Promise<{nodeId: NodeId}>;

  /**
   * Undoes the last performed action.
   *
   * @return {Promise}
   */
  undo() : Promise<>;

  /**
   * Re-does the last undone action.
   *
   * @return {Promise}
   */
  redo(): Promise<>;

  /**
   * Marks last undoable state.
   *
   * @return {Promise}
   */
  markUndoableState(): Promise<>;

  /**
   * Focuses the given element.
   *
   * @param {Object}
   * @return {Promise}
   */
  focus(arg: {nodeId: NodeId}): Promise<>;

  /**
   * Sets files for the given file input element.
   *
   * @param {Object}
   * @return {Promise}
   */
  setFileInputFiles(arg: {nodeId: NodeId, files: Array<String>}): Promise<>;

  /**
   * Box model.
   *
   * @param {Object}
   * @return {Promise}
   */
  getBoxModel(arg: {nodeId: NodeId}): Promise<{model: BoxModel}>;

  /**
   * Returns node id at given location.
   *
   * @param {Object}
   * @return {Promise}
   */
  getNodeForLocation(arg: {
    x: Number, y: Number,
    includeUserAgentShadowDOM?: boolean
  }): Promise<{nodeId: NodeId}>;

  /**
   * Returns the id of the nearest ancestor that is a relayout boundary.
   *
   * @param {Object}
   * @return {Promise}
   */
  getRelayoutBoundary(arg: {nodeId: NodeId}): Promise<{nodeId: NodeId}>;

  /* events */

  /**
   * Fired when Document has been totally updated. Node ids are no longer valid.
   *
   * @param {Function}
   */
  documentUpdated(callback: Function): void;

  /**
   * Fired when backend wants to provide client with the missing DOM structure.
   * This happens upon most of the calls requesting node ids.
   *
   * @param {Function}
   */
  setChildNodes(callback: (parentId: NodeId, nodes: Array<Node>) => void): void;


  /**
   * Fired when Element's attribute is modified.
   *
   * @param {Function}
   */
  attributeModified(callback: (
    nodeId: NodeId, name: String, value: String
  ) => void): void;

  /**
   * Fired when Element's attribute is removed.
   *
   * @param {Function}
   */
  attributeRemoved(callback: (
    nodeId: NodeId, name: String
  ) => void): void;

  /**
   * Fired when Element's inline style is modified via a CSS property modification.
   *
   * @param {Function}
   */
  inlineStyleInvalidated(callback: (
    nodeIds: Array<NodeId>
  ) => void): void;

  /**
   * Mirrors DOMCharacterDataModified event.
   *
   * @param {Function}
   */
  characterDataModified(callback: (
    nodeId: NodeId, characterData: String
  ) => void): void;

  /**
   * Fired when Container's child node count has changed.
   *
   * @param {Function}
   */
  childNodeCountUpdated(callback: (
    nodeId: NodeId, childNodeCount: Number
  ) => void): void;

  /**
   * Mirrors DOMNodeInserted event.
   *
   * @param {Function}
   */
  childNodeInserted(callback: (
    parentNodeId: NodeId,
    previousNodeId: NodeId,
    node: Node
  ) => void): void;


  /**
   * Mirrors DOMNodeRemoved event.
   *
   * @param {Function}
   */
  childNodeRemoved(callback: (parentNodeId: NodeId, nodeId: NodeId) => void): void;

  /**
   * Called when shadow root is pushed into the element.
   *
   * @param {Function}
   */
  shadowRootPushed(callback: (hostId: NodeId, root: Node) => void): void;

  /**
   * Called when shadow root is popped from the element.
   *
   * @param {Function}
   */
  shadowRootPopped(callback: (hostId: NodeId, root: Node) => void): void;

  /**
   * Called when a pseudo element is added to an element.
   *
   * @param {Function}
   */
  pseudoElementAdded(callback: (parentNodeId: NodeId, pseudoElement: Node) => void): void;

  /**
   * Called when a pseudo element is removed from an element.
   *
   * @param {Function}
   */
  pseudoElementRemoved(callback: (parentNodeId: NodeId, pseudoElement: Node) => void): void;

  /**
   * Called when distrubution is changed.
   *
   * @param {Function}
   */
  distributedNodesUpdated(callback: (
    insertionPointId: NodeId, distributedNodes: Array<Node>
  ) => void): void;
};
