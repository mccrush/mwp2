import { defineStore } from 'pinia'
import { addItem, getItems } from '../services/database'

export const useProjectsStore = defineStore('projects', {
    state: () => ({
        projects: [],
    }),

    actions: {
        fetchProjects() {
            // Simulate fetching projects from an API or database
            this.projects = [
                { id: 1, name: 'Project Alpha' },
                { id: 2, name: 'Project Beta' },
                { id: 3, name: 'Project Gamma' },
            ]
        },

        async getProjects(userId) {
            await getItems('projects', userId, '*').then(data => {
                this.projects = data
            }).catch(error => {
                console.error('Error getProjects():', error)
            })
        },

        async addProject(project, userId) {
            //this.projects.push(project)
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