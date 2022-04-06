import Vue from 'vue';
import Router from 'vue-router';
// import About from '../views/About.vue';
import Home from '../views/Home.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue'),
    },
	{
      path: '/animation/Simple',
      name: 'simple',
      component: () => import('../components/animation/Simple.vue'),
    },
    {
      path: '/animation/Business',
      name: 'business',
      component: () => import('../components/animation/Business'),
    },
    {
      path: '/animation/Heartwarming',
      name: 'heartwarming',
      component: () => import('../components/animation/Heartwarming.vue'),
    },
	{
      path: '/animation/Cool',
      name: 'cool',
      component: () => import('../components/animation/Cool'),
    },
    {
      path: '/animation/Dreamlike',
      name: 'dreamlike',
      component: () => import('../components/animation/Dreamlike'),
    },
    {
      path: '/animation/Festive',
      name: 'festive',
      component: () => import('../components/animation/Festive'),
    },
    {
      path: '/animation/Fresh',
      name: 'fresh',
      component: () => import('../components/animation/Fresh'),
    },
    {
      path: '/animation/Tech',
      name: 'tech',
      component: () => import('../components/animation/Tech'),
    },
    {
      path: '/animation/Vintage',
      name: 'vintage',
      component: () => import('../components/animation/Vintage'),
    },
  ],
});
