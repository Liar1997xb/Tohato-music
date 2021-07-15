<template>
    <div>
        <div class="songPlaylist_detail">
            <img v-if="songPlaylistDetail" :src="songPlaylistDetail.coverImgUrl" alt="">
            <div class="detail_title">
                <div>
                    <span>歌单</span>
                    <p v-if="songPlaylistDetail">{{songPlaylistDetail.name}}</p>
                </div>
                <div class="creator">
                    <img v-if="songPlaylistDetail.creator" :src="songPlaylistDetail.creator.avatarUrl" alt="">
                    <p v-if="songPlaylistDetail.creator">{{songPlaylistDetail.creator.nickname}}</p>
                    <p v-if="songPlaylistDetail">{{songPlaylistDetail.createTime | dateFormat}}创建</p>
                </div>
                <div class="button">
                    <span class="iconfont icon-play">播放全部</span>
                </div>
                <div class="tag">
                    <span>标签：</span>
                    <span v-for="(item,index) in songPlaylistDetail.tags" :key="index">{{item}}</span>
                </div>
                <div class="count">
                    <span>歌曲：{{songPlaylistDetail.trackCount}}</span>
                    <span>播放：{{songPlaylistDetail.playCount | dataFormat}}</span>
                </div>
                <div class="desc">
                    <span>简介：{{songPlaylistDetail.description}}</span>
                </div>
            </div>
        </div>
        <el-tabs v-model="activeName">
            <el-tab-pane label="歌曲列表" name="first">
                <el-table :data="songPlaylistDetail.tracks" @row-dblclick="rowClick" stripe>
                    <el-table-column type="index"></el-table-column>
                    <el-table-column label="音乐标题" prop="name"></el-table-column>
                    <el-table-column label="歌手" prop="ar[0].name"></el-table-column>
                    <el-table-column label="专辑" prop="al.name"></el-table-column>
                    <el-table-column label="时长" prop="dt" width="60px">
                        <template slot-scope="scope">
                            <span>{{scope.row.dt | timeFormat}}</span>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="评论" name="second">comment</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import { getPlaylistDetail, getSongDetail, getCheck } from '../../api/data'
import { mapMutations } from 'vuex'

export default {
    data() {
        return {
            songPlaylistDetail: [],
            activeName: 'first'
        }
    },
    created() {
        this._getPlaylistDetail()
    },
    methods: {
        _getPlaylistDetail() {
            getPlaylistDetail({ id: this.$route.query.id }).then(res => {
                this.songPlaylistDetail = res.data.playlist
            })
        },
        rowClick(row) {
            getCheck({ id: row.id }).then(res => {
                if (res.error === '网络出错了') {
                    this.$message({
                        message: '该歌曲需开通会员才能播放',
                        type: 'warning',
                        duration: 3000
                    })
                }
            })
            this.setCurrentSong(row)
            this.savePlaylist(row)
            this.savePlayHistory(row)
        },
        ...mapMutations(['setCurrentSong', 'savePlaylist', 'savePlayHistory'])
    },
    watch: {
        $route() {
            this._getPlaylistDetail()
        }
    }
}
</script>

<style lang="less" scoped>
.songPlaylist_detail{
    display: flex;
    padding: 16px 0;
    img{
        width: 184px;
        height: 184px;
        border-radius: 5px;
        border: 1px solid #ccc;
    }
    .detail_title{
        padding: 0 20px;
        div:nth-child(1) {
            display: flex;
            line-height: 21px;
            span {
                margin-top: 2px;
                padding-left: 4px;
                width: 38px;
                height: 21px;
                line-height: 20px;
                font-size: 14px;
                color: #EC4141;
                border: 1px solid #F28C8C;
                border-radius: 3px;
            }
            p {
                flex: 1;
                margin-left: 10px;
                font-size: 21px;
                font-weight: 600;
            }
        }
        .creator {
            display: flex;
            align-items: center;
            padding: 8px 0;
            width: 399px;
            img {
                width: 25px;
                height: 25px;
                border-radius: 50%;
            }
            p:nth-child(2) {
                margin-left: 10px;
                font-size: 14px;
                color: #507DAF;
            }
            p:nth-child(3){
                margin-left: 10px;
                font-size: 13px;
                color: #676767;
            }
        }
        .button {
            padding: 5px 0;
            cursor: pointer;
            span {
                padding: 7px 16px;
                color: #fff;
                border-radius: 25px;
                background-color: #EC4141;
            }
            .icon-play::before{
                padding-right: 5px;
                // font-size: 12px;
            }
        }
        .tag {
            margin-top: 10px;
            font-size: 14px;
            span:nth-child(n + 2) {
                padding-right: 5px;
                color: #507DAF;
            }
        }
        .count {
            margin-top: 4px;
            font-size: 14px;
            span:nth-child(2) {
                padding-left: 10px;
            }
        }
        .desc {
            margin-top: 4px;
            font-size: 14px;
            span {
                display: -webkit-box;
                overflow: hidden;
                text-overflow: ellipsis;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
    }
}

.el-table {
    .cell {
        white-space: nowrap;
    }
}
</style>
