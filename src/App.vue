<template>
  <div id="app">
    <router-view></router-view>
    <FooterPlay v-if="is_show_footer"/>
  </div>
</template>

<script>
import FooterPlay from './components/global/FooterPlay.vue';
import { mapState } from 'vuex';
  export default {
    name: "App",
    components:{
      FooterPlay
    },
    computed: {
      ...mapState(["is_show_footer"])
    },
  };
</script>

<style lang="less">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  a {
    color: #333;
  }
  .text-overflow {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
</style>
