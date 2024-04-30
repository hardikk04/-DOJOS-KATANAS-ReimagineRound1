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
gltfLoader.load("/models/cans_animation.glb", (gltf) => {
  grayModel = gltf.scene.children[0];
  blackModel = gltf.scene.children[1];
  redModel = gltf.scene.children[2];

  // Scales
  redModel.scale.set(2.5, 2.5, 2.5);
  blackModel.scale.set(2.5, 2.5, 2.5);
  grayModel.scale.set(2.5, 2.5, 2.5);

  // Red Model bounding box
  const redModelBoudingBox = new THREE.Box3().setFromObject(redModel);
  const redModelCenter = new THREE.Vector3();
  redModelBoudingBox.getCenter(redModelCenter);

  // gray Model bounding box
  const grayModelBoudingBox = new THREE.Box3().setFromObject(grayModel);
  const grayModelCenter = new THREE.Vector3();
  grayModelBoudingBox.getCenter(grayModelCenter);

  // Black Model bounding box
  const blackModelBoudingBox = new THREE.Box3().setFromObject(blackModel);
  const blackModelCenter = new THREE.Vector3();
  blackModelBoudingBox.getCenter(blackModelCenter);

  // Positions
  redModel.position.sub(redModelCenter);
  grayModel.position.sub(grayModelCenter);
  blackModel.position.sub(blackModelCenter);

  scene.add(redModel);
});

// Mousemove (Cursor)
const cursor = {};
cursor.x = 0;
cursor.y = 0;

canvas.addEventListener("mousemove", (dets) => {
  cursor.x = dets.clientX / window.innerWidth;
  cursor.y = dets.clientY / window.innerHeight;
  gsap.to(camera.position, {
    x: -cursor.x * 1,
    y: cursor.y * 0.5,
    duration: 0.2,
    ease: "linear",
  });
});

// canvas.addEventListener("click", () => {
//   gsap.from(redModel.rotation, {
//     y: -Math.PI * 2,
//     duration: 0.2,
//     ease: "linear",
//     onComplete: () => {
//       scene.remove(redModel);
//       gsap.from(
//         blackModel.rotation,
//         {
//           y: -Math.PI * 2,
//           delay: -0.1,
//         },
//         "same"
//       );

//       gsap.to(
//         "#page1",
//         {
//           backgroundColor: "#000",
//         },
//         "same"
//       );
//       scene.add(blackModel);
//     },
//   });
// });

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
    redModel.rotation.y = -elapsedTime * 0.3;
    redModel.rotation.z = Math.sin(Math.cos(elapsedTime * 0.2) * 0.2) * 0.8;
    // grayModel.rotation.y = -elapsedTime * 0.5;
    // grayModel.rotation.z = Math.sin(Math.cos(elapsedTime * 0.2) * 0.2) * 0.8;
    // blackModel.rotation.y = -elapsedTime * 0.5;
    // blackModel.rotation.z = Math.sin(Math.cos(elapsedTime * 0.2) * 0.2) * 0.8;
  }

  // controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
