<script setup>
import { ref } from "vue";
import router from "@/router";
import { RouterView } from "vue-router";
import { fetchResponse } from "@/assets/fetch";
import HeaderComponent from "@/components/HeaderComponent.vue";
import NavBarComponent from "@/components/NavBarComponent.vue";

const error = ref("");
const isShown = ref(false);
const userName = ref(localStorage.getItem("userName"));

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

async function signOut() {
  const response = await fetchResponse("/user/logout", "POST");

  if (response.status === 200) {
    localStorage.clear;
    router.push({ name: "home" });
  } else {
    error.value = "An error occurred while logging out.";
    isShown.value = true;
  }
}

async function deleteAccount() {
  if (!confirm("Do you really want to delete your account?")) return;
  const response = await fetchResponse("/user", "DELETE");

  if (response.status === 200) {
    localStorage.clear;
    router.push({ name: "home" });
  } else {
    error.value = "Could not delete your account";
    isShown.value = true;
  }
}

function displayProfile() {
  router.push("profile");
}
</script>

<template>
  <HeaderComponent>
    <nav>
      <h1>Welcome {{ capitalize(userName) }}</h1>

      <div class="dropdown">
        <a class="dropdownBtn"
          ><span class="material-symbols-outlined"> menu </span></a
        >
        <div class="links">
          <a class="dropdownLink" @click="displayProfile">Profile</a>
          <a class="dropdownLink" @click="signOut">Log Out</a>
          <a class="dropdownLink" @click="deleteAccount">Delete</a>
        </div>
      </div>
    </nav>
  </HeaderComponent>

  <main>
    <div class="errorBox" v-if="isShown">
      {{ error }}
    </div>

    <div class="columns">
      <div class="wrapper">
        <div class="column">
          <NavBarComponent></NavBarComponent>
        </div>
        <div class="column">
          <RouterView></RouterView>
        </div>
      </div>
      <div class="column">
        <RouterView name="right"></RouterView>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dropdown .links {
  display: none;
  position: absolute;
  top: 105px;
  right: 100px;
  z-index: 1;

  width: 225px;
  border-radius: 7px;
  overflow: hidden;
  background-color: hsl(0 0% 95%);
  border: 1.5px solid hsl(0 0% 75%);
}

.dropdown:hover .links {
  display: block;
}

.dropdownBtn {
  width: 50px;
  height: 50px;
}

.dropdownLink {
  display: block;
  font-size: 1rem;
  font-weight: normal;
  padding: 10px;
}

.dropdownLink:hover {
  background-color: hsl(0 0% 80%);
  text-decoration: none;
}

.errorBox {
  position: absolute;
  top: 90vh;
  left: calc((100vw - 300px) / 2);
  z-index: 1;
}

.wrapper {
  display: contents;
}
.wrapper > .column {
  border-right: 1px black solid;
}

nav {
  display: flex;
  align-items: center;
}
</style>
