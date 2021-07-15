<template>
  <div class="content" @click="hidePanel">
    <div class="nav">
      <ul>
        <router-link to="/discovery">
          <li>发现音乐</li>
        </router-link>
        <router-link to="/video">
          <li>视频</li>
        </router-link>
        <router-link to="/friends">
          <li>朋友</li>
        </router-link>
        <router-link to="/stream">
          <li>直播</li>
        </router-link>
        <router-link to="/fm">
          <li>私人FM</li>
        </router-link>
      </ul>
    </div>
    <div class="main">
      <router-view></router-view>
    </div>
    <div class="play-list" id="panel" v-show="showPlaylist">
      <div class="title" v-if="list">
        <span
          @click="change(index)"
          :class="currentIndex == index ? 'active' : ''"
          v-for="(item,index) in list"
          :key="item.id"
          >{{ item.title }}</span
        >
      </div>
      <div class="count" :style="{ display: page1 }">
        <div>
          <span>总{{ playList.length }}首</span>
          <span @click="clearPlaylist(),setShowSong1()"
            ><i class="iconfont icon-icon_huabanfuben"></i>清空</span
          >
        </div>
        <ul v-if="playList">
          <li
            v-for="(item,index) in playList"
            :key="index"
            @dblclick="play(item)"
            :class="{ active: currentSong.id === item.id }"
          >
            <span v-if="item">{{ item.name }}</span>
            <span v-if="item.ar">{{ item.ar[0].name }}</span>
            <span v-if="item.artists">{{item.artists[0].name}}</span>
            <span v-if="item.song">{{item.song.artists[0].name}}</span>
            <span v-if="item.dt">{{item.dt | timeFormat}}</span>
            <span v-if="item.duration">{{item.duration | timeFormat}}</span>
            <span v-if="item.song">{{item.song.duration | timeFormat}}</span>
          </li>
        </ul>
        <div class="list" v-else>
          <p>你还没有添加任何歌曲！</p>
          <p>
            去首页<router-link @click.native="closeShowPlaylist" to="/discovery"
              >发现音乐</router-link
            >
          </p>
        </div>
      </div>
      <div class="count" :style="{ display: page2 }">
        <div>
          <span>总{{ playHistory.length }}首</span>
          <span @click="clearPlayHistory"
            ><i class="iconfont icon-icon_huabanfuben"></i>清空</span
          >
        </div>
        <ul v-if="playHistory">
          <li
            v-for="(item,index) in playHistory"
            :key="index"
            @dblclick="play(item)"
          >
            <span v-if="item">{{ item.name }}</span>
            <span v-if="item.ar">{{ item.ar[0].name }}</span>
            <span v-if="item.artists">{{item.artists[0].name}}</span>
            <span v-if="item.song">{{item.song.artists[0].name}}</span>
            <span v-if="item.dt">{{item.dt | timeFormat}}</span>
            <span v-if="item.duration">{{item.duration | timeFormat}}</span>
            <span v-if="item.song">{{item.song.duration | timeFormat}}</span>
          </li>
        </ul>
        <div class="history" v-else>
          <p>你还没有播放任何歌曲！</p>
          <p>去首页<a href="">发现音乐</a></p>
        </div>
      </div>
    </div>
    <transition name="fade">
      <div class="box" v-show="showSong">
        <div class="current_song">
          <div><span>{{currentSong.name}}</span></div>
          <div><span v-if="currentSong.alia">{{currentSong.alia[0]}}</span></div>
          <div><span v-if="currentSong.ar">{{currentSong.ar[0].name}} - {{currentSong.al.name}}</span></div>
          <div><span v-if="currentSong.artists">{{currentSong.artists[0].name}}</span></div>
          <div><span v-if="currentSong.song">{{currentSong.song.artists[0].name}}</span></div>
        </div>
        <div class="song_wrap">
          <div class="img_wrap">
            <img :class="`play_bar ${isPlaying ? '' : 'pause_bar'}`" src="../assets/play-bar.png" alt="">
            <div class="box1"></div>
            <div class="box2"></div>
            <img v-if="currentSong.al" :class="`song_img ${isPlaying ? '' : 'pause_img'}`" :src="currentSong.al.picUrl" alt="">
            <img v-if="currentSong.album" :src="currentSong.album.blurPicUrl" :class="`song_img ${isPlaying ? '' : 'pause_img'}`" alt="">
            <img v-if="currentSong.picUrl" :class="`song_img ${isPlaying ? '' : 'pause_img'}`" :src="currentSong.picUrl" alt="">
          </div>
          <div class="lyric_wrap" v-if="lyricList" ref="lyric">
            <p v-for="(item, index) in lyricList" :key="item.id" class="lyric_item" :class="index === lyricIndex ? 'active': ''">{{item[1]}}</p>
          </div>
          <div class="similar" v-if="simiPlaylist">
            <div class="similar_wrap">
              <p class="similar_title" v-if="simiPlaylist.length !== 0">包含这首歌的歌单</p>
              <div @click="goDetail(item.id),setShowSong()" class="similar_item" v-for="item in simiPlaylist" :key="item.id">
                <img :src="item.coverImgUrl" alt="">
                <p>{{item.name}}</p>
              </div>
              <p  class="similar_title">喜欢这首歌的人也听</p>
              <div @click="setCurrentSong(item),savePlaylist(item),savePlayHistory(item)" class="similar_item" v-for="item in simiSong" :key="item.id">
                <img :src="item.album.blurPicUrl" alt="">
                <p v-if="item.name">{{item.name}} - {{item.artists[0].name}}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="comment_wrap">
          <div class="comment" v-if="hotComments">
            <p>全部评论({{total}})</p>
            <div class="item" v-for="item in hotComments" :key="item.id">
              <img :src="item.user.avatarUrl" alt="">
              <div class="user_comment">
                <div class="comment_detail"><span v-if="item.user">{{item.user.nickname}}: </span>{{item.content}}</div>
                <div v-if="item.beReplied.length != 0" class="comment_replied"><span>@{{item.beReplied[0].user.nickname}}: </span>{{item.beReplied[0].content ? item.beReplied[0].content : '该评论已删除'}}</div>
                <div class="comment_time">
                  <span class="time">{{item.time | dateFormat}}</span>
                  <div class="icon">
                    <span>举报</span>
                    <span class="iconfont icon-dianzan">{{item.likedCount}}</span>
                    <span class="iconfont icon-fenxiang1"></span>
                    <span class="iconfont icon-pinglun"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="comment" v-if="comments">
            <p class="new_comment">最新评论({{total}})</p>
            <div class="item" v-for="item in comments" :key="item.id">
              <img :src="item.user.avatarUrl" alt="">
              <div class="user_comment">
                <div class="comment_detail"><span v-if="item.user">{{item.user.nickname}}: </span>{{item.content}}</div>
                <div v-if="item.beReplied.length != 0" class="comment_replied"><span>@{{item.beReplied[0].user.nickname}}: </span>{{item.beReplied[0].content ? item.beReplied[0].content : '该评论已删除'}}</div>
                <div class="comment_time">
                  <span class="time">{{item.time | dateFormat}}</span>
                  <div class="icon">
                    <span>举报</span>
                    <span class="iconfont icon-dianzan">{{item.likedCount}}</span>
                    <span class="iconfont icon-fenxiang1"></span>
                    <span class="iconfont icon-pinglun"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getComment, getLyric, getSimiPlaylist, getSimgSong } from '../api/data'

