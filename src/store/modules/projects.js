import projectsAPI from '@/api/projects';

const state = {
    userProjects: [],
};

const getters = {};

const mutations = {
    SET_USER_PROJECTS(state, value) {
        state.userProjects = value;
    },
};

const actions = {
    async getAllUserProjects({ commit }) {
        const userProjectsResponse = await projectsAPI.getAllUserProjects();
    
        if (userProjectsResponse.status === 200) {
            return commit('SET_USER_PROJECTS', userProjectsResponse.data);
        }
        
        return;
    },
    async createProject({ commit, state }, payload) {
        const createProjectResponse = await projectsAPI.createProject(payload);

        if (createProjectResponse.status === 201) {
            commit('SET_USER_PROJECTS', [...state.userProjects, createProjectResponse.data]);
        }

        return;
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
};
