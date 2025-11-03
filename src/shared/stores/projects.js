import { defineStore } from 'pinia'
import { addItem, getItems, deleteItem } from '../services/database'

export const useProjectsStore = defineStore('projects', {
    state: () => {
        return {
            table: 'projects',
            projects: [],
            loadingProjectsData: false
        }
    },

    actions: {
        async getProjects({ userId }) {
            this.loadingProjectsData = true
            const select = '*'
            const res = await getItems({ table: this.table, userId, select })
            if (res) {
                this.projects = res
            }
            this.loadingProjectsData = false
        },

        async addProject({ item }) {
            this.loadingProjectsData = true
            const res = await addItem({ table: this.table, item })
            if (res) {
                this.projects.push(item)
            }
            this.loadingProjectsData = false
        },

        async deleteProject({ projectId }) {
            this.loadingProjectsData = true
            const res = await deleteItem({ table: this.table, id: projectId })
            if (res) {
                const index = this.projects.findIndex(i => i.id === projectId)
                if (index !== -1) this.projects.splice(index, 1)
            }
            this.loadingProjectsData = false
        }
    },

    getters: {
        projectsLength: (state) => state.projects.length
    }
})