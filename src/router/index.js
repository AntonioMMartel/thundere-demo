import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


import CountryViewer from "../views/CountryViewer.vue";
import Login from "../views/Login.vue";
import Registration from "../views/Registration.vue";
import Logout from "../views/Logout.vue";
import History from "../views/History.vue";
import Admin from "../views/Admin.vue";
import VueTest from "../views/VueTest.vue";
import NotFound from "../views/NotFound.vue";
import SearchResults from "../views/SearchResults.vue";
import Bookmarks from "../views/Bookmarks.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    }, 
        { path: "/bookmarks",
    component: Bookmarks },
    { path: "/login", component: Login },
    { path: "/search/:input", component: SearchResults, props: true },
    { path: "/search", component: SearchResults, props: true },
    { path: "/country/:country", component: CountryViewer, props: true },
    { path: "/register", component: Registration },
    { path: "/logout", component: Logout },
    { path: "/history", component: History },
    { path: "/admin", component: Admin },
    { path: "/test", component: VueTest },
    { path: "/not/found", component: NotFound },
    
  
  ]
})

export default router
