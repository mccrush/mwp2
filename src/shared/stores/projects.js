import { defineStore } from 'pinia'
import { addItem, getItems } from '../services/database'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
    }),

    actions: {
        async getProjects(userId) {
            await getItems('projects', userId, '*').then(data => {
                this.projects = data
            }).catch(error => {
                console.error('Error getProjects():', error)
            })
        },

        async addProject(project, userId) {
            await addItem('projects', project).then(() => {
                this.getProjects(userId)
            }).catch(error => {
                console.error('Error addProject():', error)
            })

        }
    },

    getters: {
        projectsLength: (state) => state.projects.length
    }
})