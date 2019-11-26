import * as cs from '../constants';
const data = [
  {
    resourceId: 1,
    shareStatus: "private",
    resourceName: 'John Brown',
    certificate: '一级房建转加造价初',
    info: 'New York No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2010-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 2,
    shareStatus: "private",
    resourceName: 'Joe Black',
    certificate: '一级房建转加造价初',
    info: 'London No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 3,
    shareStatus: "private",
    resourceName: 'Jim Green',
    certificate: '一级房建转加造价初',
    info: 'Sidney No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 2,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 4,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 5,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 6,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 7,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 8,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 9,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 10,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 11,
    shareStatus: "private",
    resourceName: 'John Brown',
    certificate: '一级房建转加造价初',
    info: 'New York No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2010-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 12,
    shareStatus: "private",
    resourceName: 'Joe Black',
    certificate: '一级房建转加造价初',
    info: 'London No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 13,
    shareStatus: "private",
    resourceName: 'Jim Green',
    certificate: '一级房建转加造价初',
    info: 'Sidney No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 2,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 14,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 15,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 16,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 17,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 18,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 19,
    shareStatus: "private",
    resourceName: 'Jim Red',
    certificate: '一级房建转加造价初',
    info: 'London No. 2 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    tel: '17844537359',
    qq: '1105394023',
    agent: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
];
const records = [
  {
    key: 1,
    content: 'Create a services site',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 2,
    content: 'Solve initial network problems',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 3,
    content: 'Technical testing',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 4,
    content: 'Network problems being solved',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },

];
const initialState = {
  clientsList: data,
  tableRow: 10,
  currentPage: 1,
  oneClientRecord: records
};

// const layoutReducer = (state = initialState) => state;
export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_CLIENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENTS_SUCCESS:
      return Object.assign({}, state, {
        // clientsList: action.payload.data,
        isFetching: false,
      });
    case cs.GET_CLIENTS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.GET_RECORDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        // ...action.payload,
        records: records.unshift({
          key: records.length,
          content: 'Network problems being solved',
          recorderName: 'Liz',
          recorderId: 3,
          recorderTime: '2018-12-11 22:23:21'
        })
      });
    case cs.GET_RECORDS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    // case cs.GET_CLIENTS_REQUEST:
    //     return Object.assign({}, state, {
    //         isFetching: true
    //     });
    // case cs.GET_CLIENTS_SUCCESS:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    // case cs.GET_CLIENTS_FAIL:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    default:
      return state;
  }
}
  // export default layoutReducer;
