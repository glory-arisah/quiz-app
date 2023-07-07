<template>
  <button class="subject--name">{{ $route.params.subjectName }}</button>
</template>

<script setup></script>

<style lang="scss" scoped>
.subject--name {
  margin-top: 1rem;
  background-color: #fff;
  color: #0096c7;
  border: 0.5px solid #0096c7;
  border-radius: 3px;
  padding: 0.1rem 0.3rem;
}
</style>
