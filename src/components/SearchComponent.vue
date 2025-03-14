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
    <div class="container">
      <div class="paneTitle">Users</div>
      <form onsubmit="return false" class="search">
        <input
          type="text"
          name="search"
          id="search"
          v-model="searchText"
          required
        />
        <button @click="searchUsers">search</button>
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
  /*
  display: flex;
  flex-direction: row; */
}

.users {
  max-height: 300px;
  padding: 0px 10px;
}

section > .container {
  max-height: 424.8px;
}
</style>
