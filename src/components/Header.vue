<template>
  <div class="header">
    <div class="left">
      <router-link class="logo" :to="{ name: 'discovery' }">
        <span @click="setShowSong1" class="iconfont icon-wangyiyunyinle"></span>
        <div @click="setShowSong1">网易云音乐</div>
      </router-link>
      <div class="button">
        <button title="后退" @click="$router.go(-1),setShowSong1()">
          <i class="iconfont icon-icon-back"></i>
        </button>
        <button title="前进" @click="$router.go(1),setShowSong1()">
          <i class="iconfont icon-iconforward"></i>
        </button>
      </div>
      <div class="search">
        <i class="iconfont icon-sousuo" @click="goSearch(),setShowSong1()"></i>
        <input
          type="text"
          placeholder="搜索"
          v-model="inputValue"
          @click.stop="showHidden = true"
          @keyup.enter="goSearch(),setShowSong1()"
        />
        <div v-if="inputValue == ''" ref="searchPanel" class="search-wrap" v-show="showHidden">
          <div class="title">
            搜索历史<span @click="clearSearchHistory" class="iconfont icon-icon_huabanfuben"></span>
          </div>
          <div class="search-history">
            <span @click="$router.push({ path: '/search', query: {id: item}}), showHidden = false" v-for="item in searchHistory" :key="item">{{item}}
              <i @click.stop="clearSearchItem" class="el-icon-close"></i>
            </span>
          </div>
          <div class="title">热搜榜</div>
          <ul>
            <li @click="goSearchHot(item)" v-for="(item, index) in searchhot" :key="index">
              <span class="index">{{ index + 1 }}</span>
              <div>
                <span class="searchword">{{ item.searchWord }}</span>
                <span class="score">{{ item.score }}</span>
                <p class="content">{{ item.content }}</p>
              </div>
            </li>
          </ul>
        </div>
        <div v-else ref="searchPanel" class="search-wrap2" v-show="showHidden">
          <div class="title">搜索"{{inputValue}}"相关的结果</div>
          <div class="item" v-if="songs"><span class="iconfont icon-yinfuyinpinbiao"></span><span>单曲</span></div>
          <div class="items" v-if="songs">
            <p @click="setCurrentSong(item),setPlayStatus(true),savePlaylist(item),savePlayHistory(item),showHidden = false" v-for="item in songs" :key="item.id">{{item.name}} - {{ item.artists? item.artists[0].name : ''}}</p>
          </div>
          <div class="item" v-if="artists"><span class="iconfont icon-yonghu"></span><span>歌手</span></div>
          <div class="items" v-if="artists">
            <p v-for="item in artists" :key="item.id">{{item.name}}</p>
          </div>
          <div class="item" v-if="albums"><span class="iconfont icon-danchuang_zhuanji_"></span><span>专辑</span></div>
          <div class="items" v-if="albums">
            <p v-for="item in albums" :key="item.id">{{item.name}}</p>
          </div>
          <div class="item" v-if="playlists"><span class="iconfont icon-gedan"></span><span>歌单</span></div>
          <div class="items" v-if="playlists">
            <p v-for="item in playlists" :key="item.id">{{item.name}}</p>
          </div>
        </div>
      </div>
      <button title="听歌识曲" class="tinggeshiqu">
        <i class="iconfont icon-tinggeshiqu"></i>
      </button>
    </div>
    <div class="right">
      <div class="user">
        <span class="avatar">
          <img @click="setShowSong1" v-if="!isLogin" src="../assets/logo.png" alt="" />
          <img
            v-else
            :src="user.avatarUrl"
            alt=""
            @click="$router.push('/account'),setShowSong1()"
          />
        </span>
        <span v-if="!isLogin" class="sign" @click="loginBox = true"
          >未登录</span
        >
        <span v-else class="sign" @click="logoutBox = !logoutBox"
          >{{ user.nickname }}
        </span>
        <div class="logout" v-show="logoutBox" @click="logout">
          <span class="iconfont icon-tuichudenglu"></span>退出登录
        </div>
        <div class="login" v-show="loginBox">
          <span class="iconfont icon-close" @click="loginBox = false"></span>
          <img src="../assets/phone.png" alt="" />
          <form action="">
            <input v-model="phone" type="text" placeholder="请输入手机号" />
            <input
              v-model="password"
              type="password"
              placeholder="请输入密码"
            />
          </form>
          <el-button type="danger" @click="_login">登录</el-button>
        </div>
        <i class="iconfont icon-daosanjiao-"></i>
        <span class="vip">开通VIP</span>
      </div>
      <div class="icon">
        <i title="设置" class="iconfont icon-shezhi1"></i>
        <i class="iconfont icon-zhuti"></i>
        <i class="iconfont icon-mail"></i>
        <span>|</span>
        <i class="iconfont icon-minimize"></i>
        <i class="iconfont icon-zuixiaohua" @click="restore"></i>
        <i title="最大化" class="iconfont icon-zuidahua" @click="maximize"></i>
        <i class="iconfont icon-close"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { login, getSearchhot, getSuggest } from '../api/data';
