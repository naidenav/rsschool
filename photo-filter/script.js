const inputRange = document.querySelectorAll("input[type=range]");
const initialRange = [];
inputRange.forEach(item => initialRange.push(item.value));
const reset = document.querySelector(".btn-reset");
const next = document.querySelector(".btn-next");
const load = document.querySelector(".btn-load");
const save = document.querySelector(".btn-save");
const image = document.querySelector(".main-image");
const fileInput = document.querySelector("input[type=file]");

function rangeHandler() {
  const sizing = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + sizing);
  this.nextElementSibling.value = this.value;
}

inputRange.forEach(input => input.addEventListener("input", rangeHandler));

reset.addEventListener("click", function() {
  inputRange.forEach(function(item,index) {
    const sizing = item.dataset.sizing || '';
    document.documentElement.style.setProperty(`--${item.name}`, initialRange[index] + sizing);
    item.value = initialRange[index];
    item.nextElementSibling.value = initialRange[index];
  });
})

let numberOfImage = 1;

function getSrc() {
  const hour = (new Date()).getHours();
  let timesOfDay;
  if (hour < 6) {
    timesOfDay = 'night';
  } else if (hour < 12) {
    timesOfDay = 'morning';
  } else if (hour < 18) {
    timesOfDay = 'day';
  } else timesOfDay = 'evening';
  if (numberOfImage < 10) {
    numberOfImage = `0${numberOfImage}`;
  } else if (numberOfImage > 20) {
    numberOfImage = '01';
  }
  const src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay}/${numberOfImage}.jpg`;
  pasteImage(src)
  +numberOfImage++;
  next.disabled = true;
  setTimeout(function() { next.disabled = false }, 1000);
}

function pasteImage(imageSrc) {
  const img = new Image();
  img.src = imageSrc;
  img.onload = () => {
    image.src = imageSrc;
  }
}

next.addEventListener("click", getSrc);

function getFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    image.src = reader.result;
  }
  reader.readAsDataURL(file);
}

load.addEventListener("change", getFile);