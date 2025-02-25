<script setup>
defineProps({
  firstName: String,
  lastName: String,
  userName: String,
  unique_id: String,
});
</script>

<template>
  <div class="wrapper">
    <div class="userCard">
      <div class="metadata">
        <span>{{ userName }}</span>
      </div>
      <div class="data">
        <span>{{ `${firstName} ${lastName}` }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  /* margin: 15px auto; */
  width: 100%;

  border: 1.75px solid black;
  border-radius: 10px;
  overflow: hidden;
}

.userCard {
  background-color: hsl(0 0% 97%);
  border-radius: 10px;
  overflow-y: auto;

  margin: 0px auto;
  /* height: 175px; */

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
