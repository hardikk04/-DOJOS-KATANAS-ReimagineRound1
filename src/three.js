import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import loaderVertexShader from "/shaders/loader/vertex.glsl";
import loaderFragmentShader from "/shaders/loader/fragment.glsl";

gsap.registerPlugin(ScrollTrigger);

// Removing the scroll unitl site loaded
(() => {
  document.body.style.overflow = "hidden";
  document.documentElement.style.overflow = "hidden";
})();

/**
 * Scene
 */
const scene = new THREE.Scene();

const debug = {};
debug.ambientLight = "#ffffff";
debug.directionalLight = "#ffffff";

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
      child.material.roughness = 0.2;
    }
  });
};

const afterLoadedTheContent = () => {
  const tl = gsap.timeline();

  tl.to(LoaderPlane.scale, {
    x: 4,
    y: 4,
    z: 4,
    duration: 2,
  });

  tl.to(LoaderPlane.material.uniforms.uOffset, {
    value: 1,
    duration: 1.5,
  });

  tl.to("nav", {
    opacity: 1,
  });

  tl.from(
    redModel.position,
    {
      y: -8,
      ease: "power1.out",
      duration: 1,
    },
    "a"
  );

  tl.from(
    redModel.rotation,
    {
      y: Math.PI * 2.2,
      x: Math.PI * 1.5,
      ease: "power1.out",
      duration: 1,
      onComplete: () => {
        // Enable scroll
        document.body.style.overflow = "initial";
        document.documentElement.style.overflow = "initial";

        // Canvas Pointer Events
        canvas.style.pointerEvents = "initial";
      },
    },
    "a"
  );

  // Page1 Headline Coca-Cola text
  clutterAnimation(".page1-main>h1");
  tl.from(
    ".page1-main>h1>span",
    {
      opacity: 0,
      ease: "power1.out",
      stagger: {
        amount: 1,
        from: "x",
      },
    },
    "a"
  );

  // Playing the all animations which is sync with cans Animation
  clutterAnimation(".page1-footer-title>h1");
  tl.from(
    ".page1-footer-title>h1>span",
    {
      opacity: 0,
      y: 50,
      textContent: getRandomText(4),
      stagger: {
        amount: randomTextAnimationSpeed,
        from: "x",
      },
      onStart: () => {
        updateMaterial();
        cansAnimationLoop();
      },
    },
    "a"
  );

  tl.from(
    ".three-loder",
    {
      width: "0",
    },
    "a"
  );
};

/**
 * Loaders
 */
let checkLoadingStart = true;
const loadingManager = new THREE.LoadingManager(
  // Loaded
  () => {
    afterLoadedTheContent();
  },
  // Process
  (itemUrl, itemsLoaded, itemsTotal) => {
    // Remove the black screen
    if (checkLoadingStart) {
      checkLoadingStart = false;
      gsap.to(".main-loader", {
        backgroundColor: "transparent",
      });
    }
    const progressRatio = itemsLoaded / itemsTotal;
  }
);
const gltfLoader = new GLTFLoader(loadingManager);
const textureLoader = new THREE.TextureLoader(loadingManager);

/**
 * DRACO Loader
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Loader plane
 */

// Displacement texture load
const displacementTexture = textureLoader.load("/imgs/d2.avif");
const video = document.querySelector(".main-loader>video");
const videoTexture = new THREE.VideoTexture(video);

const LoaderPlane = new THREE.Mesh(
  new THREE.PlaneGeometry(2, 2),
  new THREE.ShaderMaterial({
    vertexShader: loaderVertexShader,
    fragmentShader: loaderFragmentShader,
    uniforms: {
      uDisplacement: new THREE.Uniform(displacementTexture),
      uCocaColaTexture: new THREE.Uniform(videoTexture),
      uOffset: new THREE.Uniform(0),
    },
    transparent: true,
  })
);
scene.add(LoaderPlane);

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

  // Scale
  redModel.scale.set(1.1, 2, 1.1);
  greyModel.scale.set(1.1, 2, 1.1);
  blackModel.scale.set(1.1, 2, 1.1);

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

  redModelGroup.add(redModel);
});

