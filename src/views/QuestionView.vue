<template>
  <the-loader v-show="!showQuestions" />
  <subject-name />
  <article class="questions--container" v-if="showQuestions">
    <p class="question">{{ decode(currentQuestion.question) }}</p>
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
            {{ decode(option) }}
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
      <router-link :to="{ name: 'score-board' }" v-show="isLastQuestion">
        <button
          @click="
            quizStore.markQuiz();
            selected = null;
          "
          id="submit"
        >
          Submit
        </button>
      </router-link>
    </section>
  </article>
</template>

<script>
import SubjectName from "@/components/SubjectName.vue";
import TheLoader from "@/components/TheLoader.vue";
// import { useRouter } from "vue-router";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useQuizStore } from "../store/index";
export default {
  created() {
    this.quizStore.resetScore();
  },
  mounted() {
    this.selected = null;
  },

  setup() {
    // setup quiz store
    const quizStore = useQuizStore();
    const { currentQuestion, selections, showQuestions } =
      storeToRefs(quizStore);
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
      navType === "next"
        ? quizStore.nextQuestion()
        : navType === "prev" && quizStore.previousQuestion();
      resetSelection();
    };

    // decoder for HTML entities
    let decoder = ref(null);
    const decode = (html) => {
      decoder.value = decoder.value || document.createElement("div");
      decoder.value.innerHTML = html;
      console.log(decoder.value);
      return decoder.value.textContent;
    };

    return {
      quizStore,
      currentQuestion,
      isLastQuestion,
      selected,
      handleClick,
      selections,
      showQuestions,
      decode,
      // index,
    };
  },
  components: {
    TheLoader,
    SubjectName,
  },
};
</script>

<style lang="scss" scoped>
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
  }
  .options--container {
    display: flex;
    width: 100%;
    .options--letters {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
    }
    .options {
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
    #prev {
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
