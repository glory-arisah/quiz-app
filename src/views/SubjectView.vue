<template>
  <section class="subject--container">
    <subject-name />
    <article class="start-quiz">
      <p>Click on <strong>Start Quiz</strong> when you are ready</p>
      <button
        @click="
          quizStore.startQuiz();
          $router.push({ name: 'questions' });
        "
        id="click-here"
      >
        Start Quiz
      </button>
    </article>
  </section>
</template>

<script>
import SubjectName from "@/components/SubjectName.vue";
import { useQuizStore } from "@/store/index";
import { useRoute } from "vue-router";
import { storeToRefs } from "pinia";
export default {
  created() {
    const route = useRoute();
    this.quizStore.fetchQuestions(route.params.id);
  },
  setup() {
    // get quiz store locally
    const quizStore = useQuizStore();
    // get route properties

    const { currentQuestion } = storeToRefs(quizStore);
    // fetch the quiz on page load
    return { quizStore, currentQuestion };
  },
  components: {
    SubjectName,
  },
};
</script>

<style lang="scss" scoped>
// mobile view
.subject--container {
  article {
    text-align: center;
    margin-top: 3rem;
    // start quiz button
    button {
      border-width: 0;
      border-radius: 5px;
      padding: 0.4rem 1rem;
      display: inline-block;
      margin-top: 2rem;
      background-color: #0096c7;
      transition: transform 300ms;
      a {
        color: #ededed !important;
      }
    }
  }
}
// medium to large screens
// button {
//   &:hover {
//     transform: scale(1.1);
//     transition: transform 300ms;
//     background-color: #03a6dd;
//   }
// }
</style>
