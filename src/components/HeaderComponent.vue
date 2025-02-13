<script setup>
import LogoComponent from "./LogoComponent.vue";
</script>

<template>
  <header>
    <LogoComponent />
    <div class="links">
      <slot></slot>
    </div>
  </header>
</template>

<style scoped>
header {
  padding: 40px 100px;

  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
