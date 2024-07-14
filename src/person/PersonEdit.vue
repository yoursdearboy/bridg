<script setup lang="ts">
import { createInput } from '@formkit/vue'
import DateInput from '@/DateInput.vue'
import useStore from './store'

const store = useStore()
const person = store.person

const dateInput = createInput(DateInput, {
  family: ['text']
})

const handleSubmit = (data) => {
  console.log(data)
}
</script>

<template>
  <h1>{{ person }}</h1>
  <h1>Edit person {{ $route.params.id }}</h1>
  <form-kit type="form" @submit="handleSubmit" :value="person">
    <form-kit :type="dateInput" label="Birth date" name="birth_date" />
    <form-kit
      type="select"
      label="Sex"
      name="sex"
      :options="{ M: 'Male', F: 'Female', U: 'Unknown' }"
    />
  </form-kit>
</template>
