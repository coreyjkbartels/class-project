<script setup>
import { ref } from "vue";
import UserComponent from "./UserComponent.vue";
import { fetchResponse } from "@/assets/fetch";

const users = ref([]);
const searchText = ref("");

async function searchUsers() {
  const endpoint = `/users?search=firstName|userName:${searchText.value}`;
  const response = await fetchResponse(endpoint, "GET");

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
    <div class="column">
      <h2 class="column__title">Search Users</h2>
      <form onsubmit="return false" class="search">
        <input
          type="text"
          name="search"
          id="search"
          v-model="searchText"
          placeholder="Search for a user"
          required
        />
        <span class="material-symbols-outlined" @click="searchUsers">
          search
        </span>
      </form>
      <div class="scrollWrapper" v-show="users.length > 0">
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
form {
  display: flex;
  flex-direction: row;

  margin: 10px 0px;
}

#search {
  flex: 1;
}

.users {
  max-height: 325px;
  padding: 0px 10px;
}
</style>
