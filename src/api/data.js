import axios from '../api/axios'

// 登录
export const login = params => {
  return axios.request({
    url: 'login/cellphone',
    method: 'post',
    params
  })
}

// 登录状态查询
export const loginStatus = () => {
  return axios.request({
    url: 'login/status',
    method: 'get'
  })
}

// 刷新登录
export const loginRefresh = () => {
  return axios.request({
    url: 'login/refresh',
    method: 'get'
  })
}

// 热搜
export const getSearchhot = () => {
  return axios.request({
    url: 'search/hot/detail',
    method: 'get'
  })
}

// 搜索建议
export const getSuggest = params => {
  return axios.request({
    url: 'search/suggest',
    method: 'get',
    params
  })
}

// 轮播图
export const getBanner = () => {
  return axios.request({
    url: 'banner',
    method: 'get'
  })
}

// 每日推荐
export const getRecommend = () => {
  return axios.request({
    url: 'recommend/resource',
    methods: 'get'
  })
}

// 推荐歌单
export const getPersonalized = params => {
  return axios.request({
    url: 'personalized',
    methods: 'get',
    params
  })
}

// 独家放送
export const getPrivatecontent = () => {
  return axios.request({
    url: 'personalized/privatecontent',
    methods: 'get'
  })
}

// 最新音乐
export const getNewsong = params => {
  return axios.request({
    url: 'personalized/newsong',
    methods: 'get',
    params
  })
}

// 推荐MV
export const getPersonalizedmv = () => {
  return axios.request({
    url: 'personalized/mv',
    methods: 'get'
  })
}

export const getTag = () => {
  return axios.request({
    url: 'playlist/hot',
    method: 'get'
  })
}

export const getTopPlaylist = params => {
  return axios.request({
    url: 'top/playlist/highquality',
    method: 'get',
    params
  })
}

export const getPlaylist = params => {
  return axios.request({
    url: 'top/playlist',
    method: 'get',
    params
  })
}

// 排行榜
export const getRank = () => {
  return axios.request({
    url: 'toplist/detail',
    method: 'get'
  })
}

// 歌手
export const getSinger = params => {
  return axios.request({
    url: 'artist/list',
    method: 'get',
    params
  })
}

// 歌手详情
export const getArtistDetail = params => {
  return axios.request({
    url: 'artist/detail',
    method: 'get',
    params
  })
}

// 歌手mv
export const getArtistMv = params => {
  return axios.request({
    url: 'artist/mv',
    method: 'get',
    params
  })
}

// 歌手描述
export const getArtistDesc = params => {
  return axios.request({
    url: 'artist/desc',
    method: 'get',
    params
  })
}

// 歌手热门50首歌曲
export const getTopSong = params => {
  return axios.request({
    url: 'artist/top/song',
    method: 'get',
    params
  })
}

// 歌手专辑
export const getAlbum = params => {
  return axios.request({
    url: 'artist/album',
    method: 'get',
    params
  })
}

// 专辑内容
export const getAlbumContent = params => {
  return axios.request({
    url: 'album',
    method: 'get',
    params
  })
}

// 相似歌手
export const getSimiArtist = params => {
  return axios.request({
    url: 'simi/artist',
    method: 'get',
    params
  })
}

// mv详情
export const getMvDetail = params => {
  return axios.request({
    url: 'mv/detail',
    method: 'get',
    params
  })
}

// mv地址
export const getMvUrl = params => {
  return axios.request({
    url: 'mv/url',
    method: 'get',
    params
  })
}

// 相似mv
export const getSimiMv = params => {
  return axios.request({
    url: 'simi/mv',
    method: 'get',
    params
  })
}

// mv评论
export const getMvComment = params => {
  return axios.request({
    url: 'comment/mv',
    method: 'get',
    params
  })
}

export const getVideo = params => {
  return axios.request({
    url: 'video/group',
    method: 'get',
    params
  })
}

// 全部Mv
export const getAllMv = params => {
  return axios.request({
    url: 'mv/all',
    method: 'get',
    params
  })
}

// export const getPopular = params => {
//   return axios.request({
//     url: 'mv/all',
//     method: 'get',
//     params
//   })
// }

// 网易出品mv
export const getExclusive = params => {
  return axios.request({
    url: 'mv/exclusive/rcmd',
    method: 'get',
    params
  })
}

export const getCloudSearch = params => {
  return axios.request({
    url: 'cloudsearch',
    method: 'get',
    params
  })
}

// 检查音乐是否可以播放
export const getCheck = params => {
  return axios.request({
    url: 'check/music',
    method: 'get',
    params
  })
}

export const getUserLevel = () => {
  return axios.request({
    url: 'user/level',
    method: 'get',
    withCredentials: true
  })
}

export const getSubCount = () => {
  return axios.request({
    url: 'user/subcount',
    method: 'get',
    withCredentials: true
  })
}

// 获取用户歌单
export const getUserPlaylist = params => {
  return axios.request({
    url: 'user/playlist',
    method: 'get',
    params
  })
}

// 喜欢音乐列表
export const getLikeList = params => {
  return axios.request({
    url: 'likelist',
    method: 'get',
    params
  })
}

// 歌曲评论
export const getComment = params => {
  return axios.request({
    url: 'comment/music',
    method: 'get',
    params
  })
}

// 获取歌词
export const getLyric = params => {
  return axios.request({
    url: 'lyric',
    method: 'get',
    params
  })
}

// 获取相似歌单
export const getSimiPlaylist = params => {
  return axios.request({
    url: 'simi/playlist',
    method: 'get',
    params
  })
}

// 获取相似音乐
export const getSimgSong = params => {
  return axios.request({
    url: 'simi/song',
    method: 'get',
    params
  })
}

// 获取歌单详情
export const getPlaylistDetail = params => {
  return axios.request({
    url: 'playlist/detail',
    method: 'get',
    params
  })
}

export const getSongDetail = params => {
  return axios.request({
    url: 'song/detail',
    method: 'get',
    params
  })
}
