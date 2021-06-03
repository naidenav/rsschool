import './garage-control.scss';
import { BaseComponent } from '../base-component';
import { MainButton } from '../main-button/main-button';
import { Input } from '../input/input';

export class GarageControl extends BaseComponent {
  private createPanel: BaseComponent;

  private createTextInput: BaseComponent;

  private createColorInput: BaseComponent;

  private createBtn: MainButton;

  private updatePanel: BaseComponent;

  private updateTextInput: BaseComponent;

  private updateColorInput: BaseComponent;

  private updateBtn: MainButton;

  private raceResetGenerate: BaseComponent;

  private raceBtn: MainButton;

  private resetBtn: MainButton;

  private generateBtn: MainButton;

  constructor() {
    super('div', ['garage-control']);
    this.createPanel = new BaseComponent('div', ['create-panel']);
    this.createTextInput = new Input('text', ['text-input'], false, 'create-text-input');
    this.createColorInput = new Input('color', ['color-input'], false, 'create-color-input');
    this.createBtn = new MainButton('create', ['create-btn']);
    this.updatePanel = new BaseComponent('div', ['update-panel']);
    this.updateTextInput = new Input('text', ['text-input'], false, 'update-text-input');
    this.updateColorInput = new Input('color', ['color-input'], false, 'update-color-input');
    this.updateBtn = new MainButton('update', ['update-btn']);
    this.raceResetGenerate = new BaseComponent('div', ['race-reset-generate']);
    this.raceBtn = new MainButton('race', ['race-btn']);
    this.resetBtn = new MainButton('reset', ['reset-btn']);
    this.generateBtn = new MainButton('generate cars', ['generate-btn']);

    this.createPanel.element.append(this.createTextInput.element, this.createColorInput.element,
      this.createBtn.element);
    this.updatePanel.element.append(this.updateTextInput.element, this.updateColorInput.element,
      this.updateBtn.element);
    this.raceResetGenerate.element.append(this.raceBtn.element, this.resetBtn.element, this.generateBtn.element);
    this.element.append(this.createPanel.element, this.updatePanel.element, this.raceResetGenerate.element);

  }
}
