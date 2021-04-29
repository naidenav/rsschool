const navBtn = document.querySelector(".header__nav-btn");
const menu = document.querySelector(".nav-list");
const themeSwitcher = document.querySelector(".theme-switcher");
const themeSlider = document.querySelector(".theme-switcher__slider");
const body = document.querySelector("body");

if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  body.classList.remove("light-mode");
  themeSwitcher.classList.add("switcher_chrcked");
  themeSlider.classList.add("slider_checked");
}

themeSwitcher.addEventListener("click", () => {
  if (body.classList.contains("light-mode")) {
    themeSwitcher.classList.add("switcher_checked");
    themeSlider.classList.add("slider_checked");
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark");
  } else {
    themeSwitcher.classList.remove("switcher_checked");
    themeSlider.classList.remove("slider_checked");
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  }
})

navBtn.addEventListener("click", () => {
  menu.classList.toggle("nav-list_active");
  navBtn.classList.toggle("nav-btn_active");
})

// Слайдер

{

  const carousel = document.querySelector(".carousel");
  const range = document.querySelector("[type=range]");
  const slides = document.querySelectorAll(".carousel__slide");
  const countSlides = document.querySelector(".scroll__n");
  const marker = document.querySelectorAll(".marker");
  const map = document.querySelector(".map__wrapper");

  let currentMarker = "Panda";
  let currentItem = 1;
  let firstVisible = 0;
  let lastVisible = 2;

  if (document.documentElement.clientWidth < 640) {
    lastVisible = 2;
  } else if (document.documentElement.clientWidth < 1200) {
    lastVisible = 3;
  } else if (document.documentElement.clientWidth < 1920) {
    lastVisible = 4;
  }

  function changeFirstVisible(n) {
    if (document.documentElement.clientWidth < 640) {
      firstVisible = n - 2;
    } else if (document.documentElement.clientWidth < 1200) {
      firstVisible = n - 3;
    } else if (document.documentElement.clientWidth < 1920) {
      firstVisible = n - 4;
    }
  }

  function changeLastVisible(n) {
    if (document.documentElement.clientWidth < 640) {
      lastVisible = n + 2;
    } else if (document.documentElement.clientWidth < 1200) {
      lastVisible = n + 3;
    } else if (document.documentElement.clientWidth < 1920) {
      lastVisible = n + 4;
    }
  }

  let shift;

  if (document.documentElement.clientWidth < 640) {
    shift = 82.5;
  } else if (document.documentElement.clientWidth < 1200) {
    shift = 130;
  } else {
    shift = 137;
  }

  function changeCurrentItem(n) {
    currentItem = (n + slides.length) % slides.length;
  }

  // function countMoveUp() {
  //   if (window.screen.width < 1200 && countMove < 3) {
  //     countMove++;
  //   } else if (window.screen.width >= 1200 && window.screen.width < 1920 && countMove < 4) {
  //     countMove++;
  //   } else if (window.screen.width >= 1920 && countMove < 7) {
  //     countMove++;
  //   } else if (range.value === "7") {
  //     countMove = 0;
  //   }
  // }

  // function countMoveDown() {
  //   if (window.screen.width < 1200 && range.value === "2") {
  //     countMove = 3;
  //   } else if (window.screen.width >= 1200 && window.screen.width < 1920 && range.value === "2") {
  //     countMove = 4;
  //   } else if (window.screen.width >= 1920 && range.value === "2") {
  //     countMove = 7;
  //   } else if (countMove > 0) {
  //     countMove--;
  //   }
  // }

  function shiftSlide(n) {
    const lastCurrent = currentItem;
    changeCurrentItem(n);
    slides[lastCurrent].classList.remove("slide-active");
    slides[currentItem].classList.add("slide-active");
  }

  function shiftCarousel() {
    let x;
    if (window.screen.width < 1920) {
      if (range.value - 1 < firstVisible) {
        x = range.value - 1;
        shiftCarouselToRight(x);
      } else if (range.value - 1 > lastVisible) {
        x = range.value - 1 - lastVisible + firstVisible;
        shiftCarouselToLeft(x);
      }
    }
  }

  function shiftCarouselToRight(x) {
    carousel.style.transform = `translate(${-shift * x}px)`;
    changeLastVisible(range.value - 1);
    firstVisible = range.value - 1;
  }

  function shiftCarouselToLeft(x) {
    carousel.style.transform = `translate(${-shift * x}px)`;
    changeFirstVisible(range.value - 1);
    lastVisible = range.value - 1;
  }

  function changeMarker(title) {
    for (let i = 0; i < marker.length; i++) {
      if (marker[i].title === currentMarker) {
        marker[i].classList.remove("marker-active");
      }
      if (marker[i].title === title) {
        marker[i].classList.add("marker-active");
      }
    }
    currentMarker = title;
  }

  range.addEventListener("input", function() {
    shiftCarousel();
    shiftSlide(this.value - 1);
    changeMarker(slides[range.value - 1].title);
    countSlides.innerHTML = `0${range.value}/`;
  })

  document.querySelector(".btn_left").addEventListener("click", function() {
    shiftSlide(currentItem - 1);
    range.value = currentItem + 1;

    changeMarker(slides[range.value - 1].title);
    countSlides.innerHTML = `0${currentItem + 1}/`;
 })

  document.querySelector(".btn_right").addEventListener("click", function() {
    shiftSlide(currentItem + 1);
    range.value = currentItem + 1;
    shiftCarousel();
    changeMarker(slides[range.value - 1].title);
    countSlides.innerHTML = `0${currentItem + 1}/`;
  })

  carousel.addEventListener("click", function(e) {
    nodes = Array.prototype.slice.call(slides);
    if (e.target.tagName == "IMG") {
      range.value = nodes.indexOf(e.target.parentElement.parentElement.parentElement) + 1;
    }
    shiftSlide(range.value - 1);
    changeMarker(slides[range.value - 1].title);
    countSlides.innerHTML = `0${range.value}/`;
  })

  map.addEventListener("click", function(e) {
    nodes = Array.prototype.slice.call(marker);
    if (e.target.classList.contains("marker-img")) {
      range.value = nodes.indexOf(e.target.parentElement) + 1;
    } else if (e.target.classList.contains("marker-icon-img")) {
      range.value = nodes.indexOf(e.target.parentElement.parentElement) + 1;
    }
    shiftCarousel();
    shiftSlide(range.value - 1);
    changeMarker(slides[range.value - 1].title);
    countSlides.innerHTML = `0${range.value}/`;  
  })

}