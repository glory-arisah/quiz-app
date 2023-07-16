<template>
  <subject-name /><the-timer v-if="!selectionMode" />
  <the-loader v-show="!showQuestions" />
  <article class="questions--container" v-if="showQuestions">
    <p class="question">
      <span>{{ questionNumber }}</span>
      <span>{{ decode<string>(currentQuestion.question) }}</span>
      <span
        id="not-answered"
        v-show="
          selectionMode === 1 && selections[currentQuestion.questionId] === null
        "
      >
        Not Answered!
      </span>
    </p>
    <div class="options--container">
      <template
        v-for="(option, index) in currentQuestion.options"
        :key="option"
      >
        <p
          :data-selected="option"
          @click="
            selectionMode === 0 &&
              quizStore.handleSelection(currentQuestion.questionId, index);
            selected = index;
          "
          :class="{
            selected:
              !selectionMode &&
              (selections[currentQuestion.questionId] === index ||
                selected === index),
            'green-bg': isGreenBg(index),
            'red-bg': isRedBg(index),
          }"
          :disabled="selectionMode"
        >
          <span class="option--letter">{{ optionsLetters[index] }}</span>
          {{ decode<string>(option) }}
        </p>
      </template>
    </div>
    <section class="action__btns">
      <button
        @click="
          handleClick('prev');
          incDecQuestionNo('dec');
        "
        :disabled="currentQuestion.questionId === 0"
        id="prev"
      >
        Prev
      </button>
      <button
        @click="
          handleClick('next');
          incDecQuestionNo('inc');
        "
        v-if="!isLastQuestion"
        id="next"
      >
        Next
      </button>
      <!-- Submit or end quiz -->
      <button
        id="submit"
        v-show="isLastQuestion && !selectionMode"
        @click="
          quizStore.stopQuiz();
          quizStore.markQuiz();
          $router.push({ name: 'score-board' });
          selected = null;
        "
      >
        Submit
      </button>
      <button
        id="end"
        v-show="isLastQuestion && selectionMode"
        @click="
          $router.push({ name: 'score-board' });
          quizStore.setSelectionMode(0);
        "
      >
        End
      </button>
    </section>
  </article>
</template>

<script setup lang="ts">
import SubjectName from "@/components/SubjectName.vue";
import TheTimer from "@/components/TheTimer.vue";
import TheLoader from "@/components/TheLoader.vue";
import { ref, Ref, onMounted, onUnmounted } from "vue";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { useQuizStore } from "../store/index";
// setup quiz store
const quizStore = useQuizStore();

// fetch questions, index, score, user selections and selection mode on page reload
quizStore.fetchQuestionsFromLS();
quizStore.fetchIndexFromLS();
quizStore.fetchSelectionsFromLS();
quizStore.fetchSelectionModeFromLS();
quizStore.fetchCorrectAnswersFromLS();

// reset timer on create
!quizStore.selectionMode && quizStore.resetTimer();

// options letters
const optionsLetters = ["A", "B", "C", "D"];

// start timer on mount if user is in selection mode
onMounted(() => {
  !quizStore.selectionMode && quizStore.startTimer();
});

const { currentQuestion, selections, showQuestions, selectionMode } =
  storeToRefs(quizStore);

// reference for selected option
let selected: Ref<number | null> = ref(null);

// set question numbering and option letters
let questionNumber = ref(quizStore.index + 1)

// check if user is on the last question
const isLastQuestion = computed<boolean>(() => {
  return (
    quizStore.currentQuestion.questionId === quizStore.questions.length - 1
  );
});

// background-color for wrong and right answers
const isGreenBg = (index: number): boolean | undefined => {
  if (quizStore.selectionMode === 1 && quizStore.currentQuestion) {
    return (
      index === quizStore.correctAnswers[quizStore.currentQuestion.questionId]
    );
  }
};
const isRedBg = (index: number): boolean | undefined => {
  if (quizStore.selectionMode === 1 && !quizStore.compSelectAndCorrection && quizStore.currentQuestion) {
    return index === quizStore.selections[quizStore.currentQuestion.questionId];
  }
};
// increment/decrement question number
const incDecQuestionNo = (type: string) => {
  if (questionNumber.value)
  if (type === "inc" && questionNumber.value >= 0) questionNumber.value++;
  else if (type === "dec" && questionNumber.value <= quizStore.questions.length)
    questionNumber.value--;
};
// navigate quiz and reset selected option after user navigates quiz
const handleClick = (navType: string) => {
  navType === "next"
    ? quizStore.nextQuestion()
    : navType === "prev" && quizStore.previousQuestion();
  selected.value = null;
};
// decoder for HTML entities
let decoder: Ref<null | HTMLDivElement> = ref(null);
function decode<T extends string>(html: T) {
  decoder.value = decoder.value || document.createElement("div");
  decoder.value.innerHTML = html;
  return decoder.value.textContent;
}

onUnmounted(() => {
  quizStore.stopTimer();
});
</script>

<style lang="scss" scoped>
// utilities for corrections
.green-bg {
  background-color: #00c76a;
  color: #fff;
  border-radius: 8px;
  transition: background-color 200ms color 200ms;
}
.red-bg {
  background-color: #c70000;
  color: #fff;
  border-radius: 8px;
  transition: background-color 200ms color 200ms;
}
#not-answered {
  display: block;
  // margin-top: 0.4rem;
  color: #c70000;
  font-weight: bolder;
}

// mobile view
.questions--container {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  min-height: 22rem;
  margin-top: 2rem;
  .question {
    // margin-bottom: 0.5rem;
    font: {
      weight: bold;
      size: 1.1rem;
      family: fantasy;
    }
    span:first-child {
      margin-right: 0.5rem;
      font-weight: bold;
      font-size: 1.2rem;
      color: #0096c7;
    }
  }
  .options--container {
    display: flex;
    width: 100%;
    margin-left: 0.5rem;
    display: flex;
    width: 100%;
    flex-direction: column;
    justify-content: space-around;
    p {
      cursor: pointer;
      padding: 0.3rem;
      margin-block: 0.1rem;
    }
    .selected {
      background-color: #0096c7;
      color: #fff;
      border-radius: 8px;
      transition: background-color 200ms color 200ms;
      // padding: 0 0.3rem;
    }
  }
  // action buttons
  .action__btns {
    display: flex;
    justify-content: space-around;
    width: 100%;
    // buttons
    button {
      padding: 0.6rem 1.2rem;
      border-width: 0;
      border-radius: 4px;
      color: whitesmoke;
      cursor: pointer;
    }
    #prev,
    #end {
      background-color: #ae3a08;
      &:disabled {
        background-color: gray;
        cursor: not-allowed;
      }
    }
    #next {
      background-color: #0096c7;
    }
    #submit {
      background-color: #3e823e;
    }
  }
}
// medium to large screen
// p {
//   cursor: pointer;
//   padding: 0.3rem;
//   margin-block: 0.1rem;
//   &:hover {
//     background-color: #0096c7;
//     color: #fff;
//     border-radius: 8px;
//     transition: background-color 200ms color 200ms;
//   }
// }

// #prev {
//  &:hover {
//         background-color: #dc4d10;
//       }
// }
// #next {
//   &:hover {
//         background-color: #00b3ef;
//       }
// }
// #submit {
//   &:hover {
//         background-color: #55af55;
//       }
// }
</style>
