import Vue from 'vue'
import VueRouter from 'vue-router'

import { routes } from './routes'

Vue.use(VueRouter)

let router = new VueRouter({
  mode: 'history',
  base: process.env.development ? '' : '/roots',
  routes
})

export default router
