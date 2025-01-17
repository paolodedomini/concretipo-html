gsap.registerPlugin(Draggable);

let slideDelay = 5;
let slideDuration = 3;
let wrap = true;

let slides = document.querySelectorAll(".hero__mainimg");
let prevButton = document.querySelector("#prevButton");
let nextButton = document.querySelector("#nextButton");
let nextButtonImage = nextButton.querySelector("img");
let prevButtonImage = prevButton.querySelector("img");
let progressWrap = gsap.utils.wrap(0, 1);
let numSlides = slides.length;

gsap.set(slides, {
  backgroundColor:
    "random([red, blue, green, purple, orange, yellow, lime, pink])",
  xPercent: (i) => i * 100,
});

let wrapX = gsap.utils.wrap(-100, (numSlides - 1) * 100);
let timer = gsap.delayedCall(slideDelay, autoPlay);

let animation = gsap.to(slides, {
  xPercent: "+=" + numSlides * 100,
  duration: 1,
  ease: "none",
  paused: true,
  repeat: -1,
  modifiers: {
    xPercent: wrapX,
  },
});

let proxy = document.createElement("div");
let slideAnimation = gsap.to({}, {});
let slideWidth = 0;
let wrapWidth = 0;

let draggable = new Draggable(proxy, {
  trigger: ".slides-container",
  inertia: true,
  onPress: updateDraggable,
  onDrag: updateProgress,
  onThrowUpdate: updateProgress,
  snap: {
    x: snapX,
  },
});

resize();

window.addEventListener("resize", resize);

prevButton.addEventListener("click", function () {
  animateSlides(1);
});

nextButton.addEventListener("click", function () {
  animateSlides(-1);
});

function updateDraggable() {
  timer.restart(true);
  slideAnimation.kill();
  this.update();
}

function animateSlides(direction) {
  timer.restart(true);
  slideAnimation.kill();
  let x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);

  slideAnimation = gsap.to(proxy, {
    x: x,
    onUpdate: updateProgress,
  });
}

function autoPlay() {
  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
    timer.restart(true);
  } else {
    animateSlides(-1);
  }
}

function updateProgress() {
  animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
}

function snapX(value) {
  let snapped = gsap.utils.snap(slideWidth, value);
  return wrap
    ? snapped
    : gsap.utils.clamp(-slideWidth * (numSlides - 1), 0, snapped);
}

function resize() {
  let norm = gsap.getProperty(proxy, "x") / wrapWidth || 0;

  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;

  wrap ||
    draggable.applyBounds({ minX: -slideWidth * (numSlides - 1), maxX: 0 });

  gsap.set(proxy, {
    x: norm * wrapWidth,
  });

  animateSlides(0);
  slideAnimation.progress(1);
}
