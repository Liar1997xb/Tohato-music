<template>
  <div class="mv_container">
    <div class="left">
      <div class="title">
        <span @click="$router.push({path:'/video'})">&lt;&nbsp;</span>
        <span @click="$router.push({path:'/video'})">MV详情</span>
      </div>
      <video :src="url" controls></video>
      <div class="singer">
        <img :src="imgUrl" alt="">
        <span>{{mvDetail.artistName}}</span>
      </div>
      <p class="mv_name">{{mvDetail.name}}</p>
      <span class="publishTime">发布:&nbsp;{{mvDetail.publishTime}}</span>
      <span class="play_count">播放:&nbsp;{{mvDetail.playCount | dataFormat}}次</span>
      <div class="comment_wrap">
        <div class="comment" v-if="hotComments">
          <p>精彩评论</p>
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
    <div class="right">
      <span class="title">相关推荐</span>
      <div class="items" @click="$router.push({path:'/mvDetail', query:{id:item.id}})" v-for="item in simiMv" :key="item.id">
        <div class="item">
          <img :src="item.cover" alt="">
          <span></span>
          <span>{{item.playCount | dataFormat}}</span>
          <span>{{item.duration | timeFormat}}</span>
        </div>
        <div class="desc">
          <p>{{item.name}}</p>
          <p>by&nbsp;{{item.artistName}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getMvDetail, getMvUrl, getSimiMv, getMvComment } from '../../api/data'

export default {
  data() {
    return {
      url: '',
      imgUrl: this.$route.query.imgurl,
      mvDetail: [],
      simiMv: [],
      comments: [],
      hotComments: [],
      total: ''
    }
  },
  created() {
    this._getMvDetail()
    this._getMvUrl()
    this._getSimiMv()
    this._getMvComment()
  },
  methods: {
    _getMvDetail() {
      getMvDetail({ mvid: this.$route.query.id }).then(res => {
        this.mvDetail = res.data.data
      })
    },
    _getMvUrl() {
      getMvUrl({ id: this.$route.query.id }).then(res => {
        this.url = res.data.data.url
      })
    },
    _getSimiMv() {
      getSimiMv({ mvid: this.$route.query.id }).then(res => {
        this.simiMv = res.data.mvs
      })
    },
    _getMvComment() {
      getMvComment({ id: this.$route.query.id }).then(res => {
        console.log(res)
        this.comments = res.data.comments
        this.hotComments = res.data.hotComments
        this.total = res.data.total
      })
    }
  },
  watch: {
    $route() {
      this._getMvDetail()
      this._getMvUrl()
      this._getSimiMv()
      this._getMvComment()
    }
  }
}
</script>

<style lang="less" scoped>
.mv_container{
  display: flex;
  .left{
    flex: 2;
    .title{
      font-size: 17px;
      cursor: pointer;
    }
    video{
      margin-top: 20px;
      width: 100%;
    }
    .singer{
      display: flex;
      margin: 14px 0 30px;
      img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      span{
        margin-left: 10px;
        align-self: center;
        font-size: 14px;
        color: #676767;
      }
    }
    .mv_name{
      font-size: 22px;
      font-weight: 600;
    }
    .publishTime{
      font-size: 13px;
      color: #CFCFCF;
    }
    .play_count{
      margin-left: 25px;
      font-size: 13px;
      color: #CFCFCF;
    }
    .comment_wrap{
      margin-top: 20px;
      .comment{
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
  .right{
    flex: 1;
    margin-left: 20px;
    .title{
      display: block;
      margin-bottom: 20px;
      font-size: 16px;
    }
    .items{
      display: flex;
      margin-bottom: 8px;
      cursor: pointer;
      .item{
        position: relative;
        width: 140px;
        height: 82px;
        img{
          width: 100%;
          min-width: 140px;
          border-radius: 5px;
        }
        span{
          &:nth-child(2){
            position: absolute;
            top: 6px;
            right: 40px;
            border-left: 7px solid #fff;
            border-top: 5px solid transparent;
            border-bottom: 5px solid transparent;
          }
          &:nth-child(3){
            position: absolute;
            top: 2px;
            right: 4px;
            font-size: 12px;
            color: #EFEEF1;
          }
          &:nth-child(4){
            position: absolute;
            bottom: 6px;
            right: 4px;
            font-size: 12px;
            color: #EFEEF1;
          }
        }
      }
      .desc{
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        padding-left: 10px;
        p{
          &:nth-child(1){
            font-size: 14px;
          }
          &:nth-child(2){
            font-size: 13px;
            color: #9F9F9F;
          }
        }
      }
    }
  }
}
</style>
