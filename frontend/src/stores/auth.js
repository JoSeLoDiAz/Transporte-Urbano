import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: '',
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken;
        },
    },
});