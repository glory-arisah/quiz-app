<template>
  <section>
    <font-awesome-icon :icon="['fas', 'fa-spinner']" spin />
  </section>
</template>

<script setup></script>

<style scoped lang="scss">
section {
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    font-size: 3.2rem;
    color: #01759c;
  }
}
</style>
