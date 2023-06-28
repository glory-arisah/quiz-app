<template>
  <the-navigation></the-navigation>
  <router-view></router-view>
</template>

<script>
import TheNavigation from "./components/TheNavigation.vue";
export default {
  name: "App",
  components: {
    TheNavigation,
  },
  setup() {},
};
</script>

<style></style>
