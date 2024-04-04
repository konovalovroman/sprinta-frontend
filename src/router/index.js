import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/HomeView'),
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => import('@/views/SignUpView'),
    },
    {
        path: '/workspace',
        name: 'workspace',
        component: () => import('@/views/WorkspaceView'),
    },
    {
        path: '/projects/:id',
        name: 'project',
        component: () => import('@/views/ProjectView'),
        props: true,
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView'),
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    const { isAuthenticated } = store.state.auth;

    if (!isAuthenticated && (to.path === '/' || to.path === '/signup')) {
        return next();
    }
  
    if (isAuthenticated && (to.path === '/' || to.path === '/signup')) {
        return next('/workspace');
    }

    if (!isAuthenticated) {
        return next('/');
    }
  
    return next();
});



export default router;
