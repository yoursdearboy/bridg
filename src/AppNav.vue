<script setup lang="ts">
import ThemeController from './ThemeController.vue'
</script>

<template>
  <div class="navbar bg-base-200 border-b-1 py-0 min-h-10">
    <div class="container mx-auto">
      <div>
        <a class="font-semibold text-lg">
          <router-link class="navbar-brand" to="/">UMDB</router-link>
        </a>
      </div>
      <div class="w-2"></div>
      <div>
        <ul class="menu menu-horizontal">
          <li>
            <router-link class="btn btn-sm btn-ghost font-normal" :to="{ name: 'persons-index' }"
              >Persons</router-link
            >
          </li>
        </ul>
      </div>
      <div class="flex-1"></div>
      <div>
        <theme-controller />
      </div>
    </div>
  </div>
</template>
