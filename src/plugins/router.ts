import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/auth",
            name: "auth",
            component: () => import("../views/Auth.vue"),
        },
    ]
})

export default router