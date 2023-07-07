<template>
  <subject-name />
  <section class="score-board--container" v-show="correctAnswersCount >= 0">
    <div class="result">
      <div class="chart--container">
        <doughnut
          :data="pieChart"
          class="pie"
          :options="{ responsive: true }"
        />
      </div>
      <div>
        <h3 id="score">Score: {{ scorePercentage }}</h3>
        <div class="score--summary">
          <div>
            <p><strong>Correct Answers:</strong></p>
            <p><strong>Wrong Answers:</strong></p>
            <p><strong>Unanswered:</strong></p>
            <p><strong>Time Taken:</strong></p>
          </div>
          <div>
            <p>{{ correctAnswersCount }}</p>
            <p>{{ noOfQuestions - correctAnswersCount }}</p>
            <p>{{ skipped }}</p>
            <p>{{ formatTimeUsed }}</p>
          </div>
        </div>
        <!-- You score <strong>{{ correctAnswersCount }}</strong> out of
        <strong>{{ noOfQuestions }}.</strong>-->
        <button
          @click="
            quizStore.resetScore();
            $router.push({ name: 'questions' });
          "
          class="clickables"
        >
          Click here
        </button>
        to retake the test. Or
        <span class="correction">
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
        </span>
      </div>
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

<script setup>
import SubjectName from "@/components/SubjectName.vue";
import { ref } from "vue";
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuizStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";

ChartJS.register(ArcElement, Tooltip, Legend);

const quizStore = useQuizStore();
quizStore.fetchScoreFromLS();
quizStore.fetchQuestionsFromLS();
quizStore.fetchSelectionsFromLS();
quizStore.fetchTimerFromLS();
// fetch user score and questions -- to get the questions count
const { correctAnswersCount, noOfQuestions, formatTimeUsed } =
  storeToRefs(quizStore);
// const answered = ref(0)
const skipped = ref(0);
// chart computed property
const pieChart = computed(() => {
  const questionsCount = quizStore.questions.length;
  const answered = Object.values(quizStore.selections).filter(
    (val) => val !== null
  ).length;
  const unanswered = parseInt(questionsCount - answered);
  skipped.value = unanswered;
  const passed = parseInt(quizStore.correctAnswersCount);
  const missed = parseInt(questionsCount - passed);
  return {
    labels: ["answered", "not answered", "passed", "missed"],
    datasets: [
      {
        backgroundColor: ["#0096c7", "#ddd", "#00b000", "#f00000"],
        data: [`${answered}`, `${unanswered}`, `${passed}`, `${missed}`],
      },
    ],
  };
});
const scorePercentage = computed(() => {
  const questionsCount = quizStore.questions.length;
  return `${(quizStore.correctAnswersCount / questionsCount) * 100}%`;
});
</script>

<style lang="scss" scoped>
.clickables {
  border-width: 0;
  font-size: 0.9rem;
  color: #970707;
  background-color: transparent;
  cursor: pointer;
}
</style>
