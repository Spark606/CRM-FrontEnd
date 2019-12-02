import * as cs from '../constants';

import { formatFirms, formatRecords } from '../actions/base';

const initialState = {
  firmsList: [],
  currentPage: 1,
  oneFirmRecord: [],
  currentPage: 1,
  pageSize: 2,
  pageTotal: 10
};

export default function firmReducer(state = initialState, action) {
  console.log("我是state", state);
  switch (action.type) {
    case cs.GET_FIRMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_FIRMS_SUCCESS:
      return Object.assign({}, state, {
        firmsList: action.payload ? formatFirms(action.payload.data.content) : [],
        pageTotal: action.payload.data.totalPages * 2,
        currentPage: action.payload.data.number + 1,
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
        oneFirmRecord: action.payload.data ? formatRecords(action.payload.data) : [],
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
        firmsList: action.payload ? [...formatFirms([action.payload.data]), ...state.firmsList] : state.firmsList,
      });
    case cs.ADD_NEW_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        firmsList: [...formatFirms([{
          resourceId: 20,
          shareStatus: "private",
          companyCategory: 1,
          companyName: '阿里巴巴',
          contact: 'bobo',
          resourceName: 'Jim Green',
          info: 'Sidney No. 1 Lake Park',
          createDate: '2012-12-11',
          endDate: '2020-12-24',
          status: 2,
          phone: '17844537359',
          qq: '1105394023',
          position: 'Hr',
          employeeName: 'Liz',
          province: '四川',
          gender: 1,
          email: 'lizbaby606@163.com',
        }]), ...state.firmsList]
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
              companyCategory: 1,
              companyName: '百度',
              contact: 'bobo',
              resourceName: 'Jim Green',
              info: 'Sidney No. 1 Lake Park',
              createDate: '2012-12-11',
              endDate: '2020-12-24',
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
              companyCategory: 1,
              companyName: '阿里巴巴',
              contact: 'bobo',
              resourceName: 'Jim Green',
              info: 'Sidney No. 1 Lake Park',
              createDate: '2012-12-11',
              endDate: '2020-12-24',
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

    case cs.ADD_NEW_FIRM_RECORD_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.ADD_NEW_FIRM_RECORD_SUCCESS:
      console.log(action.payload.data)
      return Object.assign({}, state, {
        oneFirmRecord: action.payload ? [...formatRecords([action.payload.data]), ...state.oneFirmRecord] : state.oneFirmRecord,
        isFetching: false,
      });
    case cs.ADD_NEW_FIRM_RECORD_FAIL:
      return Object.assign({}, state, {
        oneFirmRecord: [...formatRecords([{
          key: 6,
          content: '我是新跟进',
          recorderName: 'Liz',
          status: 4,
          recorderId: 3,
          recorderTime: '2018-12-11 22:23:21'
        }]), ...state.oneFirmRecord],
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
