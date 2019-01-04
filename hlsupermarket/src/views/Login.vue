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
          <el-form-item label="密码" prop="userpwd">
            <el-input type="password" v-model="ruleForm2.userpwd" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
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
        userpwd: "",
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
        userpwd: [
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
          // alert("登录成功!");
          // this.$router.push({ path: "/" });
          // 让aixos携带cookie
          this.axios.defaults.withCredentials=true;
          //1）前端--完成表单验证后发送ajax请求到后端
          let reqUrl = "http://127.0.0.1:9090/user/checkLogin";
           this.axios.post(
            reqUrl,
            this.qs.stringify(this.ruleForm2)
          ).then(result=>{
            console.log("服务器成功返回的结果",result);
             if(result.data.isOk){
              //登录成功
              this.$message({
                message:"恭喜你"+ result.data.msg,
                type: 'success'
              });
              this.$router.push("/");
            }
            else{
              //登录失败失败
              this.$message.error(result.data.msg);
            }
          }).catch(err=>{
            console.error("服务器错误返回的信息",err);
              this.$message.error("错了哦"+err.message);
            
          });
        } else {
          alert('× 表单验证失败!');
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
