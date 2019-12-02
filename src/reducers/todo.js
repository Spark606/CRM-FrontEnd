import * as cs from '../constants';
import { formatClients, formatFirms } from '../actions/base';
let firmsData = [
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
let clientsData = [
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
const initialState = {
  deleteClientsList: formatClients(clientsData),
  updateClientsList: formatClients(clientsData),
  deleteFirmsList: formatFirms(firmsData),
  updateFirmsList: formatFirms(firmsData),
  deleteClientsPageTotal: 10,
  updateClientsPageTotal: 10,
  deleteFirmsPageTotal: 10,
  updateFirmsPageTotal: 10,
  deleteClientsCurrentPage: 1,
  updateClientsCurrentPage: 1,
  deleteFirmsCurrentPage: 1,
  updateFirmsCurrentPage: 1,
  pageSize: 2,
  currentPage: 1,
  oneFirmRecord: []
};

export default function firmReducer(state = initialState, action) {
  switch (action.type) {
    case cs.GET_DELETE_CLIENTS_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_DELETE_CLIENTS_LIST_SUCCESS:
      return Object.assign({}, state, {
        deleteClientsList: formatClients(action.payload.data.content),
        deleteClientsPageTotal: action.payload.data.totalPages * 2,
        deleteClientsCurrentPage: action.payload.data.number + 1,
        isFetching: false,
      });
    case cs.GET_DELETE_CLIENTS_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });



    case cs.GET_UPDATE_CLIENTS_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_UPDATE_CLIENTS_LIST_SUCCESS:
      return Object.assign({}, state, {
        updateClientsList: formatClients(action.payload.data.content),
        updateClientsPageTotal: action.payload.data.totalPages * 2,
        updateClientsCurrentPage: action.payload.data.number + 1,
        isFetching: false,
      });
    case cs.GET_UPDATE_CLIENTS_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });



    case cs.GET_DELETE_FIRMS_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_DELETE_FIRMS_LIST_SUCCESS:
      return Object.assign({}, state, {
        deleteFirmsList: formatClients(action.payload.data.content),
        deleteFirmsPageTotal: action.payload.data.totalPages * 2,
        deleteFirmsCurrentPage: action.payload.data.number + 1,
        isFetching: false,
      });
    case cs.GET_DELETE_FIRMS_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });



    case cs.GET_UPDATE_FIRMS_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_UPDATE_FIRMS_LIST_SUCCESS:
      return Object.assign({}, state, {
        updateFirmsList: formatClients(action.payload.data.content),
        updateFirmsPageTotal: action.payload.data.totalPages * 2,
        updateFirmsCurrentPage: action.payload.data.number + 1,
        isFetching: false,
      });
    case cs.GET_UPDATE_FIRMS_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.CKECK_PASS_CLIENT_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.CKECK_PASS_CLIENT_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.CKECK_PASS_CLIENT_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.CKECK_PASS_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.CKECK_PASS_FIRM_SUCCESS:
      return Object.assign({}, state, {
        // updateClientsList: action.payload ? formatClients(action.payload.data) : [],
        updateFirmsPageTotal: action.payload.data.totalPages * 2,
        updateFirmsCurrentPage: action.payload.data.number + 1,
        isFetching: false,
      });
    case cs.CKECK_PASS_FIRM_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    default:
      return state;
  }
}
  // export default layoutReducer;
