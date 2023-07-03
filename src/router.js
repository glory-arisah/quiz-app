import { createWebHistory, createRouter } from "vue-router";
import HomeView from "./views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/subject/:id/:subjectName",
    children: [
      {
        path: "",
        name: "subject",
        component: () => import("./views/SubjectView.vue"),
      },
      {
        path: "questions",
        name: "questions",
        component: () => import("./views/QuestionView.vue"),
      },
      {
        path: "score-board",
        name: "score-board",
        component: () => import("./views/ScoreBoard.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
