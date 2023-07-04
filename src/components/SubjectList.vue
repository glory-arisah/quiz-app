<template>
  <section class="subjects__grid">
    <article class="subject--container">
      <router-link
        @click="quizStore.clearIndex"
        :to="{
          name: 'subject',
          params: { id: 18, subjectName: 'computers' },
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'fa-desktop']"
          class="subject--icon"
        />
        <p class="subject--par">Computers</p>
      </router-link>
    </article>
    <article class="subject--container">
      <router-link
        @click="quizStore.clearIndex"
        :to="{ name: 'subject', params: { id: 21, subjectName: 'sports' } }"
      >
        <font-awesome-icon
          :icon="['fas', 'fa-baseball']"
          class="subject--icon"
        />
        <p class="subject--par">Sports</p>
      </router-link>
    </article>
    <article class="subject--container">
      <router-link
        @click="quizStore.clearIndex"
        :to="{
          name: 'subject',
          params: { id: 26, subjectName: 'celebrities' },
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'fa-champagne-glasses']"
          class="subject--icon"
        />
        <p class="subject--par">Celebrities</p>
      </router-link>
    </article>
    <article class="subject--container">
      <router-link
        @click="quizStore.clearIndex"
        :to="{
          name: 'subject',
          params: { id: 19, subjectName: 'mathematics' },
        }"
      >
        <font-awesome-icon
          :icon="['fas', 'fa-calculator']"
          class="subject--icon"
        />
        <p class="subject--par">Mathematics</p>
      </router-link>
    </article>
    <article class="subject--container">
      <router-link
        @click="quizStore.clearIndex"
        :to="{ name: 'subject', params: { id: 27, subjectName: 'animals' } }"
      >
        <font-awesome-icon :icon="['fas', 'fa-dog']" class="subject--icon" />
        <p class="subject--par">Animals</p>
      </router-link>
    </article>
    <article class="subject--container">
      <router-link
        @click="quizStore.clearIndex"
        :to="{ name: 'subject', params: { id: 12, subjectName: 'music' } }"
      >
        <font-awesome-icon :icon="['fas', 'fa-music']" class="subject--icon" />
        <p class="subject--par">Music</p>
      </router-link>
    </article>
  </section>
</template>

<script>
import { useQuizStore } from "@/store";
import { onMounted } from "vue";
import "../stylesheets/mobile.scss";
export default {
  name: "SubjectList",
  setup() {
    const quizStore = useQuizStore();
    onMounted(() => {
      quizStore.resetQuestions();
    });
    return { quizStore };
  },
};
</script>

<style lang="scss" scoped></style>
