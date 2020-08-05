import Home from '../components/Home'
import Login from '../components/Login'
import Profil from '../components/Profil'
import Register from '../components/Register'
import Posts from '../components/Posts'
import AddPost from '../components/AddPost'
import DetailsPost from '../components/DetailsPost'
import VueRouter from "vue-router";
import Vue from "vue";
import Post from "../components/Post"
import profilUpdate from "../components/updateProfile"
Vue.use(VueRouter)
const routes = [
    {
        path: "*",
        redirect : {name : "Home"}
    },
        {
         path: '/home',
         name: 'Home',
         component: Home,
         
         children: [

            {
                path: '/profil',
                name: 'Profil',
                component: Profil 
               },
               {
                path: '/posts',
                name: 'Posts',
                component: Posts 
               },
               {
                path: '/post/add',
                name: 'AddPost',
                component: AddPost 
               },
               {
                path: '/post/detail/:slug',
                name: 'DetailsPost',
                component: DetailsPost
               },
               {
                   path: '/post/:id',
                   name:    'postDetails',
                   component: Post
               },
               {
                path: '/profil/update',
                name:    'profilUpdate',
                component: profilUpdate
            }
    

            
         ]
        },
        {
            path: '/login',
            name: 'Login',
            component: Login 
        },
        {
            path: '/register',
            name: 'Register',
            component: Register 
           }
    ]


    const router = new VueRouter({ // register routes into our router
        routes: routes,
        mode: 'history'
    });

    export default router


