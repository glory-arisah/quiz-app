<template>
  <article class="questions--container">
    <template>
      <the-loader />
    </template>
    <!-- <template>
    </template> -->
    <p class="question">{{ currentQuestion.question }}</p>
    <div class="options--container">
      <div class="options--letters">
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
      </div>
      <div class="options">
        <template
          v-for="(option, index) in currentQuestion.options"
          :key="option"
        >
          <p
            :data-selected="option"
            @click="
              quizStore.handleSelection(currentQuestion.questionId, index);
              selected = index;
            "
            :class="{
              selected:
                selections[currentQuestion.questionId] === index ||
                selected === index,
            }"
          >
            {{ option }}
          </p>
        </template>
      </div>
    </div>
    <section class="action__btns">
      <button
        @click="handleClick('prev')"
        :disabled="currentQuestion.questionId === 0"
        id="prev"
      >
        Prev
      </button>
      <button @click="handleClick('next')" v-show="!isLastQuestion" id="next">
        Next
      </button>
      <router-link :to="{ name: 'score-board' }">
        <button
          @click="
            quizStore.markQuiz();
            selected = null;
          "
          v-show="isLastQuestion"
          id="submit"
        >
          Submit
        </button>
      </router-link>
    </section>
  </article>
</template>

<script>
import TheLoader from "@/components/TheLoader.vue";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useQuizStore } from "../store/index";
export default {
  setup() {
    // setup quiz store
    const quizStore = useQuizStore();
    const { currentQuestion, selections } = storeToRefs(quizStore);
    // reference for selected option
    let selected = ref(null);
    // check if user is on the last question
    const isLastQuestion = computed(() => {
      return (
        quizStore.currentQuestion.questionId === quizStore.questions.length - 1
      );
    });
    // reset selected option after user navigates quiz
    const resetSelection = () => (selected.value = null);
    const handleClick = (navType) => {
      if (navType === "next") {
        quizStore.nextQuestion();
      } else if (navType === "prev") {
        quizStore.previousQuestion();
      }
      resetSelection();
    };

    return {
      quizStore,
      currentQuestion,
      isLastQuestion,
      selected,
      handleClick,
      selections,
      // index,
    };
  },
  components: {
    TheLoader,
  },
};
</script>

<style lang="scss" scoped>
.questions--container {
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;
  height: 25rem;
  .question {
    margin-bottom: -2rem;
    font: {
      weight: bold;
      size: 1.1rem;
      family: fantasy;
    }
  }
  .options--container {
    display: flex;
    height: 30%;
    .options--letters {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .options {
      margin-left: 1rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      p {
        cursor: pointer;
      }
    }
    .selected {
      background-color: #0766ba;
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
    #prev {
      background-color: #ae3a08;
      // margin-left: 1.5rem;
      &:hover {
        background-color: #dc4d10;
      }
      &:disabled {
        background-color: gray;
        cursor: not-allowed;
      }
    }
    #next {
      background-color: #164ce1;
      // margin-right: 1.5rem;
      &:hover {
        background-color: #2962ff;
      }
    }
    #submit {
      background-color: #3e823e;
      &:hover {
        background-color: #55af55;
      }
    }
  }
}
</style>
