import { defineStore } from 'pinia';

export const useRouterStore = defineStore('router', {
    // 1. СОСТОЯНИЕ: Храним имя активного компонента
    state: () => ({
        activeView: localStorage.getItem('mwp-viewPage') || 'LoginPage' // Имя компонента по умолчанию
    }),

    // 2. ДЕЙСТВИЯ (ACTIONS): Метод для смены представления
    actions: {
        /**
         * Устанавливает новое активное представление.
         * @param {string} viewPage - Имя компонента, который нужно показать.
         */
        setView(viewPage) {
            this.activeView = viewPage;
            localStorage.setItem('mwp-viewPage', viewPage)
        }
    },
});