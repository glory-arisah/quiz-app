import { useQuizState } from "../state/quizState";
interface TimerActionsProps {
  startTimer(): void;
  stopTimer(): void;
  resetTimer(): void;
}

export function TimerActions(): TimerActionsProps {
  const state = useQuizState();

  return {
    startTimer() {
      state.interval = setInterval(() => {
        state.timeUsed++;
        localStorage.setItem("timeUsed", JSON.stringify(state.timeUsed));
      }, 1000);
    },
    stopTimer() {
      clearInterval(state.interval);
    },
    resetTimer() {
      state.timeUsed = 0;
      localStorage.setItem("timeUsed", JSON.stringify(state.timeUsed));
    },
  };
}
