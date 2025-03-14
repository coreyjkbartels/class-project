<script setup>
import { fetchResponse } from "@/assets/fetch";
import { ref } from "vue";

const text = ref("");

async function postMessage() {
  const form = document.querySelector("form");
  if (!form.reportValidity) return false;

  const endpoint = "/message";
  const data = {
    text: text.value,
  };
  const response = await fetchResponse(endpoint, "POST", data);

  if (response.status == 201) {
    text.value = "";

    console.log("Posted Message");
  } else console.log("Failed to Post Message");
}
</script>

<template>
  <section>
    <div class="column">
      <h2 class="column__title">Post Message</h2>
      <form onsubmit="return false">
        <textarea
          name="textarea"
          id="text"
          v-model="text"
          required
          maxlength="280"
        ></textarea>
        <button @click="postMessage">Post</button>
      </form>
    </div>
  </section>
</template>

<style scoped>
textarea {
  margin-top: 10px;
  width: 80%;
  height: 300.2px;
}

button {
  width: 80%;
}
</style>
