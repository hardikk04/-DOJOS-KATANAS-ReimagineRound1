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
gltfLoader.load("/models/white_can_final.glb", (gltf) => {
  redModel = gltf.scene;
  redModel.scale.set(1, 1, 1);

  const boudingBox = new THREE.Box3().setFromObject(redModel);
  const center = new THREE.Vector3();
  boudingBox.getCenter(center);

  redModel.position.sub(center);

  // redModel.position.set(0, -0.8, 0);
  // redModel.rotation.z = -0.3;
  scene.add(redModel);
});

// Mousemove (Cursor)
const cursor = {};
cursor.x = 0;
cursor.y = 0;

canvas.addEventListener("mousemove", (dets) => {
  cursor.x = dets.clientX / window.innerWidth;
  cursor.y = dets.clientY / window.innerHeight;
  // gsap.to(camera.position, {
  //   x: -cursor.x * 0.5,
  //   y: cursor.y * 0.2,
  //   duration: 0.2,
  //   ease: "linear",
  // });
});

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight("#ffffff", 1.6);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight("#ffffff", 2);
directionalLight.position.set(2, 1, 2);
// scene.add(directionalLight);

const directionLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionLightHelper);

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
camera.position.z = 5;
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
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

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
    // redModel.rotation.y = -elapsedTime * 0.5;
    // redModel.rotation.x = elapsedTime * 0.2;
  }

  controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();