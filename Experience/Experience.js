import * as THREE from "three";

import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import Resources from "./Utils/Resources.js";
import assets from "./Utils/assets.js";

import Camera from "./Camera.js";
import Theme from "./Theme.js";
import Renderer from "./Renderer.js";
import Preloader from "./Preloader.js";

import World from "./World/World.js";
import Controls from "./World/Controls.js";
import confetti from "canvas-confetti";


// var duration = 27 * 1000;

// var animationEnd = Date.now() + duration;
// var skew = 1;

// function randomInRange(min, max) {
//   return Math.random() * (max - min) + min;
// }


//   var timeLeft = animationEnd - Date.now();
//   var ticks = Math.max(200, 500 * (timeLeft / duration));
//   skew = Math.max(0.8, skew - 0.001);


// (function frame() {
//     var timeLeft = animationEnd - Date.now();
//     var ticks = Math.max(200, 500 * (timeLeft / duration));
//     skew = Math.max(0.8, skew - 0.001);
  
//     confetti({
//       particleCount: 1,
//       startVelocity: 0,
//       ticks: ticks,
//       origin: {
//         x: Math.random(),
//         // since particles fall down, skew start toward the top
//         y: (Math.random() * skew) - 0.2
//       },
//       colors: ['#fffff'],
//       shapes: ['circle'],
//       gravity: randomInRange(0.4, 0.6),
//       scalar: randomInRange(0.4, 1),
//       drift: randomInRange(-0.4, 0.4)
//     });
  
//     if (timeLeft > 0) {
//       requestAnimationFrame(frame);
//     }
//   }());

export default class Experience {
    static instance;
    constructor(canvas) {
        if (Experience.instance) {
            return Experience.instance;
        }
        Experience.instance = this;
        this.canvas = canvas;
        this.scene = new THREE.Scene();
        this.time = new Time();
        this.sizes = new Sizes();
        this.camera = new Camera();
        this.renderer = new Renderer();
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World();
        this.preloader = new Preloader();
       

        this.preloader.on("enablecontrols", () => {
            //this.confetti = new frame();
            this.controls = new Controls();
            
        });

        this.sizes.on("resize", () => {
            this.resize();
        });
        this.time.on("update", () => {
            this.update();
        });
    }

    resize() {
        // this.camera.resize();
        // this.world.resize();
        // this.renderer.resize();
    }

    update() {
        this.preloader.update();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        if (this.controls) {
            this.controls.update();
        }
    }
}
