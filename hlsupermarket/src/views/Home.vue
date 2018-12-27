<template>
  <el-container id="menu">
    <!-- 左边导航栏 -->
   
    <el-aside width="200px">
   
      <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        :unique-opened="true"
      >
        <!-- 导航1 -->
      <div id="loginbox">
        <h3>华联超市管理系统</h3>
        <p>您好,admin</p>
        <p><span>管理首页</span><span>退出系统</span> </p>
      </div>
      <el-submenu index="1">
        <template slot="title">
          <span>导航一</span>
        </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <span>导航二</span>
        </template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <span>导航三</span>
        </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <span>导航四</span>
        </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
          <el-submenu index="5">
        <template slot="title">
          <span>导航五</span>
        </template>
            <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
          <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
      <el-submenu index="6">
          <template slot="title">
            <span>导航六</span>
          </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
        </el-submenu>    <el-submenu index="7">
          <template slot="title">
            <span>导航七</span>
          </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
        </el-submenu>    
        <el-submenu index="8">
          <template slot="title">
            <span>导航八</span>
          </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
            <el-menu-item index="1-3">选项3</el-menu-item>
            <el-menu-item index="1-4">选项4</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>
    <!-- 右边内容 -->
    <el-container>
      <!--右边头部内容 -->
      <el-header>
        <h2>欢迎您 admin</h2>
        <p>查看和管理所有分类</p>
      </el-header>
      <!--右边mian中心内容 -->
      <el-main>Main</el-main>
      <!-- 右边脚步内容 -->
      <el-footer>
        &copy;Copyright 2018 华联超市管理系统
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
  /* 导航栏样式 */
 .el-header, .el-footer {
    background-color: #f8f8f8;
    color: #333;
    height: 120px !important;
  }
  .el-footer{
    font-size: 12px;
  }
  .el-aside {
    background-color: #353535;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }

  #loginbox{
    padding-top: 20px;
    line-height: 0px;
    height: 162px;
  }
  #loginbox p{
    font-size: 14px;

  }

</style>

