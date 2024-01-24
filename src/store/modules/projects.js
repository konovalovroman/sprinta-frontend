import projectsAPI from '@/api/projects';
import { HttpStatus } from '@/helpers';

const state = {
    userProjects: [],
    selectedProject: {},
};

const getters = {};

const mutations = {
    SET_USER_PROJECTS(state, value) {
        state.userProjects = value;
    },
    SET_SELECTED_PROJECT(state, value) {
        state.selectedProject = value;
    },
};

const actions = {
    async getAllUserProjects({ commit }) {
        const userProjectsResponse = await projectsAPI.getAllUserProjects();
    
        if (userProjectsResponse.status === HttpStatus.OK) {
            return commit('SET_USER_PROJECTS', userProjectsResponse.data);
        }
        
        return;
    },
    async createProject({ commit, state }, payload) {
        const createProjectResponse = await projectsAPI.createProject(payload);

        if (createProjectResponse.status === HttpStatus.CREATED) {
            commit('SET_USER_PROJECTS', [...state.userProjects, createProjectResponse.data]);
        }

        return;
    },
    async getOneProject({ commit }, id) {
        const projectResponse = await projectsAPI.getProjectById(id);

        if (projectResponse.status === HttpStatus.OK) {
            commit('SET_SELECTED_PROJECT', projectResponse.data);
        }

        return;
    },
    clearSelectedProject({ commit }) {
        commit('SET_SELECTED_PROJECT', {});
    },
};


export default {
    state,
    getters,
    mutations,
    actions,
};
