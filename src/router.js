import Vue from 'vue'
import Router from 'vue-router'
import AppLogin from './components/AppLogin'
import AppRegister from './components/AppRegister'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/login',
      name:'login',
      component: AppLogin
    },
    {
      path: '/register',
      name: 'register',
      component: AppRegister
    }
  ]
})
