import Vue from 'vue'
import App from './components/App.vue'
import { sync } from 'vuex-router-sync'
import store from './store'
import router from './router'

import 'normalize.css'
import './styles/index.css'

// eslint-disable-next-line
const unsync = sync(store, router)

// eslint-disable-next-line
new Vue ({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
