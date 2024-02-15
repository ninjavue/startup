import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../views/DashboardView.vue')
  },
  {
    path: '/ill-list',
    name: 'ill-list',
    component: () => import(/* webpackChunkName: "ill-list" */ '../views/IllListView.vue')
  },
  {
    path: '/regions',
    name: 'regions',
    component: () => import(/* webpackChunkName: "regions" */ '../views/RegionView.vue')
  },
  {
    path: '/region/:title/:id',
    name: 'region/:title/:id',
    component: () => import(/* webpackChunkName: "region" */ '../views/DistrictView.vue'),

  },
  {
    path: '/region/:link/:region_id/:link/:id',
    name: '/region/:link/:region_id/:link/:id',
    component: () => import(/* webpackChunkName: "region" */ '../views/addPatientsView.vue')
  },
  {
    path: '/search-patient',
    name: 'search-patient',
    component: () => import(/* webpackChunkName: "search-patient" */ '../views/SearchView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
