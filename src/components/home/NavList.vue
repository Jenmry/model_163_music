<template>
  <div class="nav-list-app">
    <div class="nav-item" v-for="item in navList" :key="item.id">
        <i class="iconfont" :class="item.icon"></i>
        <div class="nav-title">
            {{ item.title }}
        </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NavList",
    data() {
      return {
        navList: [
          {
            id: 0,
            title: "每日推荐",
            icon:"icon-rili"
          },
          {
            id: 1,
            title: "私人FM",
            icon:"icon-luyinjishouyinjidiantai"
          },
          {
            id: 2,
            title: "歌单",
            icon:"icon-gedan"
          },
          {
            id: 3,
            title: "排行榜",
            icon:"icon-paihangbang"
          },
        ],
      };
    },
  };
</script>

<style lang="less" scoped>
.nav-list-app{
    padding: 5px 0;
    display: flex;
    justify-content: space-around;
    // height: 80px;
    // background-color: red;
    .nav-item{
        height: 100%;
        text-align: center;
        // background-color: #bfa;
        .iconfont{
            color: #c20c0c;
            font-size: 40px;
            font-weight: bolder;
        }
        .nav-title{
            margin-top: 5px;
            font-size: 14px;
        }
    }
}
</style>