import { mapState, mapMutations } from 'vuex'

// 节流函数
const delay = (function () {
  let timer = 0
  return function (callback, ms) {
    clearTimeout(timer)
    timer = setTimeout(callback, ms)
  }
})()

export default {
  data() {
    return {
      loginBox: false,
      logoutBox: false,
      phone: '',
      password: '',
      showHidden: false,
      inputValue: '',
      searchhot: [],
      songs: [],
      artists: [],
      albums: [],
      playlists: []
    };
  },
  created() {
    this._getSearchhot()
    document.addEventListener('click', e => {
      if (!this.$refs.searchPanel.contains(e.target)) {
        this.showHidden = false
      }
    })
  },
  methods: {
    restore() {
      this.$parent.handleRestore()
    },
    maximize() {
      this.$parent.handleMaximize()
    },
    _login() {
      if (this.phone.trim() !== '' && this.password.trim() !== '') {
        login({
          phone: this.phone,
          password: this.password
        }).then(res => {
          if (res.data.code !== 200) {
            this.$message({
              message: '账号或密码错误!',
              type: 'error'
            })
          } else {
            this.$message({
              message: '您已成功登陆',
              type: 'success'
            })
            this.loginBox = false
            this.phone = ''
            this.password = ''
            this.setUser(res.data.profile)
            this.setToken(res.data.token)
            this.setLogin(true)
          }
          // console.log(res);
        })
      } else {
        this.$message({
          message: '请输入账号密码!',
          type: 'warning'
        })
      }
    },
    ...mapMutations(['setUser', 'setToken', 'setLogin', 'setLogout', 'setSearchHistory', 'clearSearchHistory', 'clearSearchItem', 'setCurrentSong', 'setPlayStatus', 'savePlaylist', 'savePlayHistory', 'setShowSong1']),
    logout() {
      this.setLogout()
      this.logoutBox = false
      this.$message('您已成功退出登录!')
      this.$router.push('discovery')
    },
    goSearch() {
      if (this.inputValue.trim() !== '') {
        this.$router.push({ path: '/search', query: { id: this.inputValue } })
        this.setSearchHistory(this.inputValue)
      }
      this.showHidden = false
    },
    goSearchHot(item) {
      this.$router.push({ path: '/search', query: { id: item.searchWord } })
      this.showHidden = false
      this.setShowSong1()
      this.setSearchHistory(item.searchWord)
    },
    searchValue() {
      if (this.inputValue.trim() !== '') {
        getSuggest({ keywords: this.inputValue }).then(res => {
          this.songs = res.data.result.songs
          this.artists = res.data.result.artists
          this.albums = res.data.result.albums
          this.playlists = res.data.result.playlists
        })
      }
    },
    async _getSearchhot() {
      const { data } = await getSearchhot();
      this.searchhot = data.data
      // console.log(data);
    }
  },
  computed: {
    ...mapState(['user', 'isLogin', 'searchHistory'])
  },
  watch: {
    // 对实时搜索做节流处理
    inputValue() {
      delay(() => {
        this.searchValue()
      }, 500)
    }
  }
};
</script>

<style lang="less" scoped>
button {
  border: none;
  outline: none;
}

