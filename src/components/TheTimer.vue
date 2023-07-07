<template>
  <section class="timer--container">
    <span>{{ formatTimer(countDownToTime) }}</span>
  </section>
</template>

<script setup>
import { ref, watch, onUnmounted } from "vue";
import { formatTimer } from "@/store/index";
import { useQuizStore } from "@/store/index";
import { useRouter } from "vue-router";

const quizStore = useQuizStore();
const countDownToTime = ref(null);
if (quizStore.noOfQuestions) {
  countDownToTime.value = localStorage.getItem("countDownToTime")
    ? JSON.parse(localStorage.getItem("countDownToTime"))
    : (quizStore.noOfQuestions - 3) * 60;
}
const router = useRouter();
watch(
  () => countDownToTime.value,
  (newTime) => {
    let countDownTimeOut = null;
    if (newTime >= 0) {
      countDownTimeOut = setTimeout(() => countDownToTime.value--, 1000);
      localStorage.setItem(
        "countDownToTime",
        JSON.stringify(countDownToTime.value)
      );
    }
    if (!countDownToTime.value) {
      quizStore.markQuiz();
      quizStore.stopQuiz();
      router.push({ name: "score-board" });
      clearTimeout(countDownTimeOut);
    }
  },
  { immediate: true }
);
onUnmounted(() => {
  localStorage.removeItem("countDownToTime");
});
</script>

<style lang="scss" scoped>
section {
  text-align: right;
  span {
    color: #006f93;
    font-size: 1.15rem;
  }
}
</style>
