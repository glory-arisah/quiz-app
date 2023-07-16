import { useStorage } from "@vueuse/core";
import { useQuizState } from "../state/quizState";
import { LocalStorageActions } from "./quizLSActions";
import { TimerActions } from "./quizTimerActions";
import { useQuizGetters } from "../getters/quizGetters";

export function NavigationActions() {
  const state = useQuizState();
  const getter = useQuizGetters();
  const { fetchQuestionsFromLS, fetchIndexFromLS } = LocalStorageActions();
  const { stopTimer } = TimerActions();

  return {
    startQuiz() {
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    stopQuiz() {
      console.log(getter.noOfQuestions);
      state.index = getter.noOfQuestions - 1;
      localStorage.setItem("index", JSON.stringify(state.index));
      stopTimer();
    },
    nextQuestion() {
      state.index++;
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    previousQuestion() {
      state.index--;
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    handleSelection(questionId: number, selectedIndex: number) {
      fetchQuestionsFromLS();
      fetchIndexFromLS();
      if (!Object.keys(state.selections).length) {
        state.questions.forEach((_, index) => {
          state.selections[index] = null;
        });
      }
      state.selections[questionId] = selectedIndex;
      // fetch questions from localStorage after page refresh
      localStorage.setItem("selections", JSON.stringify(state.selections));
    },
    markQuiz() {
      if (!Object.keys(state.correctAnswers).length) {
        state.correctAnswers = useStorage("correctAnswers", localStorage);
      }
      for (const key in state.correctAnswers) {
        if (state.correctAnswers[key] === state.selections[key]) {
          typeof state.correctAnswersCount === "number" &&
            state.correctAnswersCount++;
          localStorage.setItem(
            "correctAnswersCount",
            JSON.stringify(state.correctAnswersCount)
          );
        }
      }
      // set index to first question
      state.index = 0;
    },
  };
}
