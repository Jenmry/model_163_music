<template>
  <div class="search-page-app">
    <TopNav @is_show="is_show" @is_error="is_error" />
    <SearchList :playList="songs" v-if="is_show && songs" />
    <div v-if="is_error" class="err-tip">
      似乎搜不到相关的结果呢<br />
      换个关键词试试吧
    </div>
  </div>
</template>

<script>
  import TopNav from "@/components/search/TopNav.vue";
  import SearchList from "@/components/search/SearchList.vue";
  export default {
    name: "SearchPage",
    components: {
      TopNav,
      SearchList,
    },
    data() {
      return {
        //是否显示搜索结果
        is_show: false,
        //是否显示提示
        is_error:false,
        songs: [],
      };
    },
    mounted() {
      this.$bus.$on("is_show", (val) => {
        if (val.length) {
          this.is_show = true;
          this.songs = val;
        } else {
          this.is_show = false;
          this.is_error = true
        }
      });
      this.$bus.$on("is_error", (val) => {
        this.is_error = val
        this.is_show = val;
      });
    },
  };
</script>

<style lang="less" scoped>
  .search-page-app {
    .err-tip {
      margin-top: 50%;
      color: #333;
      font-size: 14px;
      font-family: "幼圆";
      letter-spacing: 5px;
      line-height: 25px;
      font-weight: 700;
      text-align: center;
    }
  }
</style>
