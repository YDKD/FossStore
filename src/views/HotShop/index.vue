<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2021/01/28 10:41:34
!-->
<template>
  <div class="hot-shop" v-loading="loading">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <div class="card-header">
          <div class="left">
            <span>热销店铺排行</span>
            <svg-icon icon-class="icon-wenhao" class="func-svg"></svg-icon>
          </div>
          <div class="right">
            <el-tooltip content="根据用户选择的条件进行筛选" placement="top" effect="light">
              <el-button type="primary" size="mini" @click="screenData">筛选</el-button>
            </el-tooltip>
            <el-tooltip content="清除当前筛选条件" placement="top" effect="light">
              <el-button type="success" icon="el-icon-refresh" size="mini" @click="refreshData"></el-button>
            </el-tooltip>
          </div>
        </div>
      </div>
      <!-- card body -->
      <el-table :data="listData" border stripe :row-key="getRowKeys" :expand-row-keys="expand">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <span v-if="showKeyWords">
              <el-tag v-for="item in scope.row.shop_keywords" :key="item" size="normal" effect="dark">{{ item }}</el-tag>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="店铺头像">
          <template slot-scope="scope">
            <img :src="scope.row.shop_pic" width="50px" height="50px" />
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="shop_title"></el-table-column>
        <el-table-column label="店铺主营" prop="ind"></el-table-column>
        <el-table-column label="店铺位置" prop="shop_loc"></el-table-column>
        <el-table-column label="店铺关键词">
          <template slot-scope="scope">
            <span class="jump" @click="clickKeyWords(scope.row.id)">查看店铺关键词</span>
          </template>
        </el-table-column>
        <el-table-column label="宝贝与描述相符">
          <template slot-scope="scope">
            <span style="color: #ff444a" v-if="scope.row.mg >= '0.00%'">{{ scope.row.mas }}分<svg-icon icon-class="icon-down-jiantou" class="icon-down-jiantou"></svg-icon></span>
            <span style="color: #13740e" v-else>{{ scope.row.mas }}分<svg-icon icon-class="icon-down-copy" class="func-svg"></svg-icon></span>
          </template>
        </el-table-column>
        <el-table-column label="描述相比同行业">
          <template slot-scope="scope">
            <span style="color: #ff444a" v-if="scope.row.mg >= '0.00%'">高{{ scope.row.mg }}<svg-icon icon-class="icon-down-jiantou" class="icon-down-jiantou"></svg-icon></span>
            <span style="color: #13740e" v-else>低{{ scope.row.mg }}<svg-icon icon-class="icon-down-copy" class="func-svg"></svg-icon></span>
          </template>
        </el-table-column>
        <el-table-column label="卖家服务态度">
          <template slot-scope="scope">
            <span style="color: #ff444a" v-if="scope.row.sg >= '0.00%'">{{ scope.row.sas }}分<svg-icon icon-class="icon-down-jiantou" class="icon-down-jiantou"></svg-icon></span>
            <span style="color: #13740e" v-else>{{ scope.row.sas }}分<svg-icon icon-class="icon-down-copy" class="func-svg"></svg-icon></span>
          </template>
        </el-table-column>
        <el-table-column label="服务相比同行业">
          <template slot-scope="scope">
            <span style="color: #ff444a" v-if="scope.row.sg >= '0.00%'">高{{ scope.row.sg }}<svg-icon icon-class="icon-down-jiantou" class="icon-down-jiantou"></svg-icon></span>
            <span style="color: #13740e" v-else>低{{ scope.row.sg }}<svg-icon icon-class="icon-down-copy" class="func-svg"></svg-icon></span>
          </template>
        </el-table-column>
        <el-table-column label="物流服务质量">
          <template slot-scope="scope">
            <span style="color: #ff444a" v-if="scope.row.cg >= '0.00%'">{{ scope.row.cas }}分<svg-icon icon-class="icon-down-jiantou" class="icon-down-jiantou"></svg-icon></span>
            <span style="color: #13740e" v-else>{{ scope.row.cas }}分<svg-icon icon-class="icon-down-copy" class="func-svg"></svg-icon></span>
          </template>
        </el-table-column>
        <el-table-column label="物流相比同行业">
          <template slot-scope="scope">
            <span style="color: #ff444a" v-if="scope.row.cg >= '0.00%'">高{{ scope.row.cg }}<svg-icon icon-class="icon-down-jiantou" class="icon-down-jiantou"></svg-icon></span>
            <span style="color: #13740e" v-else>低{{ scope.row.cg }}<svg-icon icon-class="icon-down-copy" class="func-svg"></svg-icon></span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more deleteTd el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="showDetail(scope.row, 'rate')">查看详细评分信息</span>
                </el-dropdown-item>
                <el-dropdown-item> <span @click="showDetail(scope.row, 'local')">查看店铺地址</span></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="paging">
        <el-pagination @current-change="currentChange" :current-page.sync="currentPage" :page-size="pageSize" :total="totalNum" background layout="prev, pager, next"> </el-pagination>
      </div>

      <!-- 对话框 -->
      <el-dialog title="筛选" :visible.sync="dialogVisible" @close="dialogClose">
        <span>
          <el-form :model="form" ref="form" class="screenForm">
            <el-form-item label="宝贝描述相符:">
              <el-input v-model="form.goods_rate_min" clearable placeholder="请输入宝贝描述左侧区间，例：4.80"></el-input> -
              <el-input v-model="form.goods_rate_max" clearable placeholder="请输入宝贝描述右侧区间，例：4.99"></el-input>
            </el-form-item>
            <el-form-item label="卖家服务态度:">
              <el-input v-model="form.seller_attitude_min" clearable placeholder="请输入卖家服务态度左侧区间，例：4.80"></el-input> -
              <el-input v-model="form.seller_attitude_max" clearable placeholder="请输入卖家服务态度右侧区间，例：4.99"></el-input>
            </el-form-item>
            <el-form-item label="物理服务质量:">
              <el-input v-model="form.logistics_quality_min" clearable placeholder="请输入物理服务质量左侧区间，例：4.80"></el-input> -
              <el-input v-model="form.logistics_quality_max" clearable placeholder="请输入物理服务质量右侧区间，例：4.99"></el-input>
            </el-form-item>
          </el-form>
        </span>
        <span slot="footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirmScreenData">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import { getShopData } from "@/api/chartData"
