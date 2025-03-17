<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="column column--leftAligned">
    <h2 class="column__title">Navigation</h2>
    <RouterLink :to="{ name: 'main' }">Home</RouterLink>
    <RouterLink :to="{ name: 'search' }">Messages</RouterLink>
    <RouterLink :to="{ name: 'profile' }">Profile</RouterLink>
  </div>
</template>

<style scoped>
a {
  font-size: 1.2rem;
  border-radius: 7px;
  padding: 10px;
  width: 95%;
}

a:hover {
  background-color: hsl(0 0% 80%);
  text-decoration: none;
}

.column__title {
  text-align: left;
}
</style>
