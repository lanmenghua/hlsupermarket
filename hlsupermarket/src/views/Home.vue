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
              <h3>系统信息</h3>
            </span>
          </div>
          <div class="text item">
            <el-alert title="商品总数5，已经销售的总金额：890。库存商品总价：1235.82" type="warning" show-icon>
            </el-alert>
            <el-alert title="导入数据" type="warning" show-icon>
            </el-alert>
            <el-row :gutter="40">
              <el-col :span="12">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>
                      <h3>销售排行</h3>
                    </span>
                  </div>
                  <div class="text item">
                    <el-table :data="tableData" stripe style="width: 100%">
                      <el-table-column prop="goodsname" label="商品名称">
                      </el-table-column>
                      <el-table-column prop="salenum" label="销量">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-col>
              <el-col :span="12" :gutter="40">
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>
                      <h3>缺货的商品</h3>
                    </span>
                  </div>
                  <div class="text item">
                    <el-table :data="tableData2" stripe style="width: 100%">
                      <el-table-column prop="resultgoods" label="缺货的商品">
                      </el-table-column>
                      <el-table-column prop="result" label="库存">
                      </el-table-column>
                      <el-table-column prop="play" label="操作">
                      </el-table-column>
                    </el-table>
                  </div>
                </el-card>
              </el-col>
            </el-row>
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
          goodsname: "海飞丝洗发水",
          salenum: "8"
        },
        {
          goodsname: "茅台酒",
          salenum: "6"
        },
        {
          goodsname: "龙凤呈祥",
          salenum: "6"
        },
        {
          goodsname: "周大生",
          salenum: "4"
        }
      ],
      tableData2: [
        {
          resultgoods: "优乐美",
          result: "2",
          play: "入库"
        }
      ]
    };
  },
  components: {
    LeftMenu,
    RightTop,
    rightBottom
  }
}
</script>