import { screenShopData } from "@/api/postApi"
export default {
  name: "hot-shop",
  data() {
    return {
      user: "",
      currentPage: 1,
      pageSize: 10,
      listData: [],
      totalNum: 0,
      expand: [],
      showKeyWords: false,
      dialogVisible: false,
      form: {
        goods_rate_min: "",
        goods_rate_max: "",
        seller_attitude_min: "",
        seller_attitude_max: "",
        logistics_quality_min: "",
        logistics_quality_max: "",
      },
      loading: false,
      currentInDefault: true,
      paramsCheck: "",
    }
  },
  created() {
    this.user = this.$store.state.user.userInfo
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      let params = {
        user_id: this.user.user_id,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getShopData(params).then((res) => {
        this.loading = false
        this.listData = res.data.result
        this.totalNum = res.data.total
        this.listData.forEach((item, id) => {
          item.id = id
          if (item.shop_keywords == "") {
            item.shop_keywords = ["暂无关键词"]
          } else {
            item.shop_keywords = item.shop_keywords.split(" ")
            let index = item.shop_keywords.indexOf(" ")
            if (index) {
              item.shop_keywords.splice(index)
            }
          }
        })
      })
    },
    currentChange() {
      this.expand = []
      this.showKeyWords = false
      if (this.currentInDefault) {
        this.getData()
      } else {
        let params = {
          check: this.paramsCheck,
        }
        this.getSreenData(params)
      }
    },
    getRowKeys(row) {
      return row.id
    },
    clickKeyWords(id) {
      this.expand = []
      this.expand.push(id)
      this.showKeyWords = true
    },
    showDetail(row, currentClick) {
      let url = ""
      if (currentClick == "rate") {
        url = row.shop_rate_address
      } else if (currentClick == "local") {
        url = row.shop_pat
      }

      if (url != "") {
        window.open(url)
      }
    },
    screenData() {
      this.dialogVisible = true
      this.currentPage = 1
    },
    refreshData() {
      this.form.goods_rate_min = ""
      this.form.goods_rate_max = ""
      this.form.seller_attitude_min = ""
      this.form.seller_attitude_max = ""
      this.form.logistics_quality_min = ""
      this.form.logistics_quality_max = ""
      this.currentPage = 1
      this.currentInDefault = true
      this.paramsCheck = []
      this.listData = []
      this.getData()
    },
    dialogClose() {},
    async confirmScreenData() {
      if (
        !this.form.goods_rate_min &&
        !this.form.goods_rate_max &&
        !this.form.seller_attitude_max &&
        !this.form.seller_attitude_min &&
        !this.form.logistics_quality_min &&
        !this.form.logistics_quality_max
      ) {
        this.$message.error("请至少填写一个区间")
      } else {
        if ((this.form.goods_rate_min && !this.form.goods_rate_max) || (!this.form.goods_rate_min && this.form.goods_rate_max)) {
          return this.$message.error("请完整填写宝贝描述区间")
        } else {
          // 提交信息
          let params = {
            check: [],
          }
          if (this.form.goods_rate_min && this.form.goods_rate_max) {
            if (this.form.goods_rate_min > this.form.goods_rate_max) {
              return this.$message.error("区间信息错误，请重新填写区间")
            } else {
              params.check.push(1)
            }
          }
          if (this.form.seller_attitude_min && this.form.seller_attitude_max) {
            if (this.form.seller_attitude_min > this.form.seller_attitude_max) {
              return this.$message.error("区间信息错误，请重新填写区间")
            } else {
              params.check.push(2)
            }
          }
          if (this.form.logistics_quality_min && this.form.logistics_quality_max) {
            if (this.form.logistics_quality_min > this.form.logistics_quality_max) {
              return this.$message.error("区间信息错误，请重新填写区间")
            } else {
              params.check.push(3)
            }
          }
          if (params.check.length > 0) {
            this.currentPage = 1
            this.currentInDefault = false
            this.paramsCheck = params.check
            await this.getSreenData(params)
            this.dialogVisible = await false
          }
        }
      }
    },
    getSreenData(params) {
      this.loading = true
      params.currentPage = this.currentPage
      params.pageSize = this.pageSize
      params.form = this.form
      screenShopData(params).then((res) => {
        this.loading = false
        this.listData = []
        this.listData = res.data.result
        this.totalNum = res.data.total
        this.listData.forEach((item, id) => {
          item.id = id
          if (item.shop_keywords == "") {
            item.shop_keywords = ["暂无关键词"]
          } else {
            item.shop_keywords = item.shop_keywords.split(" ")
            let index = item.shop_keywords.indexOf(" ")
            if (index) {
              item.shop_keywords.splice(index)
            }
          }
        })
      })
    },
  },
}
</script>
<style lang="scss" scoped>
@import "@/styles/index.scss";
.hot-shop {
  ::v-deep .el-card__header {
    background-color: #f5f5f5;
  }
  padding: 20px;
  .card-header {
    display: flex;
    justify-content: space-between;
  }
  .left {
    font-size: 14px;
    font-weight: 600;
    span {
      padding-right: 5px;
    }
    .svg-icon {
      width: 2em;
      height: 2em;
      vertical-align: -0.48em;
    }
  }
  .deleteTd {
    cursor: pointer;
  }
}
.paging {
  margin-top: 10px;
}
.jump {
  color: $jump;
  cursor: pointer;
}
::v-deep .el-tag {
  margin: 5px;
}
.screenForm .el-input {
  width: 40%;
}
</style>
