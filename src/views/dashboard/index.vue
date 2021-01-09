<!--
 * @Author: your name
 * @Date: 2020-12-26 14:10:18
 * @LastEditTime: 2021-01-09 15:50:46
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \FossStore\src\views\dashboard\index.vue
-->
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: 123123</div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  }
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
</style>
