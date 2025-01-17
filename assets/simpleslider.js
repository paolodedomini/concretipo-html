document.addEventListener("DOMContentLoaded", (event) => {
  let wrapper = document.querySelector(".hero__imgwrapper");
  let slides = document.querySelectorAll(".hero__imgwrapper>img");
  let prevButton = document.querySelector("#prevButton");
  let nextButton = document.querySelector("#nextButton");
  let currentSlide = 1;
  let slidesNumber = slides.length;

  function setZindexInSliderImages(slides, currentSlide) {
    slides.forEach((item, index) => {
      if (index === currentSlide - 1) {
        item.style.zIndex = 10;
      } else {
        item.style.zIndex = 1;
      }
    });
  }
  setZindexInSliderImages(slides, currentSlide);
  // limitForImages -  funzione che gestisce le immagini in next e prev
  function limitForImages(type, currentSlide, slidesNumber) {
    if (type === "prev") {
      if (currentSlide >= slidesNumber) {
        currentSlide = slidesNumber;
        return currentSlide - 1;
      }
      if (currentSlide <= 1) {
        currentSlide = 1;
        return currentSlide;
      } else {
        return currentSlide - 1;
      }
    }
    if (type === "next") {
      if (currentSlide >= slidesNumber) {
        console.log("a");
        return slidesNumber;
      } else {
        return currentSlide + 1;
      }
    }
  }
  function buttonVisibility(prevButton, nextButton) {
    if (currentSlide <= 1) {
      prevButton.style.display = "none";
    } else {
      prevButton.style.display = "inherit";
    }
    if (currentSlide >= slidesNumber) {
      nextButton.style.display = "none";
    } else {
      nextButton.style.display = "inherit";
    }
  }

  function createImageForNavButtons(
    btnPrev,
    btnNext,
    currentSlide,
    slidesNumber
  ) {
    const getNextSlideImageName =
      slides[
        limitForImages("next", currentSlide, slidesNumber) - 1
      ].getAttribute("src");

    const getPrevSlideImageName =
      slides[
        limitForImages("prev", currentSlide, slidesNumber) - 1
      ].getAttribute("src");

    const imageNextButton = btnNext.querySelector("img");
    const imagePrevButton = btnPrev.querySelector("img");
    imagePrevButton.setAttribute("src", getPrevSlideImageName);
    imageNextButton.setAttribute("src", getNextSlideImageName);
    /*     if (currentSlide <= 0) {
      prevButton.style.opacity = 0;
      nextButton.style.opacity = 1;
    }
    if (currentSlide >= slidesNumber - 1) {
      nextButton.style.opacity = 0;
      prevButton.style.opacity = 1;
    } */
  }
  buttonVisibility(prevButton, nextButton);
  createImageForNavButtons(prevButton, nextButton, currentSlide, slidesNumber);

  nextButton.addEventListener("click", () => {
    if (currentSlide >= slidesNumber) {
      currentSlide = slidesNumber;
    } else {
      gsap.to(wrapper, { x: `${-100 * currentSlide}vw` });
      currentSlide += 1;
    }
    setZindexInSliderImages(slides, currentSlide);
    buttonVisibility(prevButton, nextButton);
    createImageForNavButtons(
      prevButton,
      nextButton,
      currentSlide,
      slidesNumber
    );
  });
  prevButton.addEventListener("click", () => {
    currentSlide -= 1;
    if (currentSlide <= 1) {
      currentSlide = 1;
      gsap.to(wrapper, { x: `${0}vw` });
    } else {
      gsap.to(wrapper, { x: `${-100 * (currentSlide - 1)}vw` });
    }
    setZindexInSliderImages(slides, currentSlide);
    buttonVisibility(prevButton, nextButton);
    createImageForNavButtons(
      prevButton,
      nextButton,
      currentSlide,
      slidesNumber
    );
  });
});
