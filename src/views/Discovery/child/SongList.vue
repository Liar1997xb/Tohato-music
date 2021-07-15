<template>
  <div ref="topPlaylist">
    <div class="top-playlist" v-if="topPlaylist">
      <div class="top-wrap">
        <div class="top-card">
          <div class="top-img">
            <img :src="topPlaylist.coverImgUrl" alt="" />
          </div>
          <div class="top-content">
            <div class="top-tag">
              <span>精品歌单</span>
            </div>
            <p class="top-name">{{ topPlaylist.name }}</p>
            <p class="top-writer">{{ topPlaylist.copywriter }}</p>
          </div>
        </div>
        <div
          class="top-background"
          :style="{ backgroundImage: `url(${topPlaylist.coverImgUrl})` }"
        ></div>
        <div class="top-background-mask"></div>
      </div>
    </div>
    <div class="tags">
      <div class="drop">
        <span>{{ tag }} ></span>
      </div>
      <div class="tab-bar">
        <span
          class="item"
          @click="tag = '华语'"
          :class="{ active: tag === '华语' }"
          >华语</span
        >
        <span
          class="item"
          @click="tag = '流行'"
          :class="{ active: tag === '流行' }"
          >流行</span
        >
        <span
          class="item"
          @click="tag = '摇滚'"
          :class="{ active: tag === '摇滚' }"
          >摇滚</span
        >
        <span
          class="item"
          @click="tag = '民谣'"
          :class="{ active: tag === '民谣' }"
          >民谣</span
        >
        <span
          class="item"
          @click="tag = '电子'"
          :class="{ active: tag === '电子' }"
          >电子</span
        >
        <span
          class="item"
          @click="tag = '另类/独立'"
          :class="{ active: tag === '另类/独立' }"
          >另类/独立</span
        >
        <span
          class="item"
          @click="tag = '轻音乐'"
          :class="{ active: tag === '轻音乐' }"
          >轻音乐</span
        >
        <span
          class="item"
          @click="tag = '综艺'"
          :class="{ active: tag === '综艺' }"
          >综艺</span
        >
        <span
          class="item"
          @click="tag = '影视原声'"
          :class="{ active: tag === '影视原声' }"
          >影视原声</span
        >
        <span
          class="item"
          @click="tag = 'ACG'"
          :class="{ active: tag === 'ACG' }"
          >ACG</span
        >
      </div>
    </div>
    <div class="playlist-wrap">
      <div @click="goDetail(item.id)" class="items" v-for="(item, index) in playlists" :key="index">
        <div class="img-wrap">
          <el-image :src="item.coverImgUrl" alt="" lazy></el-image>
          <span class="play-count">{{ item.playCount | dataFormat }}</span>
          <span class="iconfont icon-yonghu"
            ><span>{{ item.creator.nickname }}</span></span
          >
          <span class="iconfont icon-play"></span>
        </div>
        <p>{{ item.name }}</p>
      </div>
    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="pageNum"
      :page-size="pageSize"
    ></el-pagination>
  </div>
</template>

<script>
import { getTopPlaylist, getPlaylist } from '../../../api/data';

export default {
  data() {
    return {
      topPlaylist: {},
      tag: '华语',
      playlists: [],
      total: 0,
      pageNum: 1,
      pageSize: 100
    };
  },
  created() {
    this._getTopPlaylist()
    this._getPlaylist()
  },
  methods: {
    _getTopPlaylist() {
      getTopPlaylist({ cat: this.tag, limit: 1 }).then(res => {
        this.topPlaylist = res.data.playlists[0]
      })
    },
    _getPlaylist() {
      getPlaylist({
        cat: this.tag,
        limit: this.pageSize,
        total: true,
        offset: (this.pageNum - 1) * this.pageSize
      }).then(res => {
        this.total = res.data.total
        this.playlists = res.data.playlists
      })
    },
    goDetail(id) {
      this.$router.push({ path: '/songListDetail', query: { id: id } })
    },
    handleCurrentChange(newPage) {
      this.pageNum = newPage
      this.$refs.topPlaylist.scrollIntoView({ behavior: 'instant' })
      this._getPlaylist()
    }
  },
  watch: {
    tag() {
      this._getTopPlaylist()
      this._getPlaylist()
    }
  }
};
</script>

<style lang="less" scoped>
.top-playlist {
  margin-bottom: 16px;
  border-radius: 5px;
  overflow: hidden;
  .top-wrap {
    position: relative;
    cursor: pointer;
    .top-card {
      position: relative;
      display: flex;
      padding: 16px;
      z-index: 1;
      .top-img {
        width: 140px;
        height: 140px;
        margin-right: 8px;
        border-radius: 5px;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .top-content {
        display: flex;
        flex: 1;
        flex-direction: column;
        .top-tag {
          align-self: flex-start;
          padding: 4px 14px;
          margin: 20px 0 20px 0;
          border: 1px solid currentColor;
          border-radius: 25px;
          font-size: 15px;
          color: #e7aa5a;
        }
        .top-name {
          margin-bottom: 8px;
          font-size: 16px;
          color: #fbfafa;
        }
        .top-writer {
          color: #b0a4a1;
          font-size: 12px;
        }
      }
    }
    .top-background {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      filter: blur(16px);
      z-index: 0;
    }
    .top-background-mask {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.5);
      z-index: 0;
    }
  }
}

.tags {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 38px;
  margin: 10px 0 7px;
  color: #333;
  .drop {
    width: 102px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    border-radius: 15px;
    border: 1px solid #d8d8d8;
    &:hover {
      cursor: pointer;
      color: #000;
      background-color: #f2f2f2;
    }
  }
  .tab-bar {
    float: left;
    .item {
      padding: 2px 9px;
      display: inline-block;
      font-size: 12px;
      color: #676767;
      cursor: default;
      text-align: center;
      border-radius: 10px;
      &:hover {
        color: #000;
      }
    }
    .active {
      color: #ec4141;
      background-color: #fdf5f5;
      &:hover {
        color: #ec4141;
      }
    }
  }
}

.playlist-wrap {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  .items {
    width: calc(25% - 20px);
    margin: 10px;
    cursor: pointer;
    overflow: hidden;
    .img-wrap {
      position: relative;
      margin-bottom: 4px;
      &:hover .icon-play {
        opacity: 1;
      }
      .el-image {
        width: 100%;
        border-radius: 5px;
      }
      .play-count {
        display: flex;
        position: absolute;
        top: 4px;
        right: 8px;
        color: #fff;
        font-size: 12px;
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
      .icon-yonghu {
        position: absolute;
        left: 5px;
        bottom: 11px;
        // 超过限制宽度就省略号显示
        max-width: 108px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: #fff;
        font-size: 12px;
        span {
          margin-left: 3px;
        }
      }
      .icon-play {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 10px;
        bottom: 13px;
        width: 40px;
        height: 40px;
        color: #ec4141;
        font-size: 20px;
        border-radius: 50%;
        background-color: #fcfcfc;
        opacity: 0;
        &::before {
          transform: translateX(2px);
        }
      }
    }
    p {
      display: -webkit-box;
      overflow: hidden;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      font-size: 14px;
      line-height: 25px;
    }
  }
}
</style>
