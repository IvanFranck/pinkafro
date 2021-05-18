import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home'
import OurServices from '../components/pages/OurServices'
import FindTreatement from '../components/pages/FindTreatement'
import Panels from '../components/pages/Panels'
import LogIn from "../components/auth/LogIn";
import SignUp from "../components/auth/SignUp";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/panels',
      name: 'panels',
      component: Panels,
      children: [
        { path: 'service-provider', component: LogIn},
        { path: 'customer', component: LogIn},
        { path: 'service-provider/sign-up', component: SignUp},
        { path: 'customer/sign-up', component: SignUp},
      ]
    },
    {
      path: '/find-treatement',
      name: 'FindTreatement',
      component: FindTreatement
    },
    {
      path: '/our-services',
      name: 'OurServices',
      component: OurServices
    }
  ]
})
