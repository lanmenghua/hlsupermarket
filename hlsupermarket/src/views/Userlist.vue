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
              <h3>用户列表</h3>
            </span>
          </div>
          <div class="text item">
            <!-- 账号管理 -->
            <el-table :data="tableData" style="width: 100%">
              <el-table-column label="用户名称" width="180">
                <template slot-scope="scope">
                  <!-- 绑定数据 用户名称-->
                  <span style="margin-left: 10px">{{ scope.row.username }}</span>
                </template>
              </el-table-column>
              <el-table-column label="用户组" width="180">
                <template slot-scope="scope">
                  <el-popover trigger="hover" placement="top">
                    <!-- 绑定数据 用户组超级会员还是普通会员 -->
                    <p>{{ scope.row.usergrop }}</p>

                    <div slot="reference" class="name-wrapper">
                      <el-tag size="medium">{{ scope.row.usergrop }}</el-tag>
                    </div>
                  </el-popover>
                </template>
              </el-table-column>
              <el-table-column label="管理">
                <template slot-scope="scope">

                  <!-- 操作是删除还是 编辑 -->
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"><i class="el-icon-edit"></i>编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"><i class="el-icon-delete"></i>删除</el-button>
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
          username: "王小虎",
          usergrop: "超级会员",
        },
        {
          username: "张小花",
          usergrop: "普通会员",
        },
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
};
</script>




