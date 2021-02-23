<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2021/01/28 10:42:50
!-->
<template>
  <div>
    <div class="head">
      <el-row :gutter="20">
        <el-col :span="12" :offset="0">
          <div id="myChart" class="mychart"></div>
        </el-col>
        <el-col :span="12" :offset="0">
          <span>卖家省份交易总人数</span>
          <div id="myChart1" class="mychart1"></div>
        </el-col>
      </el-row>
      <div class="content">
        <el-table :data="total_sell_count" border stripe>
          <el-table-column label="省份" prop="province"></el-table-column>
          <el-table-column label="购买人数" prop="count_sales"></el-table-column>
          <el-table-column label="交易额">
            <template slot-scope="scope">
              <span>{{ scope.row.count_price | count_price }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import { getSellerProvinceData } from "@/api/chartData"
export default {
  name: "seller-pro-distribution",
  data() {
    return {
      user: "",
      amoutData: "",
      provinceData: "",
      total_sell_count: [],
      options: {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow",
          },
        },
        legend: {},
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
            name: "卖家省份交易总金额",
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
      options1: {
        legend: {
          top: "bottom",
        },
        grid: {
          top: "10%",
          containLabel: true,
        },
        // toolbox: {
        //   show: true,
        // },
        tooltip: {
          trigger: "item",
          textStyle: {
            color: "#fff", //文字颜色
            fontSize: 14, //文字大小
          },
        },
        series: [
          {
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
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
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"))
      // 绘制图表
      myChart1.setOption(this.options1, true)
    },
    getData() {
      getSellerProvinceData(this.user.user_id).then((res) => {
        this.amoutData = res.data.product
        this.provinceData = res.data.province
        this.filterData(this.provinceData, this.amoutData)
        this.total_sell_count = this.total_sell_count.sort(function (a, b) {
          return a.count_price - b.count_price
        })
        this.total_sell_count.forEach((item) => {
          this.options.series[0].data.push(item.count_price)
          this.options.yAxis.data.push(item.province)
          let tp = {
            value: item.count_sales,
            name: item.province,
          }
          this.options1.series[0].data.push(tp)
        })
        console.log(this.total_sell_count)
      })
    },
    filterData(data1, data2) {
      let count_price = 0
      let count_sales = 0
      data1.map((item1) => {
        data2.map((item2) => {
          if (item2.province == item1.province) {
            count_price += parseInt(item2.total_amount)
            count_sales += parseInt(item2.views_sales)
          }
        })
        let tp = {
          count_price: count_price,
          count_sales: count_sales,
          province: item1.province,
        }
        this.total_sell_count.push(tp)
        count_price = 0
        count_sales = 0
      })
    },
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
  filters: {
    count_price(num) {
      let logo = "" //用于记录是正值还是负值
      if (num < 0) {
        logo = "-"
        num = -num //将负数转正,如果不转正，则下面获取它的length时，会由于有个负号，使得长度+1，最终加逗号位置出错
      }

      let result = num.toString().split("").reverse() //将数字转化为了数组，便于使用数组中的splice方法插入逗号
      let position = result.indexOf(".") //获取小数点的位置，根据有无小数点确定position最终值进入添加逗号环节
      position = position !== -1 ? (position -= 1) : result.length //因为只需考虑整数部分插入逗号，所以需要考虑有没有逗号。有逗号则不等于-1，减去逗号位置，则是下标0~position就是整数部分；若不是小数，则num原本就是整数，直接取其length即可
      while (position > 2) {
        //只要下标值大于2，说明前面还可以插入“,”，则继续循环
        position -= 3 //下标前移3位，然后在这个下标对应的元素后面插入逗号
        result.splice(position + 1, 0, ",")
      }
      return logo + result.reverse().join("") //数组转换为字符串,前面+logo，若为负数则拼接个符号，否则拼接空字符
    },
  },
}
</script>
<style lang='scss' scoped>
.head {
  padding: 20px;
  min-height: 96vh;

  span {
    font-size: 14px;
    text-align: center;
    padding-left: 25%;
  }
  .content {
    width: 50%;
    float: left;
    margin-top: -20%;
  }
}
@media screen and (max-height: 1600px) {
  .mychart {
    width: 600px;
    height: 500px;
  }
  .mychart1 {
    width: 600px;
    height: 700px;
  }
  .content {
    margin-top: -10% !important;
  }
  span {
    padding-left: 30%;
  }
}
</style>
