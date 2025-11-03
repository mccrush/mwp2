import './scss/styles.scss'
import 'bs-dark-theme'

import { supabase } from './supabase/supabaseClient'
import { createApp } from 'vue'
import { createPinia } from 'pinia';

import { useCurrentUserStore } from './shared/stores/currentUser';
import App from './App.vue'

const pinia = createPinia();
let app

if (!app) {
    app = createApp(App).use(pinia).mount('#app')
}
console.log('main.js: App is run')

const currentUserStore = useCurrentUserStore()


const { data } = supabase.auth.onAuthStateChange((event, session) => {

    if (event === 'SIGNED_IN') {
        const { id, email } = session.user
        //console.log('main.js User signed in: id=', id, ' email=', email)
        currentUserStore.setCurrentUser({ id, email })
    } else if (event === 'SIGNED_OUT') {
        currentUserStore.setCurrentUser({ id: null, email: null })
    }
})