// Mousemove (Cursor)
const cursor = {};
cursor.x = 0;
cursor.y = 0;

/**
 * Mouse move animation
 */

let canRotationFlag = false;
canvas.addEventListener("mousemove", (dets) => {
  cursor.x = dets.clientX / window.innerWidth;
  cursor.y = dets.clientY / window.innerHeight;

  if (cursor.x < 0.5) {
    canRotationFlag = true;
  } else {
    canRotationFlag = false;
  }

  gsap.to(camera.position, {
    x: -cursor.x * 0.7,
    duration: 0.5,
    ease: "linear",
  });
});

// Flag for can
let flag = "red";

let checkUpdatedBlack = false;
let checkUpdatedGrey = false;

const page1Heading1 = document.querySelector(".page1-heading1");
const page1Heading2 = document.querySelector(".page1-heading2");
const page1Heading3 = document.querySelector(".page1-heading3");

const page1Para1 = document.querySelector(".page1-para1");
const page1Para2 = document.querySelector(".page1-para2");
const page1Para3 = document.querySelector(".page1-para3");

// text animation
// Clutter Animation
const clutterAnimation = (element) => {
  const htmlTag = document.querySelector(element);
  let clutter = "";

  // Splitting the text content into individual letters and wrapping each in a span with a class
  htmlTag.textContent.split("").forEach((word) => {
    clutter += `<span class="inline-block text-span">${word}</span>`;
  });

  // Updating the HTML content of the element with the animated spans
  htmlTag.innerHTML = clutter;
};

function getRandomText(length) {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!$&?";
  // const characters = "?";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const randomTextAnimation = [
  "<h1>Original &nbsp; Taste</h1>",
  "<h1>Diet &nbsp; Coke<h1>",
  "<h1>Zero &nbsp; Sugar<h1>",
];
const randomTextAnimationSpeed = 0.5;

// Red to Grey can animation
const redToGreyCanAnimation = (sound) => {
  // Heading text animation
  gsap.to(page1Heading1, {
    top: "100%",
    onComplete: () => {
      gsap.to(page1Heading2, {
        top: "0",
      });
    },
  });

  // Heading text animation
  gsap.to(page1Para1, {
    top: "100%",
    onComplete: () => {
      gsap.to(page1Para2, {
        top: "0",
      });
    },
  });

  // Random text animation
  document.querySelector(".page1-footer-title>h1").innerHTML =
    randomTextAnimation[1];
  clutterAnimation(".page1-footer-title>h1");

  gsap.from(".page1-footer-title>h1>span", {
    opacity: 0,
    y: 50,
    textContent: getRandomText(4),
    stagger: {
      amount: randomTextAnimationSpeed,
      from: "x",
    },
  });

  // Can switch sound
  if (sound) {
    const switchAudio = new Audio("sounds/canSwitch3.wav");
    switchAudio.playbackRate = 3.0;
    switchAudio.play();

    // Restart the animation on click
    lineAnimation.restart();
  }
  // Rotates red
  if (canRotationFlag) {
    gsap.from(redModel.rotation, {
      y: -Math.PI * 3,
      duration: 0.4,
      ease: "power1.in",
      onComplete: () => {
        // Removes red model
        redModelGroup.remove(redModel);

        // Rotates grey
        gsap.from(greyModel.rotation, {
          y: -Math.PI * 2,
          duration: 0.5,
          ease: "power1.out",
        });

        // Change page color to white
        gsap.to("#page1", {
          backgroundColor: "#ffffff",
        });

        // Add grey model
        greyModelGroup.add(greyModel);
        if (!checkUpdatedGrey) {
          updateMaterial();
          checkUpdatedGrey = true;
        }

        // Turn the flag to grey
        flag = "grey";
      },
    });
  } else {
    gsap.from(redModel.rotation, {
      y: Math.PI * 3,
      duration: 0.4,
      ease: "power1.in",
      onComplete: () => {
        // Removes red model
        redModelGroup.remove(redModel);

        // Rotates grey
        gsap.from(greyModel.rotation, {
          y: Math.PI * 2,
          duration: 0.5,
          ease: "power1.out",
        });

        // Change page color to white
        gsap.to("#page1", {
          backgroundColor: "#ffffff",
        });

        // Add grey model
        greyModelGroup.add(greyModel);
        if (!checkUpdatedGrey) {
          updateMaterial();
          checkUpdatedGrey = true;
        }

        // Turn the flag to grey
        flag = "grey";
      },
    });
  }
};

