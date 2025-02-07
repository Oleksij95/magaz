/* eslint-disable */

import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductView from '../views/ProductView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import store from '../store/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView,
    meta: { requiresAuth: true }
  },
  {
    path: '/products/:id',
    name: 'product',
    component: ProductView,
    meta: { requiresAuth: true }
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView,
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next)=>{
  store.dispatch('checkAuth').then((res) => {
    const currentUser = res || null
    const requireAuth = to.matched.some(record => record.meta.requiresAuth);
    if(requireAuth && !currentUser){
      next({name:'home'})
    }
    
    if (currentUser && to.path === '/') {
      next({name:'products'})
    }

    next();
  });
});


export default router
