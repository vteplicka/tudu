import { defineStore } from 'pinia'

export const useFilterStore = defineStore('filters', {
  state: () => ({ showActive: true, showDone: true }),

  actions: {
    toggleActive () {
      this.showActive = !this.showActive
    },

    toggleDone () {
      this.showDone = !this.showDone
    }
  }
})
