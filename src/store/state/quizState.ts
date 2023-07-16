import { defineStore } from "pinia";

export interface QuestionsProps {
  question: string;
  correct_answer: string;
  options: string[];
}

export interface QuizCoreStateProps {
  questions: QuestionsProps[];
  correctAnswers: any;
  selections: any;
  index: number;
  correctAnswersCount: number | null;
  correctAnswersArray: string[];
  selectionMode: number;
  timeUsed: number;
  interval: undefined | number;
}

export const useQuizState = defineStore({
  id: "repo.state",

  state: (): QuizCoreStateProps => {
    return {
      questions: [],
      // object holding correct answers indexes
      correctAnswers: {},
      // object holding user selections
      selections: {},
      index: 0,

      correctAnswersCount: null,
      correctAnswersArray: [],
      // 0 represents the standard selection mode where users can select options, 1 represents correction mode
      selectionMode: 0,
      timeUsed: 0,
      interval: 0,
    };
  },
});
