<script setup lang="ts">
import { DateTime } from 'luxon'

const props = defineProps({
  context: Object
})

const format = 'dd.MM.yyyy'
const iso = props.context._value
const dt = iso === '' ? null : DateTime.fromISO(iso)
const localized = dt.toFormat(format)

function handleInput(e) {
  const localized = e.target.value
  const dt = DateTime.fromFormat(localized, format)
  const iso = dt.toFormat('yyyy-MM-dd')
  props.context.node.input(iso)
}
</script>

<template>
  <input :class="props.context.classes.input" :value="localized" @input="handleInput" />
</template>
