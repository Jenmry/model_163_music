//引入vueRouter
import VueRouter from "vue-router"
import store from "@/store"
//引入相关的组件
import HomePage from "@/views/HomePage"
import MusicItem from "@/views/MusicItem";
import SearchPage from "@/views/SearchPage"
import UserInfo from "@/views/UserInfo"
import LoginPage from "@/views/LoginPage"

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: HomePage
        },
        {
            path: "/musicItem",
            component: MusicItem,
        },
        {
            path: "/search",
            component: SearchPage,
        },
        {
            path: "/login",
            component: LoginPage,
        },
        {
            path: "/userinfo",
            component: UserInfo,
            //独享路由守卫
            beforeEnter:(to,from,next)=>{
                console.log(store);
                if(store.state.isLogin){
                    next()
                }else{
                    console.log(router);
                    router.push("/login")
                }
            }
        }
    ]
})

//设置全局路由守卫
router.beforeEach((to,from,next)=>{
    if(to.path === "/login"){
        store.state.is_show_footer = false
    }
    next()
})

export default router