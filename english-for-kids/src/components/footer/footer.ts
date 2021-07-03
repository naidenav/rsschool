import './footer.scss';
import { BaseComponent } from '../base-component';

export class Footer extends BaseComponent {
  constructor() {
    super('footer', ['footer']);
    this.element.innerHTML = `
      <div class="footer__wrapper">
        <a class="github" href="https://github.com/naidenav" target="_blank" rel="noopener noreferrer">github</a>
        <p class="copyright">© 2021 English for kids</p>
        <a class="rss" href="https://rs.school/js/" target="_blank" rel="noopener noreferrer">
        </a>
      </div>
    `;
  }
}
