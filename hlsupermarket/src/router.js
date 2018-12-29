import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      component: Home
    },
    // 登录界面
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/Login.vue')
    },
    // 添加用户
    {
      path: '/UserAdd',
      name: 'UserAdd',
      component: () => import('./views/UserAdd.vue')
    },
    // 管理用户
    {
      path: '/Userlist',
      name: 'Userlist',
      component: () => import('./views/Userlist.vue')
    },
    // 密码修改
    {
      path: '/Userpwdedit',
      name: 'Userlist',
      component: () => import('./views/UserpwdEdit.vue')
    },
    // 添加账号
    {
      path: '/AddAccount',
      name: 'AddAccount',
      component: () => import('./views/AddAccount.vue')
    },
    // 添加分类
    {
      path: '/AddClass',
      name: 'AddClass',
      component: () => import('./views/AddClass.vue')
    },
    // 添加商品
    {
      path: '/AddGoods',
      name: 'AddGoods',
      component: () => import('./views/AddGoods.vue')
    },
    // 添加管理组
    {
      path: '/AddmanagementGrop',
      name: 'AddmanagementGrop',
      component: () => import('./views/AddmanagementGrop.vue')
    },
    // 添加库存
    {
      path: '/AddStock',
      name: 'AddStock',
      component: () => import('./views/AddStock.vue')
    },
    // 权限管理
    {
      path: '/AuthorityManagement',
      name: 'AuthorityManagement',
      component: () => import('./views/AuthorityManagement.vue')
    },
    // 分类管理
    {
      path: '/ClassManagement',
      name: 'ClassManagement',
      component: () => import('./views/ClassManagement.vue')
    },
    // 商品管理
    {
      path: '/GoodsManagement',
      name: 'GoodsManagement',
      component: () => import('./views/GoodsManagement.vue')
    },
    // 商品退货
    {
      path: '/GoodsReturn',
      name: 'GoodsReturn',
      component: () => import('./views/GoodsReturn.vue')
    },
    // 商品出货
    {
      path: '/GoodsShipment',
      name: 'GoodsShipment',
      component: () => import('./views/GoodsShipment.vue')
    },
    // 进货统计
    {
      path: '/IncomingStatistics',
      name: 'IncomingStatistics',
      component: () => import('./views/IncomingStatistics.vue')
    },
    // 管理账号
    {
      path: '/ManagementAccount',
      name: 'ManagementAccount',
      component: () => import('./views/ManagementAccount.vue')
    },
    // 销售列表
    {
      path: '/SaleList',
      name: 'SaleList',
      component: () => import('./views/SaleList.vue')
    },
    // 销售统计
    {
      path: '/SalesStatistics',
      name: 'SalesStatistics',
      component: () => import('./views/SalesStatistics.vue')
    },
    // 库存管理
    {
      path: '/StockControl',
      name: 'StockControl',
      component: () => import('./views/StockControl.vue')
    },
    // 系统配置
    {
      path: '/SystemConfig',
      name: 'SystemConfig',
      component: () => import('./views/SystemConfig.vue')
    },
    // 系统信息
    {
      path: '/SystemMessage',
      name: 'SystemMessage',
      component: () => import('./views/SystemMessage.vue')
    }
  ]
})
