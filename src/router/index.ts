import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

// import Purchase from '../views/Purchase.vue'
import Divination from '../views/Divination.vue'
import Picture from '../views/Picture.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  // {
  //   path: '/',
  //   name: 'Purchase',
  //   component: Purchase,
  // },
  {
    path: '/divination',
    name: 'Divination',
    component: Divination,
  },
  {
    path: '/',
    name: 'Picture',
    component: Picture
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
