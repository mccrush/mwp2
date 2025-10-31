import { defineStore } from 'pinia'
import { addItem, getItems } from '../services/database'

export const useProjectsStore = defineStore('projects', {
    state: () => {
        return {
            projects: [],
            loadingProjectsData: false
        }
    },

    actions: {
        async getProjects(userId) {
            await getItems('projects', userId, '*').then(data => {
                this.projects = data
            }).catch(error => {
                console.error('Error getProjects():', error)
            })
        },

        // async addProject(project, userId) {
        //     await addItem('projects', project).then(() => {
        //         this.getProjects(userId)
        //     }).catch(error => {
        //         console.error('Error addProject():', error)
        //     })

        // },

        async addProject({ item }) {
            this.loadingProjectsData = true
            const table = 'projects'
            const res = await addItem({ table, item })
            if (res) {
                this.projects.push(item)
            }
            this.loadingProjectsData = false
        }
    },

    getters: {
        projectsLength: (state) => state.projects.length
    }
})