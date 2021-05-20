import './select.scss';
import { BaseComponent } from "../../base-component";

export class Select extends BaseComponent {

  readonly label: BaseComponent;

  readonly select: BaseComponent;

  readonly firstOption: BaseComponent;

  readonly options: BaseComponent[];

  constructor(title: string, selectContent: string[], id:string, content: string, disabled?: boolean) {
    super('div', ['select']);
    this.label = new BaseComponent('label', ['select__label'], title);
    this.select = new BaseComponent('select', ['select__input']);
    this.firstOption = new BaseComponent('option', ['select__option'], content);
    this.firstOption.element.setAttribute('hidden', '');
    this.firstOption.element.setAttribute('disabled', '');
    this.firstOption.element.setAttribute('selected', '');
    this.options = [];

    this.element.append(this.label.element, this.select.element);
    this.select.element.append(this.firstOption.element);

    if (selectContent) {
      selectContent.forEach((item) => {
        console.log('item ', item)
        const option = new BaseComponent('option', ['select__option'], item);
        option.element.setAttribute('value', item);
        this.options.push(option);
      });
      this.options.forEach((item) => {
        this.select.element.append(item.element);
      });
    }

    if (id) this.select.element.setAttribute('id', id);
    if (disabled) this.select.element.setAttribute('disabled', '');
  }
}
