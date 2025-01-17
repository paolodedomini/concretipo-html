gsap.registerPlugin(ScrollTrigger);
// Initialize a new Lenis instance for smooth scrolling
document.addEventListener("DOMContentLoaded", (event) => {
  const lenis = new Lenis();

  // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
  lenis.on("scroll", ScrollTrigger.update);

  // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
  // This ensures Lenis's smooth scroll animation updates on each GSAP tick
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000); // Convert time from seconds to milliseconds
  });

  // Disable lag smoothing in GSAP to prevent any delay in scroll animations
  gsap.ticker.lagSmoothing(0);

  // ANIMAZIONI IN HOME
  gsap.set(".homeFirst__right", { y: 200, opacity: 0 });
  gsap.to(".homeFirst__right", {
    scrollTrigger: {
      trigger: ".homeFirst",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
    },
    y: 0,
    opacity: 1,
  });

  gsap.set(".homeFirst__left", { x: -100, opacity: 0 });
  gsap.to(".homeFirst__left", {
    scrollTrigger: {
      trigger: ".homeFirst",
      start: "top bottom",
      end: "bottom bottom",
      scrub: 1,
    },
    x: 0,
    opacity: 1,
  });
  let pro = gsap.utils.toArray(".homeSecond__left .projectImages li");

  gsap.set(pro, {
    left: -900,
    opacity: 0.5,
  });
  gsap.to(pro, {
    scrollTrigger: {
      trigger: ".homeSecond__left",
      start: "top bottom",
      end: "90% bottom",
      toggleActions: "play none reverse none",
    },
    left: 0,
    opacity: 1,
    stagger: 0.3,
    duration: 1,
  });
  gsap.set(".homeThird__left", { x: -100, opacity: 0 });
  gsap.to(".homeThird__left", {
    scrollTrigger: {
      trigger: ".homeThird",
      start: "top bottom",
      end: "80% bottom",
      scrub: 1,
    },
    x: 0,
    opacity: 1,
  });
  gsap.set(".homeThird__right", { y: 200, opacity: 0 });
  gsap.to(".homeThird__right", {
    scrollTrigger: {
      trigger: ".homeThird",
      start: "top bottom",
      end: "90% bottom",
      scrub: 1,
    },
    y: 0,
    opacity: 1,
  });
  gsap.set(".tech>img", {
    y: 100,
    opacity: 0,
  });
  gsap.to(".tech>img", {
    scrollTrigger: {
      trigger: ".tech",
      start: "top bottom",
      end: "90% bottom",
    },
    y: 0,
    opacity: 1,
    stagger: 0.3,
  });
  //zoom immagini della HERO
  gsap.set(".hero__imgwrapper>img", { scale: 1, transformOrigin: "50% 50%" });
  gsap.to(".hero__imgwrapper>img", {
    scrollTrigger: {
      trigger: ".hero",
      start: "1% top",
      end: "center top",
      scrub: 2,
    },
    scale: 1.1,
    transformOrigin: "50% 50%",
  });

  gsap.set(".iconLogo", { y: 200, opacity: 0, rotate: 180 });
  gsap.to(".iconLogo", {
    scrollTrigger: {
      trigger: ".iconLogo",
      toggleActions: "play none none none",
    },

    y: 0,
    opacity: 1,
    rotate: -30,
  });

  // CAROUSEL PER I PROGETTI
  const listName = document.querySelectorAll(".projectList > li");
  const listImage = document.querySelectorAll(".projectImages > li");

  let numeroCasuale = () => Math.floor(Math.random() * 21); // 0 inclusivo, 10 inclusivo
  let isOpen = false;
  let currentImageIndex;
  listImage.forEach((item, index) => {
    assignZindexToElement(item, index);
    rotateRandomlyImage(item, numeroCasuale);
  });
  function assignZindexToElement(item, index) {
    item.style.zIndex = -index;
  }
  function rotateRandomlyImage(item, fnRandomNumber) {
    item.style.transform = `rotate(${fnRandomNumber()}deg)`;
  }
  function filterArrayActiveItem(itemArray, index) {
    return Array.from(itemArray).filter((itemb, indexb) => {
      return itemb !== itemArray[index];
    });
  }
  function disablePointerEvents(variable, itemArray) {
    if (variable) {
      itemArray.style.opacity = 0.5;
      itemArray.style.pointerEvents = "none";
    } else {
      itemArray.style.opacity = 1;
      itemArray.style.pointerEvents = "auto";
    }
  }
  function animate(listImage, listName, index, isOpen) {
    if (isOpen) {
      gsap.to(listImage[index], { rotate: 0 });
    } else {
    }
    const listArrayFiltered = filterArrayActiveItem(listName, index);

    //Opacità dei nomi progetti non attivi
    listArrayFiltered.forEach((item) => {
      disablePointerEvents(isOpen, item);
    });
    // Visibilità delle immagini
    listImage.forEach((item, indexa) => {
      if (isOpen && index !== indexa) {
        gsap.to(item, { x: -1000, opacity: 0.2, rotate: 120 });
      } else if (isOpen && index === indexa) {
        gsap.to(item, { x: 0, opacity: 1, rotate: 0 }).then(() => {
          gsap.set(item, { zIndex: 100 });
        });
      } else if (!isOpen && index === indexa) {
        gsap.set(item, { zIndex: -index });
      } else if (!isOpen) {
        gsap.to(item, { x: 0, opacity: 1, rotate: numeroCasuale() });
        item.style.zIndex = -indexa;
      }
    });
  }

  listName.forEach((item, index) => {
    item.addEventListener("click", () => {
      isOpen = !isOpen;
      currentImageIndex = index;
      animate(listImage, listName, index, isOpen);
    });
  });
  listImage.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index === currentImageIndex) {
        isOpen = false;
        animate(listImage, listName, index, isOpen);
      }
    });
  });
});
