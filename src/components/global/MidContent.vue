<template>
  <div class="mid-content-app">
    <img
      :class="isPlay ? 'needle_play' : 'needle_pause'"
      src="@/assets/images/needle.png"
      alt="needle"
    />
    <img
      class="mid-img"
      :class="isPlay ? 'circle-play' : 'circle-pause'"
      :style="styObj"
      :src="picUrl"
      ref="mid_img"
      alt="歌曲专辑"
    />
    <img src="@/assets/images/disc.png" alt="disc" />
  </div>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "MidContent",
    data() {
      return {
        styObj: {
          height: "auto",
        },
      };
    },
    props: ["picUrl"],
    computed: {
      ...mapState(["isPlay", "is_show"]),
    },
    mounted() {
      let img = this.$refs.mid_img;
      console.log(img.clientWidth);
      console.log("宽：", img.width);
      console.log("高：", img.height);
      if (img.width !== img.height) {
        console.log("阿偶~宽高不一致！\n已进行修正~~");
        let timber = setInterval(()=>{
          this.styObj.height = img.width + "px";
          console.log("图片宽高修正中...");
          if(img.width>100){
            console.log("检测到图片宽高已经修正完毕~");
            clearInterval(timber)
          }
        },100)
      }
    },
  };
</script>

<style lang="less" scoped>
  .mid-content-app {
    // background-color: red;
    height: 70%;
    text-align: center;
    img:first-child {
      width: 30%;
      position: absolute;
      z-index: 9999;
      left: 46%;
        // background-color: red;
      transform-origin: 15% 9%;
      //   transform: rotateZ(-30deg);
      transition: all 1s ease-in-out;
      // animation: needle_pause 1s infinite linear;
    }
    .needle_play {
      transform: rotateZ(-0deg);
    }
    .needle_pause {
      transform: rotateZ(-30deg);
    }
    img:last-child {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      width: 75%;
      margin-top: 26%;
    }
    .mid-img {
      // position: absolute;
      width: 46%;
      border-radius: 50%;
      margin-top: 40%;
      // left: 0;
      // transform: translateX(-50%);
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
  }
</style>
