<template>
  <div class="footer-play" @click="UPDATE_PLAY_SHOW(true)">
    <div class="left-info">
      <img
        :src="playList[currentIndex].al.picUrl"
        alt="歌曲图像"
        :class="isPlay ? 'circle-play' : 'circle-pause'"
      />
      <div class="song-info">
        <div class="song-title text-overflow">{{ songName }}</div>
        <div class="desc">横向滑动可以切换上下首歌曲哦</div>
      </div>
    </div>
    <div class="right-icons">
      <i
        class="iconfont"
        :class="isPlay ? 'icon-24gl-pauseCircle' : 'icon-24gl-playCircle'"
        @click.stop="play"
      ></i>
      <i class="iconfont icon-24gl-playlist2" @click.stop="showList"></i>
    </div>
    <audio ref="audio" :src="currentUrl" @ended="end"></audio>
    <van-popup
      class="top_detail"
      v-model="is_show"
      position="bottom"
      :style="{ height: '100%', width: '100%' }"
    >
      <img
        class="play_img"
        :src="playList[currentIndex].al.picUrl"
        alt="背景图"
      />
      <TopNav :songName="songName" :ar="playList[currentIndex].ar" />
      <MidContent
        :picUrl="playList[currentIndex].al.picUrl"
        v-show="!is_show_lyrics"
        @click.native="UPDATE_PLAY_LYRICS_SHOW(true)"
      />
      <LyricsContent
        :id="playList[currentIndex].id"
        :is_show_lyrics="is_show_lyrics"
        :currentTime="currentTime"
        v-show="is_show_lyrics"
        @click.native="UPDATE_PLAY_LYRICS_SHOW(false)"
        @lyrics_data="lyrics_data"
        ref="lyc_s"
      />
      <UserSelect />

      <div class="progress">
        <div class="left-time">{{ currentTime | fomatMill }}</div>
        <input
          type="range"
          v-model="currentTime"
          min="0"
          :max="currentDuration"
          step="0.5"
          @pointerup="changeTime"
        />
        <div class="right-time">{{ currentDuration | fomatMill }}</div>
      </div>
      <BottomNav
        ref="bottom_click"
        @switch_play="switch_play"
        @update_lyrics="update_lyrics"
      />
    </van-popup>
  </div>
</template>

