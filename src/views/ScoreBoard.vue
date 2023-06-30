<template>
  <section class="score-board--container">
    <p class="result">
      You score <strong>{{ correctAnswersCount }}</strong> out of
      <strong>{{ noOfQuestions }}</strong> Click here to retake the test
    </p>
  </section>
</template>

<script>
import { useQuizStore } from "@/store";
import { storeToRefs } from "pinia";
export default {
  name: "ScoreBoard",
  setup() {
    const quizStore = useQuizStore();
    const { correctAnswersCount, noOfQuestions } = storeToRefs(quizStore);
    return { quizStore, correctAnswersCount, noOfQuestions };
  },
};
</script>

<style lang="scss" scoped>
.result {
  font-size: 1.1rem;
  color: #274fab;
  font-family: "Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande",
    "Lucida Sans", Arial, sans-serif;
  margin-top: 2rem;
  text-align: center;
}
</style>
