// Importing the libraries
import "remixicon/fonts/remixicon.css";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper/bundle";
import "swiper/css/bundle";

gsap.registerPlugin(ScrollTrigger);

// Lenis js

const lenisJs = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 500);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();

// Restart always from top - 0
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
// magneticEffect animation
// can be used by giving class .magnet-effect to parent 
const magneticEffect = () => {
  window.addEventListener("mousemove", function (dets) {
    gsap.to("#cursor", {
      top: dets.y,
      left: dets.x,
    });
  });
  document.querySelectorAll(".magnet-effect").forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to("#cursor", {
        scale: 1,
      });
    });
    e.addEventListener("mousemove", function (dets) {
      // for value of x
      var xStart = e.getBoundingClientRect().x;
      var xEnd = e.getBoundingClientRect().x + e.getBoundingClientRect().width;
      var valx = gsap.utils.mapRange(xStart, xEnd, -12, 12, dets.x);
      // for value of y
      var yStart = e.getBoundingClientRect().y;
      var yEnd = e.getBoundingClientRect().y + e.getBoundingClientRect().height;
      var valy = gsap.utils.mapRange(yStart, yEnd, -12, 12, dets.y);
      gsap.to(e.children[0], {
        x: valx,
        y: valy,
        duration: 0.5,
      });
    });
    e.addEventListener("mouseleave", function (dets) {
      gsap.to(e.children[0], {
        x: 0,
        y: 0,
        duration: 0.5,
      });
    });
  });
  document.querySelectorAll(".magnet-effect").forEach(function (e) {
    e.addEventListener("mouseleave", function () {
      gsap.to("#cursor", {
        scale: 0,
      });
    });
  });
  
};
magneticEffect();

// textEffect animation
// can be used by giving class .text-effect to parent , which has two childern
const textEffect = () => {
  // Splitting the text content into individual letters and wrapping each in a span with a class
  document.querySelectorAll(".text-effect").forEach(function(e){
    [...e.children].forEach(function(h){
      var clutter = "";
      h.textContent.split("").forEach(function (l) {
        clutter += `<span>${l}</span>`;
      });
      h.innerHTML = clutter;
    })
  })
  //animation for mousemove
  document.querySelectorAll(".text-effect").forEach(function (e) {
    e.addEventListener("mouseenter", function () {
      gsap.to(e.children[0].querySelectorAll("span"), {
        y: "-106%",
        stagger: {
          amount: 0.2,
        },
        duration: 0.4,
      });
      gsap.to(e.children[1].querySelectorAll("span"), {
        y: "-100%",
        stagger: {
          amount: 0.2,
        },
        duration: 0.4,
      });
    });
  });
  //animation for mouseleave
  document.querySelectorAll(".text-effect").forEach(function (e) {
    e.addEventListener("mouseleave", function () {
      gsap.to(e.children[0].querySelectorAll("span"), {
        y: "0%",
        stagger: {
          amount: 0.2,
        },
      });
      gsap.to(e.children[1].querySelectorAll("span"), {
        y: "0%",
        stagger: {
          amount: 0.2,
        },
      });
    });
  });
};
textEffect();

// Clutter Animation
const clutterAnimation = (element) => {
  const htmlTag = document.querySelector(element);
  let clutter = "";

  // Splitting the text content into individual letters and wrapping each in a span with a class
  htmlTag.textContent.split("").forEach((word) => {
    clutter += `<span class="inline-block">${word}</span>`;
  });

  // Updating the HTML content of the element with the animated spans
  htmlTag.innerHTML = clutter;
};
// Navigation Animation
const navigation = () => {
  var navigation = document.querySelector("#navigation");
  var menutl = gsap.timeline({ paused: true });
  menutl
    .to(
      "#containermu #li1",
      {
        width: "0%",
        duration: 0.6,
        ease: "expo.out",
      },
      "a"
    )
    .to(
      "#containermu #li2",
      {
        width: "0%",
        duration: 0.6,
        ease: "expo.out",
      },
      "a"
    )
    .to(navigation, {
      right: 0,
      delay: -0.5,
      duration: 0.8,
    })
    .to(navigation, {
      backgroundColor: "rgba(0, 0, 0, 0.400)",
      duration: 0,
    })
    .from(navigation.querySelectorAll(".menu-wrap"), {
      x: 10,
      opacity: 0,
      duration: 0.2,
      stagger: 0.1,
    })
    .from(navigation.querySelectorAll("#menu-logo i"), {
      y: 2,
      opacity: 0,
    });
  document
    .querySelector(".nav-right-menu")
    .addEventListener("click", function () {
      gsap.to("#cli1", {
        height: "100%",
        duration: 0.6,
        ease: "expo.out",
      });
      gsap.to("#cli2", {
        height: "100%",
        duration: 0.6,
        ease: "expo.out",
      });
      menutl.play();
    });
  document.querySelector("#close").addEventListener("click", function () {
    gsap.to("#cli1", {
      height: "0%",
      duration: 0.6,
      ease: "expo.out",
    });
    gsap.to("#cli2", {
      height: "0%",
      duration: 0.6,
      ease: "expo.out",
    });
    menutl.reverse();
  });
};
navigation();

