/**
 * Importing the libraries
 */
import "remixicon/fonts/remixicon.css";
import Lenis from "@studio-freight/lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Lenis js
 */
const lenisJs = () => {
  const lenis = new Lenis();

  lenis.on("scroll", (e) => {});

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 700);
  });

  gsap.ticker.lagSmoothing(0);
};
lenisJs();


Totty.animateSvg("#curve", {
  ease: "elastic.out(1,0.3)",
  offsetLeft: 10,
  offsetRight: 10,
});