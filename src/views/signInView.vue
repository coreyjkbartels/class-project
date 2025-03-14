<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import { fetchResponse } from "@/assets/fetch";
import { useRouter } from "vue-router";
import { ref } from "vue";

const router = useRouter();
const isShown = ref(false);
const email = ref("");
const password = ref("");

async function signIn(e) {
  e.preventDefault();
  if (!isValid()) return;

  const data = {
    email: email.value,
    password: password.value,
  };
  const response = await fetchResponse("/user/login", "POST", data);

  if (response.status === 200) {
    const data = await response.json();
    saveInfo(data);

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

function saveInfo(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("userName", data.user.userName);
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
