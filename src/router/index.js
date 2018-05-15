import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Transaction from '@/components/Transaction'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
