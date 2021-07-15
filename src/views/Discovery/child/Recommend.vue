<template>
  <div>
    <div class="carousel">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="(item, index) in banner" :key="index">
          <img :src="item.imageUrl" alt="" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <span class="title">推荐歌单 ></span>
    <div class="recommend">
      <div @click="goDetail(item.id)" class="items" v-for="(item, index) in personalized" :key="index">
        <div class="img-wrap">
          <el-image :src="item.picUrl" alt="" lazy></el-image>
          <span class="play-count">{{ item.playCount | dataFormat }}</span>
          <span class="iconfont icon-play"></span>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <span class="title">独家放送 ></span>
    <div class="privatecontent">
      <div @click="$router.push({path:'/mvDetail', query:{id:item.id}})" class="items" v-for="(item, index) in privatecontent" :key="index">
        <div class="img-wrap">
          <el-image :src="item.sPicUrl" alt="" lazy></el-image>
          <span class="iconfont icon-play"></span>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <span class="title">最新音乐 ></span>
    <div class="new-song">
      <div @click="setCurrentSong(item),savePlaylist(item),savePlayHistory(item)" class="items" v-for="(item, index) in newsong" :key="index">
        <el-image :src="item.picUrl" alt="" lazy></el-image>
        <span class="iconfont icon-play"></span>
        <div class="desc">
          <div>{{ item.name }}</div>
          <div>{{ item.song.artists[0].name }}</div>
        </div>
      </div>
    </div>
    <span class="title">推荐MV ></span>
    <div class="personalized-mv">
      <div @click="$router.push({path:'/mvDetail', query:{id:item.id}})" class="items" v-for="(item, index) in personalizedmv" :key="index">
        <div class="img-wrap">
          <el-image :src="item.picUrl" alt="" lazy></el-image>
          <span class="play-count">{{ item.playCount | dataFormat }}</span>
          <div class="desc-wrap">
            <span>{{ item.copywriter }}</span>
          </div>
        </div>
        <p>{{ item.name }}</p>
        <p>{{ item.artistName }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import {
  getBanner,
  getRecommend,
  getPersonalized,
  getPrivatecontent,
  getNewsong,
  getPersonalizedmv
} from '../../../api/data';

export default {
  data() {
    return {
      banner: [],
      personalized: [],
      privatecontent: [],
      newsong: [],
      personalizedmv: []
    };
  },
  created() {
    this._getBanner()
    this._getPersonalized()
    this._getPrivatecontent()
    this._getNewsong()
    this._getPersonalizedmv()
  },
  computed: {
    ...mapState(['loadingStatus'])
  },
  methods: {
    _getBanner() {
      getBanner().then(res => {
        this.banner = res.data.banners
      })
    },
    _getPersonalized() {
      getPersonalized({ limit: 10 }).then(res => {
        this.personalized = res.data.result
      })
    },
    _getPrivatecontent() {
      getPrivatecontent().then(res => {
        this.privatecontent = res.data.result
      })
    },
    _getNewsong() {
      getNewsong({ limit: 12 }).then(res => {
        this.newsong = res.data.result
      })
    },
    _getPersonalizedmv() {
      getPersonalizedmv().then(res => {
        this.personalizedmv = res.data.result
      })
    },
    goDetail(id) {
      this.$router.push({ path: '/songListDetail', query: { id: id } })
    },
    ...mapMutations(['setLoading', 'setCurrentSong', 'savePlaylist', 'savePlayHistory'])
  }
};
</script>

<style lang="less" scoped>
.carousel {
  margin-bottom: 8px;
  img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }
}

.title {
  color: #373737;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    color: #000;
  }
}

