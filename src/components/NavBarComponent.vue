<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div class="bar">
    <div class="paneTitle">Navigation</div>
    <RouterLink to="main">Home</RouterLink>
    <RouterLink to="profile">Profile</RouterLink>
  </div>
</template>

<style scoped>
.bar {
  display: flex;
  flex-direction: column;
}

a {
  font-size: 1.1rem;
  border-radius: 7px;
  padding: 10px;
}

a:hover {
  background-color: hsl(0 0% 80%);
  text-decoration: none;
}
</style>
