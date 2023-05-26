<template>
  <div class="cover-list">
    <!-- 容纳图片封面和右侧歌单信息的盒子 -->
    <div class="cover-top">
      <!-- 图片封面 -->
      <img class="left-img" :src="playlist.coverImgUrl" alt="封面" />
      <!-- 歌单的介绍信息 -->
      <div class="right-info">
        <div class="info-title">
          {{ playlist.name }}
        </div>
        <!-- 作者的信息 -->
        <div class="author-info">
          <img :src="this.playlist.creator.avatarUrl" alt="头像" />
          <div class="author-name">
            {{ this.playlist.creator.nickname }}
          </div>
          <span> > </span>
        </div>
        <!-- 歌单的备注 -->
        <div class="info-desc">
          {{ playlist.description }}
        </div>
      </div>
    </div>
    <!-- 容纳关于歌单分享、收藏数量等信息的盒子 -->
    <div class="cover-bottom">
      <!-- 评论数 -->
      <div class="btn-item">
        <i class="iconfont icon-pinglun"></i>
        <div class="text">
          {{ playlist.commentCount }}
        </div>
      </div>
      <!-- 分享数 -->
      <div class="btn-item">
        <i class="iconfont icon-fenxiang"></i>
        <div class="text">
          {{ playlist.shareCount }}
        </div>
      </div>
      <div class="btn-item" v-for="btn_item in btnlist" :key="btn_item.id">
        <i class="iconfont" :class="btn_item.icon"></i>
        <div class="text">
          {{ btn_item.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "CoverItem",
    props: ["playlist"],
    data() {
      return {
        btnlist: [
          {
            id: 0,
            name: "下载",
            icon: "icon-iconfontzhizuobiaozhun023146",
          },
          {
            id: 1,
            name: "多选",
            icon: "icon-duigou-yuan",
          },
        ],
        avatarUrl:"",
        nickname:""
      };
    },
    // mounted(){
    //   setTimeout(() => {
    //     this.avatarUrl = this.playlist.creator.avatarUrl; 
    //     this.nickname = this.playlist.creator.nickname; 
    //   },50);
    // }
  };
</script>

<style lang="less" scoped>
  .cover-list {
    // margin-top: 40px;
    .cover-top {
      display: flex;
      padding: 10px 10px 15px;
      // background-color: red;
      .left-img {
        width: 155px;
        height: 155px;
        border-radius: 10px;
      }
      .right-info {
        padding-left: 15px;
        .info-title {
          font-size: 18px;
          color: #fff;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .author-info {
          display: flex;
          align-items: center;
          margin: 15px 0;
          img {
            width: 25px;
            border-radius: 50%;
          }
          .author-name {
            color: #fff;
            opacity: 0.5;
            font-size: 14px;
            margin: 0 5px 0 10px;
          }
          span {
            color: #fff;
            opacity: 0.5;
          }
        }
        .info-desc {
          font-size: 12px;
          color: #fff;
          // background-color: blue;
          height: 50px;
          line-height: 17px;
          opacity: 0.6;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
        }
      }
    }
    .cover-bottom {
      display: flex;
      // background-color: red;
      align-items: center;
      justify-content: space-around;
      .btn-item {
        text-align: center;
        color: #fff;
        i {
          font-size: 22px;
        }
        .text {
          margin-top: 5px;
          font-size: 14px;
        }
      }
    }
  }
</style>
