<script setup>
import CardComponent from "@/components/CardComponent.vue";
import { ref } from "vue";

const userName = ref(localStorage.getItem("userName"));
// const isShown = useTemplateRef()
</script>

<template>
  <CardComponent>
    <h3>Welcome {{ userName }}</h3>
  </CardComponent>
</template>
