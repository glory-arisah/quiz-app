<template>
  <div>
    <h1 class="subject--choice">Test your knowledge in...</h1>
    <subject-list />
  </div>
</template>

<script setup>
import { useQuizStore } from "@/store";
import SubjectList from "@/components/SubjectList.vue";
import { onMounted } from "vue";
onMounted(() => {
  useQuizStore().resetTimer();
  useQuizStore().resetScore();
  useQuizStore().setSelectionMode(0);
});
</script>

<style lang="scss" scoped></style>
