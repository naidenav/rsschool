const inputRange = document.querySelectorAll("input[type=range]");
const initialRange = [];
inputRange.forEach(item => initialRange.push(item.value));
const reset = document.querySelector(".btn-reset");
const next = document.querySelector(".btn-next");
const load = document.querySelector(".btn-load");
const save = document.querySelector(".btn-save");
const image = document.querySelector(".main-image");

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

next.addEventListener("click", function() {
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
  image.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timesOfDay}/${numberOfImage}.jpg`;
  +numberOfImage++;
})