<template>
  <div class="footer" :style="`${JSON.stringify(currentSong) == '{}' || currentSong == '' ? 'pointer-events: none;color:gray' : ''}`">
    <div class="left">
      <img
        @click="setShowSong"
        v-if="currentSong.al"
        :src="currentSong.al.picUrl"
        alt=""
      />
      <img @click="setShowSong" v-if="currentSong.album" :src="currentSong.album.blurPicUrl" alt="">
      <img @click="setShowSong" v-if="currentSong.picUrl" :src="currentSong.picUrl" alt="">
      <div v-if="currentSong.id" class="desc">
        <div class="wrap">
          <p @click="setShowSong" class="song">{{ currentSong.name }}</p>
          <span
            title="喜欢"
            @click="like = !like"
            :class="`iconfont ${like ? 'icon-aixin' : 'icon-like-line'}`"
          ></span>
        </div>
        <p v-if="currentSong.ar" @click.stop="setShowSong(),$router.push({path:'/singerDetail', query:{id:currentSong.ar[0].id}})" class="singer">{{ currentSong.ar[0].name }}</p>
        <p v-if="currentSong.artists" @click.stop="setShowSong(),$router.push({path:'/singerDetail', query:{id:currentSong.artists[0].id}})" class="singer">{{ currentSong.artists[0].name }}</p>
        <p v-if="currentSong.song" @click.stop="setShowSong(),$router.push({path:'/singerDetail', query:{id:currentSong.artists[0].id}})" class="singer">{{currentSong.song.artists[0].name}}</p>
      </div>
    </div>
    <div class="content">
      <div class="controller">
        <span @click="changeMode" :title="this.currentModeName" :class="`iconfont icon-${this.currentMode}`"></span>
        <span @click="lastSong" title="上一首" class="iconfont icon-shangyishou"></span>
        <span
          :title="isPlaying === true ? '暂停' : '播放' "
          @click="playAudio"
          :class="`iconfont ${ isPlaying ? 'icon-zanting': 'icon-play'}`"
        ></span>
        <span @click="nextSong" title="下一首" class="iconfont icon-xiayishou"></span>
        <span title="打开歌词" class="iconfont icon-ci"></span>
      </div>
      <div class="player">
        <audio v-if="currentSong"
          autoplay
          @canplay="getDuration"
          @timeupdate="updateTime"
          @ended="finish"
          :src="`https://music.163.com/song/media/outer/url?id=${currentSong.id}.mp3`"
          ref="audio"
        ></audio>
        <span v-if="currentSong" class="currentTime">{{ currentTime | timeFormat1 }}</span>
        <el-slider
        v-if="currentSong"
          :show-tooltip="false"
          v-model="currentTime"
          :max="duration"
          style="width: 394px"
          @change="getCurrentTime"
        ></el-slider>
        <el-slider
        v-else
          :show-tooltip="false"
          :max="duration"
          style="width: 394px"
          @change="getCurrentTime"
        ></el-slider>
        <span v-if="currentSong" class="duration">{{ duration | timeFormat1 }}</span>
      </div>
    </div>
    <div class="right">
      <span class="bz">标准</span>
      <span
        title="打开音效"
        class="iconfont icon-jingyunyinxiaopt-wangyiicon"
      ></span>
      <span
        @click="mute"
        :title="volume === 0 ? '恢复音量' : '静音'"
        :class="volume === 0 ? 'iconfont icon-jingyin' : 'iconfont icon-laba'"
      ></span>
      <el-slider
        :show-tooltip="false"
        v-model="volume"
        :max="max"
        :step="0.1"
        @input="getCurrentVolume"
      ></el-slider>
      <span
        @click="setShowPlaylist"
        title="打开播放列表"
        class="iconfont icon-playlist-bottom"
      ></span>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
