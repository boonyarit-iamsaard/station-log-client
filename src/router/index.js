import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

import Home from '@/views/HomePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage'),
  },
  {
    path: '/admin/signup',
    component: () => import('@/views/SignupPage'),
  },
  {
    path: '/flights',
    component: () => import('@/views/FlightsPage'),
  },
  {
    path: '/spares',
    component: () => import('@/views/SparesPage'),
    children: [
      {
        path: '',
        name: 'spares',
        component: () => import('@/components/spares/SparesList'),
      },
      {
        path: 'create',
        name: 'sparesCreate',
        component: () => import('@/components/spares/SparesForm'),
      },
      {
        path: 'edit/:id',
        name: 'sparesEdit',
        component: () => import('@/components/spares/SparesForm'),
      },
    ],
    beforeEnter(to, from, next) {
      if (store.state.token) {
        next();
      } else {
        next('/login');
      }
    },
  },
  {
    path: '/handling',
    component: () => import('@/views/HandlingPage'),
    children: [
      {
        path: '',
        name: 'handling',
        component: () => import('@/components/handling/HandlingList'),
      },
      {
        path: 'create',
        component: () => import('@/components/handling/HandlingForm'),
      },
      {
        path: 'edit/:id',
        component: () => import('@/components/handling/HandlingForm'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