// Nav Animation

const navAnimation = () => {
  // Variable to store the last scroll position
  let lastScrollTop = 0;

  // Function to handle scroll event
  function handleScroll() {
    let currentScrollTop =
      window.pageYOffset || document.documentElement.scrollTop;

    // Check if user is scrolling up or down
    if (currentScrollTop > lastScrollTop) {
      // Scrolling down

      gsap.to("nav", {
        top: "-20%",
        duration: 0.5,
      });
    } else {
      // Scrolling up
      gsap.to("nav", {
        top: "0%",
        duration: 0.5,
      });
    }
    if (window.innerHeight < lastScrollTop) {
      gsap.to(".nav-center>h1", {
        color: "#d91921",
      });

      gsap.to(".nav-overlay", {
        backdropFilter: "blur(5px)",
      });
      gsap.to(".nav-right i", {
        color: "#000000",
      });
      gsap.to(".nav-right-menu .menu-line", {
        backgroundColor: "#000",
      });
    } else {
      gsap.to(".nav-center>h1", {
        color: "#ffffff",
      });

      gsap.to(".nav-overlay", {
        backdropFilter: "blur(0px)",
      });
      gsap.to(".nav-right i", {
        color: "#fff",
      });
      gsap.to(".nav-right-menu .menu-line", {
        backgroundColor: "#fff",
      });
    }
    // Update last scroll position
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }

  // Add scroll event listener
  window.addEventListener("scroll", handleScroll);
};
navAnimation();

// Page 1 Animations
const page1Animations = () => {
  // Select the circle element
  const circleElement = document.querySelector(".page1-circle");

  // Create objects to track mouse position and custom cursor position
  const mouse = { x: 0, y: 0 }; // Track current mouse position
  const previousMouse = { x: 0, y: 0 }; // Store the previous mouse position
  const circle = { x: 0, y: 0 }; // Track the circle position

  // Initialize variables to track scaling and rotation
  let currentScale = 0; // Track current scale value
  let currentAngle = 0; // Track current angle value

  // Update mouse position on the 'mousemove' event
  window.addEventListener("mousemove", (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  });

  // Smoothing factor for cursor movement speed (0 = smoother, 1 = instant)
  const speed = 0.17;

  // Start animation
  const tick = () => {
    // MOVE
    // Calculate circle movement based on mouse position and smoothing
    circle.x += (mouse.x - circle.x) * speed;
    circle.y += (mouse.y - circle.y) * speed;
    // Create a transformation string for cursor translation
    const translateTransform = `translate(${circle.x}px, ${circle.y}px)`;

    // SQUEEZE
    // 1. Calculate the change in mouse position (deltaMouse)
    const deltaMouseX = mouse.x - previousMouse.x;
    const deltaMouseY = mouse.y - previousMouse.y;
    // Update previous mouse position for the next frame
    previousMouse.x = mouse.x;
    previousMouse.y = mouse.y;
    // 2. Calculate mouse velocity using Pythagorean theorem and adjust speed
    const mouseVelocity = Math.min(
      Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
      150
    );
    // 3. Convert mouse velocity to a value in the range [0, 0.5]
    const scaleValue = (mouseVelocity / 150) * 0.5;
    // 4. Smoothly update the current scale
    currentScale += (scaleValue - currentScale) * speed;
    // 5. Create a transformation string for scaling
    const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

    // Apply all transformations to the circle element in a specific order: translate -> rotate -> scale
    circleElement.style.transform = `${translateTransform}  ${scaleTransform}`;

    // Request the next frame to continue the animation
    window.requestAnimationFrame(tick);
  };

  // Start the animation loop
  tick();

  // Mouse enter and Leave animation
  const canvas = document.querySelector(".webgl");
  canvas.addEventListener("mouseenter", () => {
    gsap.to(circleElement, {
      scale: 1,
      opacity: 1,
    });
  });

  canvas.addEventListener("mouseleave", () => {
    gsap.to(circleElement, {
      scale: 0,
      opacity: 0,
    });
  });

  // Page 1 Footer Text Animation
  gsap.to(".page1-footer-left", {
    y: 200,
    scrollTrigger: {
      scroller: "body",
      trigger: "#page1",
      start: "top -0%",
      end: "top -100%",
      scrub: 1,
      // markers: true,
    },
  });
};
page1Animations();