<script>
  import { mapState, mapMutations } from "vuex";
  import TopNav from "./TopNav.vue";
  import MidContent from "./MidContent.vue";
  import UserSelect from "./UserSelect.vue";
  import BottomNav from "./BottomNav.vue";
  import LyricsContent from "./LyricsContent.vue";
  import { getSongDetail } from "@/utils/request/search";
  export default {
    name: "FooterPlay",
    components: {
      TopNav,
      MidContent,
      UserSelect,
      BottomNav,
      LyricsContent,
    },
    data() {
      return {
        lyrics: null,
        real_lyrics: null,
        timber: -1,
        isChanging: false,
      };
    },
    computed: {
      ...mapState([
        "playList",
        "currentIndex",
        "isPlay",
        "currentUrl",
        "isFree",
        "times",
        "is_show",
        "is_show_lyrics",
        "currentDuration",
      ]),
      currentTime: {
        get() {
          // console.log(123);
          // width: 300px;
          return this.$store.state.currentTime;
        },
        set(val) {
          this.isChanging = true;
          // if (document.mouseup) {
          // console.log("改变值", val);
          // this.$refs.audio.currentTime = val / 1000;
          // this.UPDATE_PLAY_TIME(val);
          this.val = val;
          // }
        },
      },
      songName() {
        if (this.playList[this.currentIndex].alia.length) {
          return (
            this.playList[this.currentIndex].name +
            "(" +
            this.playList[this.currentIndex].alia[0] +
            ")"
          );
        } else {
          return this.playList[this.currentIndex].name;
        }
      },
    },
    methods: {
      // demo(){
      //   console.log("我被触发了");
      //   // this.is_show_lyrics = true
      // },
      changeTime() {
        this.isChanging = false;
        this.UPDATE_PLAY_TIME(this.val);
        this.$refs.audio.currentTime = this.val / 1000;
      },
      handleLyrics() {
        this.timber = setInterval(() => {
          // console.log(this.$refs.audio.currentTime);
          // console.log(this.real_lyrics);
          if (this.isChanging) {
          } else {
            this.UPDATE_PLAY_TIME(this.$refs.audio.currentTime);
          }
        }, 100);
      },
      ...mapMutations([
        "UPDATE_PLAY_STATE",
        "UPDATE_PLAY_SHOW",
        "UPDATE_PLAY_LYRICS_SHOW",
        "UPDATE_PLAY_TIME",
        "UPDATE_PLAY_TIMES",
        "UPDATE_PLAY_URL",
        "UPDATE_PLAY_DURATION",
      ]),
      play() {
        console.log(this.$refs);
        if (this.$refs.audio.paused) {
          console.log(this.$refs.audio.paused);
          this.$refs.audio.play(); //播放
          this.UPDATE_PLAY_STATE(true);
          // clearInterval(this.timber)
          this.handleLyrics();
        } else {
          this.$refs.audio.pause(); //暂停
          this.UPDATE_PLAY_STATE(false);
          clearInterval(this.timber);
        }
      },
      end() {
        console.log("播放结束");
        this.$refs.audio.pause(); //暂停
        this.UPDATE_PLAY_STATE(false);
        clearInterval(this.timber);
        //歌曲播放结束，自动切换下一首歌曲
        this.$refs.bottom_click.btn_click(3);
      },
      switch_play(state) {
        if (state) {
          this.$refs.audio.play(); //播放
          // clearInterval(this.timber)
          this.handleLyrics();
        } else {
          this.$refs.audio.pause(); //暂停
          clearInterval(this.timber);
        }
      },
      lyrics_data(lyrics) {
        this.real_lyrics = lyrics;
        // clearInterval(this.timber)
        this.handleLyrics();
      },
      update_lyrics() {
        //触发父组件update_lyrics方法，开始执行子组件更新歌词数据的方法
        this.$refs.lyc_s.getLyrics();
      },
    },
    watch: {
      currentIndex: {
        async handler(val, oldVal) {
          if (this.isFree) {
            setTimeout(() => {
              console.log(this.$refs.audio);
              this.$refs.audio.autoplay = true;
              this.UPDATE_PLAY_STATE(true);
              // this.$refs.audio.play();
            });
          } else {
            setTimeout(() => {
              console.log(this.$refs.audio);
              this.$refs.audio.autoplay = true;
              this.UPDATE_PLAY_STATE(true);
              console.log(
                "当前歌曲为付费歌曲，您可以试听" +
                  this.times.start +
                  "~" +
                  this.times.end +
                  "秒"
              );
              // this.$refs.audio.play();
            });
          }

          if (!this.playList[this.currentIndex].al.picUrl) {
            const res = await getSongDetail(
              this.playList[this.currentIndex].id
            );
            this.playList[this.currentIndex].al.picUrl =
              res.data.songs[0].al.picUrl;
          }

          let timbers = setInterval(() => {
            if (this.$refs.audio.duration) {
              console.log("index获取duration", this.$refs.audio.duration);
              this.UPDATE_PLAY_DURATION(this.$refs.audio.duration);
              this.handleLyrics();
              console.log("index变化");
              clearInterval(timbers);
            }
          }, 10);
        },
      },
      playList: {
        async handler(val, oldVal) {
          if (this.isFree) {
            setTimeout(() => {
              console.log(this.$refs.audio);
              this.$refs.audio.autoplay = true;
              this.UPDATE_PLAY_STATE(true);
              // this.$refs.audio.play();
            });
          } else {
            setTimeout(() => {
              console.log(this.$refs.audio);
              this.$refs.audio.autoplay = true;
              this.UPDATE_PLAY_STATE(true);
              console.log(
                "当前歌曲为付费歌曲，您可以试听" +
                  this.times.start +
                  "~" +
                  this.times.end +
                  "秒"
              );
              // this.$refs.audio.play();
            });
          }

          if (!this.playList[this.currentIndex].al.picUrl) {
            const res = await getSongDetail(
              this.playList[this.currentIndex].id
            );
            this.playList[this.currentIndex].al.picUrl =
              res.data.songs[0].al.picUrl;
          }

          let timbers = setInterval(() => {
            if (this.$refs.audio.duration) {
              console.log("list获取duration", this.$refs.audio.duration);
              this.UPDATE_PLAY_DURATION(this.$refs.audio.duration);
              this.handleLyrics();
              console.log("list变化");
              clearInterval(timbers);
            }
          }, 10);
        },
      },
    },
    mounted() {
      this.$bus.$on("switch_play", this.switch_play);
      this.$bus.$on("lyrics_data", this.lyrics_data);
      //监听方法是否被触发
      this.$bus.$on("update_lyrics", this.update_lyrics);
    },
  };
</script>

<style lang="less" scoped>
  .footer-play {
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    bottom: 0;
    padding: 10px;
    border-top: 1px solid #cdcdcd;
    background-color: #fff;
    .left-info {
      display: flex;
      align-items: center;
      img {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        animation: circle_img 20s infinite linear;
      }
      .circle-play {
        animation-play-state: running;
      }
      .circle-pause {
        animation-play-state: paused;
      }
      @keyframes circle_img {
        from {
          transform: rotateZ(0deg);
        }
        to {
          transform: rotateZ(360deg);
        }
      }
      .song-info {
        margin-left: 10px;
        .song-title {
          color: #000;
          font-weight: bold;
        }
        .desc {
          font-size: 12px;
          color: #000;
          opacity: 0.5;
          margin-top: 2px;
        }
      }
    }
    .right-icons {
      display: flex;
      align-items: center;
      // background-color: red;
      i {
        color: #000;
        font-size: 22px;
        margin-left: 15px;
      }
    }
    .top_detail {
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
      }
      .play_img {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -9999;
        filter: blur(30px);
      }
      .progress {
        position: absolute;
        bottom: 65px;
        width: 100%;
        padding: 0 10px;
        // background-color: red;
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #fff;
        font-size: 14px;
        input {
          // background-color: orange;
          height: 1px;
          width: 100%;
          margin: 0 10px;
          // padding: 0 15px;
        }
        input[type="range"] {
          appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 10px;
          width: 10px;
          background: #fff;
          border-radius: 50%; /*外观设置为圆形*/
        }
      }
    }
  }
</style>