.header {
  display: flex;
  align-items: center;
  height: 60px;
  background-color: #ec4141;
  .left {
    flex: 1;
    display: flex;
    width: 500px;
    align-items: center;
    .logo {
      margin-left: 20px;
      color: #fff;
      font-size: 18px;
      letter-spacing: 1px;
      cursor: pointer;
      span {
        font-size: 22px;
        color: #ec4141;
        background-color: #fff;
        border-radius: 50px;
      }
      div {
        display: inline-block;
        margin-left: 7px;
      }
    }
    .button {
      display: flex;
      margin-left: 76px;
      button {
        background-color: #e13e3e;
        border: none;
        outline: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        margin-left: 7px;
        cursor: pointer;
      }
      i {
        color: #f6cdcd;
        font-size: 12px;
      }
    }
    .search {
      position: relative;
      input {
        margin-left: 13px;
        width: 164px;
        height: 34px;
        outline: none;
        background: #e13e3e;
        border: none;
        color: #fff;
        font-size: 12px;
        border-radius: 50px;
        text-indent: 34px;
      }
      .icon-sousuo {
        position: absolute;
        top: 10px;
        left: 28px;
        font-size: 14px;
        color: #fff;
      }
      .search-wrap {
        position: absolute;
        left: -30px;
        width: 355px;
        height: 450px;
        overflow-y: auto;
        border-radius: 10px;
        background-color: #fff;
        z-index: 1002;
        .title {
          padding: 12px 20px;
          color: gray;
          font-size: 15px;
          span {
            margin-left: 5px;
            cursor: pointer;
            &:hover {
              color: #404040;
            }
          }
        }
        .search-history {
          padding-left: 20px;
          width: 100%;
          span {
            position: relative;
            display: inline-block;
            padding: 4px 16px;
            margin: 2px 10px 8px 0;
            color: #5c5c5c;
            font-size: 12px;
            border: 1px solid #e5e5e5;
            border-radius: 20px;
            cursor: pointer;
            &:hover {
              background-color: #f3f3f3;
              i {
                display: block;
              }
            }
            i {
              display: none;
              position: absolute;
              top: 8px;
              right: 4px;
            }
          }
        }
        ul {
          li {
            display: flex;
            padding: 7.5px 0;
            cursor: pointer;
            .index {
              min-width: 40px;
              height: 40px;
              margin: 0 4px;
              color: #dedede;
              text-align: center;
              line-height: 40px;
            }
            div {
              .searchword {
                font-size: 14px;
                color: #313131;
              }
              .score {
                margin-left: 10px;
                color: #d4d4d4;
                font-size: 12px;
              }
              .content {
                font-size: 13px;
                color: #afafaf;
              }
            }
            &:nth-child(-n + 3) [class="index"] {
              color: red;
            }
          }
        }
      }
      .search-wrap2 {
        position: absolute;
        left: -30px;
        width: 355px;
        height: 400px;
        overflow-y: auto;
        border-radius: 10px;
        background-color: #fff;
        z-index: 1002;
        cursor: pointer;
        .title {
          padding: 6px 10px;
          color: gray;
          font-size: 14px;
        }
        .item {
          padding: 5px 20px 5px;
          font-size: 14px;
          background-color: #F5F5F7;
          .iconfont {
            margin-right: 4px;
          }
        }
        .items {
          font-size: 13px;
          color: #373737;
          p {
            padding: 5px 20px;
            &:hover {
              background-color: #F2F2F2;
            }
          }
        }
      }
    }
    .tinggeshiqu {
      margin-left: 8px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background-color: #e13e3e;
      cursor: pointer;
      .icon-tinggeshiqu {
        color: #f6cdcd;
      }
    }
  }
  .right {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    width: 450px;
    padding-right: 14px;
    color: #f8baba;
    .user {
      position: relative;
      display: flex;
      line-height: 30px;
      .avatar {
        display: inline-block;
        margin-right: 7px;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        background-color: #fff;
        cursor: pointer;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .sign {
        position: relative;
        font-size: 12px;
        cursor: pointer;
      }
      .sign:hover {
        color: #fff;
      }
      .logout {
        position: absolute;
        width: 80px;
        top: 30px;
        left: 35px;
        font-size: 14px;
        color: #333;
        background-color: #f6f6f7;
        border-radius: 0 0 5px 5px;
        cursor: pointer;
        z-index: 5;
      }
      .login {
        position: fixed;
        width: 352px;
        height: 370px;
        padding: 20px 45px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        z-index: 10;
        background-color: #fff;
        box-shadow: 0 0 20px #dfdede;
        .icon-close {
          position: absolute;
          top: -2px;
          right: 5px;
          font-size: 20px;
          cursor: pointer;
        }
        input {
          width: 260px;
          height: 40px;
          padding-left: 20px;
          font-size: 14px;
          font-weight: 600;
          outline: none;
          &:nth-child(1) {
            margin-bottom: 10px;
          }
        }
        .el-button {
          width: 100%;
          margin-top: 20px;
        }
      }
      .icon-daosanjiao- {
        margin-left: 3px;
        font-size: 13px;
        cursor: pointer;
      }
      .icon-daosanjiao-:hover {
        color: #fff;
      }
      .vip {
        margin-left: 3px;
        font-size: 12px;
        cursor: pointer;
      }
      .vip:hover {
        color: #fff;
      }
    }
    .icon {
      margin-left: 7px;
      line-height: 30px;
      color: #fbd9d9;
      i {
        font-size: 18px;
        padding: 0 8.5px;
        cursor: pointer;
      }
      i:hover {
        color: #fff;
      }
      span {
        padding: 0 5px;
        cursor: pointer;
      }
    }
  }
}
</style>
