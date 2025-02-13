<script setup>
import HeaderComponent from "@/components/HeaderComponent.vue";
import NavBarComponent from "@/components/NavBarComponent.vue";
import { RouterView } from "vue-router";
import router from "@/router";
import { ref } from "vue";

const error = ref("");
const isShown = ref(false);

async function signOut() {
  const response = await getResponse("user/logout", "POST");

  if (response.status === 200) {
    localStorage.clear();
    router.push({ name: "home" });
  } else {
    error.value = "An error occurred while logging out.";
    isShown.value = true;
  }
}

async function deleteAccount() {
  if (!confirm("Do you really want to delete your account?")) return;
  const response = await getResponse("user", "DELETE");

  if (response.status === 200) {
    localStorage.clear();
    router.push({ name: "home" });
  } else {
    error.value = "Could not delete your account";
    isShown.value = true;
  }
}

async function getResponse(endpoint, methodParam) {
  const url = "https://hap-app-api.azurewebsites.net/" + endpoint;

  const options = {
    method: methodParam,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  return await fetch(url, options);
}

function displayProfile() {
  router.push("profile");
}
</script>

<template>
  <HeaderComponent>
    <nav>
      <a @click="signOut">Log Out</a>
      <div class="dropdown">
        <a class="dropdownBtn"
          ><span class="material-symbols-outlined"> menu </span></a
        >
        <div class="links">
          <a class="dropdownLink" @click="displayProfile">Profile</a>
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
        <div class="column end-column">
          <NavBarComponent></NavBarComponent>
        </div>
        <div class="column middle-column">
          <RouterView></RouterView>
        </div>
      </div>
      <div class="column end-column">
        <RouterView name="right"></RouterView>
      </div>
    </div>
  </main>
</template>

<style scoped>
.dropdown .links {
  display: none;
  position: absolute;
  right: 100px;
  z-index: 1;

  width: 200px;
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

.columns {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;

  padding: 0px;
  height: 500px;
}

.end-column {
  padding: 8%;
}

.middle-column {
  padding: 4%;
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
