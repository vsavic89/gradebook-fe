import Vue from 'vue'
import Router from 'vue-router'
import AppLogin from './components/AppLogin'
import AppRegister from './components/AppRegister'
import AppGradebooks from './components/AppGradebooks'
import AppProfessors from './components/AppProfessors'
import AppSingleProfessor from './components/AppSingleProfessor'
import AppAddGradebook from './components/AppAddGradebook'
import AppAddProfessor from './components/AppAddProfessor'
import MyGradebook from './components/MyGradebook'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/gradebooks',
      name:'gradebooks',
      component: AppGradebooks
    },
    {
      path:'/login',
      name:'login',
      component: AppLogin
    },
    {
      path: '/register',
      name: 'register',
      component: AppRegister
    },
    {
      path: '/professors',
      name: 'professors',
      component: AppProfessors
    },   
    {
      path: '/gradebooks/create',
      name: 'gradebooks-create',
      component: AppAddGradebook
    }
    ,
    {
      path: '/professors/create',
      name: 'professors-create',
      component: AppAddProfessor
    },
    {
      path: '/professors/:id',
      name: 'single-professor',
      component: AppSingleProfessor
    },
    {
      path: '/my-gradebook',
      name: 'my-gradebook',
      component: MyGradebook
    }
  ]
})
