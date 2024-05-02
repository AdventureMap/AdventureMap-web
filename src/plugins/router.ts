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
    ]
})

export default router