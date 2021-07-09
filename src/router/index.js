import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Ballot from '@/views/Ballot.vue';
import About from '@/views/static/About.vue';
import Contact from '@/views/static/Contact.vue';
import NotFound from '@/views/static/Error/NotFound.vue';

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
    },
    {
        path: '/about',
        name: "About",
        component: About
    },
    {
        path: '/contact',
        name: "Contact",
        component: Contact
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    }
    
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;