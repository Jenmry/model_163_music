<template>
  <div class="user-select-app">
    <div class="icon-item" v-for="(item, index) in iconLists" :key="index">
      <i class="iconfont" :class="item.icon"></i>
    </div>
  </div>
</template>

<script>
  export default {
    name: "UserSelect",
    data() {
      return {
        iconLists: [
          {
            icon: "icon-24gl-heart",
          },
          {
            icon: "icon-iconfontzhizuobiaozhun023146",
          },
          {
            icon: "icon-yinlechangpian",
          },
          {
            icon: "icon-pinglun",
          },
          {
            icon: "icon-liebiao-dian",
          },
        ],
      };
    }
  };
</script>

<style lang="less" scoped>
.user-select-app{
    position: absolute;
    width: 100%;
    bottom: 15%;
    // background-color: orange;
    margin-top: 85px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon-item {
      i {
        color: #fff;
        font-size: 24px;
      }
    }
}
</style>
