import { defineStore } from "pinia";
import { LocalStorageActions } from "./actions/quizLSActions";
import { NavigationActions } from "./actions/quizNavActions";
import { TimerActions } from "@/store/actions/quizTimerActions";
import { QuizCoreState } from "./state/quizCoreState";
import axios from "axios";

// PURE FUNCTIONS
// re-arrange quiz question's options
const randomizeOptions = (options) => {
  let [currentIndex, randomIndex] = [options.length, 0];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [options[currentIndex], options[randomIndex]] = [
      options[randomIndex],
      options[currentIndex],
    ];
  }
  return options;
};
// format timer
export const formatTimer = (timeInSecs) => {
  let minutes = Math.floor(timeInSecs / 60);
  let seconds = parseInt(timeInSecs - 60 * minutes);
  seconds = seconds < 10 ? `0${seconds}` : seconds;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutes}:${seconds}`;
};

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    ...QuizCoreState(),
    // 0 represents the selection mode, 1 represents correction mode
    selectionMode: 0,
    timeUsed: 0,
    interval: null,
  }),
  actions: {
    // fetch data from local storage after page reload/refresh
    ...LocalStorageActions(),
    // start, stop and navigate quiz
    ...NavigationActions(),
    // start/stop quiz timer
    ...TimerActions(),
    // fetch questions from OpenTrivia quiz API
    async fetchQuestions(id) {
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`
        );

        this.questions = results.map((result) => {
          const { question, correct_answer, incorrect_answers } = result;
          return {
            question,
            correct_answer,
            options: randomizeOptions([...incorrect_answers, correct_answer]),
          };
        });
        // save the questions array and questions count to localStorage
        localStorage.setItem("questions", JSON.stringify(this.questions));
        localStorage.setItem(
          "questionsCount",
          JSON.stringify(this.questions.length)
        );
        // extract correctAnswers from questions
        this.correctAnswers = {};
        this.questions.forEach((question, index) => {
          this.correctAnswers[index] = question.options.indexOf(
            question.correct_answer
          );
        });
        localStorage.setItem(
          "correctAnswers",
          JSON.stringify(this.correctAnswers)
        );
      } catch (error) {
        console.log("Error message", error);
      }
    },
    // reset index and currentQuestion concurrently
    setIndexToZero() {
      this.index = 0;
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    // reset user's previous selections and score
    resetScore() {
      this.selections = {};
      this.correctAnswersCount = 0;
      this.index = 0;
      localStorage.setItem("selections", JSON.stringify(this.selections));
      localStorage.setItem(
        "correctAnswersCount",
        JSON.stringify(this.correctAnswersCount)
      );
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    // erase previous questions, clear correct answers and index
    resetQuestions() {
      [this.questions, this.correctAnswers, this.index] = [[], null, null];
      localStorage.setItem("questions", JSON.stringify([]));
      localStorage.setItem("index", JSON.stringify(null));
      localStorage.setItem("correctAnswers", JSON.stringify({}));
      localStorage.setItem("questionsCount", JSON.stringify(null));
    },
    // set the quiz mode to selection -- user can select answers(read/write mode) or correction -- users can view the answers as corrections (read-only mode)
    setSelectionMode(value) {
      this.selectionMode = parseInt(value);
      localStorage.setItem("selectionMode", JSON.stringify(this.selectionMode));
    },
  },
  getters: {
    currentQuestion(state) {
      return { ...state.questions[state.index], questionId: state.index };
    },
    noOfQuestions(state) {
      return state.questions.length;
    },
    showQuestions() {
      return (
        this.currentQuestion && Object.keys(this.currentQuestion).length > 1 // used 1 instead of 0 because there is 1 custom property
      );
    },
    compSelectAndCorrection(state) {
      return (
        state.correctAnswers[this.currentQuestion.questionId] ===
        state.selections[this.currentQuestion.questionId]
      );
    },
    formatTimeUsed(state) {
      return formatTimer(state.timeUsed);
    },
  },
});
