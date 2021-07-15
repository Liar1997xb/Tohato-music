<template>
  <div>
    <div class="singer">
      <el-image fit="cover" :src="artist.cover"></el-image>
      <div class="singer_detail">
        <span class="name">{{artist.name}}</span>
        <div>单曲数:{{artist.musicSize}}</div>
        <div>专辑数:{{artist.albumSize}}</div>
        <div>MV数:{{artist.mvSize}}</div>
      </div>
    </div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="专辑" name="first">
        <div class="items">
          <img src="../../assets/top50.png" />
          <div class="item">
            <div class="name">热门50首</div>
            <ul>
              <li @dblclick="play(item)" v-for="(item,index) in hotSongs10" :key="item.id">
                <div>
                  <span>{{index + 1 > 9 ? index + 1 : '0' + (index + 1)}}</span>
                  <span>{{item.name}}</span>
                </div>
                <span>{{item.dt | timeFormat}}</span>
              </li>
              <p v-if="hotSongs.length > 10" @click="showAll" :style="{display: hotSongs10.length == 50 ? 'none' : 'block' }">查看全部{{hotSongs.length}}首 ></p>
            </ul>
          </div>
        </div>
        <div class="albums" v-for="item in hotAlbums" :key="item.id">
          <div class="left">
            <el-image lazy :src="item.blurPicUrl"></el-image>
            <p>{{item.publishTime | dateFormat1}}</p>
          </div>
          <ul>
            <span class="name">{{item.name}}</span>
            <li @dblclick="play(song)" v-for="(song,index) in item.songs[0]" :key="song.id">
              <div>
                <span>{{index + 1 > 9 ? index + 1 : '0' + (index + 1)}}</span>
                <span>{{song.name}}</span>
              </div>
              <span>{{song.dt | timeFormat}}</span>
            </li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane label="MV" name="second">
        <div v-if="mvs.length" class="mv">
          <div @click="$router.push({path:'/mvDetail', query:{id:item.id,imgurl:artist.cover}})" class="mvs" v-for="item in mvs" :key="item.id">
            <div class="mv_img">
              <el-image :src="item.imgurl"></el-image>
              <span class="play_icon"></span>
              <span class="play_count">{{item.playCount | dataFormat}}</span>
              <span class="duration">{{item.duration | timeFormat}}</span>
            </div>
            <p class="mv_name">{{item.name}}</p>
          </div>
        </div>
        <div v-else class="mv_empty">没有相关MV</div>
      </el-tab-pane>
      <el-tab-pane label="歌手详情" name="third">
        <template v-if="desc.introduction.length">
          <div class="desc" v-for="item in desc.introduction" :key="item.ti">
            <span>{{item.ti}}</span>
            <p>{{item.txt}}</p>
          </div>
        </template>
        <div v-else class="desc">
          <p>{{desc.briefDesc}}</p>
        </div>
      </el-tab-pane>
      <el-tab-pane label="相似歌手" name="fourth">
        <div class="simi_artists">
          <div @click="$router.push({path:'/singerDetail', query:{id:item.id}})" class="simi_item" v-for="item in simiArtist" :key="item.id">
            <el-image :src="item.img1v1Url"></el-image>
            <span>{{item.name}}</span>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getArtistDetail, getTopSong, getAlbum, getArtistMv, getArtistDesc, getAlbumContent, getSimiArtist, getCheck } from '../../api/data'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      activeName: 'first',
      artist: [],
      hotSongs10: [],
      hotSongs: [],
      hotAlbums: [],
      albums: [],
      mvs: [],
      desc: [],
      simiArtist: []
    }
  },
  created() {
    this._getArtistDetail()
    this._getTopSong()
    this._getAlbum()
    this._getArtistMv()
    this._getArtistDesc()
    this._getSimiArtist()
  },
  methods: {
    _getArtistDetail() {
      getArtistDetail({ id: this.$route.query.id }).then(res => {
        this.artist = res.data.data.artist
      })
    },
    _getTopSong() {
      getTopSong({ id: this.$route.query.id }).then(res => {
        this.hotSongs10 = res.data.songs.slice(0, 10)
        this.hotSongs = res.data.songs
      })
    },
    _getAlbum() {
      getAlbum({ id: this.$route.query.id }).then(res => {
        this.hotAlbums = res.data.hotAlbums
        for (let i = 0; i < this.hotAlbums.length; i++) {
          getAlbumContent({ id: this.hotAlbums[i].id }).then(res => {
            this.hotAlbums[i].songs.push(res.data.songs)
          })
        }
      })
    },
    _getArtistMv() {
      getArtistMv({ id: this.$route.query.id }).then(res => {
        this.mvs = res.data.mvs
      })
    },
    _getArtistDesc() {
      getArtistDesc({ id: this.$route.query.id }).then(res => {
        this.desc = res.data
      })
    },
    _getSimiArtist() {
      getSimiArtist({ id: this.$route.query.id }).then(res => {
        this.simiArtist = res.data.artists
      })
    },
    showAll() {
      this.hotSongs10 = this.hotSongs
    },
    play(song) {
      getCheck({ id: song.id }).then(res => {
        if (res.error === '网络出错了') {
          this.$message({
            message: '该歌曲需开通会员才能播放',
            type: 'warning',
            duration: 3000
          })
        }
      })
      this.setCurrentSong(song)
      this.savePlaylist(song)
      this.savePlayHistory(song)
    },
    ...mapMutations(['setCurrentSong', 'savePlaylist', 'savePlayHistory'])
  },
  watch: {
    $route() {
      this._getArtistDetail()
      this._getTopSong()
      this._getAlbum()
      this._getArtistMv()
      this._getArtistDesc()
      this._getSimiArtist()
    }
  }
}
</script>

