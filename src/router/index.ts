import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '@/router/auth/Login.vue'
import Signup from '@/router/auth/SignUp.vue'
import Dashboard from '@/router/Dashboard-Page.vue'
import TicketsPage from '@/views/tickets/TicketsPage.vue'
import { isAuthenticated } from '@/lib/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    { path: '/auth/login', name: 'Login', component: Login },
    { path: '/auth/signup', name: 'Signup', component: Signup },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      meta: { requiresAuth: true },
    },
    {
      path: '/tickets',
      name: 'Tickets',
      component: TicketsPage,
      meta: { requiresAuth: true },
    },
    { path: '/:pathMatch(.*)*', redirect: '/' },
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue'),
    // },
  ],
})

// Guard
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next({ path: "/auth/login" });
  } else {
    next();
  }
});

export default router
