<script setup>
import MessageComponent from "@/components/MessageComponent.vue";
import { fetchResponse } from "@/assets/fetch";
import { onMounted, ref } from "vue";

const messages = ref([]);
const newMessageCount = ref(0);
const isDisabled = ref(true);

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
};

async function getMessages(extraParam = "", prepend = false) {
  const endpoint = `/messages?limit=15${extraParam}`;
  const response = await fetchResponse(endpoint, "GET");

  if (response.status == 200) {
    const data = await response.json();
    prepend ? messages.value.unshift(...data) : messages.value.push(...data);
  } else {
    console.log("Failed to fetch messages");
  }
}

getMessages();

async function getNewMessageCount() {
  const endpoint = `/messages/count?after=${messages.value[0].updatedAt}`;
  const response = await fetchResponse(endpoint, "GET");

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
  <section>
    <div class="column">
      <h2 class="column__title">Message Feed</h2>
      <div class="scrollWrapper">
        <div class="messages scrollContent">
          <div
            class="topMessage"
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
    </div>
  </section>
</template>

<style scoped>
.scrollWrapper {
  margin-top: 10px;
}

.messages {
  height: 360px;
}
</style>
