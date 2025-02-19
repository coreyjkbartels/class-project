<template>
  <div class="card-background">
    <div class="card-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.card-background {
  width: fit-content;
  margin: 15px auto;

  padding: 0px 25px;
}
</style>
