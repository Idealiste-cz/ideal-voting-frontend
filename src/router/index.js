import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Ballot from '@/views/Ballot.vue';

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home,
    },
    {
        path: '/ballot/:id',
        name: "Ballot",
        component: Ballot
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;