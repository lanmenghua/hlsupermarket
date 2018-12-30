import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/style/public.css'
// 引入axios模块
import axios from "axios"
// 把axios挂在Vued的原型上，vue实例中就可以无限使用（主要是到页面组件中去使用）
Vue.prototype.axios=axios;
// 引入qs处理axios的post参数
import qs from "qs"
//把qs挂在Vue的原型上
Vue.prototype.qs=qs;
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
