export default class Stopwatch {
  private startTime: number = 0;
  private intervalId: number | undefined;
  private isRunning: boolean = false;
  private elapsedTimeInMilliseconds: number = 0;

  constructor(private elementId: string) {}

  start() {
    if (!this.isRunning) {
      this.startTime = Date.now();
      this.intervalId = window.setInterval(() => {
        this.updateElapsedTime();
        this.render();
        return this.elapsedTimeInMilliseconds;
      }, 10);
      this.isRunning = true;
    }
    return this.elapsedTimeInMilliseconds;
  }

  stop() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      this.isRunning = false;
    }
    return this.elapsedTimeInMilliseconds;
  }

  reset() {
    if (this.isRunning) {
      clearInterval(this.intervalId);
      this.intervalId = undefined;
      this.isRunning = false;
    }
    this.startTime = 0;
    this.elapsedTimeInMilliseconds = 0;
    this.render();
  }

  getElapsedTime(): number {
    return this.elapsedTimeInMilliseconds;
  }

  updateElapsedTime() {
    const currentTime = Date.now();
    this.elapsedTimeInMilliseconds =
      this.elapsedTimeInMilliseconds + (currentTime - this.startTime);
    this.startTime = currentTime;
  }

  private render() {
    const stopwatchElement = document.getElementById(this.elementId);
    if (stopwatchElement) {
      stopwatchElement.innerHTML = this.formatTime(
        this.elapsedTimeInMilliseconds
      );
    }
  }

  formatTime(milliseconds: number): string {
    const minutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const centiseconds = Math.floor((milliseconds % 1000) / 10);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}.${centiseconds.toString().padStart(2, "0")}`;
  }
}

// const stopwatch = new Stopwatch("stopwatch");

// Bắt đầu đồng hồ bằng cách gọi hàm start()
// stopwatch.start();

// Dừng đồng hồ bằng cách gọi hàm stop()
// stopwatch.stop();

// Reset đồng hồ bằng cách gọi hàm reset()
// stopwatch.reset();
