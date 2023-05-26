<template>
  <div class="top-nav-app">
    <!-- 设置上方背景图片 -->
    <img class="background-img" :src="playlist.coverImgUrl" alt="歌曲封面" />
    <!-- 左侧图标 -->
    <div class="left-icon">
      <i class="iconfont icon-xitongfanhui" @click="$router.back()"></i>
      <span>歌单</span>
    </div>
    <!-- 右侧的图标 -->
    <div class="right-icon">
      <i class="iconfont icon-sousuoxiao"></i>
      <i class="iconfont icon-liebiao"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopNav",
    mounted() {},
    props: ["playlist"],
  };
</script>

<style lang="less" scoped>
  .top-nav-app {
    &::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #000;
      opacity: 0.6;
      z-index: -999;
      height: 300px;
    }
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    // position: fixed;
    // top: 0px;
    // width: 100%;
    padding: 10px;
    // width: 100%;
    // background-color: #bfa;
    .background-img {
      width: 100%;
      position: absolute;
      z-index: -999;
      top: 0;
      left: 0;
      height: 300px;
      filter: blur(50px);
    }

    .left-icon {
      i {
        font-size: 20px;
      }
      span {
        margin-left: 15px;
        font-size: 20px;
      }
    }
    .right-icon {
      i {
        font-size: 20px;
        &:last-child {
          margin-left: 25px;
        }
      }
    }
  }
</style>
