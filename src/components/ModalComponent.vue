<script setup>
import { ref } from "vue";
import CardComponent from "./CardComponent.vue";

const isShown = ref(false);

defineExpose({
  open,
  close,
});

function open() {
  isShown.value = true;
}

function close() {
  isShown.value = false;
}
</script>

<template>
  <div class="modal-backdrop" v-show="isShown" @click.self="close">
    <CardComponent>
      <header>
        <slot name="header"></slot>
      </header>
      <main><slot name="main"></slot></main>
      <footer><slot name="footer"></slot></footer>
    </CardComponent>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;

  display: flex;
  justify-content: center;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.85);
}

header,
main {
  margin-bottom: 20px;
}

header {
  text-align: center;
}
</style>
