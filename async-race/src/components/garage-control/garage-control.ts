import './garage-control.scss';
import { BaseComponent } from '../base-component';
import { Button } from '../button/button';
import { Input } from '../input/input';

export class GarageControl extends BaseComponent {
  private createPanel: BaseComponent;

  readonly createTextInput: BaseComponent;

  readonly createColorInput: BaseComponent;

  readonly createBtn: Button;

  private updatePanel: BaseComponent;

  readonly updateTextInput: BaseComponent;

  readonly updateColorInput: BaseComponent;

  readonly updateBtn: Button;

  private raceResetGenerate: BaseComponent;

  readonly raceBtn: Button;

  readonly resetBtn: Button;

  readonly generateBtn: Button;

  constructor() {
    super('div', ['garage-control']);
    this.createPanel = new BaseComponent('div', ['create-panel']);
    this.createTextInput = new Input('text', ['text-input'], false, 'create-text-input');
    this.createColorInput = new Input('color', ['color-input'], false, 'create-color-input');
    (this.createColorInput.element as HTMLInputElement).value = '#3c46d3';
    this.createBtn = new Button('create', ['main-button', 'create-btn']);
    this.updatePanel = new BaseComponent('div', ['update-panel']);
    this.updateTextInput = new Input('text', ['text-input'], false, 'update-text-input');
    this.updateColorInput = new Input('color', ['color-input'], false, 'update-color-input');
    (this.updateColorInput.element as HTMLInputElement).value = '#d33c3c';
    this.updateBtn = new Button('update', ['main-button', 'update-btn']);
    this.raceResetGenerate = new BaseComponent('div', ['race-reset-generate']);
    this.raceBtn = new Button('race', ['main-button', 'race-btn']);
    this.resetBtn = new Button('reset', ['main-button', 'reset-btn']);
    this.generateBtn = new Button('generate cars', ['main-button', 'generate-btn']);

    this.createPanel.element.append(this.createTextInput.element, this.createColorInput.element,
      this.createBtn.element);
    this.updatePanel.element.append(this.updateTextInput.element, this.updateColorInput.element,
      this.updateBtn.element);
    this.raceResetGenerate.element.append(this.raceBtn.element, this.resetBtn.element, this.generateBtn.element);
    this.element.append(this.createPanel.element, this.updatePanel.element, this.raceResetGenerate.element);
  }
}
