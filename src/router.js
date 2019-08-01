import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login'
import Register from './components/Register'
import Gradebooks from './components/Gradebooks'
import Professors from './components/Professors'
import SingleProfessor from './components/SingleProfessor'
import AddGradebook from './components/AddGradebook'
import AddProfessor from './components/AddProfessor'
import MyGradebook from './components/MyGradebook'
import AddStudent from './components/AddStudent'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/gradebooks',
      name:'gradebooks',
      component: Gradebooks
    },
    {
      path:'/login',
      name:'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/professors',
      name: 'professors',
      component: Professors
    },   
    {
      path: '/gradebooks/create',
      name: 'gradebooks-create',
      component: AddGradebook
    }
    ,
    {
      path: '/professors/create',
      name: 'professors-create',
      component: AddProfessor
    },   
    {
      path: '/my-gradebook',
      name: 'my-gradebook',
      component: MyGradebook
    },
    {
      path: '/gradebooks/:id',
      name: 'gradebook-id',
      component: MyGradebook
    },
    {
      path: '/professors/:id',
      name: 'single-professor',
      component: SingleProfessor
    },
    {
      path: '/gradebooks/:id/students/create',
      name: 'students-create',
      component: AddStudent
    },
    {
      path: '/gradebooks/:id/edit',
      name: 'students-edit',
      component: AddStudent
    }
  ]
})
