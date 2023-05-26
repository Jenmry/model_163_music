import $axios from "."

//获取首页轮播图
export function getBanner(){
    return $axios({
        method:"get",
        url:"/banner?type=2"
    })
}

//获取首页的每日推荐歌单
export function getMusicList(){
    return $axios({
        method:"get",
        url:"/personalized?limit=10"
    })
}