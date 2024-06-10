<script setup>
import DataTablesCore from 'datatables.net-bs5'
import DataTable from 'datatables.net-vue3'
import * as luxon from 'luxon'
import { useRouter } from 'vue-router'

window.luxon = luxon

DataTable.use(DataTablesCore)

const router = useRouter()

const url = '/api/persons'
const columns = [
  { data: 'id', title: 'ID' },
  { data: 'primary_name.use', title: 'Name usage' },
  { data: 'primary_name.family', title: 'Family name' },
  { data: 'primary_name.given', title: 'Given name' },
  { data: 'primary_name.middle', title: 'Middle name' },
  { data: 'primary_name.patronymic', title: 'Patronymic name', visible: false },
  { data: 'primary_name.prefix', title: 'Name prefix', visible: false },
  { data: 'primary_name.suffix', title: 'Name suffix', visible: false },
  { data: 'sex', title: 'Sex' },
  {
    data: 'birth_date',
    title: 'Birth date',
    render: DataTablesCore.render.date('dd.MM.yyyy')
  },
  {
    data: 'death_date',
    title: 'Death date',
    render: DataTablesCore.render.date('dd.MM.yyyy'),
    visible: false
  },
  {
    data: 'death_date_estimated_indicator',
    title: 'Death date estimated?',
    visible: false
  },
  { data: 'death_indicator', title: 'Dead' },
  {
    data: 'id',
    render: '#action',
    orderable: false
  }
]

const ajax = {
  url,
  dataSrc: ''
}

const options = {
  layout: {
    topStart: {}
  },
  searching: false
}
</script>

<template>
  <data-table class="table" :columns="columns" :ajax="ajax" :options="options">
    <template #action="props">
      <button
        class="btn btn-sm btn-link"
        @click="router.push({ name: 'person-show', params: { id: props.cellData } })"
      >
        <i class="fa-solid fa-right-to-bracket" />
      </button>
    </template>
  </data-table>
</template>

<style>
@import 'bootstrap';
@import 'datatables.net-bs5';
</style>
