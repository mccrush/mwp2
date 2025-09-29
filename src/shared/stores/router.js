import { defineStore } from 'pinia';

export const useRouterStore = defineStore('router', {
    // 1. СОСТОЯНИЕ: Храним имя активного компонента
    state: () => ({
        activeView: localStorage.getItem('mw-viewPage') || 'HomePage' // Имя компонента по умолчанию
    }),

    // 2. ДЕЙСТВИЯ (ACTIONS): Метод для смены представления
    actions: {
        /**
         * Устанавливает новое активное представление.
         * @param {string} viewPage - Имя компонента, который нужно показать.
         */
        setView(viewPage) {
            this.activeView = viewPage;
            localStorage.setItem('mw-viewPage', viewPage)
        }
    },
});