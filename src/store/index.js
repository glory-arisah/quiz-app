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
    correctAnswersCount: null,
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
    fetchQuestionsFromLS() {
      if (!this.questions.length)
        this.questions = JSON.parse(localStorage.getItem("questions"));
    },
    fetchIndexFromLS() {
      if (this.index === null)
        this.index = JSON.parse(localStorage.getItem("index"));
    },
    fetchScoreFromLS() {
      if (this.correctAnswersCount === null) {
        this.correctAnswersCount = JSON.parse(
          localStorage.getItem("correctAnswersCount")
        );
      }
    },
    fetchSelectionsFromLS() {
      if (Object.keys(this.selections).length === 0) {
        this.selections = JSON.parse(localStorage.getItem("selections"));
      }
    },
    fetchSelectionModeFromLS() {
      this.selectionMode = parseInt(
        JSON.parse(localStorage.getItem("selectionMode"))
      );
    },
    fetchCorrectAnswersFromLS() {
      this.correctAnswers = JSON.parse(localStorage.getItem("correctAnswers"));
    },
    // setIndexToZero() {
    //   this.index = 0;
    // },
    // start, stop and navigate quiz
    startQuiz() {
      this.resetScore();
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    stopQuiz() {
      this.index = null;
      this.currQuestion = {};
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    nextQuestion() {
      this.index++;
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    previousQuestion() {
      this.index--;
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    clearIndex() {
      this.index = null;
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    // handle user selection
    handleSelection(questionId, selectedIndex) {
      // fetch questions from localStorage after page refresh
      this.fetchQuestionsFromLS();
      this.fetchIndexFromLS();
      // set all selections to `null` if the selections object is empty
      if (Object.keys(this.selections).length === 0) {
        this.questions.forEach((_, index) => {
          this.selections[index] = null;
        });
      }
      this.selections[questionId] = selectedIndex;
      localStorage.setItem("selections", JSON.stringify(this.selections));
    },
    markQuiz() {
      if (!Object.keys(this.correctAnswers).length) {
        this.correctAnswers = JSON.parse(
          localStorage.getItem("correctAnswers")
        );
      }
      for (let key in this.correctAnswers) {
        if (this.correctAnswers[key] === this.selections[key]) {
          this.correctAnswersCount++;
          localStorage.setItem(
            "correctAnswersCount",
            JSON.stringify(this.correctAnswersCount)
          );
          // this.correctAnswersArray = [...this.correctAnswersArray, key];
        }
      }
      // set index to first question
      this.index = 0;
    },
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
    resetQuestions() {
      [this.questions, this.correctAnswers] = [[], null];
      localStorage.setItem("questions", JSON.stringify([]));
      localStorage.setItem("index", JSON.stringify(null));
      localStorage.setItem("correctAnswers", JSON.stringify({}));
      localStorage.setItem("questionsCount", JSON.stringify(null));
    },
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
      return state.questions.length
        ? state.questions.length
        : parseInt(JSON.parse(localStorage.getItem("questionsCount")));
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
