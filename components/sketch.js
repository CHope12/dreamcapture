"use client"; // ✅ Ensures this runs only on the client-side

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default class Sketch {
  constructor(options) {
    this.container = options.dom;
    this.image = options.image;

    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;

    this.scene360 = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(90, this.width / this.height, 0.1, 1000);
    this.camera.position.set(0, 0, 2);
    this.scene360.add(this.camera);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.container.appendChild(this.renderer.domElement);

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enabled = true;
    this.controls.enableDamping = true;
    this.controls.enableZoom = true;    
    this.controls.enableRotate = true;
    this.controls.enablePan = false;

    this.createScene360();
    this.render();
  }

  async createScene360() {
    if (!this.image) {
      console.error("No image provided");
      return;
    }

    const loader = new THREE.TextureLoader();
    
    try {
      const texture = await new Promise((resolve, reject) => {
        loader.load(this.image, resolve, undefined, reject);
      });

      texture.wrapS = THREE.RepeatWrapping;
      texture.repeat.x = -1;

      this.material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.BackSide,
      });

      this.geometry = new THREE.SphereGeometry(10, 30, 30);
      this.sphere = new THREE.Mesh(this.geometry, this.material);
      this.scene360.add(this.sphere);
    } catch (error) {
      console.error("Error loading texture", error);
    }
  }

  render() {
    if (this.cleanedUp) return;
    requestAnimationFrame(this.render.bind(this));
    this.controls.update();
    this.renderer.render(this.scene360, this.camera);
  }

  cleanup() {
    this.cleanedUp = true;
    // Dispose of geometries, materials, and textures
    if (this.geometry) this.geometry.dispose();
    if (this.material) {
      if (this.material.map) this.material.map.dispose();
      this.material.dispose();
    }

    // Remove mesh from scene
    if (this.sphere) this.scene360.remove(this.sphere);

    // Dispose of controls
    if (this.controls) this.controls.enabled = false;

    // Remove renderer and its DOM element
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }    

    // Clear references
    this.scene360 = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.geometry = null;
    this.material = null;
    this.sphere = null;
  }
}
