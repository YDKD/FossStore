<template>
  <div class="hot-goods" v-loading="loading">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <div class="card-header">
          <div class="left">
            <span>热销宝贝排行</span>
            <svg-icon icon-class="icon-wenhao" class="func-svg"></svg-icon>
          </div>
          <div class="right">
            <el-tooltip content="收货时效会默认筛选出离当前用户最近的店铺" placement="top" effect="light">
              <el-button type="primary" size="mini" @click="receiveGoodsTime">收货时效</el-button>
            </el-tooltip>
            <el-tooltip content="清除当前收获时效筛选条件" placement="top" effect="light">
              <el-button type="success" icon="el-icon-refresh"  size="mini" @click="refreshData"></el-button>
            </el-tooltip>

            <el-button type="success" size="mini" @click="exportHotData">导出数据</el-button>
          </div>
        </div>
      </div>
      <!-- card body -->
      <el-table :data="listData" border stripe :default-sort="{ prop: 'views_price', order: 'descending' }">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left">
              <el-form-item label="宝贝名称">
                <span>{{ scope.row.views_title }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="宝贝图">
          <template slot-scope="scope">
            <img :src="scope.row.img_pat" width="50px" height="50px" />
          </template>
        </el-table-column>
        <el-table-column label="店铺名称" prop="shop_name"></el-table-column>
        <el-table-column label="宝贝名称">
          <template slot-scope="scope">
            <span>{{ scope.row.views_title.length > 10 ? scope.row.views_title.slice(0, 10) + "..." : scope.row.views_title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="宝贝价格" :sortable="true" :sort-by="priceSort">
          <template slot-scope="scope">
            {{ "¥" + scope.row.views_price }}
          </template>
        </el-table-column>
        <el-table-column label="运费" :sortable="true" :sort-by="freeSort">
          <template slot-scope="scope">
            {{ "¥" + scope.row.view_fee }}
          </template>
        </el-table-column>
        <el-table-column label="发货省份" prop="province"></el-table-column>
        <el-table-column label="发货城市" prop="city"></el-table-column>
        <el-table-column label="购买人数" :sortable="true" :sort-by="salesSort">
          <template slot-scope="scope">
            {{ scope.row.views_sales + " (人)" }}
          </template>
        </el-table-column>
        <el-table-column label="评论人数" :sortable="true" :sort-by="commitSort">
          <template slot-scope="scope">
            {{ scope.row.comment_count + " (人)" }}
          </template>
        </el-table-column>
        <!-- <el-table-column label="录入时间" min-width="100">
          <template slot-scope="scope">
            {{ formatTime(scope.row.create_time) }}
          </template>
        </el-table-column> -->
        <el-table-column label="操作" width="60">
          <template slot-scope="scope">
            <el-dropdown trigger="click">
              <span class="el-dropdown-link">
                <i class="el-icon-more deleteTd el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <span @click="showDetail(scope.row, 'goods')">查看商品详情</span>
                </el-dropdown-item>
                <el-dropdown-item> <span @click="showDetail(scope.row, 'commit')">查看评论详情</span></el-dropdown-item>
                <el-dropdown-item>
                  <span @click="showDetail(scope.row, 'shop')">查看店铺详情</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页 -->
      <div class="paging">
        <el-pagination @current-change="currentChange" :current-page.sync="currentPage" :page-size="pageSize" :total="totalNum" background layout="prev, pager, next"> </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
import { rTime } from "@/utils/index"
import { getHotData, getShortestData } from "@/api/chartData"
import { exportData } from "@/api/postApi"
import blob from "blob"
export default {
  name: "hot-goods",
  data() {
    return {
      listData: [],
      currentPage: 1,
      pageSize: 10,
      loading: false,
      totalNum: 0,
      isShortest: false,
      shortestData: [],
      user: ''
    }
  },
  created() {
    this.user = this.$store.state.user.userInfo
    this.getData()
  },
  methods: {
    // 导出数据
    exportHotData() {
      this.$confirm("请选择导出方式", "数据导出提示", {
        confirmButtonText: "全部数据导出",
        cancelButtonText: "当页数据导出",
        type: "info",
      })
        .then(() => {
          let para = {
            data: this.listData,
            check: 0,
          }
          exportData(para).then((res) => {
            let execlName = "test"
            const buf = Buffer.from(res.data),
              blob = new Blob([buf], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
              }),
              downloadElement = document.createElement("a"),
              href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = `${execlName}.xlsx` // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            window.URL.revokeObjectURL(href)
            // console.log(res);
          })
        })
        .catch(() => {
          let para = {
            data: this.listData,
            check: 1,
          }
          exportData(para).then((res) => {
            let execlName = "test"
            const buf = Buffer.from(res.data),
              blob = new Blob([buf], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
              }),
              downloadElement = document.createElement("a"),
              href = window.URL.createObjectURL(blob) // 创建下载的链接
            downloadElement.href = href
            downloadElement.download = `${execlName}.xlsx` // 下载后文件名
            document.body.appendChild(downloadElement)
            downloadElement.click() // 点击下载
            window.URL.revokeObjectURL(href)
            // console.log(res);
          })
        })
    },
    // 价格排序
    priceSort(row) {
      return row.views_price
    },
    // 运费排序
    freeSort(row) {
      return row.view_fee
    },
    // 购买人数排序
    salesSort(row) {
      return parseInt(row.views_sales)
    },
    // 评论人数排序
    commitSort(row) {
      return parseInt(row.comment_count)
    },
    // 数据库返回时间格式化
    formatTime(time) {
      return rTime(time)
    },
    // 获取数据
    getData() {
      this.loading = true
      let para = {
        user_id: this.user.user_id,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
      }
      getHotData(para).then((res) => {
        this.loading = false
        this.listData = res.data.result
        this.totalNum = res.data.total
      })
    },
    // 查看商品详情
    showDetail(row, currentClick) {
      let url = ""
      if (currentClick == "goods") {
        url = row.detail_url
      } else if (currentClick == "commit") {
        url = row.comment_url
      } else if (currentClick == "shop") {
        url = row.shop_link
      }

      if (url != "") {
        window.open(url)
      }
    },
    // 分页切换
    currentChange() {
      if (!this.isShortest) {
        this.getData()
      } else {
        this.listData = this.shortestData.slice((this.currentPage - 1) * this.pageSize, this.pageSize * 2)
      }
    },
    // 收货时效
    receiveGoodsTime() {
      this.currentPage = 1
      this.listData = []
      this.totalNum = 0
      this.loading = true
      let params = {
        user_place: this.$store.state.user.user_place || '成都市',
        user_id: this.user.user_id
        // user_place: "深圳市",
      }
      getShortestData(params).then((res) => {
        this.loading = false
        this.totalNum = res.data.length
        this.isShortest = true
        this.shortestData = res.data
        this.listData = this.shortestData.slice(0, 10)
      })
    },
    // 清除筛选条件
    refreshData(){
      this.isShortest = false
      this.currentPage = 1
      this.getData()
    }
  },
}
</script>
<style lang='scss' scoped>
.hot-goods {
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

  .paging {
    margin-top: 10px;
  }
}

</style>
