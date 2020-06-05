import Vue from 'vue'
import VueRouter from 'vue-router'

import MainPage from './../pages/MainPage.vue'
import NotePage from './../pages/NotePage.vue'
import NotFoundPage from './../pages/NotFoundPage.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: MainPage
  },
  {
    name: 'note',
    path: '/:id',
    component: NotePage
  },
  {
    name: 'notFound',
    path: '*',
    component: NotFoundPage
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
