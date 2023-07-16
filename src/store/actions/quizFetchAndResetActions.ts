import { useQuizState } from "../state/quizState";
import axios from "axios";

interface ResetActionsProps {
  setIndexToZero(): void;
  resetScore(): void;
  resetQuestions(): void;
  setSelectionMode(value: number): void;
  fetchQuestions(id: number): void;
}

// re-arrange quiz question's options
function randomizeOptions<T extends string[]>(options: T): T {
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
}

export function FetchAndResetActions(): ResetActionsProps {
  const state = useQuizState();

  // question interface
  interface QuestionProps {
    options: string[];
    correct_answer: string;
  }
  // api result interface
  interface ResultProps extends QuestionProps {
    question: string;
    incorrect_answers: string[];
  }
  return {
    // fetch questions based on selected topic
    async fetchQuestions(id: number) {
      try {
        const {
          data: { results },
        } = await axios.get(
          `https://opentdb.com/api.php?amount=10&category=${id}&type=multiple`
        );

        state.questions = results.map((result: ResultProps) => {
          const { question, correct_answer, incorrect_answers } = result;
          return {
            question,
            correct_answer,
            options: randomizeOptions([...incorrect_answers, correct_answer]),
          };
        });

        // save the questions array and questions count to localStorage
        localStorage.setItem("questions", JSON.stringify(state.questions));
        localStorage.setItem(
          "questionsCount",
          JSON.stringify(state.questions.length)
        );
        // extract correctAnswers from questions
        state.correctAnswers = {};
        state.questions.forEach((question: QuestionProps, index: number) => {
          state.correctAnswers[index] = question.options.indexOf(
            question.correct_answer
          );
        });
        localStorage.setItem(
          "correctAnswers",
          JSON.stringify(state.correctAnswers)
        );
      } catch (error) {
        console.log("Error message", error);
      }
    },
    // reset state index to 0
    setIndexToZero() {
      state.index = 0;
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    // reset user's previous selections and score
    resetScore() {
      state.selections = {};
      state.correctAnswersCount = 0;
      state.index = 0;
      localStorage.setItem("selections", JSON.stringify(state.selections));
      localStorage.setItem(
        "correctAnswersCount",
        JSON.stringify(state.correctAnswersCount)
      );
      localStorage.setItem("index", JSON.stringify(state.index));
    },
    // erase previous questions, clear correct answers and index
    resetQuestions() {
      [state.questions, state.correctAnswers, state.index] = [[], null, 0];
      localStorage.setItem("questions", JSON.stringify([]));
      localStorage.setItem("index", JSON.stringify(null));
      localStorage.setItem("correctAnswers", JSON.stringify({}));
      localStorage.setItem("questionsCount", JSON.stringify(null));
    },
    // set the quiz mode to selection -- user can select answers(read/write mode) or correction -- users can view the answers as corrections (read-only mode)
    setSelectionMode(value: number): void {
      state.selectionMode = value;
      localStorage.setItem(
        "selectionMode",
        JSON.stringify(state.selectionMode)
      );
    },
  };
}