<style lang="less" scoped>
.singer{
  width: 100%;
  display: flex;
  margin: 16px 0 24px;
  .el-image{
    width: 184px;
    height: 184px;
    border-radius: 10px;
  }
  .singer_detail{
    margin-left: 24px;
    .name{
      font-size: 22px;
      font-weight: 600;
    }
    div{
      margin-top: 20px;
    }
  }
}

.items{
  display: flex;
  img{
    width: 152px;
    height: 152px;
  }
  .item{
    width: 100%;
    margin-left: 60px;
    .name {
      font-weight: 600;
    }
    ul {
      margin-top: 10px;
      li{
        display: flex;
        justify-content: space-between;
        padding: 7px 14px;
        font-size: 14px;
        &:nth-child(odd) {
          background-color: #F9F9F9;
        }
        span {
          color: #363636;
          &:nth-child(2) {
            margin-left: 20px;
          }
        }
      }
      li:hover{
        background-color: #F0F1F2;
      }
      p{
        padding: 8px 20px;
        color: #9B9B9B;
        font-size: 12px;
        text-align: right;
        background-color: #F9F9F9;
        cursor: pointer;
      }
    }
  }
}

.albums{
  display: flex;
  margin-top: 50px;
  .left {
    .el-image{
      width: 152px;
      height: 152px;
      border-radius: 10px;
      cursor: pointer;
    }
    p {
      margin-top: 2px;
      color: #676767;
      font-size: 12px;
    }
  }
  ul{
    width: calc(100% - 212px);
    margin-left: 60px;
    .name {
      font-weight: 600;
    }
    li{
      display: flex;
      justify-content: space-between;
      padding: 7px 14px;
      font-size: 14px;
      &:nth-child(even) {
        background-color: #F9F9F9;
      }
      span {
        color: #363636;
        &:nth-child(2) {
          margin-left: 20px;
        }
      }
    }
    li:hover{
      background-color: #F0F1F2;
    }
  }
}

.mv{
  display: flex;
  flex-wrap: wrap;
  .mvs{
    position: relative;
    padding: 10px;
    width: 33.33%;
    cursor: pointer;
    .mv_img{
      position: relative;
      .el-image{
        width: 100%;
        border-radius: 10px;
      }
      .play_icon{
        position: absolute;
        top: 7px;
        right: 40px;
        border-left: 7px solid #fff;
        border-top: 5px solid transparent;
        border-bottom: 5px solid transparent;
      }
      .play_count{
        position: absolute;
        top: 4px;
        right: 10px;
        font-size: 12px;
        color: #EDEFF1;
      }
      .duration {
        position: absolute;
        bottom: 7px;
        right: 7px;
        font-size: 12px;
        color: #EDEFF1;
      }
    }
    p{
      margin: 4px 0 10px;
      font-size: 14px;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

.mv_empty{
  padding-top: 100px;
  text-align: center;
  font-size: 14px;
  color: #676767;
}

.desc{
  span{
    font-size: 15px;
    color: #373737;
    font-weight: 600;
  }
  p{
    padding-top: 6px;
    margin-bottom: 20px;
    font-size: 14px;
    color: #676767;
    text-indent: 2em;
  }
}

.simi_artists{
  display: flex;
  flex-wrap: wrap;
  .simi_item{
    padding: 10px;
    width: 20%;
    cursor: pointer;
    .el-image{
      border-radius: 5px;
    }
    span{
      font-size: 14px;
      color: #373737;
    }
  }
}
</style>
