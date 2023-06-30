<template>
  <section class="subject--container">
    <article
      class="start-quiz"
      v-show="showQuestions === undefined || !showQuestions"
    >
      <p>Press the Next button when you are ready</p>
      <button @click="quizStore.startQuiz">
        <router-link :to="{ name: 'question' }"> Start Quiz </router-link>
      </button>
    </article>
    <template> </template>
    <!-- <question-view v-if="showQuestions && showQuestions !== undefined" /> -->
  </section>
</template>

<script>
// import QuestionView from "./QuestionView.vue";
import { useQuizStore } from "../store/index";
import { useRoute } from "vue-router";
import { computed } from "@vue/reactivity";
import { storeToRefs } from "pinia";
export default {
  setup() {
    // get quiz store locally
    const quizStore = useQuizStore();
    // get route properties
    const route = useRoute();

    const { currentQuestion } = storeToRefs(quizStore);
    // check if currentQuestion is populated
    const showQuestions = computed(() => {
      return (
        quizStore.currentQuestion &&
        Object.keys(quizStore.currentQuestion).length > 1 // used 1 instead of 0 because there is 1 custom property
      );
    });

    // fetch the quiz on page load
    quizStore.fetchQuestions(route.params.id);
    return { quizStore, showQuestions, currentQuestion };
  },
  components: {
    // QuestionView,
  },
};
</script>

<style lang="scss" scoped></style>
