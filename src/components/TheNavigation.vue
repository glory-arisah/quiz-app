<template>
  <nav>
    <h2 class="nav__heading">
      <router-link
        :to="{ name: 'Home' }"
        @click="redirectUserToHome"
        class="nav__link"
      >
        quiz app
      </router-link>
    </h2>
  </nav>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useQuizStore } from "@/store";
export default {
  name: "TheNavigation",
  setup() {
    const quizStore = useQuizStore();
    const router = useRouter();
    const route = useRoute();
    let redirectUser = ref(null);
    // check if quiz has started and end quiz if user navigates to home during or before quiz
    const redirectUserToHome = () => {
      if (route.name !== "Home" && route.name !== "score-board") {
        redirectUser.value = confirm(
          "This action will end the quiz. Select OK to proceed, select Cancel to continue the quiz."
        );
        if (redirectUser.value) {
          router.push({ name: "Home" });
          quizStore.resetScore();
        } else router.push({ path: route.fullPath });
      }
    };
    return { redirectUserToHome };
  },
};
</script>

<style lang="scss" scoped>
nav {
  background-color: #0096c7;
  padding: 1rem 0 1rem 2rem;
  .nav__heading {
    text-transform: uppercase;
    .nav__link {
      font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
        "Lucida Sans Unicode", Verdana, sans-serif;
      color: #efefef !important;
    }
  }
}
</style>
