<template>
  <el-container id="menu">
    <!-- 左边导航栏 -->
    <LeftMenu></LeftMenu>
    <!-- 右边内容 -->
    <el-container id="mainContent">
      <!--右边头部内容 -->
      <RightTop></RightTop>
      <!--右边mian中心内容 -->
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>
              <h3>分类管理</h3>
            </span>
          </div>
          <div class="text item">
            <el-table :data="tableData" style="width: 100%" :fit="true">
              <el-table-column label="分类名称" width="180">
                <template slot-scope="scope">
                  <!-- 绑定数据 用户名称-->
                  <span style="margin-left: 10px">{{ scope.row.goodsname }}</span>
                </template>
              </el-table-column>
              
              <el-table-column label="管理">
                <template slot-scope="scope">

                  <!-- 操作是删除还是 编辑 -->
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i></el-button>
                </template>
              </el-table-column>
            </el-table>



          </div>
        </el-card>
      </el-main>
      <!-- 右边页脚内容 -->
      <rightBottom></rightBottom>
    </el-container>
  </el-container>
</template>

<script>
import LeftMenu from "../components/Leftmenu.vue";
import RightTop from "../components/rightTop";
import rightBottom from "../components/rightBottom";

export default {
  // 库存信息的数据
  data() {
  return {
      tableData: [
        {
          goodsname: "护肤品",
        },
        {
          goodsname: "海飞丝",
        },
         {
          goodsname: "飘柔",
        }
      ]
    };
  },
  methods:{
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      }
  },
  components: {
    LeftMenu,
    RightTop,
    rightBottom
  }
}
</script>
<style>
.el-table_1_column_1  {
  width: 600px!important;
}
.el-table_1_column_2  {
  width: 600px!important;

}
</style>



