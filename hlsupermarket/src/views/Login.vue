<template>
  <div id="loginbox">
    <el-card class="box-card" id="login">
      <div slot="header" class="clearfix">
        <h2>用户登录</h2>
      </div>
      <div class="text item">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
          <el-form-item label="账号" prop="username">
            <el-input type="text" v-model="ruleForm2.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm2.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
            <el-button @click="resetForm('ruleForm2')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      ruleForm2: {
        pass: "",
        username: ""
      },
      rules2: {
        username: [
          { required: true, trigger: "blur", message: "用户名必须填写" },
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
        ]
      }
    };
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
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style>
#login {
  width: 480px;
  height: 280px;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  border-radius: 8px;
}
#login h2 {
  padding: 0;
  margin: 0;
}
#loginbox {
  /* background-color: rgb(63, 111, 243); */
  /* background-color: rgba(63, 111, 243, 0.5); */
  background-image: url("../assets/images/017c6859a3bc23a801211d25a3e794.JPG@1280w_1l_2o_100sh.jpg");
}
.el-button--primary {
  color: #fff;
  background-color: rgb(45, 115, 247);
  border-color: rgb(67, 132, 252);
}
</style>
