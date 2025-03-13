<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { ref } from "vue";

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const userName = ref("");
const password = ref("");
const firstName = ref("");
const lastName = ref("");
const cfmPassword = ref("");

const isShown = ref(false);

async function join(e) {
  e.preventDefault();
  if (!isValid()) return false;

  let response = await getResponse();

  if (response.status === 201) {
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
  return passwordsMatch() && form.reportValidity();
}

function passwordsMatch() {
  let cfmPasswordElm = document.querySelector("#cfmPass");
  if (password.value == cfmPassword.value) {
    cfmPasswordElm.setCustomValidity("");
    return true;
  } else {
    cfmPasswordElm.setCustomValidity("Passwords must match");
    cfmPasswordElm.reportValidity();
    return false;
  }
}

async function getResponse() {
  const data = {
    email: email.value,
    userName: userName.value,
    password: password.value,
    firstName: firstName.value,
    lastName: lastName.value,
  };

  const url = "https://hap-app-api.azurewebsites.net/user";

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
      <form class="mainForm" onsubmit="return false">
        <li class="inputGroup">
          <label for="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            v-model="firstName"
            required
          />
        </li>
        <li class="inputGroup">
          <label for="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            v-model="lastName"
            required
          />
        </li>
        <li class="inputGroup">
          <label for="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            required
          />
        </li>
        <li class="inputGroup">
          <label for="userName">Username</label>
          <input
            type="text"
            name="userName"
            id="userName"
            v-model="userName"
            required
          />
        </li>
        <li class="inputGroup">
          <label for="password">Password</label
          ><input
            type="password"
            name="password"
            id="password"
            v-model="password"
            minlength="8"
            required
          />
        </li>
        <li class="inputGroup">
          <label for="cfmPass">Confirm Password</label
          ><input
            type="password"
            name="cfmPass"
            id="cfmPass"
            v-model="cfmPassword"
            minlength="8"
            required
          />
        </li>
        <div class="errorBox" v-if="isShown">Something went wrong...</div>
        <button @click="join">Join</button>
      </form>
    </CardComponent>
  </main>
</template>