//  Page 2 Animations

const page2Animation = () => {
  gsap.to("#slide1 h2", {
    transform: "translateX(-200%)",
    duration: 10,
    repeat: -1,
    ease: "none",
  });
  window.addEventListener("wheel", function (dets) {
    if (dets.deltaY > 0) {
      gsap.to("#slide1 h2", {
        transform: "translateX(-200%)",
        duration: 10,
        repeat: -1,
        ease: "none",
      });
      gsap.to("#slide1 h2 img", {
        rotate: 270,
        duration: 1,
      });
    } else {
      gsap.to("#slide1 h2", {
        transform: "translateX(0%)",
        duration: 10,
        repeat: -1,
        ease: "none",
      });
      gsap.to("#slide1 h2 img", {
        rotate: 0,
        duration: 1,
      });
    }
  });

  document
    .querySelector("#main")
    .addEventListener("mousemove", function (dets) {
      gsap.to("#cursor2", {
        top: dets.y,
        left: dets.x,
      });
    });

  document
    .querySelector("#swiper")
    .addEventListener("mouseenter", function (dets) {
      gsap.to("#cursor2", {
        scale: 1,
      });
    });
  document
    .querySelector("#swiper")
    .addEventListener("mouseleave", function (dets) {
      gsap.to("#cursor2", {
        scale: 0,
      });
    });

  document.querySelectorAll("#swiper-btn .btns").forEach(function (btn) {
    btn.addEventListener("mouseenter", function (dets) {
      gsap.to("#cursor2", {
        scale: 0,
      });
    });
  });

  document.querySelectorAll("#swiper-btn .btns").forEach(function (btn) {
    btn.addEventListener("mouseleave", function (dets) {
      gsap.to("#cursor2", {
        scale: 1,
      });
    });
  });

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
    scrollTrigger: {
      trigger: "#swiper",
      scroller: "body",
      start: "top top",
      end: "top -150%",
      scrub: 2,
      pin: true,
    },
  });
  tls
    .to(
      ".swiper",
      {
        transform: "scale(1)",
        delay:0.2
      },
      "a"
    )
    .to(
      "#swiper-btn",
      {
        scale: 0.3,
        delay:0.2
      },
      "a"
    )
    .to(
      ".over-card",
      {
        opacity: 0,
        delay:0.2
      },
      "a"
    )
    .to(
      "#cursor2",
      {
        scale: 0,
        duration: 0,
        delay:0.2
      },
      "a"
    );
};
page2Animation();

