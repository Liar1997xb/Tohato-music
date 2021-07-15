<template>
  <div>
    <div class="user">
      <div class="avatarUrl">
        <img :src="user.avatarUrl" alt="" />
      </div>
      <div class="info">
        <div class="top">
          <h2>{{ user.nickname }}</h2>
          <div class="edit-wrap">
            <div class="level">
              <span>Lv{{ level }}</span>
              <span
                ><i
                  :class="
                    user.gender === 1 ? 'iconfont icon-nan' : 'iconfont icon-nv'
                  "
                ></i
              ></span>
            </div>
            <div class="edit">
              <i class="iconfont icon-bianji"></i>
              编辑个人信息
            </div>
          </div>
        </div>
        <div class="bottom">
          <div class="follow">
            <div>
              <span>{{ user.eventCount }}</span>
              <span>动态</span>
            </div>
            <div>
              <span>{{ user.follows }}</span>
              <span>关注</span>
            </div>
            <div>
              <span>{{ user.followeds }}</span>
              <span>粉丝</span>
            </div>
          </div>
          <div>
            <p>
              所在地区: <span>{{ user.province }}</span>
              <span>{{ user.city }}</span>
            </p>
            <p>社交网络: <i class="iconfont icon-shejiaotubiao-42"></i></p>
            <p>
              个人介绍: <span>{{ user.signature }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="creat">
      <h4>我创建的歌单</h4>
      <!-- <span class="count">({{ created }})</span> -->
      <div class="playlist-wrap">
        <div class="items" @click="goDetail(item.id)" v-for="(item, index) in createLists" :key="index">
          <div class="img-wrap">
            <img :src="item.coverImgUrl" alt="" />
            <span class="play-count">{{ item.playCount }}</span>
            <span class="iconfont icon-play"></span>
          </div>
          <span class="list-name">{{ item.name }}</span>
          <p class="song-count">{{ item.trackCount }}首</p>
        </div>
      </div>
    </div>
    <div class="collection">
      <h4>我收藏的歌单</h4>
      <!-- <span class="count">({{ sub }})</span> -->
      <div class="playlist-wrap">
        <div class="items" @click="goDetail(item.id)" v-for="(item, index) in subLists" :key="index">
          <div class="img-wrap">
            <img :src="item.coverImgUrl" alt="" />
            <span class="play-count">{{ item.playCount | dataFormat }}</span>
            <span class="iconfont icon-play"></span>
          </div>
          <span class="list-name">{{ item.name }}</span>
          <p class="song-count">{{ item.trackCount }}首</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserLevel, getSubCount, getUserPlaylist } from '../../../api/data'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // level: '',
      // created: '',
      // sub: '',
      createLists: [],
      subLists: []
    }
  },
  created() {
    // this._getUserLevel()
    // this._getSubCount()
    this._getUserPlaylist()
  },
  methods: {
    // _getUserLevel() {
    //   getUserLevel().then(res => {
    //     this.level = res.data.data.level
    //   })
    // },
    // _getSubCount() {
    //   getSubCount().then(res => {
    //     this.created = res.data.createdPlaylistCount
    //     this.sub = res.data.subPlaylistCount
    //   })
    // },
    _getUserPlaylist() {
      getUserPlaylist({ uid: this.user.userId }).then(res => {
        this.createLists = res.data.playlist.slice(0, 6)
        // console.log(this.createLists);
        this.subLists = res.data.playlist.slice(6)
        // console.log(this.subLists);
      })
    },
    goDetail(id) {
      this.$router.push({ path: '/songListDetail', query: { id: id } })
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style lang="less" scoped>
.user {
  display: flex;
  margin: 18px 0 26px;
  .avatarUrl {
    width: 186px;
    height: 186px;
    border: 2px solid #F5F5F5;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .info {
    flex: 1;
    margin-left: 20px;
    .top {
      border-bottom: 1px solid #e5e5e5;
      h2 {
        font-size: 22px;
        color: #373737;
      }
      .edit-wrap {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        .level {
          span {
            &:nth-child(1) {
              padding: 1px 6px;
              border-radius: 25px;
              background-color: #f0f0f0;
              font-size: 10px;
              cursor: pointer;
            }
            &:nth-child(2) {
              margin-left: 8px;
              i {
                width: 1px;
                padding: 1px;
                font-size: 14px;
                color: #72c2e4;
                background-color: #c0f3ff;
                border-radius: 50%;
              }
            }
          }
        }
        .edit {
          padding: 5px 14px;
          font-size: 14px;
          color: #373737;
          border: 1px solid #ccc;
          border-radius: 25px;
          cursor: pointer;
          &:hover {
            background-color: #f2f2f2;
          }
          i {
            padding-right: 2px;
          }
        }
      }
    }
    .bottom {
      .follow {
        display: flex;
        margin: 10px 0;
        div:nth-child(1) {
          width: 50px;
          border-right: 1px solid #e6e6e6;
        }
        div:nth-child(2) {
          width: 90px;
          border-right: 1px solid #e6e6e6;
          span {
            text-align: center;
          }
        }
        div:nth-child(3) {
          padding-left: 26px;
        }
        div:nth-child(-n + 3) {
          display: flex;
          flex-direction: column;
          span {
            cursor: pointer;
          }
          span:nth-child(1) {
            font-size: 20px;
            color: #373737;
          }
          span:nth-child(2) {
            font-size: 12px;
            color: #676767;
          }
        }
      }
      &:nth-child(2) div {
        p {
          font-size: 13px;
          color: #373737;
          margin-bottom: 7px;
          cursor: default;
          span {
            color: #676767;
          }
          &:nth-child(2) i {
            font-size: 20px;
            color: #e64b4e;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.creat {
  h4 {
    display: inline-block;
    color: #373737;
  }
  .count {
    margin-left: 8px;
    font-size: 12px;
    color: #676767;
  }
  .playlist-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    .items {
      position: relative;
      width: 25%;
      padding: 8px;
      margin-bottom: 30px;
      .img-wrap {
        position: relative;
        cursor: pointer;
        &:hover .icon-play {
          opacity: 1;
        }
        img {
          width: 100%;
          border-radius: 5px;
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
            margin-right: 2px;
            align-self: center;
            border-left: 8px solid #fff;
            border-bottom: 5px solid transparent;
            border-top: 5px solid transparent;
          }
        }
        .icon-play {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 40px;
          height: 40px;
          right: 8px;
          bottom: 8px;
          border-radius: 50%;
          font-size: 18px;
          color: #ec4141;
          background-color: #fcfbfb;
          transition: all 0.6s;
          opacity: 0;
          &::before {
            transform: translateX(2px);
          }
        }
      }
      .list-name {
        font-size: 14px;
        cursor: pointer;
      }
      .song-count {
        font-size: 12px;
        color: #9f9f9f;
        margin-top: 4px;
        cursor: default;
      }
    }
  }
}

.collection {
  h4 {
    display: inline-block;
    color: #373737;
  }
  .count {
    margin-left: 8px;
    font-size: 12px;
    color: #676767;
  }
  .playlist-wrap {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    .items {
      position: relative;
      width: 25%;
      padding: 8px;
      margin-bottom: 30px;
      .img-wrap {
        position: relative;
        cursor: pointer;
        &:hover .icon-play {
          opacity: 1;
        }
        img {
          width: 100%;
          border-radius: 5px;
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
            margin-right: 2px;
            align-self: center;
            border-left: 8px solid #fff;
            border-bottom: 5px solid transparent;
            border-top: 5px solid transparent;
          }
        }
        .icon-play {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;
          width: 40px;
          height: 40px;
          right: 8px;
          bottom: 8px;
          border-radius: 50%;
          font-size: 18px;
          color: #ec4141;
          background-color: #fcfbfb;
          transition: all 0.6s;
          opacity: 0;
          &::before {
            transform: translateX(2px);
          }
        }
      }
      .list-name {
        font-size: 14px;
        cursor: pointer;
      }
      .song-count {
        font-size: 12px;
        color: #9f9f9f;
        margin-top: 4px;
        cursor: default;
      }
    }
  }
}
</style>
