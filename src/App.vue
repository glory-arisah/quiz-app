<template>
  <the-navigation></the-navigation>
  <main class="main">
    <router-view></router-view>
  </main>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
import "./styles.scss";
export default {
  name: "App",
  components: {
    TheNavigation,
  },
  setup() {},
};
</script>

<style></style>
