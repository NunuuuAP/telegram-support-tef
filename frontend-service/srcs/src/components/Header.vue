<script setup lang="ts">
</script>

<template>
    <header>
      <div class="header-name">
        <h1>Atención al cliente</h1>
      </div>
      <div class="header-buttons">
        <button class="transparent-button">Ajustes</button>
        <button class="transparent-button">Ayuda</button>
      </div>
    </header>
</template>

<style scoped>
header {
  display: flex;
  padding: 20px;
  margin: 10px;
  align-items: center;
}

.header-buttons {
  display: flex;
  position: fixed;
  justify-content: center;
  height: 50%;
  gap: 12px;
}

.transparent-button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.header-name {
  display: flex;
  position: fixed;
  color: #f9f7f4;
  right: 50%;
  transform: translateX(50%);
}

</style>