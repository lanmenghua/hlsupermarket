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

// 构造全局守卫
router.beforeEach((to,from,next)=>{
  // let isLogin = false;
  // 依然让ajax携带证书
  axios.defaults.withCredentials=true;
  axios.get("http://127.0.0.1:9090/user/getcookie").then(result=>{
  console.log("验证的结果",result);
  // 如果登录成或者是访问的页面是登录页面就放行，否则就跳转到登录页面
  if(result.data.isOk || to.path=="/login"){
    // isLogin=true;
    next();
  }else{
    next("/login");
  }
  }).catch(err=>{
  console.log("错误了"+err.msg);

  })
})


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
