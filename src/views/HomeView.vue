<script setup>
import { RouterLink } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
</script>

<template>
  <HeaderComponent>
    <nav>
      <RouterLink to="/join">Join</RouterLink>
      <RouterLink to="/signIn">Sign In</RouterLink>
    </nav>
  </HeaderComponent>
  <main>
    <CardComponent>
      <h3>Welcome To Dojo</h3>
    </CardComponent>
  </main>
</template>

<style scoped></style>
