<template>
  <nav>
    <h2 class="nav__heading">quiz app</h2>
  </nav>
</template>

<script>
export default {
  name: "TheNavigation",
};
</script>

<style lang="scss" scoped>
nav {
  background-color: #0096c7;
  padding: 1rem 0 1rem 2rem;
  .nav__heading {
    text-transform: uppercase;
    color: #efefef;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Verdana, sans-serif;
  }
}
</style>
