import * as cs from '../constants';
let data = [
  {
    resourceId: 1,
    shareStatus: "private",
    firmName: '阿里巴巴',
    contact: 'bobo',
    resourceName: 'John Brown',
    info: 'New York No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2010-12-24',
    status: 1,
    phone: '17844537359',
    qq: '1105394023',
    position: 'Hr',
    employeeName: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 2,
    shareStatus: "private",
    firmName: '阿里巴巴',
    contact: 'bobo',
    resourceName: 'Joe Black',
    info: 'London No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 1,
    phone: '17844537359',
    qq: '1105394023',
    position: 'Hr',
    employeeName: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    resourceId: 3,
    shareStatus: "private",
    firmName: '阿里巴巴',
    contact: 'bobo',
    resourceName: 'Jim Green',
    info: 'Sidney No. 1 Lake Park',
    createTime: '2012-12-11',
    endTime: '2020-12-24',
    status: 2,
    phone: '17844537359',
    qq: '1105394023',
    position: 'Hr',
    employeeName: 'Liz',
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  }
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
  firmsList: data,
  tableRow: 10,
  currentPage: 1,
};

// const layoutReducer = (state = initialState) => state;
export default function firmReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_FIRMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_FIRMS_SUCCESS:
      // data = action.payload.data;
      return Object.assign({}, state, {
        // firmsList: action.payload.data,
        isFetching: false,
      });
    case cs.GET_FIRMS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.GET_FIRM_RECORDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_FIRM_RECORDS_SUCCESS:
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
    case cs.GET_FIRM_RECORDS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.ADD_NEW_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_FIRM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        firmsList: data.unshift({
          resourceId: 20,
          shareStatus: "private",
          firmName: '阿里巴巴',
          contact: 'bobo',
          resourceName: 'Jim Green',
          info: 'Sidney No. 1 Lake Park',
          createTime: '2012-12-11',
          endTime: '2020-12-24',
          status: 2,
          phone: '17844537359',
          qq: '1105394023',
          position: 'Hr',
          employeeName: 'Liz',
          province: '四川',
          gender: 1,
          email: 'lizbaby606@163.com',
        }) ? data : null,
      });
    case cs.ADD_NEW_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        firmsList: data.unshift({
          resourceId: 20,
          shareStatus: "private",
          firmName: '阿里巴巴',
          contact: 'bobo',
          resourceName: '傻bobo',
          info: 'London No. 2 Lake Park',
          createTime: '2012-12-11',
          endTime: '2020-12-24',
          status: 1,
          phone: '17844537359',
          qq: '1105394023',
          position: 'Hr',
          employeeName: 'Liz',
          province: '四川',
          gender: 1,
          email: 'lizbaby606@163.com',
        }) ? data : null,
      });

    case cs.UPDATE_ONE_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_ONE_FIRM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        firmsList: _.map(data, e => {
          if (e.resourceId === 1) {
            return {
              resourceId: 1,
              shareStatus: "private",
              firmName: '阿里巴巴',
              contact: 'bobo',
              resourceName: 'Jim Green',
              info: 'Sidney No. 1 Lake Park',
              createTime: '2012-12-11',
              endTime: '2020-12-24',
              status: 2,
              phone: '17844537359',
              qq: '1105394023',
              position: 'Hr',
              employeeName: 'Liz',
              province: '四川',
              gender: 1,
              email: 'lizbaby606@163.com',
            };
          } else {
            return e;
          }
        })
      });
    case cs.UPDATE_ONE_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        firmsList: _.map(data, e => {
          if (e.resourceId === 1) {
            return {
              resourceId: 1,
              shareStatus: "private",
              firmName: '阿里巴巴',
              contact: 'bobo',
              resourceName: 'Jim Green',
              info: 'Sidney No. 1 Lake Park',
              createTime: '2012-12-11',
              endTime: '2020-12-24',
              status: 2,
              phone: '17844537359',
              qq: '1105394023',
              position: 'Hr',
              employeeName: 'Liz',
              province: '四川',
              gender: 1,
              email: 'lizbaby606@163.com',
            };
          } else {
            return e;
          }
        })
      });

    case cs.DELETE_ONE_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_ONE_FIRM_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.DELETE_ONE_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });
    // case cs.GET_FIRMS_REQUEST:
    //     return Object.assign({}, state, {
    //         isFetching: true
    //     });
    // case cs.GET_FIRMS_SUCCESS:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    // case cs.GET_FIRMS_FAIL:
    //     return Object.assign({}, state, {
    //         isFetching: false,
    //     });
    default:
      return state;
  }
}
  // export default layoutReducer;
