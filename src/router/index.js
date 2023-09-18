import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

//import Bookmarks from "../views/Bookmarks";
//import CountryViewer from "../views/CountryViewer";
//import Home from "../views/Home";
//import Login from "../views/Login";
//import Registration from "./views/Registration";
//import Logout from "../views/Logout";
//import History from "../views/History";
//import Admin from "../views/Admin";
//import VueTest from "../views/VueTest";
//import NotFound from "../views/NotFound";
//import SearchResults from "../views/SearchResults";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    /* 
        { path: "/bookmarks",
    component: Bookmarks },
    //{ path: "/", component: Home },
    { path: "/login", component: Login },
    { path: "/search/:input", component: SearchResults, props: true },
    { path: "/search", component: SearchResults, props: true },
    { path: "/country/:country", component: CountryViewer, props: true },
    { path: "/register", component: Registration },
    { path: "/logout", component: Logout },
    { path: "/history", component: History },
    { path: "/admin", component: Admin },
    { path: "/test", component: VueTest },
    { path: "*", component: NotFound },
    */
  
  ]
})

export default router
