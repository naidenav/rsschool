import { BaseComponent } from './base-component';

export class Background extends BaseComponent {
  constructor() {
    super('div');
    this.element.setAttribute('id', 'bg-image');
    this.element.innerHTML = `
    <?xml version="1.0" standalone="no"?>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 220">
    <path fill="#3af18d" fill-opacity="1" d="M0,96L30,85.3C60,75,120,53,180,69.3C240,85,300,
    139,360,144C420,149,480,107,540,80C600,53,660,43,720,58.7C780,75,840,117,900,112C960,107,
    1020,53,1080,69.3C1140,85,1200,171,1260,181.3C1320,192,1380,128,1410,96L1440,64L1440,0L1410,
    0C1380,0,1320,0,1260,0C1200,0,1140,0,1080,0C1020,0,960,0,900,0C840,0,780,0,720,0C660,0,600,
    0,540,0C480,0,420,0,360,0C300,0,240,0,180,0C120,0,60,0,30,0L0,0Z"></path>
    </svg>
    `;
  }

  hide() {
    if (!this.element.classList.contains('hidden')) this.element.classList.add('hidden');
  }

  show() {
    if (this.element.classList.contains('hidden')) this.element.classList.remove('hidden');
  }
}
