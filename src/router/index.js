import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/client/HomeView.vue'
import AdminView from '../views/admin/AdminView.vue'

const routes = [
  {
    path: '/',
    redirect: '/client'
  },
  {
    path: '/admin',
    redirect: '/admin/dashboard'
  },
  {
    path: '/client',
    name: 'home',
    component: HomeView
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView,
    children: [
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "dashboard" */ '../views/admin/DashboardView.vue')
      },
      {
        path: 'ill-list',
        name: 'ill-list',
        component: () => import(/* webpackChunkName: "ill-list" */ '../views/admin/IllListView.vue')
      },
      {
        path: 'regions',
        name: 'regions',
        component: () => import(/* webpackChunkName: "regions" */ '../views/admin/RegionView.vue')
      },
      {
        path: 'region/:title/:id',
        name: 'region/:title/:id',
        component: () => import(/* webpackChunkName: "region" */ '../views/admin/DistrictView.vue'),

      },
      {
        path: 'region/:l/:region_id/district/:link/:id',
        name: 'region/:l/:region_id/district/:link/:id',
        component: () => import(/* webpackChunkName: "region" */ '../views/admin/addPatientsView.vue')
      },
      {
        path: 'search-patient',
        name: 'search-patient',
        component: () => import(/* webpackChunkName: "search-patient" */ '../views/admin/SearchView.vue')
      }
    ]
  },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
