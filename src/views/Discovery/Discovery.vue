<template>
  <div>
    <div class="tabs">
      <span
        v-for="(tab, index) in list"
        :key="index"
        :class="{ active: active === index }"
        @click="toggleTab(index)"
      >
        {{ tab }}
      </span>
    </div>
    <keep-alive>
      <components
        class="container"
        :toggleTab="toggleTab"
        :is="currentTab"
      ></components>
    </keep-alive>
  </div>
</template>

<script>
const recommend = () => import('./child/Recommend');
const songList = () => import('./child/SongList');
const rankList = () => import('./child/RankList');
const singer = () => import('./child/Singer');

export default {
  components: {
    recommend,
    songList,
    rankList,
    singer
  },
  data() {
    return {
      list: ['个性推荐', '歌单', '排行榜', '歌手'],
      coms: [
        'recommend',
        'songList',
        'rankList',
        'singer'
      ],
      currentTab: 'recommend',
      active: 0
    };
  },
  methods: {
    toggleTab(index) {
      this.currentTab = this.coms[index];
      this.active = index;
    }
  }
};
</script>

<style lang="less" scoped>
.tabs {
  margin: 10px 0 20px;
  span {
    padding-bottom: 6px;
    margin-right: 28px;
    color: #373737;
    cursor: pointer;
    &:hover {
      color: #000;
    }
    &.active {
      font-size: 20px;
      font-weight: 600;
      border-bottom: 3.5px solid #ec4141;
    }
  }
}
.container {
  margin: 0 auto;
  max-width: 1102px;
}
</style>
