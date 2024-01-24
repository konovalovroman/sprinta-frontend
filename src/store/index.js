import { createStore } from 'vuex';
import auth from './modules/auth';
import projects from './modules/projects';
import sprints from './modules/sprints';

export default createStore({
    modules: {
        auth,
        projects,
        sprints,
    },
});
