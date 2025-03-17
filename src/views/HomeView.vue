<script setup>
import { RouterLink } from "vue-router";
import HeaderComponent from "@/components/HeaderComponent.vue";
</script>

<template>
  <HeaderComponent>
    <nav>
      <RouterLink to="/join">Join</RouterLink>
      <RouterLink to="/signIn">Sign In</RouterLink>
    </nav>
  </HeaderComponent>
  <main>
    <section>
      <div class="column">
        <h1>Welcome To Dojo</h1>
      </div>
    </section>
  </main>
</template>

<style scoped>
h1 {
  text-align: center;
}
</style>
