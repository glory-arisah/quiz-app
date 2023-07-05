<template>
  <section>
    <font-awesome-icon :icon="['fas', 'fa-spinner']" spin />
  </section>
</template>

<script>
export default {
  name: "TheLoader",
};
</script>

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
