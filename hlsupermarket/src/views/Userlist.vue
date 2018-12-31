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

              <!-- 编号 -->
              <el-table-column label="编号" width="180">
                <template slot-scope="scope">
                  {{ scope.row.userid }}
                </template>
              </el-table-column>

              <!-- 账号 -->
              <el-table-column label="账号" width="180">
                <template slot-scope="scope">
                  {{ scope.row.username }}
                </template>
              </el-table-column>

              <!-- 日期 -->
              <el-table-column label="添加日期" width="180">
                <template slot-scope="scope">
                  <i class="el-icon-time"></i>
                  <span style="margin-left: 10px">{{ scope.row.addDate | foramtData }}</span>
                </template>
              </el-table-column>

              <!-- 用户组 -->
              <el-table-column label="用户组" width="180">
                <template slot-scope="scope">
                  {{ scope.row.usergroup }}
                </template>
              </el-table-column>

              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">
                    <i class="el-icon-edit"></i> 编辑</el-button>
                  <el-button size="mini" type="danger" @click="handleDelete(scope.row.userid)">
                    <i class="el-icon-delete"></i> 删除</el-button>
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
import moment from "moment";
export default {
  // 库存信息的数据
  data() {
    return {
      tableData: []
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    // 删除按钮执行的方法
    handleDelete(userid) {
      console.log("删除行的id", userid);
      this.axios
        .get("http://127.0.0.1:9090/user/deluser?userid=" + userid)
        .then(result => {
          console.log("服务器返回的值", result);
          result = result.data;
          if (result.isOk) {
            this.$message({
              message: result.msg,
              type: "success"
            });
            // 更新用户列表，如过通过路由的push方法，会全部刷新页面
            //再发ajax请求，获取数据复制给tabledata，利用mvvm实现无刷新更新

            this.axios
              .get("http://127.0.0.1:9090/user/getusers")
              .then(result => {
                console.log("后端返回的数据", result.data);
                this.tableData = result.data; //把返回的数据赋值给表格数据属性
              })
              .catch(err => {
                console.error(err.message);
              });
          } else {
            this.$message.error("出错了" + result.message);
          }
        })
        .catch(err => {
          this.$message.error("出错了" + err.message);
        });
    }
  },
  components: {
    LeftMenu,
    RightTop,
    rightBottom
  },
  created() {
    this.axios
      .get("http://127.0.0.1:9090/user/getusers")
      .then(result => {
        console.log("后端返回的数据", result.data);
        this.tableData = result.data; //把返回的数据赋值给表格数据属性
      })
      .catch(err => {
        console.error(err.message);
      });
  },
  filters: {
    foramtData(oldDate) {
      return moment(oldDate).format("YYYY年MM月DD日");
    }
  }
};

//组件实例化之后执行的钩子
</script>




