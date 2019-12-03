import * as cs from '../constants';
import { formatClients, formatFirms } from '../actions/base';

const initialState = {
  deleteClientsList: [],
  updateClientsList:  [],
  deleteFirmsList: [],
  updateFirmsList:  [],
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
      console.log("GET_UPDATE_CLIENTS_LIST_SUCCESS");
      console.table(action.payload.data.content);
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
