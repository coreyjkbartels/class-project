<script setup>
defineProps({
  firstName: String,
  lastName: String,
  userName: String,
  _id: String,
});
</script>

<template>
  <RouterLink :to="`/user/${_id}?name=${userName}`">
    <div class="userCard">
      <div class="metadata">
        <span>{{ userName }}</span>
      </div>
      <div class="data">
        <span>{{ `${firstName} ${lastName}` }}</span>
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.wrapper {
  width: 100%;

  border-radius: 10px;
  overflow: hidden;
}

.userCard {
  background-color: hsl(0 0% 97%);
  border-radius: 10px;
  overflow-y: auto;

  margin: 0px auto;

  position: relative;
}

.userCard:hover {
  border: 1px ;
}

a:hover {
  color: var(--darkGray);
  text-decoration: none;
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
