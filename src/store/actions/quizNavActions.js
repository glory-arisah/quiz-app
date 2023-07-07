export function NavigationActions() {
  return {
    startQuiz() {
      this.resetScore();
      localStorage.setItem("index", JSON.stringify(this.index));
      console.log(this);
    },
    stopQuiz() {
      this.index = null;
      localStorage.setItem("index", JSON.stringify(this.index));
      this.stopTimer();
    },
    nextQuestion() {
      this.index++;
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    previousQuestion() {
      this.index--;
      localStorage.setItem("index", JSON.stringify(this.index));
    },
    // clearIndex() {
    //   this.index = null;
    //   localStorage.setItem("index", JSON.stringify(this.index));
    // },
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
  };
}
