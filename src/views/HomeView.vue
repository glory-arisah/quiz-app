<template>
  <div>
    <h1 class="subject--choice">Choose a subject</h1>
    <subject-list></subject-list>
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
