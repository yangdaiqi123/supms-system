import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

// 导出路由实例对象
export default new Router({
  routes: [
    // 根目录重定向到登录
    {
      path: '/',
      redirect: '/login'
    },
    // 登录
    {
      path: '/login', // 路径
      component: () => import('./views/login/login.vue') // 组件
    },
    // 后台主界面
    {
      path: '/home',
      redirect: '/home/systeminfo',
      component: () => import('./views/Home/Home.vue'),
      children: [
        // 系统信息
        {
          path: '/home/systeminfo',
          component: () => import('./views/SystemInfo/SystemInfo.vue'),
        },
        // 个人中心
        {
          path:'/home/personal',
          component:()=>import('./views/Personal/Personal.vue')
        },
        // 账号添加
        {
          path: '/home/accountadd',
          component: () => import('./views/Accountadd/Accountadd.vue'),
        },
        // 账号管理
        {
          path: '/home/accountmanage',
          component: () => import('./views/AccountManage/AccountManage.vue'),
        },
        // 密码修改
        {
          path: '/home/passwordmodify',
          component: () => import('./views/PasswordModify/PasswordModify.vue'),
        },
        // 商品添加
        {
          path: '/home/goodsadd',
          component: () => import('./views/GoodsAdd/GoodsAdd.vue'),
        },
        // 商品管理
        {
          path: '/home/goodsmanage',
          component: () => import('./views/GoodsManage/GoodsManage.vue'),
        },
        // 销售统计
        {
          path: '/home/salestotal',
          component: () => import('./views/SalesTotal/SalesTotal.vue'),
        },
        // 进货统计
        {
          path: '/home/stocktotal',
          component: () => import('./views/StockTotal/StockTotal.vue'),
        }
      ]
    }
  ]
})
