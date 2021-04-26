const navBtn = document.querySelector(".header__nav-btn");
const menu = document.querySelector(".nav-list");
const themeSwitcher = document.querySelector(".theme-switcher");
const themeSlider = document.querySelector(".theme-switcher__slider");
const body = document.querySelector("body");
const slidesWatchOnline = document.querySelectorAll(".watch-online__slide");
const rangeWatchOnline = document.querySelector("[type=range]");
const carousel = document.querySelector(".watch-online__carousel");

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

let watchRangeValue = 2;
let order = 0;

function changeRange() {
  if (!slidesWatchOnline[rangeWatchOnline.value - 1].classList.contains("slide-active")) {
    slidesWatchOnline[rangeWatchOnline.value - 1].classList.add("slide-active");
    slidesWatchOnline[watchRangeValue - 1].classList.remove("slide-active");
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
    // if (this.value > 2) {
    //   slidesWatchOnline[this.value - 3].classList.add("hide-slide");
    // }
  } else {
    document.querySelector(".watch-online__carousel").style.transform = `translateX(${(2 - rangeWatchOnline.value) * shift}px)`;
    // if (this.value > 1) {
    //   slidesWatchOnline[this.value - 2].classList.remove("hide-slide");
    // }
  }

  watchRangeValue = rangeWatchOnline.value;
}

rangeWatchOnline.addEventListener("input", changeRange);

carousel.addEventListener("click", function(e) {
  nodes = Array.prototype.slice.call(slidesWatchOnline);
  if (e.target.tagName == "IMG") {
    rangeWatchOnline.value = nodes.indexOf(e.target.parentElement) + 1;
  }
  changeRange();
})

