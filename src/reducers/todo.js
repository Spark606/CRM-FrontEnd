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

const initialState = {
  todoList: data,
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


export default function firmReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_DELETE_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_DELETE_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        todoList: action.payload ? formatFirms(action.payload.data) : [],
        isFetching: false,
      });
    case cs.GET_DELETE_CLIENT_FAIL:
      return Object.assign({}, state, {
        todoList: data ? formatFirms(data) : [],
        isFetching: false,
      });
    default:
      return state;
  }
}
  // export default layoutReducer;
