const inputRange = document.querySelectorAll("input[type=range]");

function rangeHandler() {
  const sizing = this.dataset.sizing || '';
  console.log(`--${this.name} = ${this.value} + ${sizing}`);
  document.documentElement.style.setProperty(`--${this.name}`, this.value + sizing);
}

inputRange.forEach(input => input.addEventListener("input", rangeHandler));