<script setup lang="ts">
import Header from './components/Header.vue';
import Menu from './components/Menu.vue';

</script>

<template>
  <Header></Header>
  <div class="main-container">
    <Menu></Menu>
  </div>
</template>

<style scoped>

.main-container {
  display: flex;
  height: 100%;
  width: 100%;
  margin: -10px;
  bottom: 0px;
  gap: 10px;
}

</style>