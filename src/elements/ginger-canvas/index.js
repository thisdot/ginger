import { LitElement, html, css } from 'lit-element';

import { gingerTheme } from '../../styles/theme';
import { gingerDataMixin } from './ginger-data-mixin';
import { Ginger } from './ginger';

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
    const styles = css`
      #sv-lab-header {
        position: absolute;
        top: 0;
        width: 100%;
        height: 65px;
        background-color: #fff;
      }
      #sv-lab-header div {
        min-width: 300px;
        text-align: center;
      }

      #sv-logo {
        width: 100px;
        height: 62px;
        background: url(images/sv-green.svg) no-repeat center center;
        background-size: contain;
        display: block;
        margin: auto;
      }

      #hide-header {
        color: #2732ff;
        text-decoration: none;
        border-bottom: 1px solid #2732ff;
        font-size: 14px;
      }

      #screenshot-image {
        width: 100%;
        height: calc(100% - 60px);
      }

      #counter {
        position: absolute;
        top: calc(50% - 50px - 75px);
        left: calc(50% - 100px);
        width: 200px;
        height: 100px;
        padding: 5px;
        line-height: 100px;
        text-align: center;
        font-size: 64px;
        border-radius: 25px;
        background: rgba(0, 0, 0, 0.75);
        color: white;

        -webkit-user-select: none; /* Chrome all / Safari all */
        -moz-user-select: none; /* Firefox all */
        -ms-user-select: none; /* IE 10+ */
        user-select: none; /* Likely future */
      }

      .hidden {
        display: none;
      }

      .panel {
        position: absolute;
        width: 100%;
        height: 145px;
        bottom: 0;
        background: rgba(90, 90, 90, 1);
      }

      label {
        padding: 10px 0 0 1.2em;
        display: block;
        color: #fff;
      }

      .full-shadow {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0, 0, 0, 0.5);
      }

      .modal {
        position: absolute;
        z-index: 100;
        top: 25%;
        left: 25%;
        right: 25%;
        padding: 15px;
        border-radius: 5px;
        background: rgb(100, 100, 100);
        color: #fafafa;
      }

      .modal h1,
      .modal h2,
      .modal h3,
      .modal h4 {
        margin-top: 0;
      }

      .clearfix {
        clear: both;
      }

      button,
      .button {
        padding: 10px;
        margin: 0 16px;
        outline: none;
        border: 1px solid rgb(90, 90, 90);
        background: #9ed639;
        color: #000;
        min-width: 150px;
        text-decoration: none;
        border-radius: 3px;
      }

      .buttoncolor-ON {
        background: #9ed639;
      }

      .buttoncolor-OFF {
        background: #ff6c70;
      }

      button:active,
      .button:active {
        background: rgb(90, 90, 90);
      }

      button:active:hover,
      .button:active:hover {
        background: rgb(80, 80, 80);
      }

      #range {
        width: 90%;
        height: 55px;
        margin: 0 20px;
      }

      .range {
        -webkit-appearance: none;
        background: transparent;
      }

      .range::-moz-focus-outer {
        border: 0;
      }

      .range::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border: 1px solid rgb(70, 70, 70);
        border-radius: 0;
        background: rgb(120, 120, 120);
        margin-top: -4px;
      }

      .range::-moz-range-thumb {
        height: 24px;
        width: 24px;
        border: 1px solid rgb(70, 70, 70);
        border-radius: 0;
        background: rgb(120, 120, 120);
      }

      .range::-ms-thumb {
        height: 24px;
        width: 24px;
        border: 1px solid rgb(70, 70, 70);
        border-radius: 0;
        background: rgb(120, 120, 120);
      }

      .range::-webkit-slider-runnable-track {
        width: 100%;
        height: 15px;
        background: rgb(70, 70, 70);
      }

      .range::-moz-range-track {
        width: 100%;
        height: 15px;
        background: rgb(70, 70, 70);
      }

      .range::-ms-track {
        width: 100%;
        height: 15px;
        background: rgb(70, 70, 70);
      }

      .range:focus {
        outline: none;
      }

      .range::-ms-track {
        width: 100%;
        cursor: pointer;
        background: transparent;
        border-color: transparent;
        color: transparent;
      }

      .select {
        -webkit-appearance: none;
        -moz-appearance: none;
        width: 90%;
        height: 35px;
        margin: 10px 0 20px 20px;
        outline: none;
        background: rgb(70, 70, 70);
        color: #fafafa;
        border: 1px solid rgb(60, 60, 60);
      }

      .select::-moz-focus-outer {
        border: 0;
      }

      .flex-container {
        display: -webkit-flex;
        display: flex;
        -webkit-flex-direction: row; /* works with row or column */
        flex-direction: row;
        -webkit-align-items: center;
        align-items: center;
        -webkit-justify-content: center;
        justify-content: center;
      }

      .flex-container section {
        flex: 1 1 0;
      }

      textarea {
        width: 100%;
        height: 50px;
      }

      .modal button {
        margin: 0;
        vertical-align: text-top;
      }

      #screenshot-modal .modal {
        bottom: 10%;
      }

      @media (max-width: 580px) {
        .select {
          margin: 10px;
        }
        button {
          padding: 10px;
          margin: 0 2px;
          min-width: initial;
        }
        .button {
          margin: auto;
        }
        #sv-lab-header div {
          min-width: 100px;
          flex: 1 1 0;
        }
        .modal {
          left: 5%;
          right: 5%;
        }
        #screenshot-image {
          width: auto;
          margin: auto;
          display: block;
        }

        label {
          text-align: center;
        }
      }
    `;
    return [gingerTheme, styles];
  }

  /**
   * Implement to describe the element's DOM using lit-html.
   * Use the element current props to return a lit-html template result
   * to render into the element.
   */
  render() {
    return html`
      <div id="sv-lab-header" class="flex-container">
        <div>
          <a
            href="https://www.stickmanventures.com/"
            id="sv-logo"
            title="Stickman Ventures"
          ></a>
        </div>
        <div><a id="hide-header">Hide This Header ❌</a></div>
        <div>
          <a
            href="https://www.stickmanventures.com/blog/2016/01/12/bringing-the-ginger-morph-target-demo-into-the-progressive-web-app-future/"
            class="button"
            title="Learn how we built this"
            >Learn More &raquo;</a
          >
        </div>
      </div>

      <div id="renderer"></div>

      <div class="panel">
        <div class="flex-container">
          <section>
            <!-- Controls for changing the morphs. -->
            <label for="range">Range of Motion</label>
            <input
              id="range"
              class="range"
              type="range"
              min="0"
              max="1"
              step="0.01"
              value="0"
            />
          </section>
          <section>
            <label for="morph">Morph Target</label>
            <select id="morph" class="select">
              <option value="eyes">Eyes</option>
              <option value="expression">Expression</option>
              <option value="jawrange">Jaw Height</option>
              <option value="jawtwist">Jaw Twist</option>
              <option value="symmetry">Symmetry</option>
              <option value="lipcurl">Lip Curl</option>
              <option value="lipsync">Lip Sync</option>
              <option value="sex">Face Structure</option>
              <option value="width">Jaw Width</option>
              <option value="tongue">Tongue</option>
            </select>
          </section>
        </div>
        <div class="flex-container">
          <div><button id="share" type="button">Share Pose</button></div>
          <div>
            <button id="screenshot" type="button">Take Screenshot</button>
          </div>
          <div>
            <button id="mousetrack" type="button" class="buttoncolor-OFF">
              Follow OFF
            </button>
          </div>
        </div>
      </div>

      <div id="screenshot-modal" class="hidden">
        <div class="full-shadow"></div>
        <div class="modal">
          <h1>
            Screenshot
            <button id="copytoclipboard-image" type="button">Download</button>
          </h1>
          <img id="screenshot-image" />
        </div>
      </div>

      <div id="share-modal" class="hidden">
        <div class="full-shadow"></div>
        <div class="modal">
          <h1>
            Share Link
            <button
              id="copytoclipboard-share"
              data-clipboard-target="#share-link"
              type="button"
            >
              Copy to Clipboard
            </button>
          </h1>
          <textarea id="share-link"></textarea>
        </div>
      </div>

      <div id="version-modal" class="hidden">
        <div class="full-shadow"></div>
        <div class="modal">
          <h1>New Version: Ginger v2.1.0</h1>
          <p>➡ Now a Progressive Web App - Use "Add to Homescreen"</p>
          <p>➡ Accessibility updates for color contract</p>
          <p>
            ➡ 100/100 in
            <a
              href="https://github.com/GoogleChrome/lighthouse"
              style="color:#ffffff"
              >Lighthouse</a
            >
            audit
          </p>
        </div>
      </div>

      <div id="counter" class="hidden"></div>
    `;
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
    var version = '2';

    this.shadowRoot
      .getElementById('hide-header')
      .addEventListener('click', (e) => {
        this.shadowRoot.getElementById('sv-lab-header').remove();
      });

    // this.shadowRoot
    //   .getElementById('copytoclipboard-image')
    //   .addEventListener('click', function (e) {
    //     var image = this.shadowRoot.getElementById('screenshot-image').src;
    //     var timestamp = Math.floor(Date.now() / 1000);
    //     var download = this.shadowRoot.createElement('a');
    //     download.href = image;
    //     download.download = 'sv-ginger-' + timestamp + '.jpg';
    //     download.click();
    //   });

    var overlay = this.shadowRoot.querySelectorAll('.full-shadow');
    for (var i = 0; i < overlay.length; i++) {
      overlay[i].addEventListener('click', function (e) {
        var parent = e.target.parentNode;
        parent.classList.add('hidden');
      });
    }

    var getVersion = localStorage.getItem('version');
    if (getVersion === undefined || getVersion === null) {
      this.shadowRoot
        .getElementById('version-modal')
        .classList.remove('hidden');
      localStorage.setItem('version', version);
    } else {
      if (getVersion !== version) {
        this.shadowRoot
          .getElementById('version-modal')
          .classList.remove('hidden');
        localStorage.setItem('version', version);
      }
    }

    this.ginger = new Ginger(this.shadowRoot);
    this.ginger.init();
  }
}

customElements.define('ginger-canvas', GingerCanvas);
