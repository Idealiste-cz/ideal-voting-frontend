import { createWebHistory, createRouter } from 'vue-router';
import Home from '@/views/Home.vue';
import Election from '@/views/Admin/Election.vue';
import About from '@/views/static/About.vue';
import Contact from '@/views/static/Contact.vue';
import NotFound from '@/views/static/Error/NotFound.vue';
import RequestFailed from '@/views/static/Error/RequestFailed.vue';

const routes = [
    {
        path: '/',
        name: "Home",
        component: Home,
    },
    {
        path: '/admin/election/:slug/:token',
        name: "Election",
        component: Election
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
        path: '/request-failed',
        name: "RequestFailed",
        component: RequestFailed
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