import * as cs from '../constants';
import _ from 'lodash'
import { Item } from 'rc-menu';
let data = [
  {
    resourceId: 1,
    shareStatus: "private",
    resourceName: 'John Brown',
    certificate: '一级房建转加造价初',
    info: 'New York No. 1 Lake Park',
    createDate: '2012-12-11',
    endDate: '2010-12-24',
    status: 1,
    phone: '17844537359',
    qq: '1105394023',
    employeeName: 'Liz',
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
    createDate: '2012-12-11',
    endDate: '2020-12-24',
    status: 1,
    phone: '17844537359',
    qq: '1105394023',
    employeeName: 'Liz',
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
    createDate: '2012-12-11',
    endDate: '2020-12-24',
    status: 2,
    phone: '17844537359',
    qq: '1105394023',
    employeeName: 'Liz',
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
    createDate: '2012-12-11',
    endDate: '2020-12-24',
    status: 1,
    phone: '17844537359',
    qq: '1105394023',
    employeeName: 'Liz',
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
    createDate: '2012-12-11',
    endDate: '2020-12-24',
    status: 1,
    phone: '17844537359',
    qq: '1105394023',
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
    status: 1,
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 2,
    content: 'Solve initial network problems',
    recorderName: 'Liz',
    status: 1,
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 3,
    content: 'Technical testing',
    recorderName: 'Liz',
    status: 1,
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 4,
    content: 'Network problems being solved',
    recorderName: 'Liz',
    status: 1,
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },

];
const initialState = {
  clientsList: data,
  tableRow: 10,
  currentPage: 1,
  oneClientRecord: records,
  oneClientStatus: 1,
};

function formatRecords(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        key: item.key,
        content: item.content,
        recordName: item.resourceName,
        recordId: item.recorderId,
        status: item.status,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};

function formatClients(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        clientId: item.resourceId,
        resourceStatus: item.shareStatus,
        clientName: item.resourceName,
        certificate: item.certificate,
        remark: item.info,
        createDate: item.createDate,
        expireDate: item.endDate,
        status: item.status,
        tel: item.phone,
        qq: item.qq,
        employeeName: item.employeeName,
        province: item.province,
        gender: item.gender,
        email: item.email,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
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
        clientsList: action.payload ? formatClients(action.payload.data) : [],
        isFetching: false,
      });
    case cs.GET_CLIENTS_FAIL:
      return Object.assign({}, state, {
        clientsList: data ? formatClients(data) : [],
        isFetching: false,
      });


    case cs.GET_CLIENT_RECORDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENT_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        oneClientRecord: action.payload.data ? formatRecords(action.payload.data) : [],
      });
    case cs.GET_CLIENT_RECORDS_FAIL:
      return Object.assign({}, state, {
        oneClientRecord: records ? formatRecords(records) : [],
        isFetching: false,
      });

    case cs.ADD_NEW_RECORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_RECORD_SUCCESS:
      console.log(action.payload.data)
      return Object.assign({}, state, {
        oneClientRecord: action.payload ? [...formatRecords(action.payload.data), ...state.oneClientRecord] : state.oneClientRecord,
        isFetching: false,
      });
    case cs.ADD_NEW_RECORD_FAIL:
      return Object.assign({}, state, {
        oneClientRecord: [...formatRecords([{
          key: 6,
          content: '我是新跟进',
          recorderName: 'Liz',
          status: 4,
          recorderId: 3,
          recorderTime: '2018-12-11 22:23:21'
        }]), ...state.oneClientRecord],
        isFetching: false,
      });
    case cs.ADD_NEW_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: [...formatRecords([{
          resourceId: 20,
          shareStatus: "private",
          resourceName: '傻bobo',
          certificate: '一级房建转加造价初',
          info: 'London No. 2 Lake Park',
          createDate: '2012-12-11',
          endDate: '2020-12-24',
          status: 1,
          phone: '17844537359',
          qq: '1105394023',
          employeeName: 'Liz',
          province: '四川',
          gender: 1,
          email: 'lizbaby606@163.com',
        }]), ...state.clientsList]
      });
    case cs.ADD_NEW_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: [...formatRecords([{
          resourceId: 20,
          shareStatus: "private",
          resourceName: '傻bobo',
          certificate: '一级房建转加造价初',
          info: 'London No. 2 Lake Park',
          createDate: '2012-12-11',
          endDate: '2020-12-24',
          status: 1,
          phone: '17844537359',
          qq: '1105394023',
          employeeName: 'Liz',
          province: '四川',
          gender: 1,
          email: 'lizbaby606@163.com',
        }]), ...state.clientsList]
      });

    case cs.UPDATE_ONE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.UPDATE_ONE_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: _.map(data, e => {
          if (e.resourceId === 1) {
            return {
              resourceId: 1,
              shareStatus: "private",
              resourceName: '傻bobo',
              certificate: '一级房建转加造价初',
              info: 'London No. 2 Lake Park',
              createDate: '2012-12-11',
              endDate: '2020-12-24',
              status: 1,
              phone: '17844537359',
              qq: '1105394023',
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
    case cs.UPDATE_ONE_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: _.map(data, e => {
          if (e.resourceId === 1) {
            return {
              resourceId: 1,
              shareStatus: "private",
              resourceName: '傻bobo',
              certificate: '一级房建转加造价初',
              info: 'London No. 2 Lake Park',
              createDate: '2012-12-11',
              endDate: '2020-12-24',
              status: 1,
              phone: '17844537359',
              qq: '1105394023',
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

    case cs.DELETE_ONE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.DELETE_ONE_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: _.filter(data, e => {
          if (e.resourceName !== '李四') {
            return e;
          }
        })
      });
    case cs.DELETE_ONE_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: _.filter(data, e => {
          if (e.resourceName !== '李四') {
            return e;
          }
        })
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
