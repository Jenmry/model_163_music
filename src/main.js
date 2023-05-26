import Vue from "vue"
import App from "./App.vue"
import router from "@/router"
import VueRouter from "vue-router"
import plugins from "@/plugins"
import store from "@/store"
//引入全局图标
import "@/assets/style/iconfont/iconfont.css"
//引入vant组件
import { Swipe, SwipeItem, Lazyload, Popup } from "vant"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(VueRouter)
Vue.use(plugins)

Vue.use(Swipe)
Vue.use(SwipeItem)
Vue.use(Lazyload)
Vue.use(Popup)
Vue.use(ElementUI)

new Vue({
  render: h => h(App),
  router,
  store,
  beforeCreate() {
    Vue.prototype.$bus = this
  }
}).$mount('#app')