export default {
  data() {
    return {
      currentIndex: 0,
      list: [{
        id: 1,
        title: '播放列表'
      }, {
        id: 2,
        title: '历史记录'
      }],
      page1: 'block',
      page2: 'none',
      comments: [],
      hotComments: [],
      total: '',
      lyricList: [],
      lyricIndex: -1,
      simiPlaylist: [],
      simiSong: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    play(item) {
      this.setCurrentSong(item)
      this.setPlayStatus(true)
      this.savePlaylist(item)
      this.savePlayHistory(item)
      // console.log(item.id);
      // console.log(this.currentSong.id);
      // this.$refs.play.playAudio()
    },
    // 点击空白区域关闭播放列表
    hidePanel(e) {
      var pl = document.getElementById('panel')
      if (!pl.contains(e.target)) {
        this.closeShowPlaylist()
      }
    },
    change(index) {
      this.currentIndex = index
      if (this.currentIndex === 0) {
        this.page1 = 'block'
        this.page2 = 'none'
      } else {
        this.page2 = 'block'
        this.page1 = 'none'
      }
    },
    ...mapMutations(['setCurrentSong', 'setPlayStatus', 'savePlaylist', 'clearPlaylist', 'savePlayHistory', 'clearPlayHistory', 'closeShowPlaylist', 'setShowSong', 'setShowSong1']),
    _getComment() {
      getComment({ id: this.currentSong.id }).then(res => {
        // console.log(res);
        this.comments = res.data.comments
        this.hotComments = res.data.hotComments
        this.total = res.data.total
      })
    },
    _getLyric() {
      getLyric({ id: this.currentSong.id }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          // 保存请求到的歌词数据
          var lyricStr = res.data.lrc.lyric
          var lyricStrList = lyricStr.split('\n')
          // console.log(lyricStrList);
          // 存储最终处理完的数据
          var lyricList = []
          // 设置正则
          var re = /\[\d{2}:\d{2}.\d{2,3}\]/
          for (var i = 0; i < lyricStrList.length; i++) {
            // 拆分时间和歌词
            var date = lyricStrList[i].match(re)
            // console.log(date);
            // 判断时间数组不能为空
            if (date != null) {
              // 拿到歌词 替换字符串
              var lyric = lyricStrList[i].replace(re, '')
              // console.log(lyric);
              // 拿到时间字符串
              var timeStr = date[0]
              // console.log(timeStr);
              // 判断时间字符串是否为空
              if (timeStr != null) {
                // 删掉括号
                var timeSlice = timeStr.slice(1, -1)
                // 拆分分钟和秒数
                var splitList = timeSlice.split(':')
                // console.log(splitList);
                var m = splitList[0]
                var s = splitList[1]
                // 计算总秒数
                var second = parseFloat(m) * 60 + parseFloat(s)
                // console.log(second);
                lyricList.push([second, lyric])
              }
            }
          }
          this.lyricList = lyricList
          // console.log(this.lyricList);
        }
      })
    },
    _getSimiPlaylist() {
      getSimiPlaylist({ id: this.currentSong.id }).then(res => {
        this.simiPlaylist = res.data.playlists
      })
    },
    _getSimgSong() {
      getSimgSong({ id: this.currentSong.id }).then(res => {
        this.simiSong = res.data.songs
      })
    },
    getData() {
      if (JSON.stringify(this.currentSong) !== '{}') {
        this._getComment()
        this._getLyric()
        this._getSimiPlaylist()
        this._getSimgSong()
      }
    },
    goDetail(id) {
      this.$router.push({ path: '/songListDetail', query: { id: id } })
    }
  },
  computed: {
    ...mapState(['currentSong', 'playList', 'playHistory', 'showSong', 'showPlaylist', 'isPlaying', 'songCurrentTime'])
  },
  watch: {
    currentSong() {
      this.getData()
    },
    songCurrentTime() {
      for (var i = 0; i < this.lyricList.length; i++) {
        if (this.lyricList[i][0] < this.songCurrentTime && this.songCurrentTime < this.lyricList[i + 1][0]) {
          this.lyricIndex = i
        }
      }
    },
    lyricIndex() {
      if (this.lyricIndex > 5) {
        this.$refs.lyric.scrollTop = (this.lyricIndex - 3) * 40
      }
    }
  }
};
</script>

