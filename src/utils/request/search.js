import $axios from "."

//获取搜索数据
export function getSearch(key){
    return $axios({
        method:"get",
        url:"/search?keywords=" + key
    })
}
//获取单首歌曲详情数据
export function getSongDetail(id){
    return $axios({
        method:"get",
        url:"/song/detail?ids=" + id
    })
}