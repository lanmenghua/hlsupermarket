<template>
 <el-aside width="230px">

      <el-menu 
      :default-active="$route.path"
      class="el-menu-vertical-demo" 
      @open="handleOpen" 
      @close="handleClose" 
      :unique-opened="true"
      >
        <div id="loginbox">
          <h2>华联超市管理系统</h2>
          <p>
            <a href="">欢迎您，admin</a>
          </p>
          <p>
            <a href="">管理系统</a>|
            <a href="javascript:void(0)" @click="loginOut()">退出系统</a>
          </p>
        </div>
        <el-submenu index="1">
          <template slot="title">
            <span>分类管理</span>
          </template>
          <el-menu-item index="/ClassManagement"><router-link to="/ClassManagement"> 分类管理</router-link></el-menu-item>
          <el-menu-item index="/AddClass"><router-link to="/AddClass"> 添加分类</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <span>商品管理</span>
          </template>
          <el-menu-item index="/GoodsManagement"><router-link to="/GoodsManagement"> 商品管理</router-link></el-menu-item>
          <el-menu-item index="/AddGoods"><router-link to="/AddGoods"> 添加商品</router-link></el-menu-item>
       
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <span>进货管理</span>
          </template>
          <el-menu-item index="/StockControl"><router-link to="/StockControl"> 库存管理</router-link></el-menu-item>
          <el-menu-item index="/AddStock"><router-link to="/AddStock"> 添加库存</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title">
            <span>出货管理</span>
          </template>
          <el-menu-item index="/SaleList"><router-link to="/SaleList"> 销售列表</router-link></el-menu-item>
          <el-menu-item index="/GoodsShipment"><router-link to="/GoodsShipment"> 商品出货</router-link></el-menu-item>
          <el-menu-item index="/GoodsReturn"><router-link to="/GoodsReturn"> 商品退货</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="5">
          <template slot="title">
            <span>统计管理</span>
          </template>
          <el-menu-item index="/SalesStatistics"><router-link to="/SalesStatistics"> 销售统计</router-link></el-menu-item>
          <el-menu-item index="/IncomingStatistics"><router-link to="/IncomingStatistics"> 进货统计</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="6">
          <template slot="title">
            <span>账号管理</span>
          </template>
          <el-menu-item index="/UserAdd"> <router-link to="/UserAdd"> 添加用户</router-link></el-menu-item>
          <el-menu-item index="/Userlist"><router-link to="/Userlist"> 管理用户</router-link></el-menu-item>
          <el-menu-item index="/Userpwdedit"><router-link to="/Userpwdedit"> 密码修改</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="7">
          <template slot="title">
            <span>系统管理</span>
          </template>
          <el-menu-item index="/SystemMessage"> <router-link to="/SystemMessage"> 系统信息</router-link></el-menu-item>
          <el-menu-item index="/SystemConfig"> <router-link to="/SystemConfig"> 系统配置</router-link></el-menu-item>
          <el-menu-item index="/AuthorityManagement"> <router-link to="/AuthorityManagement"> 权限管理</router-link></el-menu-item>
          <el-menu-item index="/AddmanagementGrop"> <router-link to="/AddmanagementGrop"> 添加管理组</router-link></el-menu-item>
        </el-submenu>
        <el-submenu index="8">
          <template slot="title">
            <span>会员管理</span>
          </template>
          <el-menu-item index="/AddAccount"> <router-link to="/AddAccount"> 添加账号</router-link></el-menu-item>
          <el-menu-item index="/ManagementAccount"> <router-link to="/ManagementAccount"> 管理账号</router-link></el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
</template>
<script>
export default {
methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    loginOut(){
      this.axios.get("http://127.0.0.1:9090/user/loginOut").then(result=>{
        if(result.data.isOk){
          this.$message({
            message:"退出成功",
            type:"sucess"
          });
           this.$router.push("/login");
        }
      }).catch(err=>{
        console.log(err);
      })
    }
  }
}
</script>
