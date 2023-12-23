gsap.registerPlugin(ScrollTrigger);

const trainAnimation = gsap.timeline();

trainAnimation.to(".hero",5,{x:-})
ScrollTrigger.create({
    trigger: ".hero",
    start: "center center",
    end:"+=4000"
})