<template>
  <div>
    <div class="result">找到 {{ searchResult }} {{ activeName }}</div>
    <el-tabs v-model="activeName" @tab-click="changeResult">
      <el-tab-pane label="单曲" name="首单曲">
        <el-table
          @row-dblclick="rowClick"
          :data="song.songs"
          style="width: 100%"
          stripe
        >
          <el-table-column type="index" width="46"></el-table-column>
          <el-table-column prop="name" label="音乐标题" width="180">
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" width="180">
          </el-table-column>
          <el-table-column prop="al.name" label="专辑"></el-table-column>
          <el-table-column prop="dt" label="时长">
            <template slot-scope="scope">
              <span>{{scope.row.dt | timeFormat}}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane v-if="artist" label="歌手" name="位歌手">
        {{ artist.artistCount }}
      </el-tab-pane>
      <el-tab-pane v-if="album" label="专辑" name="张专辑">
        {{ album.albumCount }}
      </el-tab-pane>
      <el-tab-pane v-if="video" label="视频" name="个视频">
        {{ video.videoCount }}
      </el-tab-pane>
      <el-tab-pane v-if="songList" label="歌单" name="个歌单">
        {{ songList.playlistCount }}
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getCloudSearch } from '../../api/data'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      activeName: '首单曲',
      searchResult: '',
      song: '',
      artist: '',
      album: '',
      video: '',
      songList: ''
    }
  },
  created() {
    this._getCloudSearch()
  },
  methods: {
    _getCloudSearch() {
      getCloudSearch({ keywords: this.$route.query.id }).then(res => {
        this.searchResult = res.data.result.songCount
        this.song = res.data.result
        // console.log(this.song);
        // console.log(res);
      })
      getCloudSearch({
        keywords: this.$route.query.id,
        type: 100
      }).then(res => {
        this.artist = res.data.result
      })
      getCloudSearch({
        keywords: this.$route.query.id,
        type: 10
      }).then(res => {
        this.album = res.data.result
      })
      getCloudSearch({
        keywords: this.$route.query.id,
        type: 1014
      }).then(res => {
        this.video = res.data.result
      })
      getCloudSearch({
        keywords: this.$route.query.id,
        type: 1000
      }).then(res => {
        // console.log(res);
        this.songList = res.data.result
      })
    },
    changeResult(tab) {
      if (tab.name === '首单曲') {
        this.searchResult = this.song.songCount
      } else if (tab.name === '位歌手') {
        this.searchResult = this.artist.artistCount
      } else if (tab.name === '张专辑') {
        this.searchResult = this.album.albumCount
      } else if (tab.name === '个视频') {
        this.searchResult = this.video.videoCount
      } else if (tab.name === '个歌单') {
        this.searchResult = this.songList.playlistCount
      }
    },
    rowClick(row) {
      this.setCurrentSong(row)
      this.savePlaylist(row)
      this.savePlayHistory(row)
      this.setPlayStatus(true)
    },
    ...mapMutations(['setCurrentSong', 'setPlayStatus', 'savePlaylist', 'savePlayHistory'])
  },
  watch: {
    $route: function () {
      this._getCloudSearch()
    }
  }
};
</script>

<style>
.el-tabs__item {
  font-size: 14px;
  padding: 0 13px;
  color: #373737;
}

.el-tabs__item:hover {
  color: #000;
}

.el-tabs__item.is-active {
  color: #333;
  font-weight: 600;
}

.el-tabs__active-bar {
  display: none;
}

.el-table .cell {
  white-space: nowrap;
}

.result {
  margin: 12px 0;
  color: #373737;
  font-weight: 600;
}
</style>
