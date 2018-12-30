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
              <h3>添加商品</h3>
            </span>
          </div>
          <div class="text item">
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="200px" class="demo-ruleForm" label-position="top" size="small">
              <!-- 选择用户组 -->
              <el-form-item label="所属分类" prop="region">
                <el-select v-model="ruleForm2.region" placeholder="----请选择顶级分类----">
                  <el-option label="会员管理" value="shanghai"></el-option>
                  <el-option label="商品管理" value="beijing"></el-option>
                </el-select>
              </el-form-item>
              <!-- 分类名称 -->
              <el-form-item label="商品条形码" prop="goods">
                <el-input v-model="ruleForm2.goods"></el-input>
              </el-form-item>
              <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="ruleForm2.goodsname"></el-input>
              </el-form-item>
              <el-form-item label="商品售价" prop="proprice">
                <el-input v-model="ruleForm2.proprice"></el-input>
              </el-form-item>

              <el-form-item label="市场价">
                <el-input v-model="ruleForm2.marketPrice"></el-input>
              </el-form-item>
              <p>默认市场价为售价的1.2倍</p>
              <el-form-item label="商品进价:">
                <el-input v-model="ruleForm2.originPrice"></el-input>
              </el-form-item>
              <el-form-item label="入库数量">
                <el-input v-model="ruleForm2.stocknum"></el-input>
              </el-form-item>
              <p>计量商品单位为千克</p>
              <el-form-item label="商品重量：">
                <el-input v-model="ruleForm2.goodsweight"></el-input>
              </el-form-item>
               <el-form-item label="商品单位：">
                <el-input v-model="ruleForm2.goodsunit"></el-input>
              </el-form-item>
               <p>会员优惠价</p>
              <el-radio v-model="radio" label="1">享受</el-radio>
              <el-radio v-model="radio" label="2">不享受</el-radio>
              <p>状态</p>
              <el-radio v-model="radio1" label="3">启用</el-radio>
              <el-radio v-model="radio1" label="4">禁用</el-radio>
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
      radio: " ",
      radio1: " ",
      ruleForm2: {
        name: "",
        goods:"",
        goodsname: "",
        proprice: "",
        originPrice: "",
        marketPrice: "",
        stocknum: "",
        goodsweight:"",
        goodsunit:""
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
  color: #000;
  width: 100%;
}
.el-input__inner {
  width: 60%;
}
.el-form-item--small.el-form-item {
    margin-bottom: 0;
    width: 60%;
}
.el-button .el-button--primary .is-plain {
  margin-left: 0;
}
p {
  font-size: 14px;
  color: #ccc;
  margin-top: 10px;
  padding: 0;
}
.el-form-item--small.el-form-item {
  margin-bottom: 0;
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




