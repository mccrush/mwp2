import { defineStore } from 'pinia'
import { addItem, getItems, deleteItem, updateItem } from '../services/database'

export const useLinksStore = defineStore('links', {
  state: () => {
    return {
      table: 'links',
      links: [],
      loadingLinksData: false
    }
  },

  actions: {

    async getLinks({ projectId }) {
      this.loadingLinksData = true
      const select = '*'
      const condition = `project_id.eq.${projectId}`
      const res = await getItems({ table: this.table, select, condition })
      if (res) {
        this.links = res
      }
      this.loadingLinksData = false
    },

    async addLinks({ link }) {
      this.loadingLinksData = true
      const res = await addItem({ table: this.table, item: link })
      if (res) {
        this.links.push(res)
      }
      this.loadingLinksData = false
    },
  }
})