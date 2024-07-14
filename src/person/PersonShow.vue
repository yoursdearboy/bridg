<template>
  <h1>Person {{ $route.params.id }}</h1>
  <router-link :to="{ name: 'person-edit', params: { id: $route.params.id } }">Edit</router-link>
</template>
