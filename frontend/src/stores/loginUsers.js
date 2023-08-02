import { defineStore } from 'pinia';

export const useLoginUsersStore = defineStore('loginUsers', {
    state: () => ({
        token: '',
        error: null,
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken;
        },
        setError(error) {
            this.error = error;
        },
    },
});
