import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import JoinView from "@/views/joinView.vue";
import SignInView from "@/views/signInView.vue";
import MainView from "@/views/mainView.vue";
import ProfileView from "@/views/ProfileView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import SearchComponent from "@/components/SearchComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/join",
      name: "join",
      component: JoinView,
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInView,
    },
    {
      path: "/main",
      component: MainView,
      children: [
        {
          path: "",
          name: "main",
          components: {
            default: WelcomeView,
            right: SearchComponent
          },
        },
        {
          path: "/profile",
          name: "profile",
          components: {
            default: ProfileView,
          },
        },
      ],
    },
  ],
});

export default router;
