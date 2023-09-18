import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

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
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
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
