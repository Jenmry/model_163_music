<template>
  <div class="top-nav-app">
    <div class="top">
      <div class="left" @click="$router.back()">
        <i class="iconfont icon-xitongfanhui"></i>
      </div>
      <div class="right">
        <input
          type="text"
          placeholder="G.E.M.邓紫棋"
          v-model="keyWords"
          @keydown.enter="search"
        />
      </div>
    </div>
    <div v-show="is_show" class="bottom">
      <div class="history">历史</div>
      <div class="his-right">
        <div
          class="his-item"
          v-for="(item, index) in hisList"
          :key="index"
          @click="getSearchData(item)"
        >
          {{ item }}
        </div>
      </div>
      <div class="delete">
        <i @click="deleteAll" class="iconfont icon-24gl-trash2"></i>
      </div>
    </div>
  </div>
</template>

<script>
  import { getSearch } from "@/utils/request/search.js";
  export default {
    name: "TopNav",
    data() {
      return {
        keyWords: "",
        hisList: [],
        is_show:true
      };
    },
    methods: {
      search() {
        if (!this.keyWords.trim()) {
          return;
        }
        if (this.hisList.length === 8) {
          this.hisList.pop();
        }
        //数组去重
        this.hisList = [...new Set([this.keyWords, ...this.hisList])];
        localStorage.setItem("hisList", JSON.stringify(this.hisList));
        this.getSearchData(this.keyWords);
      },
      deleteAll() {
        this.hisList = [];
        localStorage.removeItem("hisList");
      },
      async getSearchData(word) {
        this.keyWords = word;
        const res = await getSearch(word);
        // console.log(res.data.result.songs.album);
        let n_arr = [];
        if (res.data.code === 200 && Object.keys(res.data.result).length) {
          console.log("结果合理");
          console.log(res.data.result);
          n_arr = res.data.result.songs.map((val) => {
            // console.log(val.album);
            return {
              id: val.id,
              name: val.name,
              mv: val.mvid,
              ar: val.artists,
              al: {
                id: val.album.id,
                name: val.album.name,
                picUrl: null,
              },
              alia: val.alias,
            };
          });
        }
        this.is_show = false
        this.$bus.$emit("is_show", n_arr);
      },
    },
    mounted() {
      if (JSON.parse(localStorage.getItem("hisList"))) {
        this.hisList = JSON.parse(localStorage.getItem("hisList"));
      }
    },
    watch:{
        keyWords(val){
            if(!(val.trim())){
                this.is_show = true
                this.$bus.$emit("is_error", false);
            }
        }
    }
  };
</script>

<style lang="less" scoped>
  .top-nav-app {
    // border-bottom: 1px solid;
    // background-color: red;
    .top {
      display: flex;
      align-items: center;
      // background-color: #bfa;
      // height: 150px;
      padding: 10px 10px;
      .left {
        i {
          font-size: 22px;
        }
      }
      .right {
        margin-left: 15px;
        width: 100%;
        input {
          width: 100%;
          padding: 5px;
          border: none;
          border-bottom: 1px solid #999;
        }
      }
    }
    .bottom {
      display: flex;
      .history {
        // background-color: red;
        text-align: center;
        color: #000;
        font-weight: bold;
        padding: 10px;
        width: 15%;
      }
      .his-right {
        // background-color: orange;
        width: 80%;
        padding: 10px 10px 0 5px;
        display: flex;
        flex-wrap: wrap;
        .his-item {
          height: 25px;
          line-height: 25px;
          padding: 0 10px;
          border-radius: 20px;
          font-size: 14px;
          box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
          margin: 0 10px 10px 0;
          color: #333;
        }
      }
      .delete {
        width: 5%;
        // background-color: red;
        padding: 10px 30px 0 0;
        i {
          font-size: 20px;
          // background-color: orange;
        }
      }
    }
  }
</style>
