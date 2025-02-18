<script setup>
defineProps({
  senderName: String,
  updatedAt: String,
  text: String,
});
</script>

<template>
  <div class="wrapper">
    <div class="messageCard">
      <div class="metadata">
        <span>{{ senderName }}</span>
        <span>{{ updatedAt }}</span>
      </div>
      <div class="data">
        <span>{{ text }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin: 15px auto;
  width: 575px;

  border: 1.75px solid black;
  border-radius: 10px;
  overflow: hidden;
}

.messageCard {
  background-color: hsl(0 0% 97%);
  border-radius: 10px;
  overflow-y: auto;

  margin: 0px auto;
  width: 575px;
  height: 175px;

  position: relative;
}

.metadata {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;

  position: sticky;
  top: 0%;

  background-color: hsl(0 0% 90%);
}

.data,
.metadata {
  padding: 10px;
}
</style>
