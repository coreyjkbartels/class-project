<script setup>
import CardComponent from "@/components/CardComponent.vue";
import MessageComponent from "@/components/MessageComponent.vue";
import { onMounted, ref } from "vue";

const text = ref("");
const showToast = ref(false);
const toastMessage = ref("");
const messages = ref([]);
const newMessageCount = ref(0);
const isDisabled = ref(true);

async function getMessages(extraParam = "", prepend = false) {
  const url = `https://hap-app-api.azurewebsites.net/messages?limit=15${extraParam}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const response = await fetch(url, options);
  if (response.status == 200) {
    const data = await response.json();
    console.log(data);
    prepend ? messages.value.unshift(...data) : messages.value.push(...data);
    console.log("Success");
  } else {
    console.log("Failed");
  }
}

getMessages();

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
    toastMessage.value = "Message Posted";
  } else toastMessage.value = "Failed to Post Message";

  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
}

async function getNewMessageCount() {
  const url = `https://hap-app-api.azurewebsites.net/messages/count?after=${messages.value[0].updatedAt}`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  const response = await fetch(url, options);
  if (response.status == 200) {
    const data = await response.json();
    console.log(data);
    console.log("Success");
    newMessageCount.value = data.total;
    isDisabled.value = newMessageCount.value === 0;
  } else {
    console.log("Failed");
  }
}

async function updateWithNew() {
  await getMessages(`&after=${messages.value[0].updatedAt}`, true);
  await getNewMessageCount();
}

onMounted(() => {
  const messagesElm = document.querySelector(".messages");
  messagesElm.addEventListener("scroll", () => {
    if (
      Math.ceil(messagesElm.scrollTop) >=
      messagesElm.scrollHeight - messagesElm.offsetHeight
    ) {
      getMessages(
        `&before=${messages.value[messages.value.length - 1].updatedAt}`
      );
      console.log();
      console.log("Reached the end");
    } else if (messagesElm.scrollTop === 0) {
      console.log("Reached top");
      getNewMessageCount();
    }
  });
});
</script>

<template>
  <CardComponent>
    <form onsubmit="return false">
      <label for="text">Message</label>
      <input type="text" id="text" v-model="text" required maxlength="280" />
      <span class="material-symbols-outlined" @click="postMessage"> send </span>
    </form>
  </CardComponent>

  <div class="wrapper">
    <div class="messages">
      <div
        class="newMessageCount"
        :class="{ disabled: isDisabled }"
        @click="updateWithNew"
      >
        {{
          newMessageCount == 0
            ? "No New Messages"
            : newMessageCount + " new messages"
        }}
      </div>
      <MessageComponent
        v-for="message in messages"
        v-bind="message"
        :key="message.id"
      ></MessageComponent>
    </div>
  </div>

  <div v-show="showToast" class="toast">{{ toastMessage }}</div>
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
  top: 15%;
  left: 50%;
  transform: translateX(-50%);

  width: fit-content;
  margin: auto;

  padding: 0.25em 1.5em;
  background-color: hsl(0 0% 95%);

  border-radius: 7px;
}

.wrapper {
  border-radius: 10px;
  border: 1px solid black;
  overflow: hidden;
}

.messages {
  height: 330px;
  border-radius: 10px;
  overflow-y: auto;
  /* scrollbar-color: o white; */
  scroll-padding: 10px;
}

.newMessageCount {
  background-color: hsl(0 0% 90%);
  text-align: center;

  cursor: pointer;
  padding: 5px;
}

.newMessageCount:hover {
  background-color: var(--accent);
  color: white;
}

.newMessageCount.disabled:hover {
  background-color: hsl(0 0% 90%);
  color: black;
}
</style>
