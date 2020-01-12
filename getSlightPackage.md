# 使用UglifyJsPlugin
减小0.01M


  handleDownload = () => {
    // this.props.downloadResourceExcel();
    const token = localStorage.getItem('sessions');
    fetch(`${PackageJSON.proxy}/crm/upload/downloadResourceFile`, {
      method: 'GET',
      responseType: 'blob',//悟空 返回数据的格式，可选值为arraybuffer,blob,document,json,text,stream，默认值为json
      headers: {
        // 'Content-Type': "application/json;charset=UTF-8", // 悟空
        // 'Content-Type': 'application/octet-stream',
        Authorization: `Bearer ${token}`.trim(),//string.trim()去除首尾空格
      },

    })
      .then(res => {
        // const blob = new Blob([res], { type: 'application/octet-stream' });
        // const blob = new Blob([res]);
        const blob = new Blob([res], { type: "application/vnd.ms-excel;charset=utf-8" }); // 悟空
        // const blob = new Blob([res], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8' });
        const fileName = "个人客户.xls";
        if ('download' in document.createElement('a')) { // 非IE下载
          const elink = document.createElement('a');
          elink.download = fileName;
          elink.style.display = 'none';
          elink.href = window.URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          window.URL.revokeObjectURL(elink.href); // 释放URL 对象
          document.body.removeChild(elink);
        } else { // IE10+下载;
          navigator.msSaveBlob(blob, fileName);
        }
      }).catch(err => {
        message.error('导出失败!');
      });
  }