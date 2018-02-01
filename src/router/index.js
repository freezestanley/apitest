import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
<<<<<<< HEAD
import Uhello from '@/components/demo1'
=======
>>>>>>> a4bf0cf3d8b808c86993c918d3cc5e860a3a1f60

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
<<<<<<< HEAD
    },
    {
      path: '/aa',
      name: 'Uhello',
      component: Uhello
=======
>>>>>>> a4bf0cf3d8b808c86993c918d3cc5e860a3a1f60
    }
  ]
})
