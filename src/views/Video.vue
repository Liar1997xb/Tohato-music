<template>
  <div>
    <span class="title">全部MV</span>
    <div class="tag_container">
      <div class="area">
        <span>地区:</span>
        <span v-for="item in area" :key="item.name" @click="changeArea(item.name)" :class="{ active: currentArea === item.name }">{{item.name}}</span>
      </div>
      <div class="type">
        <span>类型:</span>
        <span v-for="item in type" :key="item.name" @click="changeType(item.name)" :class="{ active: currentType === item.name}">{{item.name}}</span>
      </div>
      <div class="order">
        <span>排序:</span>
        <span v-for="item in order" :key="item.name" @click="changeOrder(item.name)" :class="{ active: currentOrder === item.name }">{{item.name}}</span>
      </div>
    </div>
    <div class="img_wrap">
      <div v-for="item in mv" :key="item.id" class="items">
        <div class="mv_img" @click="$router.push({path: '/mvDetail', query:{ id: item.id }})">
          <el-image lazy :src="item.cover" alt=""></el-image>
          <span class="play_icon"></span>
          <span class="play_count">{{item.playCount | dataFormat}}</span>
          <span class="briefDesc">{{item.briefDesc}}</span>
        </div>
        <p class="mv_name">{{item.name}}</p>
        <p class="mv_artistname">{{item.artistName}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getAllMv } from '../api/data'

export default {
  data() {
    return {
      area: [
        { name: '全部' },
        { name: '内地' },
        { name: '港台' },
        { name: '欧美' },
        { name: '韩国' },
        { name: '日本' }
      ],
      type: [
        { name: '全部' },
        { name: '官方版' },
        { name: '原声' },
        { name: '现场版' },
        { name: '网易出品' }
      ],
      order: [
        { name: '上升最快' },
        { name: '最热' },
        { name: '最新' }
      ],
      currentArea: '内地',
      currentType: '全部',
      currentOrder: '最新',
      mv: []
    };
  },
  created() {
    this._getAllMv()
  },
  methods: {
    _getAllMv() {
      getAllMv({ area: this.currentArea, type: this.currentType, order: this.currentOrder }).then(res => {
        console.log(res)
        this.mv = res.data.data
      })
    },
    changeArea(name) {
      this.currentArea = name
    },
    changeType(name) {
      this.currentType = name
    },
    changeOrder(name) {
      this.currentOrder = name
    }
  },
  watch: {
    currentArea() {
      this._getAllMv()
    },
    currentType() {
      this._getAllMv()
    },
    currentOrder() {
      this._getAllMv()
    }
  }
};
</script>

<style lang="less" scoped>
.title{
  font-size: 20px;
  font-weight: 600;
}
.active{
  color: #EC4141;
  background-color: #FDF5F5;
}
.tag_container{
  margin: 0 auto;
  margin-top: 25px;
  max-width: 1102px;
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
  .order {
    padding: 5px 0;
    font-size: 13px;
    span:nth-child(n + 2) {
      margin: 0 15px;
      padding: 2px 10px;
      border-radius: 25px;
      cursor: pointer;
    }
  }
}
.img_wrap{
  display: flex;
  flex-wrap: wrap;
  max-width: 1102px;
  margin: 0 auto;
  .items{
    margin-top: 5px;
    padding: 5px;
    width: 33.33%;
    cursor: pointer;
    .mv_img{
      position: relative;
      width: 100%;
      .el-image{
        width: 100%;
        border-radius: 5px;
      }
      .play_count{
        position: absolute;
        top: 2px;
        right: 7px;
        font-size: 13px;
        color: #fff;
      }
      .briefDesc{
        position: absolute;
        bottom: 10px;
        left: 6px;
        font-size: 12px;
        color: #fff;
      }
    }
    .mv_name{
      margin-top: 6px;
      font-size: 13px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .mv_artistname{
      margin-top: 4px;
      font-size: 11px;
      color: #676767;
    }
  }
}
</style>
