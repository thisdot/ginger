import * as THREE from 'three';
import Clipboard from 'clipboard';
import { LitElement, html, css } from 'lit-element';

import { gingerDataMixin } from '../mixins/ginger-data-mixin';
import { gingerTheme } from '../styles/theme';

/**
 * `ginger-app` top-level element containing the ginger application
 *
 * @customElement
 * @polymer
 */
class GingerApp extends gingerDataMixin(LitElement) {
  static get properties() {
    return {
      // Asset metadata.
      textures: { type: Object },
      meshes: { type: Object },
      morphs: { type: Object },

      // Three.js scene objects.
      scene: { type: Object },
      camera: { type: THREE.PerspectiveCamera },
      renderer: { type: THREE.WebGLRenderer },
      ginger: { type: Object },
      leftEye: { type: Object },
      rightEye: { type: Object },

      // Internal state.
      queue: { type: Array },
      aspect: { type: Number },
      isMouseTracking: { type: Boolean },
      isTakingScreenshot: { type: Boolean },
      leftEyeOrigin: { type: Object },
      rightEyeOrigin: { type: Object },
      selected: { type: String },
      screenshotCounter: { type: Number },
    };
  }

  static get styles() {
    const styles = css`
      #thisdot-lab-header {
        position: absolute;
        top: 0;
        width: 100%;
        height: 65px;
        background-color: #fff;
      }
      #thisdot-lab-header div {
        min-width: 300px;
        text-align: center;
      }

      #thisdot-logo {
        width: 100px;
        height: 62px;
        background: url(images/thisdot.svg) no-repeat center center;
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
        #thisdot-lab-header div {
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
   * Instance of the element is created/upgraded. Use: initializing state,
   * set up event listeners, create shadow dom.
   * @constructor
   */
  constructor() {
    super();

    this.queue = [];
    this.aspect = 0;
    this.isMouseTracking = false;
    this.selected = 'eyes';
    this.screenshotCounter = 0;
  }

  /**
   * Implement to describe the element's DOM using lit-html.
   * Use the element current props to return a lit-html template result
   * to render into the element.
   */
  render() {
    return html`
      <div id="thisdot-lab-header" class="flex-container">
        <div>
          <a
            href="https://labs.thisdot.co/"
            id="thisdot-logo"
            title="This Dot Labs"
          ></a>
        </div>
        <div>
          <a id="hide-header" @click="${this.handleHideHeader}"
            >Hide This Header ❌</a
          >
        </div>
        <div>
          <a
            href="https://example.com"
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
              @change="${this.handleRangeSlide}"
              @input="${this.handleRangeSlide}"
            />
          </section>
          <section>
            <label for="morph">Morph Target</label>
            <select
              id="morph"
              class="select"
              @change="${this.handleMorphSelect}"
            >
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
          <div>
            <button id="share" type="button" @click="${this.handleShare}">
              Share Pose
            </button>
          </div>
          <div>
            <button
              id="screenshot"
              type="button"
              @click="${this.handleScreenshot}"
            >
              Take Screenshot
            </button>
          </div>
          <div>
            <button
              id="mousetrack"
              type="button"
              class="buttoncolor-OFF"
              @click="${this.handleMouseTrack}"
            >
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
            <button
              id="copytoclipboard-image"
              type="button"
              @click="${this.handleDownloadScreenshot}"
            >
              Download
            </button>
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

      <div id="counter" class="hidden"></div>
    `;
  }

  /**
   * Called when the element's DOM has been updated and rendered.
   * @param {*} changedProperties
   */
  updated(changedProperties) {
    if (this.shadowRoot.querySelector('#renderer>canvas')) return;

    this.init();
  }

  /**
   * Called when the slider is moved and updates the selected morph target.
   * @param {Event} event
   */
  handleRangeSlide(event) {
    const progress = event.target.valueAsNumber;
    this.updateMorph(null, progress);
    this.morph();
  }

  /**
   * Changes the selected morph target.
   * @param {Event} event
   */
  handleMorphSelect(event) {
    const value = event.target.value;
    this.select(value);
  }

  /**
   * Displays the share modal.
   * @param {Event} event
   */
  handleShare(event) {
    const modal = this.shadowRoot.getElementById('share-modal');
    modal.classList.remove('hidden');

    const shareLink = this.shadowRoot.getElementById('share-link');
    shareLink.value = this.generateShareLink();
  }

  /**
   * Takes a screenshot after finishing a countdown.
   * @param {Event} event
   */
  handleScreenshot(event) {
    const seconds = 3;
    this.countdownScreenshot(seconds);
  }

  /**
   * Toggles Ginger's mouse tracking. If enabled her head follows the cursor.
   * @param {Event} event
   */
  handleMouseTrack(event) {
    this.isMouseTracking = !this.isMouseTracking;

    const elButton = this.shadowRoot.getElementById('mousetrack');
    const state = this.isMouseTracking ? 'ON' : 'OFF';
    elButton.textContent = `Follow ${state}`;
    elButton.className = `buttoncolor-${state}`;
  }

  /**
   * Points Ginger's head at the cursor whenever the mouse moves.
   * @param {Event} event
   */
  handleMouseMove(event) {
    // Mock a touch event so we don't need to handle both mouse and touch events
    // inside the look at function.
    const data = {
      touches: [{ clientX: event.clientX, clientY: event.clientY }],
      type: 'mousemove',
    };
    this.lookAtCursor(data);
  }

  /**
   * Points Ginger's head at the cursor whenever the touch point moves.
   * @param {Event} event
   */
  handleTouchMove(event) {
    this.lookAtCursor(event);
  }

  /**
   * Called when the window is resized.
   * @param {Event} event
   */
  handleWindowResize(event) {
    this.recalculateAspect();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  /**
   * Called after the clipboard library successfully copies the share text.
   * @param {Event} event
   */
  handleCopy(event) {
    const clipboardButton = this.shadowRoot.getElementById(
      'copytoclipboard-share'
    );
    clipboardButton.textContent = 'Copied!';
    setTimeout(() => {
      clipboardButton.textContent = 'Copy to Clipboard';
    }, 2000);
  }

  /**
   * Downloads the screenshot that was taken last.
   * @param {Event} event
   */
  handleDownloadScreenshot(event) {
    const image = this.shadowRoot.getElementById('screenshot-image').src;
    const timestamp = Math.floor(Date.now() / 1000);
    const download = document.createElement('a');
    download.href = image;
    download.download = 'ginger-' + timestamp + '.jpg';
    download.click();
    download.remove();
  }

  /**
   * Removes the site header when the hide link is clicked.
   * @param {Event} event
   */
  handleHideHeader(event) {
    this.shadowRoot.getElementById('thisdot-lab-header').remove();
  }

  /**
   * Shows the screenshot counter modal and takes a screenshot after finishing
   * a countdown.
   * @param {number} seconds
   */
  async countdownScreenshot(seconds) {
    if (this.isTakingScreenshot) return;

    try {
      this.isTakingScreenshot = true;
      const counter = this.shadowRoot.getElementById('counter');
      counter.classList.remove('hidden');

      while (seconds > 0) {
        this.screenshotCounter = seconds;
        counter.innerHTML = seconds; // FIXME
        await new Promise((resolve) => setTimeout(resolve, 1000));
        seconds -= 1;
      }
      this.takeScreenshot();

      counter.classList.add('hidden');
    } finally {
      this.isTakingScreenshot = false;
    }
  }

  /**
   * Show the screenshot modal, take a screenshot, and display it in the modal.
   */
  takeScreenshot() {
    const modal = this.shadowRoot.getElementById('screenshot-modal');
    modal.classList.remove('hidden');

    const image = this.shadowRoot.getElementById('screenshot-image');
    image.src = this.renderer.domElement.toDataURL('image/jpeg', 0.8);
  }

  /**
   * Points ginger's head at the cursor.
   * @param {Event} event
   */
  lookAtCursor(event) {
    if (event.type == 'touchmove') {
      event.preventDefault();
    }

    if (this.isMouseTracking) {
      const mouse = new THREE.Vector3(
        (event.touches[0].clientX / window.innerWidth) * 2 - 1,
        -(event.touches[0].clientY / window.innerHeight) * 2 + 1,
        0.5
      );
      mouse.unproject(this.camera);

      // When getting the direction, flip the x and y axis or the eyes will
      // look the wrong direction.
      let direction = mouse.sub(this.camera.position).normalize();
      direction.x *= -1;
      direction.y *= -1;

      const distance = this.camera.position.z / direction.z;
      const position = this.camera.position
        .clone()
        .add(direction.multiplyScalar(distance));

      // Track the cursor with the eyes with no adjustments.
      this.leftEye.lookAt(position);
      this.rightEye.lookAt(position);

      // Track the cursor with the head, but dampened. If we don't dampen the
      // head tracking then she will always try to face the cursor head on.
      this.ginger.lookAt(position);
      this.ginger.rotation.x /= 5;
      this.ginger.rotation.y /= 5;
      this.ginger.rotation.z = 0;
    }
  }

  /**
   * Calculates a new aspect using the size of the window and generate a new
   * projection matrix for the main perspective camera.
   */
  recalculateAspect() {
    this.aspect = window.innerWidth / window.innerHeight;
    this.camera.aspect = this.aspect;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Adds a callback to the action queue that will be executed right before the
   * next frame is rendered.
   * @param {Function} callback
   * @param {Object} args
   */
  queueNextFrame(callback, args) {
    this.queue.push({
      callback: callback,
      args: args,
    });
  }

  /**
   * The "game" loop where actions are executed and the renderer is invoked.
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));

    let i = this.queue.length;
    while (i--) {
      const args = this.queue[i].args;
      const callback = this.queue[i].callback;
      callback(args);
      this.queue.splice(i, 1);
    }

    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Selects a morph for editing.
   * @param {string} morph
   */
  select(morph) {
    let selectControl;
    let found = false;

    for (const control in this.controls) {
      if (this.controls[control].control == morph) {
        this.selected = morph;
        selectControl = this.controls[control];
        found = true;
        break;
      }
    }
    if (!found) {
      return;
    }

    const min = selectControl.min;
    const max = selectControl.max;
    const percent =
      ((selectControl.morph.value - min) * 100) / (max - min) / 100;

    const slider = this.shadowRoot.getElementById('range');
    slider.value = percent;
  }

  /**
   * Apply morph target influences to the objects in the scene.
   */
  morph() {
    for (let item in this.morphs) {
      const morphTarget = this.morphs[item];

      if (morphTarget.behavior !== undefined) {
        morphTarget.behavior.bind(this)(morphTarget.value);
      }

      // Find which morph needs to have the value applied to. This is determined
      // using thresholds.
      let target;
      for (let i = 0; i < morphTarget.thresholds.length; i++) {
        const threshold = morphTarget.thresholds[i];

        if (morphTarget.value >= threshold) {
          target = i;
        }
      }

      for (let i = 0; i < morphTarget.targets.length; i++) {
        const index = morphTarget.targets[i];
        let value = 0;

        if (morphTarget.targets[i] === morphTarget.targets[target]) {
          value = Math.abs(morphTarget.value);
        }
        morphTarget.mesh.mesh.morphTargetInfluences[index] = value;
      }
    }
  }

  /**
   * Updates a morphs current value by name.
   * @param {string} morph
   * @param {number} progress
   */
  updateMorph(morph, progress) {
    let selectControl;
    let found = false;

    morph = morph || this.selected;

    for (const control in this.controls) {
      if (this.controls[control].control == morph) {
        selectControl = this.controls[control];
        found = true;
        break;
      }
    }
    if (!found) {
      return;
    }

    const min = selectControl.min;
    const max = selectControl.max;
    const value = (max - min) * progress + min;
    selectControl.morph.value = value;
  }

  /**
   * Returns a share link to share the currently morphed model.
   */
  generateShareLink() {
    const params = [];
    const url = `${location.protocol}//${location.host}${location.pathname}`;

    for (const control in this.controls) {
      const selectControl = this.controls[control];
      const min = selectControl.min;
      const max = selectControl.max;
      const percent =
        ((selectControl.morph.value - min) * 100) / (max - min) / 100;

      params.push([selectControl.control, percent.toString()]);
    }

    const paramsString = new URLSearchParams(params).toString();

    return `${url}?${paramsString}`;
  }

