const navBtn = document.querySelector(".header__nav-btn");
const menu = document.querySelector(".nav-list");

navBtn.addEventListener("click", () => {
  menu.classList.toggle("nav-list_active");
  navBtn.classList.toggle("nav-btn_active");
})