import authAPI from '@/api/auth';
import usersAPI from '@/api/users';

const state = {
    isAuthenticated: false,
    user: {},
};

const getters = {};

const mutations = {
    SET_IS_AUTHENTICATED(state, value) {
        state.isAuthenticated = value;
    },
    SET_USER(state, value) {
        state.user = value;
    },
};

const actions = {
    async signIn({ dispatch }, payload) {
        const signInResponse = await authAPI.signIn(payload);

        if (signInResponse.status !== 200) {
            return dispatch('clearAuthentication');
        }

        const { accessToken } = signInResponse.data;
        localStorage.setItem('accessToken', accessToken);

        const currentUserResponse = await usersAPI.getCurrentUser();

        if (currentUserResponse.status !== 200) {
            return dispatch('clearAuthentication');
        }

        return dispatch('setAuthentication', currentUserResponse.data);
    },
    async signUp({ dispatch }, payload) {
        const signUpResponse = await authAPI.signUp(payload);

        if (signUpResponse.status !== 200) {
            return dispatch('clearAuthentication');
        }

        const { accessToken } = signUpResponse.data;
        localStorage.setItem('accessToken', accessToken);

        const currentUserResponse = await usersAPI.getCurrentUser();

        if (currentUserResponse.status !== 200) {
            return dispatch('clearAuthentication');
        }

        return dispatch('setAuthentication', currentUserResponse.data);
    },
    async logout({ dispatch }) {
        const logoutResponse = await authAPI.logout();

        if (logoutResponse.status === 204) {
            dispatch('clearAuthentication');
        }

        return;
    },
    async refreshTokens({ dispatch }) {
        const refreshTokensResponse = await authAPI.refreshTokens();

        if (refreshTokensResponse.status !== 200) {
            dispatch('clearAuthentication');
            return false;
        }

        const { accessToken } = refreshTokensResponse.data;
        localStorage.setItem('accessToken', accessToken);
        return true;
    },
    async restoreAuth({ commit, dispatch }) {
        const accessToken = localStorage.getItem('accessToken');
        
        if (!accessToken) {
            return dispatch('clearAuthentication');
        }

        const currentUserResponse = await usersAPI.getCurrentUser();

        if (currentUserResponse.status === 200) {
            return dispatch('setAuthentication', currentUserResponse.data);
        }

        const isTokensUpdated = await dispatch('refreshTokens');

        if (!isTokensUpdated) {
            return dispatch('clearAuthentication');
        }

        const refreshedCurrentUserResponse = await usersAPI.getCurrentUser();
        return dispatch('setAuthentication', refreshedCurrentUserResponse.data);
    },
    setAuthentication({ commit }, payload) {
        commit('SET_IS_AUTHENTICATED', true);
        commit('SET_USER', payload);
        return;
    },
    clearAuthentication({ commit }) {
        localStorage.removeItem('accessToken');
        commit('SET_IS_AUTHENTICATED', false);
        commit('SET_USER', {});
        return;
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
