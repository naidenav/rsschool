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

// Слайдер видео

{

  const dots = document.querySelectorAll(".dot");
  const scroll = document.querySelector(".scroll");
  const videoSlides = document.querySelectorAll(".playlist");
  const dotArr = Array.prototype.slice.call(dots);
  const playlistWrapper = document.querySelector(".playlist__wrapper");
  const iframe = document.querySelector("iframe");

  let currentItem = 0;
  let isEnable = true;

  function nextSlide(n) {
    hideSlide("to-left");
    currentItem = n;
    showSlide("from-right");
  }
  
  function previousSlide(n) {
    hideSlide("to-right");
    currentItem = n;
    showSlide("from-left");
  }

  function hideSlide(direction) {
    isEnable = false
    const current = currentItem;
    videoSlides[currentItem].classList.add(direction);
    videoSlides[current].addEventListener("animationend", () => {
      videoSlides[current].classList.remove("active", direction);
    })
  }

  function showSlide(direction) {
    videoSlides[currentItem].classList.add("next", direction);
    videoSlides[currentItem].addEventListener("animationend", () => {
      videoSlides[currentItem].classList.remove("next", direction);
      videoSlides[currentItem].classList.add("active");
      isEnable = true;
    })
  }

  scroll.addEventListener("click", function(e) {
    if (isEnable === true && e.target.classList.contains("dot") && !e.target.classList.contains("dot-active")) {
      const targetItem = dotArr.indexOf(e.target);
      dots[currentItem].classList.remove("dot-active");
      if (targetItem > currentItem) {
        nextSlide(targetItem);
      }
      if (targetItem < currentItem) {
        previousSlide(targetItem);
      }
      dots[currentItem].classList.add("dot-active");
    }
  })

  playlistWrapper.addEventListener("click", function(e) {
    if (e.target.classList.contains("plug")) {
      const srcOfIframe = iframe.src;
      const srcOfImages = e.target.previousSibling.previousSibling.src;
      const codeOfCurrentVideo = srcOfIframe.match(/\/[\w,-]{11}$/i);
      const codeOfNextVideo = srcOfImages.match(/\/[\w,-]{11}/i);

      e.target.previousSibling.previousSibling.src = `//img.youtube.com/vi${codeOfCurrentVideo}/mqdefault.jpg`;
      iframe.src = `https://www.youtube-nocookie.com/embed${codeOfNextVideo}`;
    }
  })

}

// Popup

const donateBtn = document.querySelector(".the-beijing-zoo__description .watch-btn");
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
