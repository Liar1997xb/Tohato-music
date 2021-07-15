import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loadingStatus: false,
        user: {},
        token: '',
        isLogin: false,
        searchHistory: [],
        currentSong: {},
        playList: [],
        playHistory: [],
        isPlaying: false,
        showSong: false,
        showPlaylist: false,
        songCurrentTime: 0
    },
    mutations: {
        setUser(state, userInfo) {
            state.user = userInfo
        },
        setToken(state, token) {
            state.token = token
        },
        setLogin(state, login) {
            state.isLogin = login
        },
        setLogout(state) {
            window.sessionStorage.removeItem('user')
            window.sessionStorage.removeItem('token')
            window.sessionStorage.removeItem('isLogin')
            state.user = {}
            state.token = ''
            state.isLogin = false
        },
        setLoading(state, status) {
            state.loadingStatus = status
        },
        setPlayStatus(state, flag) {
            state.isPlaying = flag
        },
        // 保存搜索历史
        setSearchHistory(state, song) {
            if (state.searchHistory.indexOf(song) === -1) {
                state.searchHistory.unshift(song)
            }
        },
        // 清空搜索历史
        clearSearchHistory(state) {
            state.searchHistory = []
        },
        clearSearchItem(state, song) {
            var index = state.searchHistory.indexOf(song)
            state.searchHistory.splice(index, 1)
        },
        // 保存当前播放歌曲
        setCurrentSong(state, song) {
            state.currentSong = song
            state.isPlaying = true
            // console.log(song)
        },
        // 保存播放列表
        savePlaylist(state, song) {
            // 防止重复添加
            state.playList.push(song)
            var result = []
            var obj = {}
            for (var i = 0; i < state.playList.length; i++) {
                if (!obj[state.playList[i].id]) {
                    result.push(state.playList[i])
                    obj[state.playList[i].id] = true
                }
            }
            state.playList = result
        },
        // 清空播放列表
        clearPlaylist(state) {
            state.isPlaying = false
            state.playList = []
            state.currentSong = ''
        },
        // 保存历史记录
        savePlayHistory(state, song) {
            state.playHistory.push(song)
            var result = []
            var obj = {}
            for (var i = 0; i < state.playHistory.length; i++) {
                if (!obj[state.playHistory[i].id]) {
                    result.unshift(state.playHistory[i])
                    obj[state.playHistory[i].id] = true
                }
            }
            state.playHistory = result
        },
        // 清空历史记录
        clearPlayHistory(state) {
            state.playHistory = []
        },
        setShowSong(state) {
            state.showSong = !state.showSong
        },
        setShowSong1(state) {
            state.showSong = false
        },
        setShowPlaylist(state) {
            state.showPlaylist = !state.showPlaylist
        },
        closeShowPlaylist(state) {
            state.showPlaylist = false
        },
        setSongCurrentTime(state, time) {
            state.songCurrentTime = time
        }
    },
    actions: {},
    modules: {},
    plugins: [
        createPersistedState({
            storage: window.sessionStorage
        })
    ]
});
