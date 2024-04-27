import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Canvas
 */
const canvas = document.querySelector(".webgl");

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();

let redModel = null;
let blackModel = null;
let grayModel = null;
gltfLoader.load("/models/red.glb", (gltf) => {
  redModel = gltf.scene;
  redModel.scale.set(0.6, 0.6, 0.6);
  redModel.position.set(-0.3, -1, 0);
  redModel.rotation.z = -0.3;
  scene.add(redModel);
});

canvas.addEventListener("click", () => {
  if (redModel) {
    gsap.from(redModel.rotation, {
      y: Math.PI * 2,
      duration: 1,
    });
  }
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#ffffff", 3.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#ffffff", 2);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {};
sizes.width = window.innerWidth;
sizes.height = window.innerHeight;

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

/**
 * Resize
 */
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});

/**
 * Contrls
 */
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
renderer.setSize(sizes.width, sizes.height);

/**
 * Clock
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  if (redModel) {
    // redModel.rotation.y = Math.sin(elapsedTime) * 0.2;
    // redModel.rotation.x = Math.cos(elapsedTime) * 0.2;
  }

  //   controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
