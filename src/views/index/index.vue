<!--
* @description 
* @fileName index.vue
* @author YDKD
* @date 2020/12/28 11:47:24
!-->
<template>
  <div>
    <div id="header">
      <section>
        <div class="hd-bg">
          <img
            src="https://cdn.jsdelivr.net/gh/YDKD/Blogger/Foss-Store/skyscrapers-5838029_1920.jpg"
          />
          <div class="hd-header">
            <div class="hd-wrap">
              <img
                src="https://cdn.jsdelivr.net/gh/YDKD/Blogger/Foss-Store/icon.png"
                alt="Foss-Store"
              />
              <span>Foss-Store</span>
              <div class="hd-title">
                <span
                  v-for="item in titleData"
                  :key="item.id"
                  @click="jump(item.id)"
                  >{{ item.name }}</span
                >
              </div>
            </div>
          </div>
          <div class="login">
            <span v-if="isLogin" class="login-account">123123</span>
            <el-button v-else round @click="login">登录</el-button>
          </div>
          <div class="main-titlt">Foss-Store</div>
          <div class="element"></div>
        </div>
      </section>
    </div>
    <div id="function">
      <div class="func-wraper">
        <el-row :gutter="20">
          <el-col :span="6">
            <svg-icon icon-class="icon-jiage" class="func-svg" />
            <h3 class="func-i-title">价格比对</h3>
            <p>
              为用户提供最真实的价格信息，对同类商品的价格进行比对，多元化比较，帮助用户选出最好的商品。
            </p>
          </el-col>
          <el-col :span="6">
            <svg-icon
              icon-class="icon-biaoqiankuozhan_dingdan-314"
              class="func-svg"
            />
            <h3 class="func-i-title">订单量比对</h3>
            <p>
              为用户提供最真实的交易订单信息，对同类商品的订单量进行比对，找出同类商品交易量最多的商品。
            </p>
          </el-col>
          <el-col :span="6">
            <svg-icon
              icon-class="icon-cangpeitubiao_fahuohuanhuofahuo"
              class="func-svg"
            />
            <h3 class="func-i-title">发货地选择</h3>
            <p>
              同类商品的不同的发货地不同，可以对比找对所在地区发货最多的商品，给予用户一定的参考选择。
            </p>
          </el-col>
          <el-col :span="6">
            <svg-icon icon-class="icon-xiaoliang" class="func-svg" />
            <h3 class="func-i-title">销量比对</h3>
            <p>
              同类商品，在不同的价格或其他因素，或者是单一的销量因素的条件下，给用户选出最优商品
            </p>
          </el-col>
        </el-row>
      </div>
    </div>
    <div id="about">
      <div class="ab-content">
        <p>邮箱：1606354057@qq.com</p>
        <p>备案号：蜀ICP备19013726号</p>
        <p>Copyright © 2021 Foss-Store. All rights reserved.</p>
      </div>
    </div>
  </div>
</template>


<script>
import Typed from "typed.js";
export default {
  name: "index",
  data() {
    return {
      titleData: [
        {
          name: "首页",
          id: "home",
        },
        {
          name: "功能",
          id: "function",
        },
        {
          name: "联系我们",
          id: "about",
        },
      ],
      isLogin: false,
    };
  },
  methods: {
    jump(id) {
      document.querySelector("#" + id).scrollIntoView(true);
    },
    login() {
      this.$router.push({ path: "/login" });
    },
  },
  mounted() {
    var options = {
      strings: "越努力&#44;越幸运,If you come&#44;I will do my best.".split(
        ","
      ),
      startDelay: 300,
      typeSpeed: 100,
      loop: true,
      backSpeed: 50,
    };

    var typed = new Typed(".element", options);
  },
};
</script>
<style lang='scss' scoped>
#header {
  height: 100%;
  width: 100%;
  section {
    .hd-bg {
      position: relative;
      height: 750px;
      .hd-header {
        position: absolute;
        width: 80%;
        min-height: 60px;
        line-height: 60px;
        top: 2%;
        left: 10%;
        z-index: 2;
        .hd-wrap {
          display: flex;
          justify-content: space-between;
          color: #fff;
          .hd-title {
            margin-right: 5%;
            span {
              cursor: pointer;
            }
          }
          img {
            width: 40px;
            height: 40px;
            margin-top: 10px;
          }
          span {
            font-size: 18px;
            margin-left: 50px;
          }
        }
      }
      .login {
        color: #fff;
        position: absolute;
        top: 2%;
        right: 2%;
        min-height: 60px;
        line-height: 60px;
        cursor: pointer;
        .login-account {
          font-size: 18px;
        }
      }
      .element,
      .main-titlt {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 16px;
        color: #fff;
      }
      .main-titlt {
        top: 45%;
        font-size: 20px;
      }
      img {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
      }
    }
  }
}
#function {
  height: 400px;
  width: 100%;
  position: relative;
  .func-wraper {
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    width: 70%;
    padding: 10px;
    .func-i-title {
      color: #343a40;
      font-size: 22px;
      line-height: 25px;
      font-weight: 500;
    }
    p {
      color: #777;
      line-height: 1.8;
    }
    .func-svg {
      width: 2em;
      height: 2em;
    }
  }

  //   background-color: red;
}
#about {
  height: 140px;
  color: #fff;
  background: #161616;
  position: relative;
  .ab-content {
    width: 400px;
    margin: 0 auto;
    text-align: left;
    padding-top: 5px;
  }
}
</style>
