import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/auth/login",
            name: "login",
            component: () => import("../views/AuthLogin.vue"),
        },
        {
            path: "/auth/register",
            name: "register",
            component: () => import("../views/AuthRegister.vue"),
        },
        {
            path: "/auth/logout",
            name: "logout",
            component: () => import("../views/AuthLogout.vue"),
        },
        {
            path: "/",
            name: "index",
            component: () => import("../views/Index.vue"),
        },
        {
            path: "/profile/:id",
            name: "profile",
            component: () => import("../views/Profile.vue"),
            props: true,
        },
    ]
})

export default router