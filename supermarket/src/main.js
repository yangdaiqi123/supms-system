import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/base.css';
import local from '@/utils/local'
// 引入request.js
import request from './utils/request'
// 引入echarts
import echarts from 'echarts'
Vue.prototype.echarts = echarts;
// 挂载在原型上
Vue.prototype.request=request;

Vue.config.productionTip = false
Vue.use(ElementUI);
// 路由守卫 拦截所有路由
router.beforeEach((to, from, next) => {
  // 获取浏览器中的token
  const token = local.get('s_t_t_w_h_n666'); 
  // console.log(token);
  
  // 如果有token 直接放行
  if (token) {
     // 放行
    next()
  } else { // 没有token
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
