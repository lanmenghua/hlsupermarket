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
              <h3>密码修改</h3>
            </span>
          </div>
          <div class="text item">
            <!-- 密码修改组件 -->
             <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <!-- 原密码 -->
              <el-form-item label="原密码" prop="prepass">
                <el-input type="password" v-model="ruleForm2.prepass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 密码 -->
              <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
              </el-form-item>
              <!-- 确认密码 -->

              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="ruleForm2.checkPass" autocomplete="off"></el-input>
              </el-form-item>

              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">修改</el-button>
                  </el-form-item>
            </el-form>




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
   data() {
    //自定义验证2次密码是否一致
    var validatePassword = (rule, value, callback) => {
      if (value !== this.ruleForm2.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm2: {
        pass: "",
        username: "",
        checkPass: ""
      },
      rules2: {
        prepass: [
          { required: true, trigger: "blur", message: "请填写原密码" },
          {
            min: 6,
            max: 18,
            message: "用户名长度在 6 到 18 个字符",
            trigger: "blur"
          }
        ],
        pass: [
          { required: true, trigger: "blur", message: "密码必须填写" },
          {
            min: 6,
            max: 12,
            message: "密码长度在 6 到 12 个字符",
            trigger: "blur"
          }
        ],
        checkPass: [
          {
            required: true,
            trigger: "blur",
            message: "请再次输入密码"
          },
          { validator: validatePassword, trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("登录成功!");
          this.$router.push({ path: "/" });
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
  }
}
</script>
<style>
.el-input {
  width: 40%;
}
.el-button--primary {
  color: #fff;
  background-color: #76b700;
  border-color: #76b700;
}
</style>

