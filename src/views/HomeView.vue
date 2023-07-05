<template>
  <div>
    <h1 class="subject--choice">Test your knowledge in...</h1>
    <subject-list />
  </div>
</template>

<script>
import SubjectList from "@/components/SubjectList.vue";
export default {
  setup() {},
  components: {
    SubjectList,
  },
};
</script>

<style lang="scss" scoped></style>
