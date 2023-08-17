import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach((child) => {
            console.log('here', child)
            child.castShadow = true;
            child.receiveShadow = true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupchild) => {
                    //console.log('ㅎㅎ',groupchild);
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                });
            }

            // console.log(child);

            if (child.name === "Aquarium") {
                // console.log(child);
                child.children[0].material = new THREE.MeshPhysicalMaterial();
                child.children[0].material.roughness = 0;
                child.children[0].material.color.set(0x549dd2);
                child.children[0].material.ior = 3;
                child.children[0].material.transmission = 1;
                child.children[0].material.opacity = 1;
                child.children[0].material.depthWrite = false;
                child.children[0].material.depthTest = false;
            }

            
            if (child.name === "glassbase") {
                console.log(child);
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = 0.01;
                child.material.color.set(0xffffff);
                child.material.ior = 3;
                child.material.transmission = 1;
                //child.material.transparent = true;
                child.material.opacity = 1;
                child.material.depthWrite = true;
                child.material.depthTest = true;
                
            }

            if (child.name === "water") {
                console.log('water',child);
                child.material = new THREE.MeshPhysicalMaterial();
                child.material.roughness = -1;
                child.material.color.set(0x8395cd);
                child.material.ior = 3;
                //child.material.transmission = 0.2;
                child.material.opacity = 1;
                child.material.depthWrite = false;
                child.material.depthTest = false;
            }


            if (child.name === "minifloor") {
                
                child.position.x = 0.18952;
                child.position.z = 6.48495;
            }

           

            // if (
            //     child.name === "Mailbox" ||
            //     child.name === "Lamp" ||
            //     child.name === "FloorFirst" ||
            //     child.name === "FloorSecond" ||
            //     child.name === "FloorThird" ||
            //     child.name === "Dirt" ||
            //     child.name === "Flower1" ||
            //     child.name === "Flower2"
            // ) {
            //     child.scale.set(0, 0, 0);
            // }

            child.scale.set(0, 0, 0);
            //child.scale.set(1, 1, 1);

            if (child.name === "Cube") {
                // child.scale.set(1, 1, 1);
                child.position.set(0, -1, 0);
                child.rotation.y = Math.PI / 4;
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });

        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(4.6477, 3.788, 6,2152);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight);

        this.roomChildren["rectLight"] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
        console.log("roon", this.room);

        // this.scene.add(this.actualRoom);
        // this.actualRoom.scale.set(0.11, 0.11, 0.11);

        // const topLight = new THREE.RectAreaLight(
        //     0xFFF1A7,
        //     intensity,
        //     width,
        //     height
        // );
        // topLight.position.set(-0.127165 , 20 , 1.73243 );
        // topLight.rotation.x = -Math.PI / 2;
        // topLight.rotation.z = Math.PI / 4;
        // this.actualRoom.add(topLight);

        // this.roomChildren["topLight"] = topLight;

        // // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // // rectLight.add(rectLightHelper);
        // console.log("roon", this.room);

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.11, 0.11, 0.11);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        this.swim = this.mixer.clipAction(this.room.animations[6]);
        this.swim.play();
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation =
                ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.1;
        });
    }

    resize() {}

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

        this.mixer.update(this.time.delta * 0.0009);
    }
}
