import './timer.scss';
import { BaseComponent } from "../../base-component";

export var minutesTimer: ReturnType<typeof setTimeout>;
export var secondsTimer: ReturnType<typeof setTimeout>;

export class Timer extends BaseComponent {
  seconds: number;

  minutes: number;

  currentTime: string;

  constructor() {
    super('p', ['timer']);
    this.seconds = 0;
    this.minutes = 0;
    this.currentTime = '00:00';
    this.element.innerHTML = this.currentTime;
  }

  render() {
    this.currentTime = (this.minutes < 10 ? '0' + this.minutes : this.minutes)
    + ':' + (this.seconds < 10 ? '0' + this.seconds : this.seconds);
    this.element.innerHTML = this.currentTime;
  }

  startTimer() {
    this.seconds = 0;
    this.minutes = 0;
    minutesTimer = setInterval(() => {
      if (this.minutes === 59) {
        this.minutes = 0;
      } else this.minutes++;
    }, 60000);
    secondsTimer = setInterval(() => {
      if (this.seconds === 59) {
        this.seconds = 0;
      } else this.seconds++;
      this.render();
    }, 1000);
  }

  stopTimer() {
    clearInterval(secondsTimer);
    clearInterval(minutesTimer);
  }

  resetTimer() {
    this.seconds = 0;
    this.minutes = 0;
    this.render();
  }

  getSeconds() {
    return this.seconds + this.minutes * 60;
  }
}
