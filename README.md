# Tohato-music

模仿网易云音乐pc客户端的ui界面

后端接口：https://github.com/Binaryify/NeteaseCloudMusicApi

[源码地址](https://gitee.com/liar1997/Tohato-music)

## 项目截图

### 推荐页

![](./screenshots/discovery.png)

![](./screenshots/discovery2.png)

![](./screenshots/discovery3.png)

![](./screenshots/discovery4.png)

### 歌单页

![](./screenshots/song-list.png)

![](./screenshots/song-list2.png)

#### 歌单详情页

![](./screenshots/song-list-detail.png)

### 排行榜

![](./screenshots/rank-list.png)

![](./screenshots/rank-list2.png)

### 歌手页

![](./screenshots/singer.png)

#### 歌手详情页

![](./screenshots/singer-detail.png)

![](./screenshots/singer-detail2.png)

![](./screenshots/singer-detail3.png)

![](./screenshots/singer-detail4.png)

### 视频页

![](./screenshots/mv.png)

### 私人FM

![](./screenshots/fm.png)

### 个人页

![](./screenshots/account.png)

![](./screenshots/account2.png)

### 播放页

![](./screenshots/song-detail.png)

#### 播放列表

![](./screenshots/song-play-list.png)

#### 播放历史

![](./screenshots/song-play-history.png)

#### 评论

![](./screenshots/song-comment.png)

### 搜索

#### 搜索建议

![](./screenshots/search.png)

#### 搜索历史

![](./screenshots/search-history.png)

#### 搜索结果

![](./screenshots/search-result.png)

### 登录

![](./screenshots/login.png)

#### 登录成功

![](./screenshots/log-in-success.png)

#### 登录失败

![](./screenshots/log-in-error.png)

#### 退出登录

![](./screenshots/log-out.png)

## 技术栈

- Vue CLI (Vue脚手架工具)
- Vue (核心框架)
- Vue Router (页面路由)
- Vuex (状态管理)
- Element-ui (pc端Vue组件库)
- Less (CSS预处理器)
- Axios (网络请求)
- vuex-persistedstate (默认持久化Vuex数据的插件)

## 功能

- [x] 用户登录
- [x] 用户基本信息
- [x] 联想搜索
- [x] 播放音乐
- [x] 切换歌曲
- [x] 音乐播放模式
- [x] 播放列表
- [x] 播放记录
- [x] 歌单详情
- [x] 播放视频
- [ ] 朋友动态
- [ ] 私人FM

## 安装与使用

```sh
# 下载 Tohato-video
git clone https://gitee.com/liar1997/Tohato-music.git

# 进入 Tohato-video 项目目录
cd Tohato-music

# 安装依赖
npm install

# 本地运行
npm run serve

# 编译打包
npm run build
```

