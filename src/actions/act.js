import $ from 'jquery';

export function getLogin (params){
    $.ajax({
        // url: 'http://127.0.0.1:7001/api/v1/login',
        url: 'http://192.168.205.221:8000/'+'crm/manager/login',
        data: params,
        type: 'POST',
        crossDomain:true,
        // headers: {
        //     "Content-Type":  "application/json;charset=utf-8",
        //     "Access-Control-Allow-Origin": "*", // 包含自定义header字段的跨域请求，浏览器会先向服务器发送OPTIONS请求
        // },
        // xhrFields:{withCredentials:true},// 发送ajax请求的时候会带上cookie,但设置*就不设置withcredentials
        success: (res) => {
            console.log(res)
        },
        error: (err) => {
            console.log(err)
        }
    });
}