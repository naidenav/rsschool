export class Timer {
  seconds: number;

  milliseconds: number;

  secondsTimer: ReturnType<typeof setTimeout>;

  millisecondsTimer: ReturnType<typeof setTimeout>;

  constructor() {
    this.seconds = 0;
    this.milliseconds = 0;
    this.secondsTimer = setTimeout(() => {}, 99999999);
    this.millisecondsTimer = setTimeout(() => {}, 99999999);
  }

  startTimer(): void {
    this.seconds = 0;
    this.milliseconds = 0;
    clearInterval(this.secondsTimer);
    clearInterval(this.millisecondsTimer);
    this.secondsTimer = setInterval(() => {
      if (this.seconds === 59) {
        this.seconds = 0;
      } else this.seconds++;
    }, 1000);

    this.millisecondsTimer = setInterval(() => {
      if (this.milliseconds === 999) {
        this.milliseconds = 0;
      } else this.milliseconds++;
    }, 1);
  }

  stopTimer(): void {
    clearInterval(this.secondsTimer);
    clearInterval(this.millisecondsTimer);
  }

  resetTimer(): void {
    this.seconds = 0;
    this.milliseconds = 0;
  }

  getTime(): number {
    return this.seconds + Math.round(this.milliseconds) / 1000;
  }
}
