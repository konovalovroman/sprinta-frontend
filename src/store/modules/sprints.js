import sprintsAPI from '@/api/sprints';
import { HttpStatus } from '@/helpers';

const state = {
    sprints: [],
};

const getters = {};

const mutations = {
    SET_SPRINTS(state, value) {
        state.sprints = value;
    },
};

const actions = {
    async getSprintsForProject({ commit }, projectId) {
        const sprintsResponse = await sprintsAPI.getSprintsForProject(projectId);

        if (sprintsResponse.status === HttpStatus.OK) {
            commit('SET_SPRINTS', sprintsResponse.data);
        }

        return;
    },
    clearSprints({ commit }) {
        commit('SET_SPRINTS', []);
    },
};

export default {
    state,
    getters,
    mutations,
    actions,
};
