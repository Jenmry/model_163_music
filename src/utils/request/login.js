import $axios from "."

//获取登录状态
export function getLogin(data){
    console.log(data);
    return $axios({
        method:"post",
        url:`/login/cellphone?phone=${data.uname}&password=${data.password}`
    })
}