  /**
   * Setup the Ginger three.js scene.
   */
  async init() {
    // Initialize the clipboard library used for the copy button.
    const clipboardButton = this.shadowRoot.getElementById(
      'copytoclipboard-share'
    );
    const clipboard = new Clipboard(clipboardButton, {
      target: (trigger) => this.shadowRoot.getElementById('share-link'),
    });
    clipboard.on('success', this.handleCopy.bind(this));

    const overlay = this.shadowRoot.querySelectorAll('.full-shadow');
    for (let i = 0; i < overlay.length; i++) {
      overlay[i].addEventListener('click', function (e) {
        var parent = e.target.parentNode;
        parent.classList.add('hidden');
      });
    }

    this.scene = new THREE.Scene();
    this.aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(55, this.aspect, 0.1, 1000);
    this.camera.position.y = 5;
    this.camera.position.z = 10;

    // Create a renderer the size of the window and attach it to the DOM.
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.shadowRoot
      .getElementById('renderer')
      .appendChild(this.renderer.domElement);

    // Allow viewport resizing whenever the window resizes.
    window.addEventListener('resize', this.handleWindowResize.bind(this));

    // Setup mouse events so ginger's eyes can track the mouse.
    const renderer = this.shadowRoot.getElementById('renderer');
    renderer.addEventListener('mousemove', this.handleMouseMove.bind(this));
    renderer.addEventListener('touchmove', this.handleTouchMove.bind(this));

    // Set the initial values of ginger to the values in the GET params.
    const shareParams = new URLSearchParams(window.location.search);
    for (const control in this.controls) {
      const selectedControl = this.controls[control];
      if (shareParams.get(selectedControl.control) != null) {
        this.updateMorph(
          selectedControl.control,
          shareParams.get(selectedControl.control)
        );
      }
    }

    // Add everything to the scene.

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 0, 1);
    this.scene.add(directionalLight);

    this.scene.add(this.ginger);

    this.leftEye.position.set(0.96, 6.169, 1.305);
    this.ginger.add(this.leftEye);
    this.rightEye.position.set(-0.96, 6.169, 1.305);
    this.ginger.add(this.rightEye);

    await this.loadAssets();
    this.select(this.selected);
    this.animate();
    this.morph();
  }
}

customElements.define('ginger-app', GingerApp);
