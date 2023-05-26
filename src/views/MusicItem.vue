<template>
  <div class="music-item">
    <TopNav :playlist="playlist" />
    <CoverItem :playlist="playlist" />
    <MusicList :songs="songs" :subsCount="playlist.subscribedCount" />
  </div>
</template>

<script>
  import TopNav from "@/components/item/TopNav.vue";
  import CoverItem from "@/components/item/CoverItem.vue";
  import MusicList from "@/components/item/MusicList.vue";
  import { getMusicItem } from "@/utils/request/item";
  import { getMusicList } from "@/utils/request/item";
  export default {
    name: "MusicItem",
    components: {
      TopNav,
      CoverItem,
      MusicList,
    },
    data() {
      return {
        playlist: {},
        songs: [],
        id: 0,
      };
    },
    methods: {
      async get_music_item(id) {
        const res = await getMusicItem(id);
        let mdata = res.data;
        console.log(mdata);
        if (mdata.code === 200) {
          this.playlist = mdata.playlist;
        }
      },
      async get_music_list(id) {
        const res = await getMusicList(id);
        let mdata = res.data;
        console.log(mdata);
        if (mdata.code === 200) {
          this.songs = mdata.songs;
        }
      },
    },
    mounted() {
      // console.log(this.$route);
        this.get_music_item(this.$route.query.id);
        this.get_music_list(this.$route.query.id);
      // this.id = this.$route.query.id
    },
  };
</script>

<style lang="less" scoped></style>
