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
              <h3>商品管理</h3>
            </span>
          </div>
          <div class="text item">
            <!-- 搜索查询按钮 -->
            <div>
              <el-form :inline="true" :model="formSearch" class="demo-form-inline">

                <el-form-item label="所属分类">
                  <el-select v-model="formSearch.classname" placeholder="请选择分类">
                    <el-option label="烟酒" value="烟酒"></el-option>
                    <el-option label="饮料" value="饮料"></el-option>
                    <el-option label="食品" value="食品"></el-option>
                    <el-option label="饮料" value="饮料"></el-option>
                    <el-option label="粮油" value="粮油"></el-option>
                  </el-select>

                </el-form-item>
                <el-form-item label="关键字">
                  <el-input v-model="formSearch.keywords" placeholder="查询商品，条形码"></el-input>
                </el-form-item>

                <el-form-item>
                  <el-button type="success" @click="onSearch()">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <!-- 分割线 -->
            <div id="box"></div>
            <!-- 商品列表 -->
            <div>
              <el-table :data="tableData">
                <el-table-column label="商品条形码">
                  <template slot-scope="scope">
                    {{ scope.row.barcode }}
                  </template>
                </el-table-column>

                <el-table-column label="商品名称">
                  <template slot-scope="scope">
                    {{ scope.row.goodsname }}
                  </template>
                </el-table-column>

                <el-table-column label="所属分类">
                  <template slot-scope="scope">
                    {{ scope.row.classname }}
                  </template>
                </el-table-column>

                <el-table-column label="售价">
                  <template slot-scope="scope">
                    {{ scope.row.saleprice }}
                  </template>
                </el-table-column>

                <el-table-column label="成本价">
                  <template slot-scope="scope">
                    {{ scope.row.costprice }}
                  </template>
                </el-table-column>

                <el-table-column label="市场价">
                  <template slot-scope="scope">
                    {{ scope.row.marketprice }}
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 分页组件 -->
            <div id="pagerBox">
              <el-pagination 
              @size-change="handleSizeChange" 
              @current-change="handleCurrentChange" 
              :current-page="currentPage" 
              :page-sizes="[1,2,3,5,10,20,50,100]" 
              :page-size="pageSize" 
              layout="total, sizes, prev, pager, next, jumper" 
              :total="total">
              </el-pagination>
            </div>
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
      currentPage:1,
      pageSize:5, //每页大小，默认值
      total:0, //总记录数量
      formSearch: {
        classname: "",
        keywords: ""
      },
      tableData: []
    };
  },
  components: {
    LeftMenu,
    RightTop,
    rightBottom
  },
  methods: {
  getGoods(){
        this.axios.get(
         this.apiHost+`/goods/getgoods?classname=${this.formSearch.classname}&keywords=${this.formSearch.keywords}&currentPage=${this.currentPage}&pageSize=${this.pageSize}`)
         .then(result=>{
          //把查询到的商品信息的数组对象赋值给表格数据属性
        console.log("后端返回的结果是")
          console.log(result)
          this.tableData=result.data.goodsArray;
          this.total=result.data.total;
        }).catch(err=>{
          console.error(err.message);
        });
    },
    // 搜索的方法
  onSearch() {
    // 当点击搜索按钮的时候，像后端发送ajax请求
     this.getGoods();
  },
  handleEdit(index, row) {
    console.log(index, row);
  },
  handleDelete(index, row) {
    console.log(index, row);
  },
  handleSizeChange(val) {
    console.log(`每页 ${val} 条`);
      this.pageSize=val;
      this.getGoods();
  },
  handleCurrentChange(val) {
      this.currentPage=val;
      this.getGoods();
  },
},
    created(){
      //console.log("vue实例创建完毕!");
      //发起ajax获取商品信息
      this.getGoods();
    }
}
</script>
<style>
#box {
  height: 1px;
  border: 1px solid #ccc;
}
#pagerBox .el-input__inner {
  width: 100px;
}
.el-input__inner {
    width: 100%;
}

</style>



