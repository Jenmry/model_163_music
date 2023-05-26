import Vue from "vue"
import Vuex, { Store } from "vuex"
import {getLogin} from "@/utils/request/login"
Vue.use(Vuex)

export default new Store({
    //准备state => 用于存储数据
    state: {
        currentIndex: 0, //当前歌曲的列表下标
        currentUrl: "",  //当前正在播放歌曲的url地址
        isFree: true, //判断当前播放的歌曲是否是免费播放
        times: {}, //如歌曲是付费歌曲，存放vip歌曲信息，如试听0~30秒
        isPlay: false, //当前歌曲是否正在播放
        is_show: false, //是否展示遮罩层（即歌曲播放详情信息）
        is_show_lyrics:false, //是否展示歌词页
        currentTime:0, //audio元素的音频播放的当前时间
        currentDuration:0,
        //当前播放的所有歌曲列表信息
        playList: [{
            "name": "未知歌曲",
            "id": -1,
            "ar": [
                {
                    "id": -1,
                    "name": "未知歌手",
                    "tns": [],
                    "alias": []
                }
            ],
            "al": {
                "id": -1,
                "name": "",
                "picUrl": "https://ts1.cn.mm.bing.net/th/id/R-C.d007b1e908d32decd1061a832bdb30d0?rik=KfCAXglYpJWGlw&riu=http%3a%2f%2fpic.616pic.com%2fys_img%2f00%2f18%2f64%2fK1k3rJ5yNr.jpg&ehk=707gF6XHZ1BXC6OWqw%2fFgMq1IfpsQjIUYEb2KwL2AB8%3d&risl=&pid=ImgRaw&r=0",
                "tns": [],
                "pic_str": "",
                "pic": -1
            },
            alia:[],
            "mv": 1,
            "publishTime": -1
        }],
        isLogin:false,//是否登录
        is_show_footer:true,//是否展示底部播放器

    },
    //准备actions => 用于响应组件中的动作
    actions: {
        async user_login(context,val){
            // const res = await getLogin(val)
            // console.log(res);
            alert("登录成功！")
            
        }
    },
    //准备mutations => 用于操作数据（state）
    mutations: {
        UPDATE_PLAY_STATE(state, val) {
            console.log(state, val);
            state.isPlay = val
        },
        UPDATE_PLAY_LIST(state, val) {
            state.playList = val
        },
        UPDATE_PLAY_INDEX(state, val) {
            state.currentIndex = val
        },
        UPDATE_PLAY_FREE_STATE(state, val) {
            state.isFree = val
        },
        UPDATE_PLAY_URL(state, val) {
            state.currentUrl = val
        },
        UPDATE_PLAY_TIMES(state, val) {
            state.times = val
        },
        UPDATE_PLAY_SHOW(state, val) {
            console.log("val:", val);
            state.is_show = val
        },
        UPDATE_PLAY_LYRICS_SHOW(state, val) {
            console.log("val:", val);
            state.is_show_lyrics = val
        },
        UPDATE_PLAY_TIME(state, val) {
            // console.log("val:", val);
            // console.log(typeof val);
            state.currentTime = val*1000
        },
        UPDATE_PLAY_DURATION(state, val) {
            // console.log("val:", val);
            // console.log(typeof val);
            state.currentDuration = val * 1000
        },
        UPDATE_LOGIN_STATE(state, val) {
            // console.log("val:", val);
            // console.log(typeof val);
            state.isLogin = val
        },
        UPDATE_FOOTER_STATE(state, val) {
            // console.log("val:", val);
            // console.log(typeof val);
            state.is_show_footer = val
        },
    },
    //创建getters，用于存储计算后的数据
    getters: {}
})