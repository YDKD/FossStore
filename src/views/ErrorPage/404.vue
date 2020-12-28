<template>
  <div class="error clearfix">
    <img
      src="../../../static/img/404.gif"
      alt="404"
      width="225"
      border="0"
      height="158"
    />
    <div class="backHome">
      <router-link :to="{ path: '/login' }">
        <b class="aLink">返回首页</b>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Page404",
};
</script>

<style lang="scss" scoped>
@import "@/styles/index.scss";
.error {
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  background-image: url(../../../static/img/gone.jpg);
  background-repeat: no-repeat;
  margin-left: 0px;
  margin-top: 0px;
  margin-right: 45px;
  margin-bottom: 0px;
  position: relative;
  img {
    position: absolute;
    opacity: 0;
    animation-name: imgNotFound;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-delay: 1.2s;
  }

  .backHome {
    position: absolute;
    opacity: 0;
    transform: translate(-50%, -50%);
    animation-name: backHome;
    animation-duration: 1s;
    animation-timing-function: ease-out;
    animation-fill-mode: forwards;
    animation-delay: 1.2s;
    .aLink {
      color: $jump;
      cursor: pointer;
    }
  }

  @keyframes imgNotFound {
    0% {
      right: 12%;
      top: 10%;
      opacity: 0;
    }
    100% {
      right: 2%;
      top: 10%;
      opacity: 1;
    }
  }

  @keyframes backHome {
    0% {
      left: 50%;
      top: 2%;
      opacity: 0;
    }
    100% {
      left: 50%;
      top: 20%;
      opacity: 1;
    }
  }
}
</style>