export default {
  data() {
    return {
      like: false,
      duration: 0,
      currentTime: 0,
      id: '1832613147',
      volume: 0.4,
      max: 1,
      btnName: 'icon-play',
      playMode: [
        'shunxubofang',
        'liebiaoxunhuan',
        'danquxunhuan',
        'suijibofang'
      ],
      currentMode: 'shunxubofang',
      currentModeName: '顺序播放'
    }
  },
  methods: {
    getDuration() {
      this.duration = Math.round(this.$refs.audio.duration)
      this.$refs.audio.volume = this.volume
      this.$refs.audio.muted = this.muted
    },
    playAudio() {
      if (this.isPlaying === true) {
        this.setPlayStatus(false)
        this.$refs.audio.pause()
      } else {
        this.setPlayStatus(true)
        this.$refs.audio.play()
      }
    },
    updateTime(e) {
      // console.log(e.target.currentTime);
      this.setSongCurrentTime(e.target.currentTime)
      this.currentTime = Math.round(e.target.currentTime)
    },
    finish() {
      const index = this.playList.indexOf(this.currentSong)
      const random = Math.floor(Math.random() * this.playList.length)
      const lastSong = this.playList.length - 1
      switch (this.currentModeName) {
        case '顺序播放':
          console.log(index)
          if (index === lastSong) {
            this.$message({
              type: 'warning',
              message: '已经播放完了最后一首，快去添加新的音乐吧',
              duration: 3000
            })
            // this.$refs.audio.pause()
          } else {
            this.$store.state.currentSong = this.$store.state.playList[index + 1]
            this.$store.state.isPlaying = true
          }
          break
        case '列表循环':
          if (index === lastSong) {
            this.$store.state.currentSong = this.$store.state.playList[0]
          } else {
            this.$store.state.currentSong = this.$store.state.playList[index + 1]
          }
          this.$store.state.isPlaying = true
          break
        case '单曲循环':
          // this.loop = true
          this.$refs.audio.load()
          break
        case '随机播放':
          this.$store.state.currentSong = this.$store.state.playList[random]
          this.$store.state.isPlaying = true
          break
      }
      if (this.currentModeName !== '单曲循环' && index === lastSong) {
        this.setPlayStatus(false)
      }
    },
    // bug1
    getCurrentTime(val) {
      // console.log(val);
      this.currentTime = this.$refs.audio.currentTime = val
    },
    getCurrentVolume(val) {
      this.volume = this.$refs.audio.volume = val
    },
    ...mapMutations(['setPlayStatus', 'setShowSong', 'setShowPlaylist', 'setSongCurrentTime']),
    mute() {
      // if (this.$refs.audio.muted = true) {
      //   this.$refs.audio.muted = false
      // } else {
      //   this.$refs.audio.muted = true
      // }
      this.$refs.audio.muted = !this.$refs.audio.muted
      if (this.$refs.audio.muted === true) {
        this.volume = 0
      } else {
        this.volume = 0.4
      }
    },
    changeMode() {
      const index = this.playMode.indexOf(this.currentMode)
      if (index === this.playMode.length - 1) {
        this.currentMode = this.playMode[0]
      } else {
        this.currentMode = this.playMode[index + 1]
      }
    },
    lastSong() {
      const index = this.playList.indexOf(this.currentSong)
      const lastSong = this.playList.length - 1
      const random = Math.floor(Math.random() * this.playList.length)
      if (this.currentModeName === '随机播放') {
        this.$store.state.currentSong = this.$store.state.playList[random]
      } else {
        if (index === 0) {
          this.$store.state.currentSong = this.$store.state.playList[lastSong]
        } else {
          this.$store.state.currentSong = this.$store.state.playList[index - 1]
        }
      }
      this.$store.state.isPlaying = true
      this.$refs.audio.play()
    },
    nextSong() {
      const index = this.playList.indexOf(this.currentSong)
      const random = Math.floor(Math.random() * this.playList.length)
      if (this.currentModeName === '随机播放') {
        this.$store.state.currentSong = this.$store.state.playList[random]
      } else {
        if (index === this.playList.length - 1) {
          this.$store.state.currentSong = this.$store.state.playList[0]
        } else {
          this.$store.state.currentSong = this.$store.state.playList[index + 1]
        }
      }
      this.$store.state.isPlaying = true
      this.$refs.audio.play()
    }
  },
  computed: {
    ...mapState(['currentSong', 'playList', 'isPlaying', 'showPlaylist', 'songCurrentTime'])
  },
  watch: {
    currentMode() {
      switch (this.currentMode) {
        case 'shunxubofang':
          this.currentModeName = '顺序播放'
          break
        case 'liebiaoxunhuan':
          this.currentModeName = '列表循环'
          break
        case 'danquxunhuan':
          this.currentModeName = '单曲循环'
          break
        case 'suijibofang':
          this.currentModeName = '随机播放'
          break
      }
    }
  }
}
</script>

<style lang="less" scoped>
.footer {
  display: flex;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 72px;
  border-top: 1px solid #e1e1e1;
  background-color: #f6f6f8;
  .left {
    display: flex;
    width: 272px;
    height: 100%;
    img {
      width: 51px;
      height: 51px;
      margin: 10px;
      border-radius: 5px;
      cursor: pointer;
    }
    .desc {
      align-self: center;
      .wrap {
        display: flex;
        .song {
          max-width: 155px;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
          font-size: 15px;
          cursor: pointer;
        }
        .icon-like-line {
          margin-left: 2px;
          align-self: center;
          font-size: 20px;
          cursor: pointer;
        }
        .icon-aixin {
          margin-left: 2px;
          align-self: center;
          color: #ec4141;
          font-size: 20px;
        }
      }
      .singer {
        margin-top: 7px;
        max-width: 130px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 13px;
        cursor: pointer;
      }
    }
  }
  .content {
    display: flex;
    padding: 10px 0;
    flex-direction: column;
    align-items: center;
    flex: 1;
    .controller {
      display: flex;
      align-items: center;
      .iconfont {
        margin: 0 16px;
        font-size: 16.5px;
        font-weight: 600;
        cursor: pointer;
        &:hover {
          color: #ed6566;
        }
      }
      .icon-zanting {
        text-align: center;
        line-height: 30px;
        width: 30px;
        height: 30px;
        font-size: 18px;
        background-color: #ebebed;
        border-radius: 50%;
        &:hover {
          color: #000;
          background-color: #ddddde;
        }
      }
      .icon-play {
        text-align: center;
        line-height: 30px;
        width: 30px;
        height: 30px;
        font-size: 14px;
        background-color: #ebebed;
        border-radius: 50%;
        &:hover {
          color: #000;
          background-color: #ddddde;
        }
      }
    }
    .player {
      display: flex;
      .currentTime {
        font-size: 10px;
        color: #99999b;
        padding-right: 4px;
        line-height: 35px;
      }
      .duration {
        font-size: 10px;
        color: #99999b;
        padding-left: 4px;
        line-height: 35px;
      }
    }
  }
  .right {
    display: flex;
    align-items: center;
    width: 272px;
    .iconfont {
      font-weight: 600;
      font-size: 20px;
      cursor: pointer;
    }
    .bz {
      margin-left: 30px;
      padding: 0.5px 3px;
      border: 1px solid;
      font-size: 11px;
      cursor: pointer;
    }
    .icon-jingyunyinxiaopt-wangyiicon {
      margin-left: 26px;
    }
    .icon-laba {
      margin-left: 20px;
    }
    .icon-jingyin {
      margin-left: 20px;
    }
    .el-slider {
      margin: 0 22px 0 6px;
      width: 55px;
    }
  }
}
</style>
