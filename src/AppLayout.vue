<script setup lang="ts">
import AppNav from './AppNav.vue'
</script>

<template>
  <div class="flex flex-col space-y-4">
    <app-nav />
    <div class="container mx-auto">
      <router-view />
    </div>
  </div>
</template>
