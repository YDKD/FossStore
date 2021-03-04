<!--
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-11 14:18:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
    <iframe v-if="url" :src="url" frameborder="0" width="100%" :style="{ height: calHeight }" scrolling="auto"></iframe>
    <div v-else class="cloack">地图加载中...</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getUserMap } from "@/api/chartData"
export default {
  name: "Dashboard",
  data() {
    return {
      url: "",
    }
  },
  created() {
    getUserMap().then((res) => {
      this.url = res.data
    })
    // console.log(this.$store.state.user.userInfo);
  },
  computed: {
    ...mapGetters(["name"]),
    calHeight() {
      return window.innerHeight - 100 + "px"
    },
  },
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.cloack {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
