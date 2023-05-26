<template>
  <div class="top-nav-app">
    <div class="left" @click.stop="UPDATE_PLAY_SHOW(false);UPDATE_PLAY_LYRICS_SHOW(false)">
      <i class="iconfont icon-24gl-arrowDown2"></i>
    </div>
    <div class="mid">
      <div class="title">
        <PMD>
          {{ songName }}
        </PMD>
      </div>
      <div class="singers">
        <PMD>
          {{ ar | fomatSingers }}
        </PMD>
      </div>
    </div>
    <div class="right">
      <i class="iconfont icon-fenxiang"></i>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import PMD from "@/components/global/PMD.vue";
  export default {
    name: "TopNav",
    components: {
      PMD,
    },
    methods: {
      ...mapMutations(["UPDATE_PLAY_SHOW","UPDATE_PLAY_LYRICS_SHOW"]),
    },
    props: ["songName", "ar"],
  };
</script>

<style lang="less" scoped>
  .top-nav-app {
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    height: 60px;
    // padding: 0 10px;
    color: #fff;
    .left {
      // background-color: darkgoldenrod;
      width: 12.5%;
      height: 100%;
      text-align: center;
      line-height: 50px;

      i {
        font-size: 22px;
      }
    }
    .mid {
      width: 75%;
      display: flex;
      flex-direction: column;
      align-items: center;
      //   background-color: red;
      padding-top: 5px;
      text-align: center;
      .title {
        font-size: 18px;
        width: 100%;
      }
      .singers {
        font-size: 12px;
        width: 100%;
        color: #fff;
        opacity: 0.7;
        margin-top: 5px;
      }
    }
    .right {
      width: 12.5%;
      height: 100%;
      text-align: center;
      line-height: 50px;

      i {
        font-size: 22px;
      }
    }
  }
</style>
