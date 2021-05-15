export class BaseComponent {
  readonly element: HTMLElement;

  constructor(tag: keyof HTMLElementTagNameMap = 'div', styles: string[] = [], content = '') {
    this.element = document.createElement(tag);
    this.element.classList.add(...styles);
    this.element.innerHTML = content;
  }
}
