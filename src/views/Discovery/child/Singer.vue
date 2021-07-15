<template>
  <div class="container">
    <div class="area">
      <span>语种:</span>
      <span v-for="item in area" :key="item.num" @click="changeArea(item.num)" :class="{ active: currentArea === item.num }">{{item.name}}</span>
    </div>
    <div class="type">
      <span>分类:</span>
      <span v-for="item in type" :key="item.num" @click="changeType(item.num)" :class="{ active: currentType === item.num }">{{item.name}}</span>
    </div>
    <div class="initial">
      <span>筛选:</span>
      <span v-for="item in initial" :key="item.num" @click="changeInitial(item.num)" :class="{ active: currentInitial === item.num }">{{item.name}}</span>
    </div>
    <div class="img_wrap">
      <div @click="goDetail(item.id)" v-for="item in singer" :key="item.id" class="items">
        <el-image lazy :src="item.img1v1Url" alt=""></el-image>
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getSinger } from '../../../api/data'

export default {
  data() {
    return {
      area: [
        { name: '全部', num: -1 },
        { name: '华语', num: 7 },
        { name: '欧美', num: 96 },
        { name: '日本', num: 8 },
        { name: '韩国', num: 16 },
        { name: '其他', num: 0 }
      ],
      type: [
        { name: '全部', num: -1 },
        { name: '男歌手', num: 1 },
        { name: '女歌手', num: 2 },
        { name: '乐队组合', num: 3 }
      ],
      initial: [
        { name: '热门', num: -1 },
        { name: 'A', num: 'a' },
        { name: 'B', num: 'b' },
        { name: 'C', num: 'c' },
        { name: 'D', num: 'd' },
        { name: 'E', num: 'e' },
        { name: 'F', num: 'f' },
        { name: 'G', num: 'g' },
        { name: 'H', num: 'h' },
        { name: 'I', num: 'i' },
        { name: 'J', num: 'j' },
        { name: 'K', num: 'k' },
        { name: 'L', num: 'l' },
        { name: 'M', num: 'm' },
        { name: 'N', num: 'n' },
        { name: 'O', num: 'o' },
        { name: 'P', num: 'p' },
        { name: 'Q', num: 'q' },
        { name: 'R', num: 'r' },
        { name: 'S', num: 's' },
        { name: 'T', num: 't' },
        { name: 'U', num: 'u' },
        { name: 'V', num: 'v' },
        { name: 'W', num: 'w' },
        { name: 'X', num: 'x' },
        { name: 'Y', num: 'y' },
        { name: 'Z', num: 'z' }
      ],
      currentArea: -1,
      currentType: -1,
      currentInitial: -1,
      singer: []
    }
  },
  created() {
    this._getSinger()
  },
  methods: {
    _getSinger() {
      getSinger({ area: this.currentArea, type: this.currentType, initial: this.currentInitial }).then(res => {
        this.singer = res.data.artists
      })
    },
    changeArea(e) {
      this.currentArea = e
    },
    changeType(e) {
      this.currentType = e
    },
    changeInitial(e) {
      this.currentInitial = e
    },
    goDetail(id) {
      this.$router.push({ path: '/singerDetail', query: { id: id } })
    }
  },
  watch: {
    currentArea() {
      this._getSinger()
    },
    currentType() {
      this._getSinger()
    },
    currentInitial() {
      this._getSinger()
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 1102px;
  margin: 0 auto;
  .active {
    color: #EC4141;
    background-color: #FDF5F5;
  }
  .area {
    padding: 5px 0;
    font-size: 13px;
    span:nth-child(n + 2) {
      margin: 0 15px;
      padding: 2px 10px;
      border-radius: 25px;
      cursor: pointer;
    }
  }
  .type {
    padding: 5px 0;
    font-size: 13px;
    span:nth-child(n + 2) {
      margin: 0 15px;
      padding: 2px 10px;
      border-radius: 25px;
      cursor: pointer;
    }
  }
  .initial {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 0;
    font-size: 13px;
    span:nth-child(n + 2) {
      margin: 0 15px;
      padding: 2px 10px;
      margin-bottom: 10px;
      border-radius: 25px;
      cursor: pointer;
    }
  }
  .img_wrap {
    display: flex;
    flex-wrap: wrap;
    cursor: pointer;
    .items {
      width: 20%;
      .el-image {
        padding: 10px;
      }
      span {
        padding-left: 10px;
        font-size: 14px;
      }
    }
  }
}
</style>
