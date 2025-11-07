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
      const LSKey = 'links-' + projectId

      if (LSKey in localStorage) {
        this.links = JSON.parse(localStorage.getItem(LSKey))
      } else {
        this.loadingLinksData = true
        const select = '*'
        const condition = `project_id.eq.${projectId}`
        const res = await getItems({ table: this.table, select, condition })
        if (res) {
          this.links = res
          localStorage.setItem('links-' + projectId, JSON.stringify(this.links))
        }
        this.loadingLinksData = false
      }
    },

    async addLinks({ link }) {
      this.loadingLinksData = true
      const res = await addItem({ table: this.table, item: link })
      if (res) {
        this.links.push(res)
        localStorage.setItem('links-' + link.project_id, JSON.stringify(this.links))
      }
      this.loadingLinksData = false
    },
  }
})