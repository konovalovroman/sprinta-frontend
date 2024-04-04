import authAPI from '@/api/auth';
import usersAPI from '@/api/users';
import { HttpStatus, clearAccessToken, getAccessToken, setAccessToken } from '@/helpers';

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

        if (signInResponse.status !== HttpStatus.OK) {
            return dispatch('clearAuthentication');
        }

        const { accessToken } = signInResponse.data;
        setAccessToken(accessToken);

        const currentUserResponse = await usersAPI.getCurrentUser();

        if (currentUserResponse.status !== HttpStatus.OK) {
            return dispatch('clearAuthentication');
        }

        return dispatch('setAuthentication', currentUserResponse.data);
    },
    async signUp({ dispatch }, payload) {
        const signUpResponse = await authAPI.signUp(payload);

        if (signUpResponse.status !== HttpStatus.OK) {
            return dispatch('clearAuthentication');
        }

        const { accessToken } = signUpResponse.data;
        

        const currentUserResponse = await usersAPI.getCurrentUser();

        if (currentUserResponse.status !== HttpStatus.OK) {
            return dispatch('clearAuthentication');
        }

        return dispatch('setAuthentication', currentUserResponse.data);
    },
    async logout({ dispatch }) {
        const logoutResponse = await authAPI.logout();

        if (logoutResponse.status === HttpStatus.NO_CONTENT) {
            dispatch('clearAuthentication');
        }

        return;
    },
    async refreshTokens({ dispatch }) {
        const refreshTokensResponse = await authAPI.refreshTokens();

        if (refreshTokensResponse.status !== HttpStatus.OK) {
            dispatch('clearAuthentication');
            return false;
        }

        const { accessToken } = refreshTokensResponse.data;
        setAccessToken(accessToken);
        return true;
    },
    async restoreAuth({ dispatch }) {
        const accessToken = getAccessToken();
        
        if (!accessToken) {
            return dispatch('clearAuthentication');
        }

        const currentUserResponse = await usersAPI.getCurrentUser();

        if (currentUserResponse.status === HttpStatus.OK) {
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
        clearAccessToken();
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
