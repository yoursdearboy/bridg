<script setup lang="ts">
import AppBreadcrumbs from './AppBreadcrumbs.vue'
import AppNav from './AppNav.vue'
</script>

<template>
  <div class="flex flex-col space-y-1">
    <app-nav />
    <div class="container mx-auto">
      <app-breadcrumbs />
    </div>
    <div class="container mx-auto">
      <router-view />
    </div>
  </div>
</template>
