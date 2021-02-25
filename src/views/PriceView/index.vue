<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2021/01/28 11:17:31
!-->
<template>
  <div class="price">
    <el-card shadow="always" :body-style="{ padding: '20px' }">
      <div slot="header">
        <div class="card-header">
          <div class="left">
            <div class="pr-section">价格区间</div>
            <el-tooltip content="从0开始，每隔区间单位进行一次分割, 默认分割单位为50" placement="top" effect="dark">
              <svg-icon icon-class="icon-wenhao" class="func-svg"></svg-icon>
            </el-tooltip>
            <el-input clearable placeholder="请输入价格区间" v-model="section"></el-input>
            <el-button type="success" icon="el-icon-search" @click="getData" style="margin-left: 10px">确 定</el-button>
          </div>
          <div class="right">
            <el-button type="success" @click="exportImg">导出图片</el-button>
          </div>
        </div>
      </div>
      <!-- card body -->
      <div class="content">
        <div id="myChart" class="mychart"></div>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getPriceData } from "@/api/chartData"
export default {
  name: "price-view",
  data() {
    return {
      section: 50,
      user: "",
      listData: "",
      options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {
          
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          top: "10%",
          containLabel: true,
        },
        xAxis: {
          type: "value",
          // boundaryGap: [0, 0.01],
        },
        yAxis: {
          type: "category",
          data: [],
        },
        series: [
          {
            name: "当前价格区间的商品数量：",
            type: "bar",
            itemStyle: {
              normal: {
                color: "#7CB5EC",
              },
            },
            data: [],
          },
        ],
      },
    }
  },
  created() {
    this.user = this.$store.state.user.userInfo
    this.getData()
  },
  mounted() {
    this.drawLine()
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"))
      // 绘制图表
      myChart.setOption(this.options, true)
    },
    getData() {
      if (parseInt(this.section) < 50) {
        this.$message.error("最小分割区间为50")
      } else if(this.section > 100){
        this.$message.error('最大分割单位为100')
      } else {
        // 清空 echarts的数组
        this.options.yAxis.data = []
        this.options.series[0].data = []
        let params = {
          section: this.section,
          user_id: this.user.user_id,
        }
        getPriceData(params).then((res) => {
          this.listData = res.data[0]
          for(let i in this.listData) {
            this.options.yAxis.data.push(i)
            this.options.series[0].data.push(this.listData[i])
          }
        })
      }
    },
    exportImg(){
      // 通过ID找到其下级的canvas
        const charts = document.getElementById("myChart").getElementsByTagName('canvas')
        // 创建标签
        const element = document.createElement("a")
        // 设置下载名称
        element.download = "当前价格区间的商品数量图表" +".jpg"
        // 设置地址以及文件类型
        element.href = charts[0].toDataURL("image/jpg")
        charts[0].getContext('2d').fillStyle = '#fff'
        document.body.appendChild(element)
        // 触发下载事件
        element.click()
        // 移除标签
        element.remove()
    }
  },
  watch: {
    //观察option的变化
    options: {
      handler(newVal, oldVal) {
        if (this.myChart) {
          if (newVal) {
            this.myChart.setOption(newVal)
          } else {
            this.myChart.setOption(oldVal)
          }
        } else {
          this.drawLine()
        }
      },
      deep: true, //对象内部属性的监听，关键。
    },
  },
}
</script>
<style lang='scss' scoped>
.price {
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
    display: flex;
    flex-direction: row;
    align-items: center;
    .pr-section {
      margin-right: 5px;
      min-width: 60px;
    }
    .svg-icon {
      width: 3em;
      height: 3em;
      vertical-align: -0.48em;
      margin-right: 40px;
    }
  }
}
.mychart {
  min-width: 650px;
  min-height: 800px;
}
</style>
