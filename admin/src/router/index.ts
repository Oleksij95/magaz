import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'
import ProductView from '../views/ProductView.vue'
import CategoriesView from '../views/CategoriesView.vue'
import StatisticsView from '../views/StatisticsView.vue'
import store from '../store/index';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false }
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
  },
  {
    path: '/statistics',
    name: 'statistics',
    component: StatisticsView,
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
      next({name:'statistics'})
    }

    next();
  });
});


export default router
