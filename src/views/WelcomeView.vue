<script setup>
import ModalComponent from "@/components/ModalComponent.vue";
import MessageComponent from "@/components/MessageComponent.vue";
import { onMounted, ref, useTemplateRef } from "vue";

const modal = useTemplateRef("modal");
const text = ref("");
const showToast = ref(false);
const toastMessage = ref("");
const messages = ref([]);
const newMessageCount = ref(0);
const isDisabled = ref(true);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
};

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
    prepend ? messages.value.unshift(...data) : messages.value.push(...data);
  } else {
    console.log("Failed to fetch messages");
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

  modal.value.close();
  showToast.value = true;
  setTimeout(() => (showToast.value = false), 2000);
}

function cancel(e) {
  text.value = "";
  modal.value.close(e);
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
    newMessageCount.value = data.total;
    isDisabled.value = newMessageCount.value === 0;
  } else {
    console.log("Failed to get new message count");
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
    } else if (messagesElm.scrollTop === 0) {
      getNewMessageCount();
    }
  });
});
</script>

<template>
  <div class="paneTitle">Message Feed</div>
  <div class="messageWrapper">
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
        :updated-at="formatDate(message.updatedAt)"
        :key="message.id"
      ></MessageComponent>
      <div class="material-symbols-outlined scrollIcon">arrow_drop_down</div>
    </div>
  </div>

  <div v-show="showToast" class="toast">{{ toastMessage }}</div>

  <button class="postMessage" @click="modal.open">Post Message</button>

  <ModalComponent ref="modal">
    <template #header>
      <h2>Post Message</h2>
    </template>
    <template #main>
      <form onsubmit="return false">
        <textarea
          name="textarea"
          id="text"
          v-model="text"
          required
          maxlength="280"
          :style="{
            width: '500px',
            height: '250px',
          }"
        ></textarea>
      </form>
    </template>
    <template #footer>
      <div class="buttons">
        <button class="cancel" @click="cancel">Cancel</button>
        <button class="save" @click="postMessage">Post</button>
      </div>
    </template>
  </ModalComponent>
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

.messageWrapper {
  border-radius: 10px;
  border: 1px solid black;
  overflow: hidden;

  width: 80%;
  margin: auto;
}

.messages {
  height: 360px;
  border-radius: 10px;
  overflow-y: auto;
}

.messages::-webkit-scrollbar {
  display: none;
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

.buttons {
  display: flex;
  justify-content: space-between;
}

h2 {
  font-size: 1.8rem;
}

.postMessage {
  display: block;
  width: fit-content;
  margin: 0px auto;
  margin-top: 20px;
}

textarea {
  padding: 20px;
  border-radius: 10px;
  resize: none;
}
</style>
