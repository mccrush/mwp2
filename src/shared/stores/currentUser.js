import { defineStore } from 'pinia'

export const useCurrentUserStore = defineStore('currentUser', {
    state: () => ({
        userId: null,
        userEmail: null,
    }),

    actions: {
        setCurrentUser({ id, email }) {
            this.userId = id
            this.userEmail = email
        }
    },

    getters: {
        isLoggedIn: (state) => !!state.userId,
        currentUserId: (state) => state.userId || null,
        currentUserEmail: (state) => state.userEmail || null
    }
})