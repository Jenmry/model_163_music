<template>
  <div class="bottom-nav-app">
    <div
      class="icon-item"
      v-for="(item, index) in iconLists"
      :key="index"
      @click.stop="btn_click(index)"
    >
      <i
        class="iconfont"
        :class="item.icon"
        v-if="isPlay ? (index === 2 ? false : true) : true"
      ></i>
      <i class="iconfont" :class="item.icon_play" v-else></i>
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import { getMusicUrl } from "@/utils/request/global";
  export default {
    name: "BottomNav",
    data() {
      return {
        iconLists: [
          {
            icon: "icon-24gl-repeat2",
          },
          {
            icon: "icon-24gl-previous",
          },
          {
            icon: "icon-24gl-playCircle",
            icon_play: "icon-24gl-pauseCircle",
          },
          {
            icon: "icon-24gl-next",
          },
          {
            icon: "icon-24gl-playlist2",
          },
        ],
        c_index: -1,
      };
    },
    computed: {
      ...mapState(["isPlay", "currentIndex", "playList", "is_show_lyrics"]),
    },
    methods: {
      ...mapMutations([
        "UPDATE_PLAY_STATE",
        "UPDATE_PLAY_INDEX",
        "UPDATE_PLAY_FREE_STATE",
        "UPDATE_PLAY_URL",
        "UPDATE_PLAY_TIMES",
        "UPDATE_PLAY_LYRICS_SHOW",
      ]),
      btn_click(index) {
        this.c_index = this.currentIndex;
        switch (index) {
          case 0:
            break;
          case 1:
            console.log("点击了1");
            this.c_index--;
            if (this.c_index < 0) {
              this.c_index = this.playList.length - 1;
            }
            this.getNewMusic(this.playList[this.c_index].id, this.c_index);
            break;
          case 2:
            console.log("点击了2");
            let state = false;
            if (this.isPlay) {
            } else {
              state = true;
            }
            this.UPDATE_PLAY_STATE(state);
            this.$bus.$emit("switch_play", state);
            break;
          case 3:
            console.log(this.c_index);
            this.c_index++;
            if (this.c_index > this.playList.length - 1) {
              this.c_index = 0;
            }
            console.log("当前index：", this.c_index);
            this.getNewMusic(this.playList[this.c_index].id, this.c_index);
            break;
          default:
            break;
        }
      },
      async getNewMusic(id, index) {
        const res = await getMusicUrl(id);
        console.log(res);
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
        // debugger
        this.UPDATE_PLAY_INDEX(index);
        //触发父组件footerplay中的方法调用兄弟组件的更新歌词的方法
        setTimeout(() => {
          this.$bus.$emit("update_lyrics");
        });
      },
    },
  };
</script>

<style lang="less" scoped>
  .bottom-nav-app {
    position: absolute;
    width: 100%;
    bottom: 0;
    padding-bottom: 10px;
    // background-color: orange;
    margin-top: 85px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    z-index: 9999;
    .icon-item {
      //   background-color: pink;
      i {
        color: #fff;
        font-size: 24px;
      }
      &:nth-child(3) {
        i {
          font-size: 44px;
        }
      }
    }
  }
</style>
