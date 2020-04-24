import { LitElement, html, css } from 'lit-element';

import { gingerTheme } from '../styles/theme';
import {} from './ginger-canvas';

/**
 * `ginger-app` top-level element containing the ginger application
 *
 * @customElement
 * @polymer
 */
class GingerApp extends LitElement {
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
    return html`
      <ginger-navbar></ginger-navbar>
      <ginger-canvas></ginger-canvas>
    `;
  }
}

customElements.define('ginger-app', GingerApp);
