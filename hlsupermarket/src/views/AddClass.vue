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
              <h3>添加分类</h3>
            </span>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm" label-position="top">
              <!-- 选择用户组 -->
              <el-form-item label="所属分类" prop="region">
                <el-select v-model="ruleForm2.region" placeholder="----请选择顶级分类----">
                  <el-option label="超级会员管理" value="shanghai"></el-option>
                  <el-option label="普通会员管理" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 分类名称 -->
              <el-form-item label="分类名称" prop="name">
                <el-input v-model="ruleForm2.name"></el-input>
              </el-form-item>
              <p>状态</p>
              <el-radio v-model="radio" label="1">备选项</el-radio>
              <el-radio v-model="radio" label="2">备选项</el-radio>
              <!-- 提交用户 -->
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">添加</el-button>
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
  // 库存信息的数据
  data() {
    //自定义验证2次密码是否一致
    return {
      radio: '1',
      ruleForm2: {
      name: "" ,
      },
      rules2: {
        region: [{ required: true, message: "请选择分类", trigger: "change" }],
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
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
    }
  },
  components: {
    LeftMenu,
    RightTop,
    rightBottom
  }
};
</script>

<style>
.el-input--suffix .el-input__inner {
  padding-right: 0px;
  width: 100%;
}

.el-input__inner {
  width: 40%;
}
.el-form p {
  font-size: 14px;
}
.el-radio {
  margin-bottom: 10px;
}
.el-radio__input.is-checked .el-radio__inner {
    border-color: #ccc;
    background: #ccc;
}
.el-radio__input.is-checked + .el-radio__label{
    color: #000;
}
</style>


