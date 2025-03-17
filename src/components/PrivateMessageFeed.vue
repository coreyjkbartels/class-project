<script setup>
import { onMounted, ref, useTemplateRef } from "vue";
import { fetchResponse } from "@/assets/fetch";
import ModalComponent from "@/components/ModalComponent.vue";
import MessageComponent from "@/components/MessageComponent.vue";

const props = defineProps({
  userId: String,
});

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

async function getMessages(queryParams, prepend = false) {
  const endpoint = `/messages/${props.userId}?${queryParams}`;
  const response = await fetchResponse(endpoint, "GET");

  if (response.status == 200) {
    console.log("Succeeded in fetching messages");
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

  const endpoint = `/message/${props.userId}`;
  const data = {
    text: text.value,
  };
  const response = await fetchResponse(endpoint, "POST-", data);

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

async function getMessageCount() {
  const endpoint = `/messages/${props.userId}/count?after=${messages.value[0].updatedAt}`;
  const response = await fetchResponse(endpoint, "GET");

  if (response.status == 200) {
    console.log("Succeed in getting new message count");
    const data = await response.json();
    let messageCount = data.total;
    isDisabled.value = messageCount === 0;
    return messageCount;
  } else {
    console.log("Failed to get new message count");
  }
}

async function updateWithNew() {
  await getMessages(`&after=${messages.value[0].updatedAt}`, true);
  newMessageCount.value = await getMessageCount();
}

onMounted(() => {
  const messagesElm = document.querySelector(".messages");
  messagesElm.addEventListener("scroll", async () => {
    if (
      Math.ceil(messagesElm.scrollTop) >=
      messagesElm.scrollHeight - messagesElm.offsetHeight
    ) {
      getMessages(
        `&before=${messages.value[messages.value.length - 1].updatedAt}`
      );
    } else if (messagesElm.scrollTop === 0) {
      newMessageCount.value = await getMessageCount();
    }
  });
});
</script>

<template>
  <section>
    <div class="column">
      <h2 class="column__title">Chat</h2>
      <div class="scrollWrapper">
        <div class="messages scrollContent">
          <div
            class="newMessageCount topMessage"
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
        </div>
      </div>
      <div v-show="showToast" class="toast">{{ toastMessage }}</div>
      <button class="longButton" @click="modal.open">Post Message</button>
    </div>
  </section>

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

.scrollWrapper {
  margin: 10px auto;
}

.messages {
  height: 360px;
}

.buttons {
  display: flex;
  justify-content: space-between;
}
</style>
