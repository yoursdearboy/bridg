import { defineStore } from 'pinia'
import api from './api'

export default defineStore('counter', {
  state: (): { person: any } => ({
    person: null
  }),
  actions: {
    async fetchOne(id: any) {
      this.person = await api.get(id)
    }
  }
})
