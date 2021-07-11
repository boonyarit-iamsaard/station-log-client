import Vue from 'vue';
import VueRouter from 'vue-router';

import store from '@/store';

import Home from '@/views/HomePage';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
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
    path: '/disinfection',
    component: () => import('@/views/DisinfectionPage'),
    children: [
      {
        path: '',
        name: 'disinfection',
        component: () => import('@/components/disinfection/DisinfectionList'),
      },
      {
        path: 'create',
        name: 'disinfection-create',
        component: () => import('@/components/disinfection/DisinfectionForm'),
      },
      {
        path: 'edit/:id',
        name: 'disinfection-edit',
        component: () => import('@/components/disinfection/DisinfectionForm'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/flights',
    component: () => import('@/views/FlightsPage'),
    children: [
      {
        path: '',
        name: 'flight',
        component: () => import('@/components/flights/FlightsList'),
      },
      {
        path: 'create',
        name: 'flight-create',
        component: () => import('@/components/flights/FlightForm'),
      },
      {
        path: 'edit/:id',
        name: 'flight-edit',
        component: () => import('@/components/flights/FlightForm'),
      },
    ],
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/manpower',
    component: () => import('@/views/ManpowerPage'),
    children: [
      {
        path: '',
        name: 'manpower',
        component: () => import('@/components/manpower/ManpowerList'),
      },
      {
        path: 'create',
        name: 'manpower-create',
        component: () => import('@/components/manpower/ManpowerForm'),
      },
      {
        path: 'edit/:id',
        name: 'manpower-edit',
        component: () => import('@/components/manpower/ManpowerForm'),
      },
    ],
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
        name: 'spares-create',
        component: () => import('@/components/spares/SparesForm'),
      },
      {
        path: 'edit/:id',
        name: 'spares-edit',
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
    if (store.getters['auth/getIsAuthenticated']) {
      next();
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
