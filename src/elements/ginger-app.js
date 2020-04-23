import { LitElement, html, css } from 'lit-element';
import { gingerTheme } from '../styles/theme';

class GingerApp extends LitElement {
  static get styles() {
    const styles = css`
      .app-content {
        padding: 0;
      }
    `;
    return [gingerTheme, styles];
  }

  render() {
    return html`
      <ginger-navbar></ginger-navbar>
      <div class="app-content">TODO</div>
    `;
  }
}

customElements.define('ginger-app', GingerApp);
