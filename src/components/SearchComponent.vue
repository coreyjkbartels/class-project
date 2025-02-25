<script setup>
import { ref } from "vue";
import UserComponent from "./UserComponent.vue";

const users = ref([]);
const searchText = ref("");

async function searchUsers() {
  let url = `https://hap-app-api.azurewebsites.net/users?search=firstName|userName:${searchText.value}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
  <div class="main">
    <div class="paneTitle">Search</div>
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

    <div class="wrapper">
      <div class="users">
        <UserComponent
          v-for="user in users"
          v-bind="user"
          :key="user.id"
        ></UserComponent>
        <div class="material-symbols-outlined scrollIcon">arrow_drop_down</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
form.search {
  padding: 0px 10px;

  display: flex;
  flex-direction: row;
}

.wrapper {
  margin-top: 20px;
  border: 1px black solid;
  border-radius: 7px;
  overflow: hidden;
  width: 80%;
  padding: 10px;
  /* margin: 20px auto; */
}

.users {
  height: 300px;
  overflow: auto;
}
</style>
