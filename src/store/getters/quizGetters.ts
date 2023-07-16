import { defineStore } from "pinia";
import { useQuizState } from "../state/quizState";
import { formatTimer } from "..";
import { QuestionsProps } from "../state/quizState";
import { computed } from "vue";

interface CurrentQuestionProps extends QuestionsProps {
  questionId: number;
}

export const useQuizGetters = defineStore("repo.getters", () => {
  const state = useQuizState();
  const currentQuestion = computed((): CurrentQuestionProps => {
    return { ...state.questions[state.index], questionId: state.index };
  });

  const noOfQuestions = computed((): number => {
    return state.questions.length;
  });

  const showQuestions = computed((): boolean => {
    return (
      currentQuestion.value && Object.keys(currentQuestion.value).length > 1 // used 1 instead of 0 because there is 1 custom property
    );
  });

  const compSelectAndCorrection = computed((): boolean => {
    return (
      state.correctAnswers[currentQuestion.value.questionId] ===
      state.selections[currentQuestion.value.questionId]
    );
  });

  const formatTimeUsed = computed((): string => {
    return formatTimer(state.timeUsed);
  });

  return {
    currentQuestion,
    noOfQuestions,
    showQuestions,
    compSelectAndCorrection,
    formatTimeUsed,
  };
});
