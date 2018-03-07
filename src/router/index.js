import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/components/Home'
import Services from '@/components/Services'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/services',
      name: 'Services',
      component: Services
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
