import { createRouter, createWebHistory } from 'vue-router'
import { useNav } from '@/stores/nav'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView/HomeView.vue')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    const storeNav = useNav()
    if (to.hash) {
      return {
        top: storeNav.navHeight + 1,
        el: to.hash,
        behavior: 'smooth'
      }
    }
  }
})

export default router