<style lang="less" scoped>
.content {
  display: flex;
  width: 100%;
  // 减去header的高度
  height: calc(100% - 60px);
  .nav {
    width: 200px;
    // 减去footer的高度
    height: calc(100% - 72px);
    border-right: 1px solid #e1e1e1;
    overflow: hidden;
    &:hover {
      overflow-y: auto;
    }
    ul {
      padding-top: 10px;
      margin: 0 12px 13px;
      li {
        margin-bottom: 2px;
        padding: 8px 5px;
        font-size: 15px;
        color: #333;
        border-radius: 5px;
        &:hover {
          background-color: #f5f5f6;
        }
        cursor: pointer;
        i {
          margin-right: 8px;
        }
      }
      &:nth-child(1) > a.router-link-active {
        li {
          font-size: 17px;
          background-color: #f5f5f6;
          font-weight: 600;
        }
      }
      li:hover {
        color: #000000;
      }
    }
    div {
      font-size: 14px;
      color: #c0c0c0;
      padding-left: 20px;
    }
    .creat-playlist {
      margin: 20px 0;
    }
  }
  .main {
    position: relative;
    flex: 1;
    width: 100%;
    // 减去footer的高度
    height: calc(100% - 72px);
    min-width: 768px;
    padding: 12px 30px;
    margin-bottom: 30px;
    overflow-y: auto;
  }
  .play-list {
    position: absolute;
    right: 0;
    width: 420px;
    height: calc(100% - 72px - 60px);
    overflow: auto;
    background-color: #fff;
    box-shadow: -6px 0px 10px 0 rgba(0, 0, 0, 0.2);
    z-index: 10;
    .title {
      width: 194px;
      height: 27px;
      margin: 20px auto;
      text-align: center;
      border-radius: 25px;
      border: 1px solid #bbbbbb;
      overflow: hidden;
      span {
        padding: 4px 20px;
        font-size: 14px;
        border-radius: 25px;
        cursor: pointer;
      }
      .active {
        color: #fff;
        background-color: #bbbbbb;
      }
    }
    .count {
      div:nth-child(1) {
        display: flex;
        margin: 0 20px;
        padding-bottom: 14px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #f3f3f2;
        span:nth-child(1) {
          font-size: 14px;
          color: #cccccc;
          cursor: default;
        }
        span:nth-child(2) {
          font-size: 14px;
          color: #676767;
          cursor: pointer;
        }
      }
      ul {
        li {
          position: relative;
          display: flex;
          padding: 8px 20px;
          font-size: 12px;
          cursor: default;
          &:nth-child(2n + 2) {
            background-color: #fafafa;
          }
          &:hover {
            background-color: #f5f5f5;
            span {
              color: #333;
            }
          }
          &.active {
            background-color: #e6e6e6;
            span:nth-child(-n + 2) {
              color: #ec4141;
            }
          }
          span:nth-child(1) {
            position: relative;
            flex: 1;
            max-width: 190px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          span:nth-child(2) {
            flex: 1;
            max-width: 150px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #cacaca;
          }
          span:nth-child(3) {
            text-align: center;
            color: #cacaca;
          }
        }
      }
      .list {
        p {
          text-align: center;
          font-size: 14px;
          color: #999999;
          cursor: default;
          a {
            text-decoration: underline;
          }
        }
        p:nth-child(1) {
          margin: 120px auto 20px;
        }
      }
      .history {
        p {
          text-align: center;
          font-size: 14px;
          color: #999999;
          cursor: default;
          a {
            text-decoration: underline;
          }
        }
        p:nth-child(1) {
          margin: 120px auto 20px;
        }
      }
    }
  }
  .box {
    position: absolute;
    width: 100%;
    height: calc(100% - 60px - 71px);
    overflow-y: auto;
    z-index: 2;
    background-color: #fff;
    .current_song{
      height: 110px;
      text-align: center;
      div{
        &:nth-child(1){
          padding: 12px 0 10px;
          font-size: 28px;
          color: #323231;
        }
        &:nth-child(n + 2){
          padding-bottom: 4px;
          font-size: 15px;
          color: #E8E8E7;
        }
        &:nth-child(3){
          span{
            cursor: pointer;
          }
        }
      }
    }
    .song_wrap{
      display: flex;
      height: 322px;
      max-height: 526px;
      .img_wrap{
        position: relative;
        flex: 1;
        .play_bar{
          position: absolute;
          top: -50px;
          left: calc(50% - 10px);
          width: 100px;
          height: 160px;
          z-index: 3;
          transform-origin: 0 0;
          transition: all .4s;
        }
        .pause_bar{
          transform: rotate(-20deg);
        }
        .box1{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 260px;
          height: 260px;
          background-color: #E0E0E0;
          border-radius: 50%;
        }
        .box2{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 240px;
          height: 240px;
          margin: auto;
          background-color: #222325;
          border-radius: 50%;
        }
        .song_img{
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          animation: playing 40s linear infinite;
        }
        @keyframes playing {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        .pause_img {
          animation-play-state: paused;
        }
      }
      .lyric_wrap{
        width: 33%;
        text-align: center;
        overflow-y: auto;
        .lyric_item{
          height: 40px;
          font-size: 14px;
          color: #A6A6A6;
          overflow: hidden;
        }
        .active {
          color: #000;
          font-size: 16px;
          font-weight: 600;
        }
      }
      .similar{
        flex: 1;
        overflow-y: auto;
        .similar_wrap {
          margin: 10px 40px 0;
          .similar_title {
            font-size: 15px;
            font-weight: 600;
            padding-left: 10px;
            margin: 10px 0;
          }
          .similar_item{
            display: flex;
            // margin: 10px 0;
            padding: 8px;
            cursor: pointer;
            &:hover {
              background-color: #E6E0E1;
              border-radius: 5px;
            }
            img{
              width: 30px;
              height: 30px;
              border-radius: 5px;
            }
            p {
              padding-left: 10px;
              font-size: 13px;
              line-height: 30px;
              white-space: nowrap;
              text-overflow: ellipsis;
              overflow: hidden;
            }
          }
        }
      }
    }
    .comment_wrap{
      padding: 10px 0 20px;
      .comment{
        width: 562px;
        margin: 0 auto;
        p{
          margin-top: 10px;
          font-size: 15px;
          font-weight: 600;
        }
        .new_comment{
          margin-top: 20px;
        }
        .item{
          display: flex;
          width: 100%;
          padding: 18px 0;
          border-bottom: 1px solid #F1F1F1;
          &:last-child{
            border-bottom: none;
          }
          img{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 16px;
            cursor: pointer;
          }
          .user_comment{
            width: 100%;
            &:hover{
              .comment_time{
                .icon {
                  span:nth-child(1){
                    display: inline-block;
                  }
                }
              }
            }
            .comment_detail{
              font-size: 14px;
              span{
                color: #507DAF;
                cursor: pointer;
              }
            }
            .comment_replied{
              font-size: 14px;
              background-color: #F5F5F5;
              padding: 10px;
              margin-top: 10px;
              border-radius: 10px;
              span{
                color: #507DAF;
                cursor: pointer;
              }
            }
            .comment_time{
              display: flex;
              justify-content: space-between;
              font-size: 13px;
              margin-top: 8px;
              .time{
                cursor: default;
                color: #A8A8A9;
              }
              .icon{
                span{
                  font-size: 14px;
                  cursor: pointer;
                  &:nth-child(1){
                    display: none;
                  }
                  &:nth-child(-n + 3){
                    padding: 0 10px;
                    border-right: 1px solid #D9D9D9;
                  }
                  &:nth-child(4){
                    padding-left: 10px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.5s;
  }
  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
}
</style>
