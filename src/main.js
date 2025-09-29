import './scss/styles.scss'

//import { supabase } from './supabase/supabaseClient'

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'

const pinia = createPinia();

let app

if (!app) {
    app = createApp(App).use(pinia).mount('#app')
}
console.log('main.js: App is run')