//  Canvas Animations
const canvas1 = () => {
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
  canvas1/canvas (1).png
  canvas1/canvas (2).png
  canvas1/canvas (3).png
  canvas1/canvas (4).png
  canvas1/canvas (5).png
  canvas1/canvas (6).png
  canvas1/canvas (7).png
  canvas1/canvas (8).png
  canvas1/canvas (9).png
  canvas1/canvas (10).png
  canvas1/canvas (11).png
  canvas1/canvas (12).png
  canvas1/canvas (13).png
  canvas1/canvas (14).png
  canvas1/canvas (15).png
  canvas1/canvas (16).png
  canvas1/canvas (17).png
  canvas1/canvas (18).png
  canvas1/canvas (19).png
  canvas1/canvas (20).png
  canvas1/canvas (21).png
  canvas1/canvas (22).png
  canvas1/canvas (23).png
  canvas1/canvas (24).png
  canvas1/canvas (25).png
  canvas1/canvas (26).png
  canvas1/canvas (27).png
  canvas1/canvas (28).png
  canvas1/canvas (29).png
  canvas1/canvas (30).png
  canvas1/canvas (31).png
  canvas1/canvas (32).png
  canvas1/canvas (33).png
  canvas1/canvas (34).png
  canvas1/canvas (35).png
  canvas1/canvas (36).png
  canvas1/canvas (37).png
  canvas1/canvas (38).png
  canvas1/canvas (39).png
  
   `;
    return data.split("\n")[index];
  }

  const frameCount = 39;

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
      start: `top top`,
      end: `300% top`,
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
    end: `300% top`,
  });

  document.querySelectorAll(".canvas-text h4").forEach(function (h) {
    var clutterc = "";
    h.textContent.split("").forEach(function (l) {
      clutterc += `<span>${l}</span>`;
    });
    h.innerHTML = clutterc;
  });

  var tlc = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3 canvas",
      scroller: "body",
      start: "top -10%",
      end: "top -250%",
      scrub: 1,
      // markers: true,
    },
  });
  tlc
    .to(".canvas-text-wrap .h41 span", {
      transform: "translateY(-140%)",
      stagger: {
        amount: 0.4,
      },
      duration: 0.6,
    })
    .to(".canvas-text-wrap .h42 span", {
      transform: "translateY(-100%)",
      stagger: {
        amount: 0.4,
      },
      duration: 0.6,
    })
    .to(".canvas-text-wrap .h42 span", {
      transform: "translateY(-230%)",
      stagger: {
        amount: 0.4,
      },
      duration: 0.6,
    })
    .to(".canvas-text-wrap .h43 span", {
      transform: "translateY(-200%)",
      stagger: {
        amount: 0.4,
      },
      duration: 0.6,
    });
};
canvas1();

// Page 4 HoverAnimation

const page4HoverAnimation = () => {
  var sectionDiv = document.querySelector("#page4Desktop #sections");
  var hoverDiv = document.querySelectorAll("#page4Desktop #sections #hoverdiv");

  var rotate = 0;
  var diffrotate = 0;

  sectionDiv.addEventListener("mousemove", (dets) => {
    var diff = dets.clientY - sectionDiv.getBoundingClientRect().top;
    diffrotate = dets.clientX - rotate;
    rotate = dets.clientX;

    gsap.to(hoverDiv, {
      opacity: 1,
      scale: 1,
      top: diff - 30,
      left: dets.clientX - 120,
      ease: "sine.inout",
      duration: 0.5,
      rotate: gsap.utils.clamp(-20, 20, diffrotate),
    });
  });

  sectionDiv.addEventListener("mouseleave", (dets) => {
    gsap.to(hoverDiv, {
      scale: 0,
    });
  });

  var section1 = document.querySelector("#page4Desktop #sections #section1");
  var section2 = document.querySelector("#page4Desktop #sections #section2");
  var section3 = document.querySelector("#page4Desktop #sections #section3");
  var section4 = document.querySelector("#page4Desktop #sections #section4");

  var innerHoverDiv = document.querySelector("#page4Desktop #inner-hoverdiv");

  section1.addEventListener("mouseenter", () => {
    gsap.to(innerHoverDiv, {
      y: "0%",
      duration: 0.7,
      ease: "power4.inOut",
    });
  });

  section2.addEventListener("mouseenter", () => {
    gsap.to(innerHoverDiv, {
      y: "-23%",
      duration: 0.7,
      ease: "power4.inOut",
    });
  });

  section3.addEventListener("mouseenter", () => {
    gsap.to(innerHoverDiv, {
      y: "-46%",
      duration: 0.7,
      ease: "power4.inOut",
    });
  });

  section4.addEventListener("mouseenter", () => {
    gsap.to(innerHoverDiv, {
      y: "-69%",
      duration: 0.7,
      ease: "power4.inOut",
    });
  });
};
page4HoverAnimation();

// Page 5 Animation

const page5Scroll = () => {
  gsap.to("#page5 #video", {
    width: "100%",
    scrollTrigger: {
      scroller: "body",
      trigger: "#page5",
      start: "top 65%",
      end: "top -22%",
      scrub: 1,
      // markers: true,
    },
  });
};
page5Scroll();

const page5Click = () => {
  let flag = 0;
  const videoBox = document.querySelector("#page5 #video");
  const video = document.querySelector("#page5 #video video");

  videoBox.addEventListener("click", () => {
    if (flag === 0) {
      video.pause();
      flag = 1;
    } else if (flag === 1) {
      video.play();
      flag = 0;
    }
  });
};
page5Click();

//  Page 6 Animations
const page6Animation = () => {
  clutterAnimation(".page6-wrapper>h1");

  gsap.from(".page6-wrapper>h1>span", {
    opacity: 0,
    y: 200,
    stagger: {
      each: 0.1,
      from: "center",
    },
    scrollTrigger: {
      scroller: "body",
      trigger: "#page6",
      start: "top 20%",
      end: "top 0%",
      scrub: 1,
      // markers: true,
    },
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      scroller: "body",
      trigger: "#page6",
      start: "top 0",
      end: "top -650%",
      scrub: 1,
      pin: true,
      // markers: true,
    },
  });
  tl.to(
    ".page6-imgs",
    {
      top: "-120%",
      rotate: "-20deg",
      left: "-25%",
      stagger: 0.2,
    },
    "s"
  );

  tl.to(
    "#page6",
    {
      backgroundColor: "#fff",
    },
    "same"
  );

  const allImgs = document.querySelectorAll(".page6-imgs");
  clutterAnimation(".page6-text1");
  clutterAnimation(".page6-text2");
  clutterAnimation(".page6-text3");
  clutterAnimation(".page6-text4");
  clutterAnimation(".page6-text5");
  allImgs.forEach((img, index) => {
    img.addEventListener("mouseenter", () => {
      if (index === 0) {
        gsap.to(".page6-overlay1", {
          opacity: 1,
        });
        gsap.to(".page6-text1>span", {
          opacity: 1,
          scale: 1,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else if (index === 1) {
        gsap.to(".page6-overlay2", {
          opacity: 1,
        });
        gsap.to(".page6-text2>span", {
          opacity: 1,
          scale: 1,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else if (index === 2) {
        gsap.to(".page6-overlay3", {
          opacity: 1,
        });
        gsap.to(".page6-text3>span", {
          opacity: 1,
          scale: 1,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else if (index === 3) {
        gsap.to(".page6-overlay4", {
          opacity: 1,
        });
        gsap.to(".page6-text4>span", {
          opacity: 1,
          scale: 1,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else {
        gsap.to(".page6-overlay5", {
          opacity: 1,
        });
        gsap.to(".page6-text5>span", {
          opacity: 1,
          scale: 1,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      }
    });
    img.addEventListener("mouseleave", () => {
      if (index === 0) {
        gsap.to(".page6-overlay1", {
          opacity: 0,
          delay: 0.5,
        });
        gsap.to(".page6-text1>span", {
          opacity: 0,
          scale: 0,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else if (index === 1) {
        gsap.to(".page6-overlay2", {
          opacity: 0,
          delay: 0.5,
        });
        gsap.to(".page6-text2>span", {
          opacity: 0,
          scale: 0,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else if (index === 2) {
        gsap.to(".page6-overlay3", {
          opacity: 0,
          delay: 0.5,
        });
        gsap.to(".page6-text3>span", {
          opacity: 0,
          scale: 0,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else if (index === 3) {
        gsap.to(".page6-overlay4", {
          opacity: 0,
          delay: 0.5,
        });
        gsap.to(".page6-text4>span", {
          opacity: 0,
          scale: 0,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      } else {
        gsap.to(".page6-overlay5", {
          opacity: 0,
          delay: 0.5,
        });
        gsap.to(".page6-text5>span", {
          opacity: 0,
          scale: 0,
          stagger: {
            amount: 0.3,
            from: "center",
          },
        });
      }
    });
  });
};
page6Animation();

//  Page 7 Animations
const page7animation = () => {
  gsap.to(".scoll-speed", {
    y: "-150",
    scrollTrigger: {
      trigger: "#page7",
      scroll: "body",
      start: "top 100%",
      end: "top -100%",
      scrub: 1,
    },
  });
};
page7animation();

//  footer Animations

const lineEffect = () => {
  document
    .querySelector(".line")
    .addEventListener("mousemove", function (dets) {
      gsap.to(".line svg path", {
        attr: { d: `M -400,50 Q 0,${dets.y * 0.5} 500,50` },
        duration: 0.2,
        ease: "power3.out",
      });
    });
  document
    .querySelector(".line")
    .addEventListener("mouseleave", function (dets) {
      gsap.to(".line svg path", {
        attr: { d: `M -400,50 Q 0,50 500,50` },
        duration: 2,
        ease: "elastic.out(1,0.3)",
      });
    });
  document
    .querySelector(".lineeffect")
    .addEventListener("mousemove", function (dets) {
      let valY =
        dets.y -
        document.querySelector(".lineeffect").getBoundingClientRect().top;
      gsap.to(".lineeffect svg path", {
        attr: { d: `M -500,50 Q 0,${valY * 0.5} 600,50` },
        duration: 0.2,
        ease: "power3.out",
      });
    });

  document
    .querySelector(".lineeffect")
    .addEventListener("mouseleave", function (dets) {
      gsap.to(".lineeffect svg path", {
        attr: { d: `M -500,50 Q 0,50 600,50` },
        duration: 2,
        ease: "elastic.out(1,0.3)",
      });
    });
};
lineEffect();
