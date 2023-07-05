<template>
  <section class="subject--container">
    <subject-name />
    <!-- <div class="loader--container"> -->
    <the-loader v-show="!noOfQuestions" />
    <!-- </div> -->
    <article class="tip--container" v-show="noOfQuestions">
      <p class="tip">
        This free practice test contains {{ noOfQuestions }} questions with no
        time limit.<br />
        Each question has four possible answer options, one of which is
        correct.<br />
        Try to find a quiet place where you will not be distracted during the
        test.<br />
        The test will start on the next screen. Click on
        <strong>Start Quiz</strong> when you are ready.
      </p>
      <article class="start-quiz">
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
    </article>
  </section>
</template>

<script>
import TheLoader from "@/components/TheLoader.vue";
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

    const { currentQuestion, noOfQuestions, questions } =
      storeToRefs(quizStore);
    // fetch the quiz on page load
    return { quizStore, currentQuestion, noOfQuestions, questions };
  },
  components: {
    SubjectName,
    TheLoader,
  },
};
</script>

<style lang="scss" scoped>
// mobile view
.subject--container {
  .tip--container {
    margin-top: 2.5rem;
    line-height: 25px;
  }
  .start-quiz {
    text-align: center;
    margin-top: 1rem;
    // start quiz button
    button {
      border-width: 0;
      border-radius: 5px;
      padding: 0.4rem 1rem;
      display: inline-block;
      margin-top: 2rem;
      color: #fff;
      background-color: #0096c7;
      transition: transform 300ms;
    }
  }
}
</style>
