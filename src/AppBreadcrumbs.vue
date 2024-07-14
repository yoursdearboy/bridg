<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const toBreadcrumbs = (route: any) =>
  route.matched
    .filter((m: any) => m.meta.breadcrumb)
    .map((b: any) => {
      const path = b.path.replace(/:([a-zA-Z]+)/g, (m, i) => route.params[i])
      const text =
        typeof b.meta.breadcrumb === 'function' ? b.meta.breadcrumb(b) : b.meta.breadcrumb
      return { path, text }
    })

const route = useRoute()
const breadcrumbs = computed(() => toBreadcrumbs(route))
</script>

<template>
  <div class="breadcrumbs text-sm">
    <ul>
      <li v-for="(b, i) in breadcrumbs" :key="i">
        <router-link :to="{ path: b.path }">{{ b.text }}</router-link>
      </li>
    </ul>
  </div>
</template>
