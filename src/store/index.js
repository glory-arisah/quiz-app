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
    index: null,
    selections: {},
    correctAnswersCount: 0,
    correctAnswersArray: [],
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
      } catch (error) {
        console.log("Error message", error);
      }
    },
    // start, stop and navigate quiz
    startQuiz() {
      this.index = 0;
      // this.currQuestion = this.questions[this.index];
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
      console.log(this.questions);
      this.selections = { ...this.selections, [questionId]: selectedIndex };
    },
    markQuiz() {
      const correctAnswers = this.questions.map((question, index) => ({
        [index]: question.options.indexOf(question.correct_answer),
      }));
      for (let key in correctAnswers) {
        console.log(correctAnswers[key][key], this.selections[key]);
        if (correctAnswers[key][key] === this.selections[key]) {
          this.correctAnswersCount++;
          this.correctAnswersArray = [...this.correctAnswersArray, key];
        }
      }
    },
  },
  getters: {
    currentQuestion: (state) => {
      return { ...state.questions[state.index], questionId: state.index };
    },
    noOfQuestions: (state) => {
      return state.questions.length;
    },
  },
});