.recommend {
  display: flex;
  flex-wrap: wrap;
  margin: 6px 0 20px;
  .items {
    width: 20%;
    padding: 6px;
    margin-top: 4px;
    cursor: pointer;
    .img-wrap {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      &:hover .icon-play {
        opacity: 1;
      }
      &:hover .desc-wrap {
        transform: translateY(0);
      }
      img {
        width: 100%;
      }
      .play-count {
        display: flex;
        position: absolute;
        top: 2px;
        right: 8px;
        font-size: 13px;
        color: #fff;
        &::before {
          content: "";
          width: 0;
          height: 0;
          align-self: center;
          border-left: 8px solid #fff;
          border-bottom: 5px solid transparent;
          border-top: 5px solid transparent;
          margin-right: 2px;
        }
      }
      .icon-play {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10px;
        bottom: 13px;
        width: 30px;
        height: 30px;
        color: #ec4141;
        font-size: 14px;
        border-radius: 50%;
        background-color: #fcfcfc;
        transition: all 0.6s;
        opacity: 0;
        &::before {
          transform: translateX(2px);
        }
      }
      .desc-wrap {
        position: absolute;
        padding: 6px;
        left: 0;
        top: 0;
        right: 0;
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.5);
        transform: translateY(-100%);
        transition: all 0.4s;
      }
    }
    p {
      // 多行文本溢出显示省略号
      display: -webkit-box;
      margin-top: 6px;
      font-size: 14px;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

.privatecontent {
  display: flex;
  margin: 6px 0 20px;
  .items {
    width: 33%;
    padding: 6px;
    cursor: pointer;
    .img-wrap {
      position: relative;
      img {
        width: 100%;
        border-radius: 5px;
      }
      .icon-play {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 8px;
        left: 8px;
        width: 24px;
        height: 24px;
        color: #fff;
        font-size: 10px;
        background: rgba(0, 0, 0, 0.2);
        border: 0.5px solid;
        border-radius: 50%;
        &::before {
          transform: translateX(1px);
        }
      }
    }
    p {
      margin-top: 4px;
      font-size: 14px;
    }
  }
}

.new-song {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 6px 0 16px;
  height: 270px;
  .items {
    display: flex;
    position: relative;
    width: 33%;
    height: 50px;
    margin: 7.5px;
    border-radius: 5px;
    &:hover {
      background-color: #eaeaea;
    }
    .el-image {
      max-width: 50px;
      border-radius: 5px;
      cursor: pointer;
    }
    .icon-play {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      left: 12px;
      top: 12px;
      width: 24px;
      height: 24px;
      font-size: 12px;
      color: #ec4141;
      background-color: #fcfcfc;
      border-radius: 50%;
      cursor: pointer;
      &::before {
        transform: translateX(1px);
      }
    }
    .desc {
      padding-left: 8px;
      font-size: 13px;
      div {
        margin: 4px 0;
        display: -webkit-box;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        cursor: default;
        &:nth-child(2) {
          color: #9f9f9f;
          cursor: pointer;
        }
      }
    }
  }
}

.personalized-mv {
  display: flex;
  margin: 6px 0 20px;
  cursor: pointer;
  .items {
    width: 25%;
    padding: 6px;
    .img-wrap {
      position: relative;
      border-radius: 5px;
      overflow: hidden;
      &:hover .desc-wrap {
        transform: translateY(0);
      }
      img {
        width: 100%;
      }
      .play-count {
        display: flex;
        position: absolute;
        top: 2px;
        right: 8px;
        font-size: 12px;
        color: #fff;
        &::before {
          content: "";
          width: 0;
          height: 0;
          margin-right: 4px;
          align-self: center;
          border-left: 8px solid #fff;
          border-bottom: 5px solid transparent;
          border-top: 5px solid transparent;
        }
      }
      .desc-wrap {
        position: absolute;
        padding: 6px;
        left: 0;
        top: 0;
        right: 0;
        font-size: 12px;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
        transform: translateY(-100px);
        transition: all 0.4s;
      }
    }
    p {
      display: -webkit-box;
      padding: 1px 0;
      overflow: hidden;
      font-size: 15px;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      &:nth-child(3) {
        font-size: 12px;
        color: #676767;
      }
    }
  }
}
</style>
