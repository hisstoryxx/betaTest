import * as THREE from "three";

import { EventEmitter } from "events";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import Experience from "../Experience.js";

export default class Resources extends EventEmitter {
    constructor(assets) {
        super();
        this.experience = new Experience();
        this.renderer = this.experience.renderer;

        this.assets = assets;

        this.items = {};
        this.queue = this.assets.length;
        this.loaded = 0;
        
//         var AudioContext;
//         var audioContext;

//         window.onload = function() {
//             navigator.mediaDevices.getUserMedia({ audio: true }).then(() => {
//                 AudioContext = window.AudioContext || window.webkitAudioContext;
//                 audioContext = new AudioContext();
//             }).catch(e => {
//                 console.error(`Audio permissions denied: ${e}`);
//             });
//         }
//         window.addEventListener('pageshow', () => {
//     document.getElementById('audio').muted = false
//     document.getElementById('audio').play()
//   })

        this.setLoaders();
        this.startLoading();
    }

    setLoaders() {
        this.loaders = {};
        this.loaders.gltfLoader = new GLTFLoader();
        this.loaders.dracoLoader = new DRACOLoader();
        this.loaders.dracoLoader.setDecoderPath("/draco/");
        this.loaders.gltfLoader.setDRACOLoader(this.loaders.dracoLoader);
    }
    startLoading() {
        for (const asset of this.assets) {
            console.log('22')
            if (asset.type === "glbModel") {
                this.loaders.gltfLoader.load(asset.path, (file) => {
                    this.singleAssetLoaded(asset, file);
                });
            } 
            // else if (asset.type === "videoTexture") {
            //     this.video = {};
            //     this.videoTexture = {};

            //     this.video[asset.name] = document.createElement("video");
            //     this.video[asset.name].src = asset.path;
            //     this.video[asset.name].muted = true;
            //     this.video[asset.name].playsInline = true;
            //     this.video[asset.name].autoplay = true;
            //     this.video[asset.name].loop = true;
            //     this.video[asset.name].play();

            //     this.videoTexture[asset.name] = new THREE.VideoTexture(
            //         this.video[asset.name]
            //     );
            //     // this.videoTexture[asset.name].flipY = false;
            //     this.videoTexture[asset.name].minFilter = THREE.NearestFilter;
            //     this.videoTexture[asset.name].magFilter = THREE.NearestFilter;
            //     this.videoTexture[asset.name].generateMipmaps = false;
            //     this.videoTexture[asset.name].encoding = THREE.sRGBEncoding;

            //     this.singleAssetLoaded(asset, this.videoTexture[asset.name]);
            // }
        }
    }

    singleAssetLoaded(asset, file) {
        this.items[asset.name] = file;
        this.loaded++;
        console.log(asset.name)
        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}
