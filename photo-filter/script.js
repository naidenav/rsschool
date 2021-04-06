const inputRange = document.querySelectorAll('input[type=range]');
const initialRange = [];
inputRange.forEach(item => initialRange.push(item.value));
const reset = document.querySelector('.btn-reset');
const next = document.querySelector('.btn-next');
const load = document.querySelector('.btn-load');
const save = document.querySelector('.btn-save');
const image = document.querySelector('.main-image');
const fileInput = document.querySelector('input[type=file]');
const canvas = document.querySelector('canvas');
const fullscreen = document.querySelector('.fullscreen');

function rangeHandler() {
  const sizing = this.dataset.sizing || '';
  document.documentElement.style.setProperty(`--${this.name}`, this.value + sizing);
  this.nextElementSibling.value = this.value;
}

inputRange.forEach(input => input.addEventListener('input', rangeHandler));

reset.addEventListener('click', function() {
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

next.addEventListener('click', getSrc);

function getFile() {
  const file = fileInput.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.src = reader.result;
    image.src = reader.result;
  }
  reader.readAsDataURL(file);
  fileInput.value = null;
}

load.addEventListener('change', getFile);

function saveImg() {
  const img = new Image();
  img.src = image.src;
  img.setAttribute('crossOrigin', 'anonymous');
  img.onload = () => {
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    let canvasFilters = '';
    inputRange.forEach((item, index) => {
      if (item.value !== initialRange[index]) {
        const sizing = item.dataset.sizing || '';
        if (item.name == 'blur') {
          canvasFilters += item.name + '(' + item.value * 5 + sizing + ')' + ' '
        } else {
        canvasFilters += item.name + '(' + item.value + sizing + ')' + ' ';
        }
      }
    });
    ctx.filter = canvasFilters;
    ctx.drawImage(img, 0, 0);
    const link = document.createElement('a');
    link.download = 'image.png';
    link.href = canvas.toDataURL();console.log(canvas.toDataURL());
    link.click();
    link.delete;
  }
}

save.addEventListener('click', saveImg);

