import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scene
 */
const scene = new THREE.Scene();

/**
 * Models groups for animations
 */
const redModelGroup = new THREE.Group();
const blackModelGroup = new THREE.Group();
const greyModelGroup = new THREE.Group();
scene.add(redModelGroup, blackModelGroup, greyModelGroup);

/**
 * Canvas
 */
const canvas = document.querySelector(".webgl");

const updateMaterial = () => {
  scene.traverse((child) => {
    if (child.isMesh && child.material.isMeshStandardMaterial) {
      child.material.roughness = 0.4;
    }
  });
};

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();

/**
 * DRACO Loader
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Importing the models
 */

let redModel = null;
let blackModel = null;
let greyModel = null;

// Loading the model
gltfLoader.load("/models/3_cans_com.glb", (gltf) => {
  // Models
  greyModel = gltf.scene.children[0];
  redModel = gltf.scene.children[1];
  blackModel = gltf.scene.children[2];

  // Red Model bounding box
  const redModelBoudingBox = new THREE.Box3().setFromObject(redModel);
  const redModelCenter = new THREE.Vector3();
  redModelBoudingBox.getCenter(redModelCenter);

  // grey Model bounding box
  const greyModelBoudingBox = new THREE.Box3().setFromObject(greyModel);
  const greyModelCenter = new THREE.Vector3();
  greyModelBoudingBox.getCenter(greyModelCenter);

  // Black Model bounding box
  const blackModelBoudingBox = new THREE.Box3().setFromObject(blackModel);
  const blackModelCenter = new THREE.Vector3();
  blackModelBoudingBox.getCenter(blackModelCenter);

  // Positions
  redModel.position.sub(redModelCenter);
  greyModel.position.sub(greyModelCenter);
  blackModel.position.sub(blackModelCenter);

  console.log(gltf);

  redModelGroup.add(redModel);
  updateMaterial();
});

// Mousemove (Cursor)
const cursor = {};
cursor.x = 0;
cursor.y = 0;

/**
 * Mouse move animation
 */
canvas.addEventListener("mousemove", (dets) => {
  cursor.x = dets.clientX / window.innerWidth;
  cursor.y = dets.clientY / window.innerHeight;
  gsap.to(camera.position, {
    x: -cursor.x * 0.5,
    y: cursor.y * 0.2,
    duration: 0.5,
    ease: "linear",
  });
});

// Flag for can
let flag = "red";

// Update cans function
const updateCans = (sound) => {
  // Red to Grey
  if (flag === "red") {
    // Can switch sound
    if (sound) {
      const switchAudio = new Audio("sounds/canSwitch3.wav");
      switchAudio.play();
    }
    // Rotates red
    gsap.from(redModel.rotation, {
      y: Math.PI * 2,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        // Removes red model
        redModelGroup.remove(redModel);

        // Rotates grey
        gsap.from(greyModel.rotation, {
          y: Math.PI * 2,
          duration: 0.4,
          ease: "power4.out",
        });

        // Change page color to white
        gsap.to("#page1", {
          backgroundColor: "#5d5d5d",
        });

        // Add grey model
        greyModelGroup.add(greyModel);

        // Turn the flag to grey
        flag = "grey";
      },
    });
  }
  // Grey to Black
  else if (flag === "grey") {
    // Can switch sound
    if (sound) {
      const switchAudio = new Audio("sounds/canSwitch3.wav");
      switchAudio.play();
    }

    // Rotates grey
    gsap.from(greyModel.rotation, {
      y: Math.PI * 2,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        // Removes grey
        greyModelGroup.remove(greyModel);

        // Rotates black
        gsap.from(blackModel.rotation, {
          y: Math.PI * 2,
          duration: 0.5,
          ease: "power4.out",
        });

        // Change page color to black
        gsap.to("#page1", {
          backgroundColor: "#000",
        });

        // Add black model
        blackModelGroup.add(blackModel);

        // Turn the flag to black
        flag = "black";
      },
    });
  }
  // Black to Red
  else {
    // Can switch sound
    if (sound) {
      const switchAudio = new Audio("sounds/canSwitch3.wav");
      switchAudio.play();
    }

    // Rotates black
    gsap.from(blackModel.rotation, {
      y: Math.PI * 2,
      duration: 0.5,
      ease: "power3.in",
      onComplete: () => {
        // Removes black
        blackModelGroup.remove(blackModel);
        gsap.from(redModel.rotation, {
          y: Math.PI * 2,
          duration: 0.5,
          ease: "power4.out",
        });

        // Change page color to red
        gsap.to("#page1", {
          backgroundColor: "#d91921",
        });

        // Add red model
        redModelGroup.add(redModel);

        // Turn the flag to red
        flag = "red";
      },
    });
  }
};

// Click animation
canvas.addEventListener("click", () => {
  updateCans(true);
});

// Cans animation loop
const threeLoaderLine = document.querySelector(".three-loder-line");

gsap.to(threeLoaderLine, {
  width: "100%",
  duration: 20,
  repeat: -1,
  onRepeat: () => {
    updateCans(false);
    threeLoaderLine.style.width = 0;
  },
});

/**
 * Lights
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight("#ffffff", 2);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight("#ffffff", 4);
directionalLight.position.set(2, 1.5, 2);
scene.add(directionalLight);

// Directional Light helper
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
  renderer.setPixelRatio(Math.min(window.devicePixelRatio));
});

/**
 * Contrls
 */
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

/**
 * Clock
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  if (redModelGroup) {
    redModelGroup.rotation.y = elapsedTime * 0.3;
    redModelGroup.rotation.z =
      Math.sin(Math.cos(elapsedTime * 0.2) * 0.2) * 1.2;
  }
  if (greyModelGroup) {
    greyModelGroup.rotation.y = elapsedTime * 0.5;
    greyModelGroup.rotation.z =
      Math.sin(Math.cos(elapsedTime * 0.2) * 0.2) * 1.2;
  }
  if (blackModelGroup) {
    blackModelGroup.rotation.y = elapsedTime * 0.5;
    blackModelGroup.rotation.z =
      Math.sin(Math.cos(elapsedTime * 0.2) * 0.2) * 1.2;
  }

  // controls.update();

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