// Grey to Black can animation
const greyToBlackCanAnimation = (sound) => {
  // Heading text animation
  gsap.to(page1Heading2, {
    top: "100%",
    onComplete: () => {
      gsap.to(page1Heading3, {
        top: "0",
      });
    },
  });

  // Heading text animation
  gsap.to(page1Para2, {
    top: "100%",
    onComplete: () => {
      gsap.to(page1Para3, {
        top: "0",
      });
    },
  });

  // Random text animation
  document.querySelector(".page1-footer-title>h1").innerHTML =
    randomTextAnimation[2];
  clutterAnimation(".page1-footer-title>h1");

  gsap.from(".page1-footer-title>h1>span", {
    opacity: 0,
    y: 50,
    textContent: getRandomText(4),
    stagger: {
      amount: randomTextAnimationSpeed,
      from: "x",
    },
  });

  // Can switch sound
  if (sound) {
    const switchAudio = new Audio("sounds/canSwitch3.wav");
    switchAudio.playbackRate = 3.0;
    switchAudio.play();

    // Restart the animation on click
    lineAnimation.restart();
  }

  // Rotates grey
  if (canRotationFlag) {
    gsap.from(greyModel.rotation, {
      y: -Math.PI * 3,
      duration: 0.4,
      ease: "power1.in",
      onComplete: () => {
        // Removes grey
        greyModelGroup.remove(greyModel);

        // Rotates black
        gsap.from(blackModel.rotation, {
          y: -Math.PI * 2,
          duration: 0.5,
          ease: "power1.out",
        });

        // Change page color to black
        gsap.to("#page1", {
          backgroundColor: "#000",
        });

        // Add black model
        blackModelGroup.add(blackModel);
        if (!checkUpdatedBlack) {
          updateMaterial();
          checkUpdatedBlack = true;
        }

        // Turn the flag to black
        flag = "black";
      },
    });
  } else {
    gsap.from(greyModel.rotation, {
      y: Math.PI * 3,
      duration: 0.4,
      ease: "power1.in",
      onComplete: () => {
        // Removes grey
        greyModelGroup.remove(greyModel);

        // Rotates black
        gsap.from(blackModel.rotation, {
          y: Math.PI * 2,
          duration: 0.5,
          ease: "power1.out",
        });

        // Change page color to black
        gsap.to("#page1", {
          backgroundColor: "#000",
        });

        // Add black model
        blackModelGroup.add(blackModel);
        if (!checkUpdatedBlack) {
          updateMaterial();
          checkUpdatedBlack = true;
        }

        // Turn the flag to black
        flag = "black";
      },
    });
  }
};

