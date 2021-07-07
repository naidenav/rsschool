import './admin-module.scss';
import { App } from "../../app";
import { BaseComponent } from "../base-component";
import { CategoryEditor } from "../category-editor/category-editor";

export class AdminModule extends BaseComponent {
  private navPanel: BaseComponent;

  private container: BaseComponent;

  private categoryEditor: CategoryEditor;

  constructor(app: App) {
    super('div', ['admin-module']);
    this.navPanel = new BaseComponent('div', ['admin-module__nav-panel']);
    this.container = new BaseComponent('div', ['admin-module__container']);
    this.categoryEditor = new CategoryEditor();
    this.categoryEditor.render();

    this.element.append(this.navPanel.element, this.container.element);
    this.container.element.append(this.categoryEditor.element);
  }
}
