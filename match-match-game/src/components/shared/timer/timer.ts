import './timer.scss';
import { BaseComponent } from '../../base-component';

export class Timer extends BaseComponent {
  seconds: number;

  minutes: number;

  currentTime: string;

  secondsTimer: ReturnType<typeof setTimeout>;

  minutesTimer: ReturnType<typeof setTimeout>;

  constructor() {
    super('p', ['timer']);
    this.seconds = 0;
    this.minutes = 0;
    this.currentTime = '00:00';
    this.element.innerHTML = this.currentTime;
    this.secondsTimer = setTimeout(() => {}, 99999999);
    this.minutesTimer = setTimeout(() => {}, 99999999);
  }

  render(): void {
    this.currentTime = `${this.minutes < 10 ? `0${this.minutes}` : this.minutes}:${
      this.seconds < 10 ? `0${this.seconds}` : this.seconds
    }`;
    this.element.innerHTML = this.currentTime;
  }

  startTimer(): void {
    this.seconds = 0;
    this.minutes = 0;
    clearInterval(this.secondsTimer);
    clearInterval(this.minutesTimer);
    this.minutesTimer = setInterval(() => {
      if (this.minutes === 59) {
        this.minutes = 0;
      } else this.minutes++;
    }, 60000);
    this.secondsTimer = setInterval(() => {
      if (this.seconds === 59) {
        this.seconds = 0;
      } else this.seconds++;
      this.render();
    }, 1000);
  }

  stopTimer(): void {
    clearInterval(this.secondsTimer);
    clearInterval(this.minutesTimer);
  }

  resetTimer(): void {
    this.seconds = 0;
    this.minutes = 0;
    this.render();
  }

  getSeconds(): number {
    return this.seconds + this.minutes * 60;
  }
}
