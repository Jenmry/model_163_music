<template>
  <div class="top-banner-app">
    <van-swipe class="swiper" :autoplay="3000">
      <van-swipe-item
        class="swiper-item"
        v-for="(item, index) in images"
        :key="index"
      >
        <img v-lazy="item" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { getBanner } from '@/utils/request/home';
  export default {
    name: "TopBanner",
    data() {
      return {
        images: [],
      };
    },
    methods:{
        async get_banner(){
            const res = await getBanner()
            console.log(res.data.banners);
            if(res.data.code === 200){
                this.images = res.data.banners.map(val=>{
                    return val.pic
                })
            }
        }
    },
    mounted(){
        this.get_banner()
    }
  };
</script>

<style lang="less" scoped>
  .top-banner-app {
    margin-top: 10px;
    .swiper {
      width: 100%;
      .swiper-item {
        padding: 0 10px;
        img {
          width: 100%;
          height: 150px;
          border-radius: 10px;
        }
      }
    }
  }
</style>
