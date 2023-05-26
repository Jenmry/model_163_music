export default {
    install(Vue) {
        //全局过滤器
        Vue.filter("fomatCount", val => {
            if (val >= 10000 && val < 100000000) {
                val /= 10000;
                return Math.floor(val * 100) / 100 + "万";
                // val = val.toFixed(2);
                // return val + "万";
            } else if (val >= 100000000) {
                val /= 100000000;
                return Math.floor(val * 100) / 100 + "亿"; //向下取整
                // val = val.toFixed(2); //四舍五入
                // return val + "亿";
            }
        })
        Vue.filter("fomatSingers", val => {
            const ar = []
            val.forEach(item => {
                // console.log(item);
                ar.push(item.name)
            })
            // console.log(ar);
            // console.log(ar.join("/"));
            return ar.join("/")
        })
        //给定毫秒数，格式化为【分钟:秒数】的形式，如【03:29】
        Vue.filter("fomatMill", val => {
            // console.log(typeof val);
            let min = parseInt(val / 1000 / 60) + ""
            if (min.length < 2) {
                min = "0" + min
            }
            let sec = parseInt(val / 1000 - parseInt(min) * 60) + ""
            if (sec.length < 2) {
                sec = "0" + sec
            }
            // console.log(min + ":" + sec);
            return min + ":" + sec

        })
    }
}