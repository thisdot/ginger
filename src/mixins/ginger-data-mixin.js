import * as THREE from 'three';

/**
 * A mixin that contains helper functions to load 3D assets and weights and
 * other metadata for the Ginger morph targets.
 * @param {*} base
 */
export const gingerDataMixin = (base) =>
  class extends base {
    constructor() {
      super();

      this.ginger = new THREE.Object3D();
      this.leftEye = new THREE.Object3D();
      this.rightEye = new THREE.Object3D();

      this.textures = {
        gingercolor: {
          path: 'static/model/ginger_color.jpg',
          texture: null,
        },
        gingercolornormal: {
          path: 'static/model/ginger_norm.jpg',
          texture: null,
        },
      };
      this.meshes = {
        gingerhead: {
          path: 'static/model/gingerhead.json',
          texture: this.textures.gingercolor,
          normalmap: this.textures.gingercolornormal,
          morphTargets: true,
          mesh: null,
        },
        gingerheadband: {
          path: 'static/model/gingerheadband.json',
          texture: this.textures.gingercolor,
          normalmap: null,
          morphTargets: false,
          mesh: null,
        },
        gingerheadphones: {
          path: 'static/model/gingerheadphones.json',
          texture: null,
          normalmap: null,
          color: new THREE.Color('rgb(180, 180, 180)'),
          morphTargets: false,
          mesh: null,
        },
        gingerlefteye: {
          path: 'static/model/gingerlefteye.json',
          texture: this.textures.gingercolor,
          normalmap: null,
          morphTargets: false,
          parent: this.leftEye,
          position: new THREE.Vector3(-0.96, -6.169, -1.305),
          mesh: null,
        },
        gingerrighteye: {
          path: 'static/model/gingerrighteye.json',
          texture: this.textures.gingercolor,
          normalmap: null,
          morphTargets: false,
          parent: this.rightEye,
          position: new THREE.Vector3(0.96, -6.169, -1.305),
          mesh: null,
        },
        gingerteethbot: {
          path: 'static/model/gingerteethbot.json',
          texture: this.textures.gingercolor,
          normalmap: null,
          morphTargets: true,
          mesh: null,
        },
        gingerteethtop: {
          path: 'static/model/gingerteethtop.json',
          texture: this.textures.gingercolor,
          normalmap: null,
          morphTargets: true,
          mesh: null,
        },
        gingertongue: {
          path: 'static/model/gingertongue.json',
          texture: this.textures.gingercolor,
          normalmap: null,
          morphTargets: true,
          mesh: null,
        },
      };
      this.morphs = {
        eyes: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [0, 1, 7, 8],
          thresholds: [-1, 0, 0, 0.1],

          leftEyeOrigin: null,
          rightEyeOrigin: null,

          // Move the eyes based on the sex of ginger. Man eyes are smaller and
          // are moved backed to fit the appearance.
          behavior: function (value) {
            var sex = this.morphs.sex.value;
            var recede = this.linear(sex, 0, -0.125, 1);

            if (this.leftEyeOrigin === null) {
              this.leftEyeOrigin = this.leftEye.position.clone();
            }
            if (this.rightEyeOrigin === null) {
              this.rightEyeOrigin = this.rightEye.position.clone();
            }

            this.leftEye.position.x = this.leftEyeOrigin.x + recede;
            this.leftEye.position.z = this.leftEyeOrigin.z + recede;
            this.rightEye.position.x = this.rightEyeOrigin.x - recede;
            this.rightEye.position.z = this.rightEyeOrigin.z + recede;
          },
        },
        eyelookside: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [2, 3],
          thresholds: [-1, 0],
        },
        expression: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [20, 9],
          thresholds: [-1, 0],
        },
        jawrange: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [10, 11],
          thresholds: [0, 0],

          // Move the tongue down when moving the jaw.
          behavior: function (value) {
            this.morphs.tonguedown.value = value;
          },
        },
        jawtwist: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [12, 13],
          thresholds: [-1, 0],

          // Move the tongue down when moving the jaw.
          behavior: function (value) {
            this.morphs.tonguetwist.value = value;
          },
        },
        symmetry: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [14],
          thresholds: [0],
        },
        lipcurl: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [15, 16],
          thresholds: [-1, 0],
        },
        lipsync: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [17, 18, 19],
          thresholds: [-1, 0, 0.5],
        },
        sex: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [22],
          thresholds: [0],
        },
        width: {
          value: 0,
          mesh: this.meshes.gingerhead,
          targets: [23, 24],
          thresholds: [-1, 0],
        },
        tongue: {
          value: 0,
          mesh: this.meshes.gingertongue,
          targets: [4],
          thresholds: [0],
        },
        tonguedown: {
          value: 0,
          mesh: this.meshes.gingertongue,
          targets: [1],
          thresholds: [0],
        },
        tonguetwist: {
          value: 0,
          mesh: this.meshes.gingertongue,
          targets: [2, 3],
          thresholds: [-1, 0],
        },
        teethopenbot: {
          value: 0,
          mesh: this.meshes.gingerteethbot,
          targets: [3, 0],
          thresholds: [0, 0],

          behavior: function (value) {
            var jawrange = this.morphs.jawrange.value;
            this.morphs.teethopenbot.value = jawrange;
          },
        },
        teethopentop: {
          value: 0,
          mesh: this.meshes.gingerteethtop,
          targets: [3, 0],
          thresholds: [0, 0],

          behavior: function (value) {
            var jawrange = this.morphs.jawrange.value;
            this.morphs.teethopentop.value = jawrange;
          },
        },
        teethsidebot: {
          value: 0,
          mesh: this.meshes.gingerteethbot,
          targets: [1, 2],
          thresholds: [-1, 0],

          behavior: function (value) {
            var jawtwist = this.morphs.jawtwist.value;
            this.morphs.teethsidebot.value = jawtwist;
          },
        },
        teethsidetop: {
          value: 0,
          mesh: this.meshes.gingerteethtop,
          targets: [1, 2],
          thresholds: [-1, 0],

          behavior: function (value) {
            var jawtwist = this.morphs.jawtwist.value;
            this.morphs.teethsidetop.value = jawtwist;
          },
        },
      };
      this.controls = {
        eyes: {
          control: 'eyes',
          min: -1,
          max: 1,
          morph: this.morphs.eyes,
        },
        expression: {
          control: 'expression',
          min: -1,
          max: 1,
          morph: this.morphs.expression,
        },
        jawrange: {
          control: 'jawrange',
          min: 0,
          max: 1,
          morph: this.morphs.jawrange,
        },
        jawtwist: {
          control: 'jawtwist',
          min: -1,
          max: 1,
          morph: this.morphs.jawtwist,
        },
        symmetry: {
          control: 'symmetry',
          min: 0,
          max: 1,
          morph: this.morphs.symmetry,
        },
        lipcurl: {
          control: 'lipcurl',
          min: -1,
          max: 1,
          morph: this.morphs.lipcurl,
        },
        lipsync: {
          control: 'lipsync',
          min: -1,
          max: 1,
          morph: this.morphs.lipsync,
        },
        sex: {
          control: 'sex',
          min: 0,
          max: 1,
          morph: this.morphs.sex,
        },
        width: {
          control: 'width',
          min: -1,
          max: 1,
          morph: this.morphs.width,
        },
        tongue: {
          control: 'tongue',
          min: 0,
          max: 1,
          morph: this.morphs.tongue,
        },
      };
    }

    /**
     * Loads in all required assets from the network.
     */
    async loadAssets() {
      const texturesPromise = this.loadTextures();
      const meshesPromise = this.loadMeshes();

      await meshesPromise;

      // Add loaded meshes into the scene and apply initial transformations. We
      // do the copies during the next animation frame so THREE doesn't
      // overwrite them during initialization.
      for (let mesh in this.meshes) {
        if (this.meshes[mesh].position !== undefined) {
          const args = {
            mesh: this.meshes[mesh],
          };
          this.queueNextFrame((args) => {
            args.mesh.mesh.position.copy(args.mesh.position);
          }, args);
        }

        if (this.meshes[mesh].parent !== undefined) {
          this.meshes[mesh].parent.add(this.meshes[mesh].mesh);
        } else {
          this.ginger.add(this.meshes[mesh].mesh);
        }
      }

      await Promise.all(texturesPromise, meshesPromise);
    }

    /**
     * Loads a texture over the network.
     * @param {THREE.TextureLoader} textureLoader
     * @param {String} path
     * @param {String} mesh
     */
    async loadTexture(textureLoader, path, texture) {
      const loadedTexture = await new Promise((resolve, reject) => {
        textureLoader.load(path, (loadedTexture) => {
          resolve(loadedTexture);
        });
      }).catch((err) => {
        throw err;
      });
      this.textures[texture].texture = loadedTexture;
    }

    /**
     * Loads in all required textures over the network.
     */
    async loadTextures() {
      const textureLoader = new THREE.TextureLoader();
      const promises = [];

      for (let texture in this.textures) {
        const path = this.textures[texture].path;
        promises.push(this.loadTexture(textureLoader, path, texture));
      }

      return Promise.all(promises);
    }

    /**
     * Loads a mesh over the network and creates the THREE objects for it.
     * @param {THREE.JSONLoader} jsonLoader
     * @param {String} path
     * @param {String} mesh
     */
    async loadMesh(jsonLoader, path, mesh) {
      const geometry = await new Promise((resolve, reject) => {
        jsonLoader.load(path, (geometry) => {
          resolve(geometry);
        });
      }).catch((err) => {
        throw err;
      });

      let texture, normalmap, color;
      if (this.meshes[mesh].texture !== null) {
        texture = this.meshes[mesh].texture.texture;
      }
      if (this.meshes[mesh].normalmap !== null) {
        normalmap = this.meshes[mesh].normalmap.texture;
      }
      if (this.meshes[mesh].color !== null) {
        color = this.meshes[mesh].color;
      }

      const material = new THREE.MeshLambertMaterial({
        map: texture,
        color: color,
        normalmap: normalmap,
        vertexColors: THREE.FaceColors,
        shading: THREE.SmoothShading,
        morphTargets: this.meshes[mesh].morphTargets,
      });
      this.meshes[mesh].mesh = new THREE.Mesh(geometry, material);
    }

    /**
     * Loads in all required meshes over the network.
     */
    async loadMeshes() {
      const jsonLoader = new THREE.LegacyJSONLoader();
      const promises = [];

      for (let mesh in this.meshes) {
        const path = this.meshes[mesh].path;
        promises.push(this.loadMesh(jsonLoader, path, mesh));
      }

      return Promise.all(promises);
    }

    /**
     * Linear easing function.
     * @param {*} t current time
     * @param {*} b start value
     * @param {*} c change in value
     * @param {*} d duration
     */
    linear(t, b, c, d) {
      return (c * t) / d + b;
    }
  };
