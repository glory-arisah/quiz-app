<template>
  <the-navigation></the-navigation>
  <main class="main">
    <router-view></router-view>
  </main>
</template>

<script setup>
import TheNavigation from "./components/TheNavigation.vue";
import "./styles.scss";
</script>

<style></style>
