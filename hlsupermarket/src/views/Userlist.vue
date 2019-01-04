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
                  <el-button size="mini" @click="handleEdit(scope.row.userid)">
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
    <el-dialog title="修改用户资料" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="right">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="userpwd">
          <el-input type="text" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="用户组" prop="usergroup">
          <el-select v-model="ruleForm2.usergroup" placeholder="请选择">
            <el-option label="超级管理员" value="超级管理员"></el-option>
            <el-option label="普通管理员" value="普通管理员"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm2')">确定修改</el-button>
      </span>
    </el-dialog>
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
      tableData: [],
      dialogVisible: false, //控制对话框的显示true和隐藏false
      //数据对象
      ruleForm2: {
        userpwd: "",
        username: "",
        usergroup: "",
        userid:""
      },
      //验证规则
      rules2: {
        username: [
          //required: true 必填     trigger: 'blur' 失去焦点的事件触发     message: "出错信息"
          { required: true, trigger: "blur", message: "用户名必须填写" },
          //min: 6 最小长度   max: 18 最大长度
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        userpwd: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        usergroup: [
          { required: true, trigger: "change", message: "请选择用户组" }
        ]
      }
    };
  },
  methods: {

    handleEdit(userid) {
      console.log("编辑的userID", userid);
      this.axios
        .get(this.apiHost+"/user/getuserbyid?userid=" + userid)
        .then(oldUserData => {
          console.log("服务器返回的旧的数据", oldUserData.data[0]);
          // 把接收到的数据复制给表单
          this.ruleForm2 = oldUserData.data[0];
          // console.log(oldUserData)
          // 准备模态框
          this.dialogVisible = true; //显示对话框
          // 使用双向数据绑定回填数据
        })
        .catch(err => {
          this.$message.error("出错了" + err.message);
        });
    },
    // 删除按钮执行的方法
    handleDelete(userid) {
      console.log("删除行的id", userid);
      this.axios
        .get(this.apiHost+"/user/deluser?userid=" + userid)
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
              .get(this.apiHost+"/user/getusers")
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
    },
    // 模态框的方法
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.axios
            .post(
              this.apiHost+"/user/usersave",
                this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              if (result.data.isOk) {
                this.$message({
                  message: result.msg,
                  type: "success"
                });
                this.dialogVisible = false; 
                this.axios
                  .get(this.apiHost+"/user/getusers")
                  .then(result => {
                    console.log("后端返回的数据", result.data);
                    this.tableData = result.data; //把返回的数据赋值给表格数据属性
                  })
                  .catch(err => {
                    console.error(err.message);
                  });
              } else {
                this.$message.error("出错了" + err.message);
              }
            })
            .catch(err => {
              this.$message.error("出错了" + err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
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
      .get(this.apiHost+"/user/getusers")
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




