<template>
  <div class="music-list">
    <div class="top-nav">
      <div class="left-icon">
        <i class="iconfont icon-bofang"></i>
        <span>播放全部</span>
        <span>(共{{ songs.length }}首)</span>
      </div>
      <div class="right-box">
        <i class="iconfont icon-jiahao1"></i>
        <span>收藏({{ subsCount | fomatCount }})</span>
      </div>
    </div>
    <div class="music-list">
      <div
        class="list-item"
        v-for="(item, index) in songs"
        :key="item.id"
        @click="play(index, item.id)"
      >
        <div class="left">
          <div class="number">{{ index + 1 }}</div>
          <div class="song-info">
            <div class="song-title text-overflow">
              {{ item.name }}
            </div>
            <div class="song-singers text-overflow">
              {{ item.ar | fomatSingers }}
              <span v-if="item.al.name">- {{ item.al.name }}</span>
            </div>
          </div>
        </div>
        <div class="icon-mv-list">
          <i
            v-if="item.mv"
            class="iconfont icon-paishipin"
            @click.stop="mv_btn"
          ></i>
          <i class="iconfont icon-liebiao-dian" @click.stop="menu_btn"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapMutations } from "vuex";
  import { getMusicUrl } from "@/utils/request/global";
  export default {
    name: "MusicList",
    props: ["songs", "subsCount"],
    methods: {
      ...mapMutations([
        "UPDATE_PLAY_LIST",
        "UPDATE_PLAY_INDEX",
        "UPDATE_PLAY_FREE_STATE",
        "UPDATE_PLAY_URL",
        "UPDATE_PLAY_TIMES",
        "UPDATE_PLAY_SHOW"
      ]),
      async play(index, id) {
        const res = await getMusicUrl(id);
        console.log(res);
        this.UPDATE_PLAY_SHOW(true)
        if (res.data.code === 200) {
          if (res.data.data[0].freeTrialInfo) {
            this.UPDATE_PLAY_FREE_STATE(false);
            this.UPDATE_PLAY_URL(res.data.data[0].url);
            this.UPDATE_PLAY_TIMES(res.data.data[0].freeTrialInfo);
          } else {
            this.UPDATE_PLAY_FREE_STATE(true);
            this.UPDATE_PLAY_URL(res.data.data[0].url);
            this.UPDATE_PLAY_TIMES({});
          }
        }
        this.UPDATE_PLAY_INDEX(index);
        this.UPDATE_PLAY_LIST(this.songs);
      },
      mv_btn() {
        console.log("点击了mv");
      },
      menu_btn() {
        console.log("点击了菜单");
      },
    },
    mounted() {
      //   console.log("@@@",this.songs);
      //   console.log("id:",this.id);
    },
  };
</script>

<style lang="less" scoped>
  .music-list {
    background-color: #fff;
    margin-top: 15px;
    border-radius: 16px 16px 0 0;
    overflow: hidden;
    .top-nav {
      // position: sticky;
      // z-index: 9999;
      // top: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 10px 5px;
      background-color: #fff;
      // border-radius: 16px 16px 0 0;
      .left-icon {
        i {
          font-size: 20px;
        }
        span {
          &:first-of-type {
            margin: 0 5px;
            font-weight: bold;
          }
          &:last-of-type {
            font-size: 12px;
            color: #000;
            opacity: 0.5;
          }
        }
      }
      .right-box {
        background-color: #c20c0c;
        color: #fff;
        border-radius: 20px;
        padding: 10px 5px;
        font-size: 14px;
        display: flex;
        align-items: center;
        column-gap: 5px;
      }
    }
    .music-list {
      padding: 0 10px;
      .list-item {
        display: flex;
        margin: 20px 0;
        align-items: center;
        justify-content: space-between;
        &:first-child {
          // background-color: #bfa;
          margin-top: 0;
        }
        .left {
          display: flex;
          align-items: center;
          .number {
            color: #000;
            opacity: 0.5;
            width: 30px;
            text-align: center;
            // background-color: red;
          }
          .song-info {
            margin-left: 10px;
            width: 220px;
            display: flex;
            flex-direction: column;
            row-gap: 5px;
            // background-color: #bfa;
            .song-title {
              font-size: 14px;
              font-weight: bold;
            }
            .song-singers {
              color: #000;
              opacity: 0.5;
              font-size: 12px;
            }
          }
        }
        .icon-mv-list {
          // margin-left: 15px;
            // background-color: red;
          i {
            font-size: 22px;
            color: #000;
            opacity: 0.5;
            margin-left: 15px;
          }
        }
      }
    }
  }
</style>
