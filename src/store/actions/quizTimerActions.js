export function TimerActions() {
  return {
    startTimer() {
      this.interval = setInterval(() => {
        this.timeUsed++;
        localStorage.setItem("timeUsed", JSON.stringify(this.timeUsed));
      }, 1000);
    },
    stopTimer() {
      clearInterval(this.interval);
    },
    resetTimer() {
      this.timeUsed = 0;
      localStorage.setItem("timeUsed", JSON.stringify(this.timeUsed));
    },
  };
}
