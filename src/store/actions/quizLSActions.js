export function LocalStorageActions() {
  return {
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
      if (!Object.keys(this.correctAnswers).length) {
        this.correctAnswers = JSON.parse(
          localStorage.getItem("correctAnswers")
        );
      }
    },
    fetchTimerFromLS() {
      if (!this.timeUsed) {
        this.timeUsed = JSON.parse(localStorage.getItem("timeUsed"));
      }
    },
  };
}
