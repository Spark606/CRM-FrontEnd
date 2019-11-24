import $ from 'jquery';
export function testPost(params) {
    $.ajax({
        // url: 'http://192.168.205.221:8000/' + 'crm/login',
        url: 'http://http://127.0.0.1:7001' + '/api/v1/login',
        data: params,
        type: 'POST',
        headers:{'Content-Type':'application/json;charset=utf8'},
        crossDomain: true,
        success: (res) => {
            console.log(res);
        },
        error: (err) => {
            console.log(err)
        }
    });
}
export function testGet() {
    $.ajax({
        url: 'http://http://127.0.0.1:7001' + '/api/v1/index',
        type: 'GET',
        headers:{'Content-Type':'application/json;charset=utf8'},
        crossDomain: true,
        success: (res) => {
            console.log(res);
        },
        error: (err) => {
            console.log(err)
        }
    });
}
