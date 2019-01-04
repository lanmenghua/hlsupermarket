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
            <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="200px" class="demo-ruleForm" label-position="top" size="small" id="formbox">
              <!-- 选择用户组 -->
              <el-form-item label="所属分类" prop="classname">
                <el-select v-model="ruleForm2.classname" placeholder="----请选择顶级分类----">
                  <el-option label="食品" value="食品"></el-option>
                  <el-option label="烟酒" value="烟酒"></el-option>
                  <el-option label="饮料" value="饮料"></el-option>
                  <el-option label="厨具" value="厨具"></el-option>
                  <el-option label="生鲜" value="生鲜"></el-option>
                  <el-option label="粮油" value="粮油"></el-option>
                </el-select>
              </el-form-item>
              <!-- 分类名称 -->
              <el-form-item label="商品条形码" prop="barcode">
                <el-input v-model="ruleForm2.barcode"></el-input>
                <el-button type="success" @click="createBarcode()" id="btn">生成条码</el-button>
              </el-form-item>
              <el-form-item label="商品名称" prop="goodsname">
                <el-input v-model="ruleForm2.goodsname"></el-input>
              </el-form-item>
              <el-form-item label="商品进价" prop="costprice">
                <el-input v-model="ruleForm2.costprice" @blur="updatePrice()"></el-input>
              </el-form-item>

              <el-form-item label="商品售价" prop="saleprice">
                <el-input v-model="ruleForm2.saleprice"></el-input>
              </el-form-item>

              <el-form-item label="市场价">
                <el-input v-model="ruleForm2.marketprice"></el-input>
              </el-form-item>
              <el-form-item label="入库数量" prop="stocknum">
                <el-input v-model="ruleForm2.stocknum"></el-input>
              </el-form-item>

              <el-form-item label="商品重量" prop="weight">
                <el-input v-model="ruleForm2.weight"></el-input>
              </el-form-item>

              <el-form-item label="商品单位" prop="unit">
                <el-input v-model="ruleForm2.unit"></el-input>
              </el-form-item>

              <!-- 注意事项，radio要用lable选中 -->
              <el-form-item label="会员优惠" prop="isdiscount">
                <el-radio-group v-model="ruleForm2.isdiscount">
                  <el-radio label="1">享受</el-radio>
                  <el-radio label="0">不享受</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="是否促销" prop="ispromotion">
                <el-radio-group v-model="ruleForm2.ispromotion">
                  <el-radio label="1">启用</el-radio>
                  <el-radio label="0">禁用</el-radio>
                </el-radio-group>
              </el-form-item>

              <el-form-item label="商品简介" prop="details">
                <el-input type="textarea" rows="5" v-model="ruleForm2.details"></el-input>
              </el-form-item>
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
      ruleForm2: {
        classname: "",
        barcode: "",
        goodsname: "",
        saleprice: 0,
        marketprice: 0,
        costprice: 0,
        stocknum: 0,
        weight: "",
        unit: "",
        isdiscount: "1",
        ispromotion: "0",
        details: ""
      },
      rules2: {
        classname: [
          { required: true, message: "请选择分类", trigger: "change" }
        ],

        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" }
        ],
        costprice: [
          { required: true, message: "商品进货价必须输入", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 表单验证完成后发送数据给前端
          this.axios
            .post(
              "http://127.0.0.1:9090/goods/add",
              this.qs.stringify(this.ruleForm2)
            )
            .then(result => {
              console.log("后端返回的成功的结果", result);
              // 根据后端返回的结果处理前端业务逻辑
              if (result.data.isOk) {
                this.$message({
                  message: "恭喜你" + result.data.msg,
                  type: "success"
                });
                // 成功后弹出继续添加还是不添加，添加就留在当前页，不添加就去管理列表页面
                //添加商品的完善，comfirm对话框的使用，确认
                this.$confirm(result.data.msg + ", 是否继续添加?", "提示", {
                  confirmButtonText: "确定",
                  cancelButtonText: "取消",
                  type: "warning"
                })
                  .then(() => {
                    //确认执行的操作
                    //重置表单
                    this.ruleForm2= {
                      classname: "",
                      barcode: "",
                      goodsname: "",
                      saleprice: 0,
                      marketprice: 0,
                      costprice: 0,
                      stocknum: 0,
                      weight: "",
                      unit: "",
                      isdiscount: "1",
                      ispromotion: "0",
                      details: ""
                    };
                  })
                  .catch(() => {
                    //取消执行的操作
                    this.$router.push("/GoodsManagement");
                  });
              } else {
                this.$message.error("错了哦" + result.data.msg);
              }
            })
            .catch(err => {
              console.log(err.message);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    updatePrice() {
      this.ruleForm2.marketprice = this.ruleForm2.costprice * 5;
      this.ruleForm2.saleprice = this.ruleForm2.marketprice * 0.9;
    },
    createBarcode() {
      this.ruleForm2.barcode = new Date().getTime();
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
.el-radio__input.is-checked + .el-radio__label {
  color: #000;
}
#formbox {
  position: relative;
}
#btn {
  position: absolute;
  top: 0px;
  left: 334px;
}
.el-form-item .el-form-item--feedback .el-form-item--small {
  margin-top: 10px;
}
</style>




