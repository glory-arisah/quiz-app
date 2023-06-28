<template>
  <section class="subjects__grid">
    <article class="subject--container">
      <font-awesome-icon :icon="['fas', 'fa-desktop']" class="subject--icon" />
      <p class="subject--par">Computers</p>
    </article>
    <article class="subject--container">
      <font-awesome-icon :icon="['fas', 'fa-baseball']" class="subject--icon" />
      <p class="subject--par">Sports</p>
    </article>
    <article class="subject--container">
      <font-awesome-icon
        :icon="['fas', 'fa-champagne-glasses']"
        class="subject--icon"
      />
      <p class="subject--par">Celebrities</p>
    </article>
    <article class="subject--container">
      <font-awesome-icon
        :icon="['fas', 'fa-calculator']"
        class="subject--icon"
      />
      <p class="subject--par">Mathematics</p>
    </article>
    <article class="subject--container">
      <font-awesome-icon :icon="['fas', 'fa-dog']" class="subject--icon" />
      <p class="subject--par">Animals</p>
    </article>
  </section>
</template>

<script>
import "../stylesheets/mobile.scss";
export default {
  name: "SubjectList",
  setup() {},
};
</script>

<style lang="scss" scoped></style>
