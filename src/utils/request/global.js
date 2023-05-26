import $axios from "."

//获取歌曲的具体播放地址的url
export function getMusicUrl(id){
    return $axios({
        method:"get",
        url:"/song/url?id=" + id
    })
}
//获取歌曲的歌词数据
export function getMusicLyrics(id){
    return $axios({
        method:"get",
        url:"/lyric?id=" + id
    })
}

