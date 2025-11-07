import { defineStore } from 'pinia'
import { addItem, getItems, deleteItem, updateItem } from '../services/database'

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
            const condition = `user_id.eq.${userId}`
            const res = await getItems({ table: this.table, select, condition })
            if (res) {
                this.projects = res
            }
            this.loadingProjectsData = false
        },

        async addProject({ project }) {
            this.loadingProjectsData = true
            const res = await addItem({ table: this.table, item: project })
            if (res) {
                this.projects.push(res)
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
        },

        async updateProject({ project }) {
            this.loadingProjectsData = true
            const res = await updateItem({ table: this.table, item: project })
            if (res) {
                const index = this.projects.findIndex(i => i.id === project.id)
                if (index !== -1) this.projects[index] = res
            }
            this.loadingProjectsData = false
        }
    },

    getters: {
        projectsLength: (state) => state.projects.length
    }
})