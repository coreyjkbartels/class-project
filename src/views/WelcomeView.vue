<script setup>
import CardComponent from "@/components/CardComponent.vue";
import { ref } from "vue";

const userName = ref(localStorage.getItem("userName"));
const text = ref("");
const showToast = ref(false);
const message = ref("");

async function postMessage() {
  const form = document.querySelector("form");
  if (!form.reportValidity) return false;

  const url = "https://hap-app-api.azurewebsites.net/message";
  const data = {
    text: text.value,
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  };

  const response = await fetch(url, options);

  if (response.status == 201) {
    text.value = "";
    message.value = "Message Posted";
  } else message.value = "Failed to Post Message";

  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
}
</script>

<template>
  <CardComponent>
    <h3>Welcome {{ userName }}</h3>

    <form onsubmit="return false">
      <label for="text">Message</label>
      <input type="text" id="text" v-model="text" required maxlength="280" />
      <!-- <button @click="postMessage">Send</button -->
      <span class="material-symbols-outlined" @click="postMessage"> send </span>
    </form>
  </CardComponent>

  <span v-show="showToast" class="toast">{{ message }}</span>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  margin: 50px;
}

.toast {
  position: fixed;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);

  width: fit-content;
  margin: auto;

  padding: 0.25em 1.5em;
  background-color: hsl(0 0% 95%);
  border-radius: 7px;
}
</style>
