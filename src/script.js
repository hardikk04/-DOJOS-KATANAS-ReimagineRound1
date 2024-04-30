/**
 * Importing the libraries
 */
import "remixicon/fonts/remixicon.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Lenis from "@studio-freight/lenis";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";

// gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis js
 */
const lenisJs = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => { });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();

function page2Animation(){
  
var swiper = new Swiper(".mySwiper", {
  slidesPerView: 3,
  spaceBetween: 30,
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

var tls = gsap.timeline({
  scrollTrigger:{
    trigger:"#swiper",
    scroller:"body",
    start:"top top",
    end:"top -150%",
    // markers:true,
    scrub:2,
    pin:true
  }
})
tls
.to(".swiper",{
  transform: "scale(1)",
  delay:.1
},"a")
.to("#swiper-btn",{
  scale:0.3,
  delay:.1
},"a")
.to(".over-card",{
  opacity:0,
  delay:.1
},"a")

}
page2Animation()
function canva1() {

  const canvas = document.querySelector("#page3 canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    var data = `
    canvas/canvas00064.png
    canvas/canvas00065.png
    canvas/canvas00066.png
    canvas/canvas00067.png
    canvas/canvas00068.png
    canvas/canvas00069.png
    canvas/canvas00070.png
    canvas/canvas00071.png
    canvas/canvas00072.png
    canvas/canvas00073.png
    canvas/canvas00074.png
    canvas/canvas00075.png
    canvas/canvas00076.png
    canvas/canvas00077.png
    canvas/canvas00078.png
    canvas/canvas00079.png
    canvas/canvas00080.png
    canvas/canvas00081.png
    canvas/canvas00082.png
    canvas/canvas00083.png
    canvas/canvas00084.png
    canvas/canvas00085.png
    canvas/canvas00086.png
    canvas/canvas00087.png
    canvas/canvas00088.png
    canvas/canvas00089.png
    canvas/canvas00090.png
    canvas/canvas00091.png
    canvas/canvas00092.png
    canvas/canvas00093.png
    canvas/canvas00094.png
    canvas/canvas00095.png
   `;
    return data.split("\n")[index];
  }

  const frameCount = 32;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: `none`,
    scrollTrigger: {
      scrub: 0.15,
      trigger: `#page3>canvas`,
      //   set start end according to preference
      start: `top top`,
      end: `200% top`,
      scroller: `body`,
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({

    trigger: "#page3",
    pin: true,
    scroller: `body`,
    start: `top top`,
    end: `200% top`,
  });


}
canva1()

Totty.animateSvg("#curve", {
  ease: "elastic.out(1,0.3)",
  offsetLeft: 10,
  offsetRight: 10,
});
