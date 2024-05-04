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
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();

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
        top: "-10%",
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
      document.querySelector(".nav-center>img").src = "imgs/logo1.png";
      gsap.to("nav", {
        backgroundColor: "#ffffffd7",
      });
      gsap.to(".nav-right i", {
        color: "#000000",
      });
      gsap.to(".nav-right-menu", {
        border: "1px solid #000000",
      });
    } else {
      document.querySelector(".nav-center>img").src = "imgs/logo.webp";
      gsap.to("nav", {
        backgroundColor: "transparent",
      });
      gsap.to(".nav-right i", {
        color: "#fff",
      });
      gsap.to(".nav-right-menu", {
        border: "1px solid #fff",
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
    .querySelector("#swiper")
    .addEventListener("mousemove", function (dets) {
      gsap.to("#cursor2", {
        top: dets.y,
        left: dets.x,
      });
    });
  document
    .querySelector("#swiper")
    .addEventListener("mouseleave", function (dets) {
      gsap.to("#cursor2", {
        top: "50%",
        left: "50%",
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
        delay: 0.1,
      },
      "a"
    )
    .to(
      "#swiper-btn",
      {
        scale: 0.3,
        delay: 0.1,
      },
      "a"
    )
    .to(
      ".over-card",
      {
        opacity: 0,
        delay: 0.1,
      },
      "a"
    )
    .to(
      "#cursor2",
      {
        scale: 0,
        duration: 0,
        delay: 0.1,
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
      end: `250% top`,
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
    end: `250% top`,
  });
  var tlc = gsap.timeline({
    scrollTrigger: {
      trigger: "#page3 canvas",
      scroller: "body",
      start: "top -10%",
      end: "top -220%",
      scrub: 1,
      // markers: true,
    },
  });
  tlc
    .to(".textc h2", {
      transform: "translateY(0%)",
      duration: 0.5,
      delay: 3,
    })
    .to(".textc h2", {
      transform: "translateY(-106%)",
      duration: 0.5,
      delay: 3,
    });
};
canvas1();

// Page5 Animation

const page5Animation = () => {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#page5",
      scroller: "body",
      // markers: true,
      start: "top 0%",
      end: "top -200%",
      pin: true,
      scrub: true,
    },
  });
  tl.to(
    "#page5 #video",
    {
      width: "109vw",
      height: "109vh",
      ease: "power4",
    },
    "a"
  )
    .to(
      "#line1 h1",
      {
        marginBottom: "5vw",
        opacity: 0,
      },
      "a"
    )
    .to(
      "#line2 #first h1",
      {
        marginRight: "5vw",
        opacity: 0,
      },
      "a"
    )
    .to(
      "#line2 #second h1",
      {
        marginLeft: "5vw",
        opacity: 0,
      },
      "a"
    )
    .to(
      "#line3 h1",
      {
        marginTop: "5vw",
        opacity: 0,
      },
      "a"
    );
};
page5Animation();

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

  tl.to(
    ".page6-wrapper>h1>span",
    {
      opacity: 0,
      y: -250,
      stagger: {
        each: 0.1,
        from: "random",
      },
    },
    "same"
  );
};
page6Animation();
const page7animation = () => {
  gsap.to(".scoll-speed", {
    transform: "translateY(-20%)",
    duration: 1.5,
    scrollTrigger: {
      trigger: "#page7",
      scroll: "body",
      start: "top bottom",
      end: "bottom -10%",
      scrub: 1,
    },
  });
};

//  Page  Animations

page7animation();

//  footer Animations

const lineEffect = () => {
  document
    .querySelector(".line")
    .addEventListener("mousemove", function (dets) {
      gsap.to(".line svg path", {
        attr: { d: `M 0,75 Q540, ${dets.y} 1080,75` },
        duration: 0.2,
        ease: "power3.out",
      });
    });
  document
    .querySelector(".line")
    .addEventListener("mouseleave", function (dets) {
      gsap.to(".line svg path", {
        attr: { d: `M 0,75 Q540, 75 1080,75` },
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
        attr: { d: `M 0,75 Q725, ${valY} 1450,75` },
        duration: 0.2,
        ease: "power3.out",
      });
    });

  document
    .querySelector(".lineeffect")
    .addEventListener("mouseleave", function (dets) {
      gsap.to(".lineeffect svg path", {
        attr: { d: `M 0,75 Q725,75 1450,75` },
        duration: 2,
        ease: "elastic.out(1,0.3)",
      });
    });
};
lineEffect();
