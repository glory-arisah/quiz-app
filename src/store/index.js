import { defineStore } from "pinia";
import axios from "axios";

const randomizeOptions = (array) => {
  let [currentIndex, randomIndex] = [array.length, 0];
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

export const useQuizStore = defineStore({
  id: "quiz",
  state: () => ({
    questions: [],
    correctAnswers: {},
    index: null,
    selections: {},
    correctAnswersCount: 0,
    correctAnswersArray: [],
    // 0 represents the selection mode, 1 represents correction mode
    selectionMode: 0,
  }),
  actions: {
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
        // extract correctAnswers from questions
        this.correctAnswers = {};
        this.questions.forEach((question, index) => {
          this.correctAnswers[index] = question.options.indexOf(
            question.correct_answer
          );
        });
      } catch (error) {
        console.log("Error message", error);
      }
    },
    setIndexToZero() {
      this.index = 0;
    },
    // start, stop and navigate quiz
    startQuiz() {
      this.resetScore();
      this.setIndexToZero();
    },
    stopQuiz() {
      (this.index = null), (this.currQuestion = {});
    },
    nextQuestion() {
      this.index++;
    },
    previousQuestion() {
      this.index--;
    },
    clearIndex() {
      this.index = null;
    },
    // handle user selection
    handleSelection(questionId, selectedIndex) {
      // set all selections to `null` if the selections object is empty
      if (Object.keys(this.selections).length === 0) {
        this.questions.forEach((question, index) => {
          this.selections[index] = null;
        });
      }
      this.selections[questionId] = selectedIndex;
    },
    markQuiz() {
      for (let key in this.correctAnswers) {
        if (this.correctAnswers[key] === this.selections[key]) {
          this.correctAnswersCount++;
          this.correctAnswersArray = [...this.correctAnswersArray, key];
        }
      }
      // set index to first question
      this.index = 0;
      console.log(this.selections);
    },
    resetScore() {
      this.selections = {};
      this.correctAnswersArray = [];
      this.correctAnswersCount = 0;
    },
    resetQuestions() {
      [this.questions, this.correctAnswers] = [null, null];
    },
    setSelectionMode(value) {
      this.selectionMode = parseInt(value);
    },
  },
  getters: {
    currentQuestion: (state) => {
      return { ...state.questions[state.index], questionId: state.index };
    },
    noOfQuestions: (state) => {
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
  },
});
