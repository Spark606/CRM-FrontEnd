import * as cs from '../constants';
import _ from 'lodash';
import {formatClients, formatRecords} from '../actions/base';
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
    status: 2,
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 3,
    content: 'Technical testing',
    recorderName: 'Liz',
    status: 3,
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },
  {
    key: 4,
    content: 'Network problems being solved',
    recorderName: 'Liz',
    status: 4,
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },

];


const initialState = {
  clientsList: formatClients(data),
  oneClientRecord: [],
  oneClientStatus: 1,
  currentPage: 1,
  pageSize: 2,
  pageTotal: 10
};
// const layoutReducer = (state = initialState) => state;
export default function clientReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_CLIENTS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENTS_SUCCESS:
      console.log(action.payload.data.number);
      return Object.assign({}, state, {
        clientsList: formatClients(action.payload.data.content),
        pageTotal: action.payload.data.totalPages * 2,
        currentPage: action.payload.data.number+1,
        isFetching: false,
      });
    case cs.GET_CLIENTS_FAIL:
      return Object.assign({}, state, {
        clientsList: formatClients(data),
        isFetching: false,
      });


    case cs.GET_CLIENT_RECORDS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_CLIENT_RECORDS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        oneClientRecord: formatRecords(action.payload.data),
      });
    case cs.GET_CLIENT_RECORDS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.ADD_NEW_CLIENT_RECORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_CLIENT_RECORD_SUCCESS:
      console.log(action.payload.data)
      return Object.assign({}, state, {
        oneClientRecord: [...formatRecords([action.payload.data]), ...state.oneClientRecord],
        isFetching: false,
      });
    case cs.ADD_NEW_CLIENT_RECORD_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.ADD_NEW_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList:  action.payload ? [...formatClients([{
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
        }]), ...state.clientsList] : state.clientsList
      });
    case cs.ADD_NEW_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: [...formatClients([{
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
        clientsList: [...state.clientsList]
      });
    case cs.UPDATE_ONE_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        clientsList: [...state.clientsList]
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
