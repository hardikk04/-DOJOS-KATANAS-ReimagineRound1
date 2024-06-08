import * as THREE from "three";
import { gsap } from "gsap";
import vertexShader from "../src/shaders/water/vertex.glsl";
import fragmentShader from "../src/shaders/water/fragment.glsl";

const webGLEffect = (container, img, texture, planeWidth = 1) => {
  const imageContainer = document.querySelector(container);
  const imageElement = document.querySelector(img);

  let easeFactor = 0.2;
  let scene, camera, renderer, planeMesh;
  let mousePosition = { x: 0.5, y: 0.5 };
  let targetMousePosition = { x: 0.5, y: 0.5 };
  let mouseStopTimeout;
  let aberrationIntensity = 0;
  let lastPosition = { x: 0.5, y: 0.5 };
  let prevPosition = { x: 0.5, y: 0.5 };

  function initializeScene(texture) {
    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera(
      75,
      (imageElement.offsetWidth / planeWidth / imageElement.offsetHeight) * 1.3,
      0.01,
      100
    );
    camera.position.z = 1;

    planeMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2, 32, 32),
      new THREE.ShaderMaterial({
        uniforms: {
          uTime: new THREE.Uniform(0),
          uFrequency: new THREE.Uniform(new THREE.Vector2(0, 0)),
          uMouse: new THREE.Uniform(new THREE.Vector2()),
          uPrevMouse: new THREE.Uniform(new THREE.Vector2()),
          uAberrationIntensity: new THREE.Uniform(0.0),
          uTexture: new THREE.Uniform(texture),
        },
        vertexShader,
        fragmentShader,
      })
    );

    scene.add(planeMesh);

    renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(imageElement.offsetWidth, imageElement.offsetHeight);

    imageContainer.appendChild(renderer.domElement);
  }

  window.addEventListener("resize", () => {
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  });

  const t = new THREE.TextureLoader().load(texture);

  initializeScene(t);

  const clock = new THREE.Clock();
  let deltaTime = null;

  let mouseE = false;
  animateScene();

  function animateScene() {
    requestAnimationFrame(animateScene);

    deltaTime = clock.getDelta();

    if (mouseE) {
      planeMesh.material.uniforms.uTime.value += deltaTime;
      console.log(planeMesh.material.uniforms.uTime.value);
    }

    mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor;
    mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor;

    planeMesh.material.uniforms.uMouse.value.set(
      mousePosition.x,
      1.0 - mousePosition.y
    );

    planeMesh.material.uniforms.uPrevMouse.value.set(
      prevPosition.x,
      1.0 - prevPosition.y
    );

    aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05);

    planeMesh.material.uniforms.uAberrationIntensity.value =
      aberrationIntensity;

    renderer.render(scene, camera);
  }

  imageContainer.addEventListener("mousemove", handleMouseMove);
  imageContainer.addEventListener("mouseenter", handleMouseEnter);
  imageContainer.addEventListener("mouseleave", handleMouseLeave);

  function handleMouseMove(event) {
    easeFactor = 0.05;
    let rect = imageContainer.getBoundingClientRect();
    prevPosition = { ...targetMousePosition };

    targetMousePosition.x = (event.clientX - rect.left) / rect.width;
    targetMousePosition.y = (event.clientY - rect.top) / rect.height;

    aberrationIntensity = 1;
  }

  function handleMouseEnter(event) {
    mouseE = true;
    gsap.to(planeMesh.material.uniforms.uFrequency.value, {
      x: 5,
      y: 5,
      duration: 1,
    });

    easeFactor = 0.05;
    let rect = imageContainer.getBoundingClientRect();

    mousePosition.x = targetMousePosition.x =
      (event.clientX - rect.left) / rect.width;
    mousePosition.y = targetMousePosition.y =
      (event.clientY - rect.top) / rect.height;
  }

  function handleMouseLeave() {
    mouseE = false;
    gsap.to(planeMesh.material.uniforms.uFrequency.value, {
      x: 0,
      y: 0,
      duration: 1,
    });
    gsap.to(planeMesh.material.uniforms.uTime, {
      value: 0,
      duration: 1,
    });

    easeFactor = 0.05;
    targetMousePosition = { ...prevPosition };
  }
};

const img1 = document.querySelector(".page7-part1-right");
const img2 = document.querySelector(".page7-part2-left");
const img3 = document.querySelector(".page7-part2-right-ig");


img1.addEventListener(
  "mouseenter",
  webGLEffect(".page7-part1-right", ".page7-part1-right>img", "/imgs/job22.jpg")
);

img2.addEventListener(
  "mouseenter",
  webGLEffect(".page7-part2-left", ".page7-part2-left>img", "/imgs/job11.jpg")
);
img3.addEventListener(
  "mouseenter",
  webGLEffect(
    ".page7-part2-right-ig",
    ".page7-part2-right-ig>img",
    "/imgs/job33.jpg",
    2
  )
);
