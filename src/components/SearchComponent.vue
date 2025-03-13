<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/user";
import UserComponent from "./UserComponent.vue";

const users = ref([]);
const searchText = ref("");
const userStore = useUserStore();

async function searchUsers() {
  let url = `https://hap-app-api.azurewebsites.net/users?search=firstName|userName:${searchText.value}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userStore.token}`,
    },
  };

  const response = await fetch(url, options);
  if (response.status == 200) {
    console.log("Get Users Successful");
    const data = await response.json();
    users.value = data;
  } else {
    console.log(response);
  }
}
</script>

<template>
  <section>
    <div class="container">
      <div class="paneTitle">Search Users</div>
      <form onsubmit="return false" class="search">
        <input
          type="text"
          name="search"
          id="search"
          v-model="searchText"
          required
        />
        <span class="material-symbols-outlined" @click="searchUsers">
          search
        </span>
      </form>
      <div class="scrollWrapper">
        <div class="topMessage">Showing {{ users.length }} user(s)</div>
        <div class="users scrollContent">
          <UserComponent
            v-for="user in users"
            v-bind="user"
            :key="user.id"
          ></UserComponent>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
form.search {
  padding: 0px 10px;

  display: flex;
  flex-direction: row;
}

.users {
  max-height: 300px;
  padding: 0px 10px;
}

section > .container {
  max-height: 424.8px;
}
</style>
