<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const router = useRouter();
const isShown = ref(false);
const email = ref("");
const password = ref("");
const userStore = useUserStore();

async function signIn(e) {
  e.preventDefault();
  if (!isValid()) return;

  const response = await getResponse();

  if (response.status === 200) {
    const data = await response.json();
    userStore.setUser(data.user.userName, data.token);

    router.push({
      name: "main",
    });
  } else if (response.status === 400) {
    isShown.value = true;
  }
}

function isValid() {
  const form = document.querySelector("form");
  return form.reportValidity();
}

async function getResponse() {
  const data = {
    email: email.value,
    password: password.value,
  };

  const url = "https://hap-app-api.azurewebsites.net/user/login";

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  return await fetch(url, options);
}
</script>

<template>
  <HeaderComponent>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </HeaderComponent>

  <main>
    <CardComponent>
      <form>
        <li class="inputGroup">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            required
          />
        </li>
        <li class="inputGroup">
          <label for="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            required
            minlength="8"
          />
        </li>

        <div class="errorBox" v-if="isShown">Invalid Username or Password</div>
        <button type="button" @click="signIn">Sign In</button>
      </form>
    </CardComponent>
  </main>
</template>
