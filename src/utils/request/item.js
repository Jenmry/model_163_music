import $axios from "."

//获取歌单详情数据
export function getMusicItem(id){
    return $axios({
        method:"get",
        url:"/playlist/detail?id=" + id
    })
}
//获取歌单所有歌曲数据
export function getMusicList(id){
    return $axios({
        method:"get",
        url:`/playlist/track/all?id=${id}`
    })
}
