<template>
  <div class="home-page-app">
    <TopNav />
    <TopBanner />
    <NavList />
    <MusicList />
  </div>
</template>

<script>
  import TopNav from "@/components/home/TopNav.vue";
  import TopBanner from "@/components/home/TopBanner.vue";
  import NavList from "@/components/home/NavList.vue";
  import MusicList from "@/components/home/MusicList.vue";
  export default {
    name: "HomePage",
    components: {
      TopNav,
      TopBanner,
      NavList,
      MusicList
    },
    mounted() {
      console.log("bus:", this.$bus);
    },
  };
</script>

<style lang="less" scoped></style>
