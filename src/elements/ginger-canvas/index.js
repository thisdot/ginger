import { LitElement, html, css } from 'lit-element';

import { gingerTheme } from '../../styles/theme';
import { gingerDataMixin } from './ginger-data-mixin';

/**
 * `ginger-canvas` a wrapper element for the ginger three.js canvas
 *
 * @customElement
 * @polymer
 */
class GingerCanvas extends gingerDataMixin(LitElement) {
  static get properties() {
    return {};
  }

  /**
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();
  }

  static get styles() {
    const styles = css``;
    return [gingerTheme, styles];
  }

  /**
   * Implement to describe the element's DOM using lit-html.
   * Use the element current props to return a lit-html template result
   * to render into the element.
   */
  render() {
    return html`<div id="canvas-wrapper"></div>`;
  }

  /**
   * Called when the element's DOM has been updated and rendered.
   * @param {*} changedProperties
   */
  updated(changedProperties) {
    if (this.shadowRoot.getElementById('ginger')) return;

    this.initGinger();
  }

  /**
   * Setup the Ginger three.js scene.
   */
  initGinger() {
    this.scene = new THREE.Scene();
  }
}

customElements.define('ginger-canvas', GingerCanvas);
