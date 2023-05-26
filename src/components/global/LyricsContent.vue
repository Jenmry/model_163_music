<template>
  <div class="lyrics-content-app">
    <!-- <div class="lines"></div> -->
    <p
      class="lyrics"
      :class="{
        active: currentTime > item.currentTime && currentTime < item.nextTime,
      }"
      v-for="(item, index) in lyric"
      :key="index"
      v-show="item.lyrics"
    >
      {{ item.lyrics }}
    </p>
  </div>
</template>

<script>
  import { getMusicLyrics } from "@/utils/request/global";
  export default {
    name: "LyricsContent",
    data() {
      return {
        lyric: "",
        lyrics: "",
      };
    },
    props: ["id", "is_show_lyrics", "currentTime"],
    methods: {
      fomatLyrics() {
        const arr = this.lyrics
          .split("\n")
          .slice(0, -1)
          .map((item) => {
            let lyrics = item.slice(item.indexOf("]") + 1);
            console.log(lyrics);
            if (!lyrics) {
              return null;
            }
            let min = item
              .match(/^\[[0-9]{2}:/g)[0]
              .replace("[", "")
              .replace(":", "");
            // console.log(min);
            let sec = item
              .match(/:[0-9]{1,2}/g)[0]
              .replace(":", "")
              .replace(".", "");
            let mill = item.match(/\.[0-9]{1,3}\]/g);
            // console.log("mill的值：",mill);
            if (mill) {
              mill = mill[0].replace(".", "").replace("]", "");
            } else {
              mill = 0;
            }

            // console.log(min,sec,mill);
            return {
              min,
              sec,
              mill,
              lyrics,
              currentTime:
                parseInt(min) * 60 * 1000 +
                parseInt(sec) * 1000 +
                parseInt(mill),
            };
          });
        // console.log(arr);
        let n_arr = arr.filter((item) => {
          return item != null;
        });
        console.log("n_arr,", n_arr);
        n_arr.forEach((item, index) => {
          if (index == n_arr.length - 1) {
            console.log("条件1");
            item.nextTime = item.currentTime + 999999999;
          } else {
            console.log("条件2");
            item.nextTime = n_arr[index + 1].currentTime;
          }
        });

        console.log("处理后的数组：", n_arr);
        this.lyric = n_arr;
        this.$bus.$emit("lyrics_data", this.lyric);
      },
      fomatLine() {
        // console.log(document.getElementsByClassName("active")[0].offsetTop);
        let p = document.getElementsByClassName("active")[0];
        // console.log(p);
        if (p) {
          // console.log("当前歌词：", p.innerHTML);
          // console.log("active元素距离顶部距离：", p.offsetTop);
          // console.log("歌曲当前时间：", this.currentTime);
          if (p.offsetTop >= 200) {
            document.getElementsByClassName("lyrics-content-app")[0].scrollTop =
              p.offsetTop - 260;
          }
        }
      },
      async getLyrics() {
        const res = await getMusicLyrics(this.id);
        console.log("index检测--歌词数据：", res.data);
        console.log(res.data);
        console.log(res.data.lrc.lyric);
        if (res.data.code === 200) {
          this.lyrics = res.data.lrc.lyric;
          this.fomatLyrics();
          this.fomatLine();
        }
      },
    },
    watch: {
      is_show_lyrics(val) {
        if (val) {
          console.log("歌词初始数据;", this.lyrics);
          this.getLyrics();
        }
      },
      currentTime(val) {
        this.fomatLine();
      },
    },
  };
</script>

<style lang="less" scoped>
  .lyrics-content-app {
    text-align: center;
    color: #cdcdcdd7;
    overflow: scroll;
    height: 65%;
    padding: 180px 10px;
    // background-color: red;
    margin-top: 20px;
    // position: relative;
    .lines {
      width: 100%;
      color: yellow;
      position: fixed;
      z-index: 99999;
      top: 260px;
      border: 1px solid;
    }
    .lyrics {
      margin: 25px 0;
      transition: all 0.15s ease-in;
    }
    .active {
      font-size: 22px;
      color: #fff;
    }
  }
</style>
