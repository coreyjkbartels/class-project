<template>
  <div class="logo">
    <div class="logo__image">
      <img src="../../public/icon.png" alt="Ninja Icon" />
    </div>
    <h1 class="logo__text">Dojo</h1>
  </div>
</template>

<style>
.logo {
  display: flex;
  gap: 20px;
  align-items: center;
}

.logo__image {
  width: 75px;
  height: 75px;
}

.logo__text {
  color: var(--accent);
  font-size: 4rem;
  font-family: "Kolker Brush", Georgia, "Times New Roman", Times, serif;
}
</style>
