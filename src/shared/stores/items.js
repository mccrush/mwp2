import { defineStore } from 'pinia'
import { addItem, getItems, deleteItem, updateItem } from '../services/database'

export const useItemsStore = defineStore('items', {
  state: () => {
    return {
      links: [],
      passwords: [],
      contacts: [],
      tasks: [],
      loadingItemData: false
    }
  },

  actions: {

    async getItems({ projectId, table }) {
      const LSKey = 'mwp-' + table + '-' + projectId
      //console.log('getItems LSKey = ', LSKey);

      if (LSKey in localStorage) {
        this[table] = JSON.parse(localStorage.getItem(LSKey))
        //console.log('LS this[table] = ', this[table]);

      } else {
        this.loadingItemData = true
        const select = '*'
        const condition = `project_id.eq.${projectId}`
        const res = await getItems({ table, select, condition })
        if (res) {
          this[table] = res
          //console.log('Fetch this[table] = ', this[table]);
          localStorage.setItem('mwp-' + table + '-' + projectId, JSON.stringify(this[table]))
        }
        this.loadingItemData = false
      }
    },

    async addItem({ item, table }) {
      this.loadingItemData = true
      const res = await addItem({ table, item })
      if (res) {
        this[table].push(res)
        localStorage.setItem('mwp-' + table + '-' + item.project_id, JSON.stringify(this[table]))
      }
      this.loadingItemData = false
    },
  }
})