// Black to Red can animation
const blackToRedCanAnimation = (sound) => {
  // Heading text animation
  gsap.to(page1Heading3, {
    top: "100%",
    onComplete: () => {
      gsap.to(page1Heading1, {
        top: "0",
      });
    },
  });

  // Heading text animation
  gsap.to(page1Para3, {
    top: "100%",
    onComplete: () => {
      gsap.to(page1Para1, {
        top: "0",
      });
    },
  });

  // Random text animation
  document.querySelector(".page1-footer-title>h1").innerHTML =
    randomTextAnimation[0];
  clutterAnimation(".page1-footer-title>h1");

  gsap.from(".page1-footer-title>h1>span", {
    opacity: 0,
    y: 50,
    textContent: getRandomText(4),
    stagger: {
      amount: randomTextAnimationSpeed,
      from: "x",
    },
  });

  // Can switch sound
  if (sound) {
    const switchAudio = new Audio("sounds/canSwitch3.wav");
    switchAudio.playbackRate = 3.0;
    switchAudio.play();

    // Restart the animation on click
    lineAnimation.restart();
  }

  // Rotates black
  if (canRotationFlag) {
    gsap.from(blackModel.rotation, {
      y: -Math.PI * 3,
      duration: 0.4,
      ease: "power1.in",
      onComplete: () => {
        // Removes black
        blackModelGroup.remove(blackModel);
        gsap.from(redModel.rotation, {
          y: -Math.PI * 2,
          duration: 0.5,
          ease: "power1.out",
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
  } else {
    gsap.from(blackModel.rotation, {
      y: Math.PI * 3,
      duration: 0.4,
      ease: "power1.in",
      onComplete: () => {
        // Removes black
        blackModelGroup.remove(blackModel);
        gsap.from(redModel.rotation, {
          y: Math.PI * 2,
          duration: 0.5,
          ease: "power1.out",
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

// Update cans function
const updateCans = (sound) => {
  // Red to Grey
  if (flag === "red") {
    redToGreyCanAnimation(sound);
  }
  // Grey to Black
  else if (flag === "grey") {
    greyToBlackCanAnimation(sound);
  }
  // Black to Red
  else {
    blackToRedCanAnimation(sound);
  }
};

// Click animation
canvas.addEventListener("click", () => {
  updateCans(true);
});

// Cans animation loop
const threeLoaderLine = document.querySelector(".three-loder-line");

let lineAnimation = null;
const cansAnimationLoop = () => {
  gsap.to(page1Heading1, {
    top: "0",
  });

  gsap.to(page1Para1, {
    top: "0%",
  });
  lineAnimation = gsap.to(threeLoaderLine, {
    width: "100%",
    duration: 10,
    repeat: -1,
    onRepeat: () => {
      updateCans(false);
      threeLoaderLine.style.width = 0;
    },
  });
};
/**
 * Lights
 */

// Ambient Light
const ambientLight = new THREE.AmbientLight("#ffffff", 2);
scene.add(ambientLight);

// Directional Light
const directionalLight = new THREE.DirectionalLight("#fffff0", 5);
directionalLight.position.set(2, 1.5, 2);

scene.add(directionalLight);

// Directional Light helper
// const directionLightHelper = new THREE.DirectionalLightHelper(directionalLight);
// scene.add(directionLightHelper);

// Gui
// gui.add(ambientLight, "intensity").min(1).max(20).step(0.01);
// gui.add(directionalLight, "intensity").min(1).max(20).step(0.01);
// gui.add(directionalLight.position, "x").min(-20).max(20).step(0.01);
// gui.add(directionalLight.position, "y").min(-20).max(20).step(0.01);
// gui.add(directionalLight.position, "z").min(-20).max(20).step(0.01);

// gui.addColor(debug, "ambientLight").onChange(() => {
//   ambientLight.color.set(debug.ambientLight);
// });
// gui.addColor(debug, "directionalLight").onChange(() => {
//   directionalLight.color.set(debug.directionalLight);
// });

/**
 * Scroll Animation of can
 */

let scrollY = window.screenY;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;
});

gsap.to(".webgl", {
  scale: "1.15",
  scrollTrigger: {
    scroller: "body",
    trigger: "#page1",
    start: "top 0",
    end: "top -100%",
    scrub: 1,
  },
});

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
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
});

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas,
  alpha: true,
  antialias: true,
});
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.2;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));

/**
 * Clock
 */
let time = Date.now();

let speed = 0.5;
const tick = () => {
  // Making scroll illusion
  camera.position.y = (scrollY / sizes.height) * 2;

  // Time
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  time = currentTime;

  if (canRotationFlag) {
    speed -= deltaTime * 0.0005;
  } else {
    speed += deltaTime * 0.0005;
  }

  if (redModelGroup) {
    redModelGroup.rotation.y = speed;
    redModelGroup.rotation.z = Math.sin(Math.cos(speed * 0.2) * 0.2) * 1.2;
  }
  if (greyModelGroup) {
    greyModelGroup.rotation.y = speed;
    greyModelGroup.rotation.z = Math.sin(Math.cos(speed * 0.2) * 0.2) * 1.2;
  }
  if (blackModelGroup) {
    blackModelGroup.rotation.y = speed;
    blackModelGroup.rotation.z = Math.sin(Math.cos(speed * 0.2) * 0.2) * 1.2;
  }

  renderer.render(scene, camera);
  requestAnimationFrame(tick);
};
tick();
