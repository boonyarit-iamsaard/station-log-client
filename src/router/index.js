import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '../store';

import Home from '@/views/HomePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'HomePage',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage'),
  },
  {
    path: '/admin/signup',
    component: () => import('@/views/SignupPage'),
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/flights',
    component: () => import('@/views/FlightsPage'),
    meta: {
      requiresAuth: true,
    },
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
    meta: {
      requiresAuth: true,
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
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('token') === null || store.state.user === null) {
      next('/login');
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
