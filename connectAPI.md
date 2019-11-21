# 安装axios
`npm i -s axios`

# 在src\actions\api.js中配置
```
const Axios = axios.create({
  baseURL: 'http://127.0.0.1:7001/', //服务器地址
  timeout: 10000,
  responseType: 'json',
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      "Access-Control-Allow-Origin": "*",
  }
})

export function getLogin (params){
  var api = "api/v1/login";  //拼接api地址

  Axios.get(api)
      .then(res => {
          console.log(res);
          this.setState({
              user: res.data  //获取的数据保存到list数组
          })
      })
      .catch(err => {
          console.error(err);
      })
}


```
