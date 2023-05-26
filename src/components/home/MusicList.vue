<template>
  <div class="music-list-app">
    <div class="top-title">
      <div class="left-title">发现好歌单</div>
      <div class="right-more">查看更多</div>
    </div>
    <van-swipe
      :show-indicators="false"
      class="swiper"
      :loop="false"
      :width="140"
    >
      <van-swipe-item
        class="swiper-item"
        v-for="item in musicList"
        :key="item.id"
      >
        <div class="music-item" @click="to_next(item.id)">
          <img :src="item.picUrl" :alt="item.name" />
          <div class="pic-name">
            {{ item.name }}
          </div>
          <div class="top-data">
            <i class="iconfont icon-24gl-play"></i>
            <span>{{ item.playCount | fomatCount }}</span>
          </div>
        </div>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
  import { getMusicList } from "@/utils/request/home";
  export default {
    name: "MusicList",
    data() {
      return {
        musicList: [],
      };
    },
    methods: {
      async get_music_list() {
        const res = await getMusicList();
        console.log(res.data);
        if (res.data.code === 200) {
          this.musicList = res.data.result;
        }
      },
      to_next(id) {
        this.$router.push({
          path: "/musicItem",
          query: {
            id,
          },
        });
      },
    },
    mounted() {
      this.get_music_list();
    },
  };
</script>

<style lang="less" scoped>
  .music-list-app {
    // padding: 25px 10px;
    .top-title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 25px 10px 0 10px;
      // background-color: #bfa;
      .left-title {
        font-size: 20px;
        font-weight: bold;
      }
      .right-more {
        font-size: 14px;
        border-radius: 12px;
        padding: 3px 6px;
        box-shadow: 0 0 2px 0px rgba(0, 0, 0, 0.45);
      }
    }
    .swiper {
      width: 100%;
      height: 275px;
      padding: 5px 0;
      // background-color: #bfa;
      .swiper-item {
        padding: 10px;
        // background-color: #bfa;
        .music-item {
          // background-color: #bfa;
          position: relative;
          img {
            width: 100%;
            border-radius: 10px;
            .top-data {
              position: absolute;
              top: 0;
            }
          }
          .pic-name {
            font-size: 14px;
            line-height: 18px;
            // background-color: red;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .top-data {
            // background-color: #bfa;
            display: flex;
            justify-content: center;
            align-items: center;
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 12px;
            color: #fff;
            text-shadow: 0px 0px 4px 4px #000;
            span {
              margin-left: 3px;
            }
          }
        }
      }
    }
  }
</style>
