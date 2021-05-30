import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/pages/Home'
import OurServices from '../components/pages/OurServices'
import FindTreatement from '../components/pages/FindTreatement'
import Panels from '../components/pages/Panels'
import LogIn from "../components/auth/LogIn";
import SignUp from "../components/auth/SignUp";
import Admin from "../components/pages/admin/Admin";
import Account from "../components/pages/admin/pages/Accounts";
import Setting from "../components/pages/admin/pages/Settings";
import Service from "../components/pages/admin/pages/Services";
import AdminHome from "../components/pages/admin/pages/Home";

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
    },
    {
      path: '/admin',
      name: "admin",
      component: Admin,
      children: [
        {path: "", component: AdminHome},
        {path: "services", component: Service},
        {path: "settings", component: Setting},
        {path: "accounts", component: Account},
      ]
      
    }
  ]
})
