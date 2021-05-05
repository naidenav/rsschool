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

// Слайдер блока Watch Online

const slidesWatchOnline = document.querySelectorAll(".watch-online__slide");
const rangeWatchOnline = document.querySelector("[type=range]");
const carousel = document.querySelector(".watch-online__carousel");
const countWatchOnline = document.querySelector(".watch-online .scroll__n");
let watchRangeValue = 2;

function changeRange() {
  if (!slidesWatchOnline[rangeWatchOnline.value].classList.contains("slide-active")) {
    slidesWatchOnline[rangeWatchOnline.value].classList.add("slide-active");
    slidesWatchOnline[watchRangeValue].classList.remove("slide-active");
  }

  let shift;

  if (window.screen.width < 640) {
    shift = 122;
  } else if (window.screen.width < 1920) {
    shift = 210;
  } else {
    shift = 186;
  }  

  if (watchRangeValue < rangeWatchOnline.value) {
    document.querySelector(".watch-online__carousel").style.transform = `translateX(-${(rangeWatchOnline.value - 2) * shift}px)`;
    for (let i = 0; i < rangeWatchOnline.value - 1; i++) {
      if (slidesWatchOnline[i] && !slidesWatchOnline[i].classList.contains("hide-slide")) {
        slidesWatchOnline[i].classList.add("hide-slide");
      }
    }
  } else {
    document.querySelector(".watch-online__carousel").style.transform = `translateX(${(2 - rangeWatchOnline.value) * shift}px)`;
    for (let i = rangeWatchOnline.value - 1; i < slidesWatchOnline.length; i++) {
      if (slidesWatchOnline[i] && slidesWatchOnline[i].classList.contains("hide-slide")) {
        slidesWatchOnline[i].classList.remove("hide-slide");
      }
    }
  }
  countWatchOnline.innerHTML = `0${rangeWatchOnline.value}/`;
  watchRangeValue = rangeWatchOnline.value;
}

rangeWatchOnline.addEventListener("input", changeRange);

carousel.addEventListener("click", function(e) {
  console.log(e.target);
  nodes = Array.prototype.slice.call(slidesWatchOnline);
  if (e.target.tagName == "IMG") {
    rangeWatchOnline.value = nodes.indexOf(e.target.parentElement);
  }
  changeRange();
})

// Слайдер блока How It Works 

{

  const rangeHowItWorks = document.querySelector(".how-it-works [type=range]");
  const slidesHowItWorks = document.querySelectorAll(".how-it-works__slide");
  const countHowItWorks = document.querySelector(".how-it-works .scroll__n");
  let currentItem = 0;
  let isEnable = true;

  function changeCurrentItem(n) {
    currentItem = (n + slidesHowItWorks.length) % slidesHowItWorks.length;
  }

  function nextSlide(n) {
    hideSlide("to-left");
    changeCurrentItem(n);
    showSlide("from-right");
  }
  
  function previousSlide(n) {
    hideSlide("to-right");
    changeCurrentItem(n);
    showSlide("from-left");
  }

  function hideSlide(direction) {
    isEnable = false
    const current = currentItem
    slidesHowItWorks[currentItem].classList.add(direction);
    slidesHowItWorks[current].addEventListener("animationend", () => {
      slidesHowItWorks[current].classList.remove("active", direction);
    })
  }

  function showSlide(direction) {
    slidesHowItWorks[currentItem].classList.add("next", direction);
    slidesHowItWorks[currentItem].addEventListener("animationend", () => {
      slidesHowItWorks[currentItem].classList.remove("next", direction);
      slidesHowItWorks[currentItem].classList.add("active");
      isEnable = true;
    })
  }

  rangeHowItWorks.addEventListener("change", function() {
    if (isEnable === true) {
      if (this.value > currentItem + 1) {
        nextSlide(this.value - 1);
      }
      if (this.value < currentItem + 1) {
        previousSlide(this.value - 1);
      }
    }
  })

  rangeHowItWorks.addEventListener("input", () => {
    countHowItWorks.innerHTML = `0${rangeHowItWorks.value}/`;
  })

}

// Слайдер блока Pets in zoo

{

  const rangePetsInZoo = document.querySelector(".pets-in-zoo [type=range]");
  const slidesPetsInZoo = document.querySelectorAll(".pets-in-zoo__slider");
  const countPetsInZoo = document.querySelector(".pets-in-zoo .scroll__n");
console.log(document.querySelector(".pets-in-zoo .btn_left"))
  let currentItem = 0;
  let isEnable = true;

  function changeCurrentItem(n) {
    currentItem = (n + slidesPetsInZoo.length) % slidesPetsInZoo.length;
  }

  function nextSlide(n) {
    hideSlide("to-left");
    changeCurrentItem(n);
    showSlide("from-right");
  }
  
  function previousSlide(n) {
    hideSlide("to-right");
    changeCurrentItem(n);
    showSlide("from-left");
  }

  function hideSlide(direction) {
    isEnable = false
    const current = currentItem
    slidesPetsInZoo[currentItem].classList.add(direction);
    slidesPetsInZoo[current].addEventListener("animationend", () => {
      slidesPetsInZoo[current].classList.remove("active", direction);
    })
  }

  function showSlide(direction) {
    slidesPetsInZoo[currentItem].classList.add("next", direction);
    slidesPetsInZoo[currentItem].addEventListener("animationend", () => {
      slidesPetsInZoo[currentItem].classList.remove("next", direction);
      slidesPetsInZoo[currentItem].classList.add("active");
      isEnable = true;
    })
  }



  rangePetsInZoo.addEventListener("change", function() {
    if (isEnable === true) {
      if (this.value > currentItem + 1) {
        nextSlide(this.value - 1);
      }
      if (this.value < currentItem + 1) {
        previousSlide(this.value - 1);
      }
    }
  })

  rangePetsInZoo.addEventListener("input", () => {
    countPetsInZoo.innerHTML = `0${rangePetsInZoo.value}/`;
  })

  document.querySelector(".pets-in-zoo .btn_left").addEventListener("click", function() {
    if (isEnable === true) {
      previousSlide(currentItem - 1);
      rangePetsInZoo.value = currentItem + 1;
      countPetsInZoo.innerHTML = `0${currentItem + 1}/`;
    }
  })

  document.querySelector(".pets-in-zoo .btn_right").addEventListener("click", function() {
    if (isEnable === true) {
      nextSlide(currentItem + 1);
      rangePetsInZoo.value = currentItem + 1;
      countPetsInZoo.innerHTML = `0${currentItem + 1}/`;
    }
  })

}

// Popup

const donateBtn = document.querySelector(".pay-and-feed .watch-btn");
const donateBtnFooter = document.querySelector(".footer .watch-btn");
const cover = document.querySelector(".cover");

function openPopup() {
  cover.classList.add("popup_opacity-up");
  cover.classList.remove("cover_hidden");
  cover.addEventListener("animationend", () => {
    document.body.classList.add("notScrollable");
    cover.classList.remove("popup_opacity-up");
    cover.classList.remove("cover_hidden");
  })
}

function closePopup() {
  cover.classList.add("popup_opacity-down");
  cover.addEventListener("animationend", () => {
    document.body.classList.remove("notScrollable");
    cover.classList.add("cover_hidden");
    cover.classList.remove("popup_opacity-down");
  })
}

donateBtn.addEventListener("click", openPopup);

donateBtnFooter.addEventListener("click", openPopup);

cover.addEventListener("click", (e) => {
  if (e.target.classList.contains("cover")) {
    closePopup();
  }
})