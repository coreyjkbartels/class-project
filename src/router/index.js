import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/user";
import HomeView from "@/views/HomeView.vue";
import JoinView from "@/views/joinView.vue";
import SignInView from "@/views/signInView.vue";
import MainView from "@/views/mainView.vue";
import ProfileView from "@/views/ProfileView.vue";
import WelcomeView from "@/views/WelcomeView.vue";
import SearchComponent from "@/components/SearchComponent.vue";
import PrivateMessageFeed from "@/views/PrivateMessageFeed.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/join",
      name: "join",
      component: JoinView,
      meta: {
        requiresAuth: false,
      },
    },
    {
      path: "/signin",
      name: "signin",
      component: SignInView,
      meta: {
        requiresAuth: false,
      },
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
          },
        },
        {
          path: "/profile",
          name: "profile",
          components: {
            default: ProfileView,
          },
        },
        {
          path: "/search",
          name: "search",
          components: {
            default: SearchComponent,
          },
        },
        {
          path: "/user/:userId",
          name: "privateMessage",
          components: {
            default: SearchComponent,
            right: PrivateMessageFeed,
          },
          props: true,
        },
      ],
      meta: {
        requiresAuth: true,
      },
    },
  ],
});

router.beforeEach((to, from) => {
  if (!router.hasRoute(to.name)) {
    return { name: "home" };
  }

  const userStore = useUserStore();
  if (to.meta.requiresAuth && !userStore.token) {
    console.log("NavGuard triggered; Redirecting...");
    return { name: "home" };
  }
});

export default router;
