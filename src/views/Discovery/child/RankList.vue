<template>
  <div class="container">
    <span class="title">官方榜</span>
    <div v-for="item in official" :key="item.id" class="item">
      <img @click="$router.push({path:'/songListDetail',query:{id:item.id}})" :src="item.coverImgUrl" alt="">
      <div class="items">
        <div v-for="(song,index) in item.tracks" :key="index"><span>{{index + 1}}</span>{{song.first}} - {{song.second}}</div>
        <span @click="$router.push({path:'/songListDetail',query:{id:item.id}})">查看全部 ></span>
      </div>
    </div>
    <span class="title">全球榜</span>
    <div class="global">
      <div v-for="item in global" :key="item.id" class="item1">
        <el-image @click="$router.push({path:'/songListDetail',query:{id:item.id}})" :src="item.coverImgUrl" alt="" lazy></el-image>
        <p>{{item.name}}</p>
        <span class="iconfont icon-play"></span>
        <span class="play_count">{{item.playCount | dataFormat}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getRank } from '../../../api/data'

export default {
  data() {
    return {
      lists: [],
      artists: []
    }
  },
  created() {
    this._getRank()
  },
  computed: {
    official() {
      return this.lists.slice(0, 4)
    },
    global() {
      return this.lists.slice(4, this.lists.length)
    }
  },
  methods: {
    _getRank() {
      getRank().then(res => {
        console.log(res);
        this.lists = res.data.list
        this.artists = res.data.artistToplist.artists
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  max-width: 1102px;
  margin: 0 auto;
  .title {
    font-size: 19px;
    font-weight: 600;
  }
  .item {
    display: flex;
    position: relative;
    padding: 10px 0;
    img {
      width: 172px;
      height: 172px;
      border-radius: 5px;
      cursor: pointer;
    }
    .items {
      width: 100%;
      margin-left: 40px;
      div {
        padding: 10px;
        &:nth-child(odd) {
          background-color: #F9F9F9;
        }
        span {
          color: #EC4141;
          margin-right: 10px;
        }
      }
      span {
        cursor: pointer;
      }
    }
  }
  .global {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    .item1 {
      position: relative;
      width: 20%;
      padding: 4px 0;
      &:hover .icon-play {
        opacity: .8;
      }
      .el-image {
        width: 100%;
        padding: 8px;
        cursor: pointer;
      }
      p {
        padding-left: 8px;
        font-size: 14px;
      }
      .icon-play {
        position: absolute;
        top: calc(50% - 30px);
        left: calc(50% - 21px);
        width: 42px;
        height: 42px;
        color: #D73535;
        background-color: #fff;
        border-radius: 50%;
        opacity: 0;
        transition: all .5s;
        cursor: pointer;
        &::before {
          display: flex;
          justify-content: center;
          line-height: 42px;
          font-size: 20px;
          transform: translateX(2px);
        }
      }
      .play_count {
        position: absolute;
        top: 14px;
        right: 14px;
        font-size: 12px;
        color: #F5FFEA;
        &::before {
          display: inline-block;
          content: '';
          width: 0;
          height: 0;
          margin-right: 2px;
          align-self: center;
          border-left: 8px solid #fff;
          border-bottom: 5px solid transparent;
          border-top: 5px solid transparent;
        }
      }
    }
  }
}
</style>
