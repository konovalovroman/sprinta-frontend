import store from '@/store';

export function registerTokensRefresh() {
    setInterval(() => {
        if (store.state.auth.isAuthenticated) {
            store.dispatch('refreshTokens');
        }
    }, 1000 * 60 * 9);
};
