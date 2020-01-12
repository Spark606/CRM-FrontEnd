import * as cs from '../constants';
import { message } from 'antd';
import { formatClients, formatFirms } from '../actions/base';

const initialState = {
  deleteClientsList: [],
  updateClientsList: [],
  deleteFirmsList: [],
  updateFirmsList: [],
  payBackList: [],
  deleteClientsPageTotal: 1,
  updateClientsPageTotal: 1,
  deleteFirmsPageTotal: 1,
  updateFirmsPageTotal: 1,
  payBackPageTotal: 1,
  deleteClientsCurrentPage: 1,
  updateClientsCurrentPage: 1,
  deleteFirmsCurrentPage: 1,
  updateFirmsCurrentPage: 1,
  payBackCurrentPage:1,
  pageSize: 50,
  currentPage: 1,
  oneFirmRecord: [],
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
        deleteClientsPageTotal: parseInt(action.payload.data.totalElements),
        deleteClientsCurrentPage: parseInt(action.payload.data.number) + 1,
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
        updateClientsPageTotal: parseInt(action.payload.data.totalElements),
        updateClientsCurrentPage: parseInt(action.payload.data.number) + 1,
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
        deleteFirmsList: formatFirms(action.payload.data.content),
        deleteFirmsPageTotal: parseInt(action.payload.data.totalElements),
        deleteFirmsCurrentPage: parseInt(action.payload.data.number) + 1,
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
        updateFirmsList: formatFirms(action.payload.data.content),
        updateFirmsPageTotal: parseInt(action.payload.data.totalElements),
        updateFirmsCurrentPage: parseInt(action.payload.data.number) + 1,
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
      if (action.payload.data === 'UPDATE_RESOURCE_SUCCESS' || action.payload.data === 'DELETE_RESOURCE_SUCCESS') {
        message.success('审核通过成功！');
      } else {
        message.success('审核驳回成功！');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.CKECK_PASS_CLIENT_FAIL:
      message.error('审核失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });

    case cs.CKECK_PASS_FIRM_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.CKECK_PASS_FIRM_SUCCESS:
      if (action.payload.data === 'UPDATE_COMPANY_SUCCESS' || action.payload.data === 'DELETE_COMPANY_SUCCESS') {
        message.success('审核通过成功！');
      } else {
        message.success('审核驳回成功！');
      }
      return Object.assign({}, state, {
        isFetching: false,
      });
    case cs.CKECK_PASS_FIRM_FAIL:
      message.error('审核失败！');
      return Object.assign({}, state, {
        isFetching: false,
      });


    case cs.GET_PAYBACK_LIST_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_PAYBACK_LIST_SUCCESS:
      return Object.assign({}, state, {
        payBackList: action.payload.data.content,
        payBackPageTotal: parseInt(action.payload.data.totalElements),
        payBackCurrentPage: parseInt(action.payload.data.number) + 1,
        isFetching: false,
      });
    case cs.GET_PAYBACK_LIST_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    default:
      return state;
  }
}
  // export default layoutReducer;
