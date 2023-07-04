<template>
  <subject-name />
  <section class="score-board--container" v-show="correctAnswersCount >= 0">
    <p class="result">
      You score <strong>{{ correctAnswersCount }}</strong> out of
      <strong>{{ noOfQuestions }}.</strong>
      <button
        @click="
          quizStore.resetScore();
          $router.push({ name: 'questions' });
        "
        class="clickables"
      >
        Click here
      </button>
      to retake the test
    </p>
    <div class="correction">
      View
      <button
        @click="
          $router.push({ name: 'questions' });
          quizStore.setSelectionMode(1);
          quizStore.setIndexToZero();
        "
        class="clickables"
      >
        correct answers
      </button>
    </div>
    <div class="home">
      <button
        @click="
          $router.push({ name: 'Home' });
          quizStore.resetScore();
          quizStore.resetQuestions();
        "
        class="clickables"
      >
        <span id="left-arrow">&#8592;</span>
        <span id="back-to-home">Back to home</span>
      </button>
    </div>
  </section>
</template>

<script>
import SubjectName from "@/components/SubjectName.vue";
import { useQuizStore } from "@/store";
import { storeToRefs } from "pinia";
export default {
  name: "ScoreBoard",
  setup() {
    const quizStore = useQuizStore();
    quizStore.fetchScoreFromLS();
    quizStore.fetchQuestionsFromLS();
    // fetch user score and questions -- to get the questions count
    const { correctAnswersCount, noOfQuestions } = storeToRefs(quizStore);
    return { quizStore, correctAnswersCount, noOfQuestions };
  },
  components: {
    SubjectName,
  },
};
</script>

<style lang="scss" scoped>
.clickables {
  border-width: 0;
  font-size: 0.9rem;
  color: #970707;
  background-color: transparent;
  cursor: pointer;
}
// mobile view
.score-board--container {
  .result {
    color: #274fab;
    font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
      "Lucida Sans", Arial, sans-serif;
    margin-top: 2rem;
    text-align: center;
    a {
      color: #970707;
      margin-left: 0.2rem;
      text-decoration: underline;
    }
  }
  .correction {
    margin-top: 1rem;
    text-align: center;
  }
  .home {
    margin-top: 2.5rem;
    #back-to-home {
      margin-left: 0.1rem;
      transition: margin-left 200ms;
    }
    a {
      color: #970707;
      display: inline-block;
    }
  }
}
// medium to large screens
// .result {
//   a {
//     &:hover {
//       text-decoration: none;
//     }
//   }
// }
// .home {
//   &:hover #back-to-home {
//       margin-left: 0.4rem;
//       transition: margin-left 200ms;
//     }
// }
</style>
