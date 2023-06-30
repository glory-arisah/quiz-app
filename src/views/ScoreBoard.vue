<template>
  <subject-name />
  <section class="score-board--container">
    <p class="result">
      You score <strong>{{ correctAnswersCount }}</strong> out of
      <strong>{{ noOfQuestions }}.</strong>
      <router-link :to="{ name: 'question' }">Click here</router-link> to retake
      the test
    </p>
    <div class="home">
      <router-link :to="{ name: 'Home' }"
        ><span id="left-arrow">&#8592;</span>
        <span id="back-to-home">Back to home</span></router-link
      >
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
    const { correctAnswersCount, noOfQuestions } = storeToRefs(quizStore);
    return { quizStore, correctAnswersCount, noOfQuestions };
  },
  components: {
    SubjectName,
  },
};
</script>

<style lang="scss" scoped>
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
