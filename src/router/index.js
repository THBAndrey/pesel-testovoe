import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () =>
      import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
  },
  {
    path: '/notfound',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  },
  {
    path: '/:breedName',
    name: 'Breed',
    component: () =>
      import(/* webpackChunkName: "breed" */ '../views/Breed.vue')
  },
  {
    path: '*',
    name: 'NotFound',
    component: () =>
      import(/* webpackChunkName: "not-found" */ '../views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
