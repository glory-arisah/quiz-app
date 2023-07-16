<template>
  <section class="timer--container">
    <span>{{ formatTimer(countDownToTime) }}</span>
  </section>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted, computed } from "vue";
import { formatTimer } from "@/store/index";
import { useQuizStore } from "@/store/index";
import { useRouter } from "vue-router";

const router = useRouter();
const quizStore = useQuizStore();
const countDownToTime = ref(0);
// fetch the current countdown time from LocalStorage on refresh
const getCountTimeFromLS = computed((): number => {
  return Number(localStorage.getItem("countDownToTime"));
});
if (quizStore.noOfQuestions) {
  countDownToTime.value = localStorage.getItem("countDownToTime")
    ? getCountTimeFromLS.value
    : (quizStore.noOfQuestions - 3) * 60;
}
watch(
  () => countDownToTime.value,
  (newTime) => {
    let countDownTimeOut;
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
