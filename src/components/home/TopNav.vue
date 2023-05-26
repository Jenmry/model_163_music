<template>
  <div class="top-nav-app">
    <!-- 左侧列表图标 -->
    <div class="left-icon">
      <i class="iconfont icon-liebiao"></i>
    </div>
    <!-- 中间的导航文字 -->
    <div class="mid-nav">
      <span @click="$router.push({path:'/userinfo'})">我的</span>
      <span><strong>发现</strong></span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <!-- 右侧的搜索图标 -->
    <div class="right-icon" @click="$router.push({path:'/search'})">
      <i class="iconfont icon-sousuoxiao"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TopNav",
  };
</script>

<style lang="less" scoped>
  .top-nav-app {
    width: 100%;
    height: 40px;
    font-size: 18px;
    display: flex;
    // align-items: center;
    justify-content: space-between;
    // background-color: #bfa;
    padding: 10px;
    .left-icon {
      // background-color: red;
      i {
        font-size: 20px;
      }
    }
    .mid-nav {
      // background-color: orange;
      width: 65%;
      display: flex;
      justify-content: space-evenly;
    }
    .right-icon {
      // background-color: red;
      i {
        font-size: 20px;
      }
    }
  }
</style>
