import * as cs from '../constants';
let data = [
  {
    companyId: 1,
    shareStatus: "private",
    companyName: '阿里巴巴',
    contactorName: 'bobo',
    info: 'New York No. 1 Lake',
    startDate: '2012-12-11',
    expireDate: '2010-12-24',
    status: 1,
    phoneNumber: '17844537359',
    qq: '1105394023',
    occupation: 'Hr',
    employeeName: 'Liz',
    employeeId: 1,
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    companyId: 2,
    shareStatus: "private",
    companyName: '阿里巴巴',
    contactorName: 'bobo',
    info: 'London No. 1 Lake',
    startDate: '2012-12-11',
    expireDate: '2020-12-24',
    status: 1,
    phoneNumber: '17844537359',
    qq: '1105394023',
    occupation: 'Hr',
    employeeName: 'Liz',
    employeeId: 1,
    province: '四川',
    gender: 1,
    email: 'lizbaby606@163.com',
  },
  {
    companyId: 3,
    shareStatus: "private",
    companyName: '阿里巴巴',
    contactorName: 'bobo',
    info: 'Sidney No. 1 Lake',
    startDate: '2012-12-11',
    expireDate: '2020-12-24',
    status: 2,
    phoneNumber: '17844537359',
    qq: '1105394023',
    occupation: 'Hr',
    employeeName: 'Liz',
    employeeId: 1,
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
    content: 'Solve initial network',
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
    content: 'Network problems being',
    recorderName: 'Liz',
    recorderId: 3,
    recorderTime: '2018-12-11 22:23:21'
  },

];
const initialState = {
  firmsList: data,
  tableRow: 10,
  currentPage: 1,
  oneFirmRecord: []
};
function formatFirms(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        firmId: item.companyId,
        firmAvailable: item.shareStatus,
        firmName: item.companyName,
        contact: item.contactorName,
        remark: item.info,
        createDate: item.startDate,
        expireDate: item.expireDate,
        status: item.status,
        tel: item.phoneNumber,
        position: item.occupation,
        qq: item.qq,
        employeeName: item.employeeName,
        employeeId: item.employeeId,
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

export default function firmReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_FIRMS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_FIRMS_SUCCESS:
      return Object.assign({}, state, {
        firmsList: action.payload ? formatFirms(action.payload.data) : [],
        isFetching: false,
      });
    case cs.GET_FIRMS_FAIL:
      return Object.assign({}, state, {
        firmsList: data ? formatFirms(data) : [],
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
