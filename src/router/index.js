import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Uhello from '@/components/demo1'
import api from '@/api/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: api
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/aa',
      name: 'Uhello',
      component: Uhello
    },
    {
      path: '/api',
      name: 'api',
      component: api
    }
  ]
})
