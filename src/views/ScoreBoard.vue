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
    </div>
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
import { Doughnut } from "vue-chartjs";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useQuizStore } from "@/store";
import { storeToRefs } from "pinia";
import { computed } from "@vue/reactivity";

ChartJS.register(ArcElement, Tooltip, Legend);
export default {
  name: "ScoreBoard",
  setup() {
    const quizStore = useQuizStore();
    quizStore.fetchScoreFromLS();
    quizStore.fetchQuestionsFromLS();
    quizStore.fetchSelectionsFromLS();
    // fetch user score and questions -- to get the questions count
    const { correctAnswersCount, noOfQuestions } = storeToRefs(quizStore);
    // chart computed property
    const pieChart = computed(() => {
      const questionsCount = quizStore.questions.length;
      const answered = Object.values(quizStore.selections).filter(
        (val) => val !== null
      ).length;
      const unanswered = parseInt(questionsCount - answered);
      const passed = parseInt(quizStore.correctAnswersCount);
      const missed = parseInt(questionsCount - passed);
      console.log(answered, quizStore.questions.length);
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
    return { quizStore, correctAnswersCount, noOfQuestions, pieChart };
  },
  components: {
    SubjectName,
    Doughnut,
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
    .chart--container {
      display: flex;
      justify-content: center;
      margin-bottom: 1.5rem;
      canvas {
        width: 13rem !important;
        height: 13rem !important;
      }
    }
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
