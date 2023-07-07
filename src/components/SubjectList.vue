<template>
  <section class="subjects__grid">
    <router-link
      @click.prevent="quizStore.setIndexToZero"
      :to="{
        name: 'subject',
        params: { id: 18, subjectName: 'computers' },
      }"
    >
      <article class="subject--container">
        <font-awesome-icon
          :icon="['fas', 'fa-desktop']"
          class="subject--icon"
        />
        <p class="subject--par">Computers</p>
      </article>
    </router-link>
    <router-link
      @click.prevent="quizStore.setIndexToZero"
      :to="{ name: 'subject', params: { id: 21, subjectName: 'sports' } }"
    >
      <article class="subject--container">
        <font-awesome-icon
          :icon="['fas', 'fa-baseball']"
          class="subject--icon"
        />
        <p class="subject--par">Sports</p>
      </article>
    </router-link>
    <router-link
      @click.prevent="quizStore.setIndexToZero"
      :to="{
        name: 'subject',
        params: { id: 26, subjectName: 'celebrities' },
      }"
    >
      <article class="subject--container">
        <font-awesome-icon
          :icon="['fas', 'fa-champagne-glasses']"
          class="subject--icon"
        />
        <p class="subject--par">Celebrities</p>
      </article>
    </router-link>
    <router-link
      @click.prevent="quizStore.setIndexToZero"
      :to="{
        name: 'subject',
        params: { id: 19, subjectName: 'mathematics' },
      }"
    >
      <article class="subject--container">
        <font-awesome-icon
          :icon="['fas', 'fa-calculator']"
          class="subject--icon"
        />
        <p class="subject--par">Mathematics</p>
      </article>
    </router-link>
    <router-link
      @click.prevent="quizStore.setIndexToZero"
      :to="{ name: 'subject', params: { id: 27, subjectName: 'animals' } }"
    >
      <article class="subject--container">
        <font-awesome-icon :icon="['fas', 'fa-dog']" class="subject--icon" />
        <p class="subject--par">Animals</p>
      </article>
    </router-link>
    <router-link
      @click.prevent="quizStore.setIndexToZero"
      :to="{ name: 'subject', params: { id: 12, subjectName: 'music' } }"
    >
      <article class="subject--container">
        <font-awesome-icon :icon="['fas', 'fa-music']" class="subject--icon" />
        <p class="subject--par">Music</p>
      </article>
    </router-link>
    <router-link
      @click.prevent="quizStore.setIndexToZero"
      :to="{ name: 'subject', params: { id: 24, subjectName: 'politics' } }"
    >
      <article class="subject--container">
        <font-awesome-icon
          :icon="['fas', 'fa-landmark']"
          class="subject--icon"
        />
        <p class="subject--par">Politics</p>
      </article>
    </router-link>
  </section>
</template>

<script setup>
import { useQuizStore } from "@/store";
import { onMounted } from "vue";
const quizStore = useQuizStore();
onMounted(() => {
  quizStore.resetQuestions();
});
</script>

<style lang="scss" scoped></style>
