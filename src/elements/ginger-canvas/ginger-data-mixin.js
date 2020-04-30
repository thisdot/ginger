export const gingerDataMixin = (base) =>
  class extends base {
    constructor() {
      super();

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
    }

    linear(t, b, c, d) {
      return (c * t) / d + b;
    }
  };
