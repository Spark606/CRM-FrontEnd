import * as cs from '../constants';
import { formatClients, formatRecords, formatClientOrder, formatFirmOrder } from '../actions/base';
const initialState = {
  isFetching: false,
  newClientNum: null,
  newResourceNum: null,
  newResourceList: null,
  newCompanyNum: null,
  newCompanyList: null,
  recordClentsList: null,
  recordFirmsList: null,
  recordNum: null,
  orderSum: null,
  orderClientsSum: null,
  orderFirmsSum: null,
  orderClientsList: null,
  orderFirmsList: null,
  orderPaySum: null,
  orderPayClientsSum: null,
  orderPayFirmsSum: null,
  orderPayClientsList: null,
  orderPayFirmsList: null,
  payBackSum: null,
  payBackSumList: null,
  ownPaySum: null,
  ownPayList: null,
};

export default function salaryReducer(state = initialState, action) {
  switch (action.type) {


    case cs.GET_GROSS_STATUS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      });
    case cs.GET_GROSS_STATUS_SUCCESS:
      return Object.assign({}, state, {
        newResourceNum: action.payload.data.newResourceClientAmounts,
        newCompanyNum: action.payload.data.newCompanyClientAmounts,
        newClientNum: action.payload.data.newClientsAmounts,
        newResourceList: formatClients(action.payload.data.newClientsAmountsList),
        newCompanyList: formatClients(action.payload.data.newCompanyClientsAmountsList),

        recordClentsList: formatRecords(action.payload.data.resourceFollowRecordAmountsList),
        recordFirmsList: formatRecords(action.payload.data.companyFollowRecordAmountsList),
        recordNum: action.payload.data.allFollowRecordAmounts,

        // 成交总额
        orderPaySum: action.payload.data.orderPaySumAmounts,
        orderPayClientsSum: action.payload.data.resourceOrderPaySumAmounts,
        orderPayFirmsSum: action.payload.data.companyOrderPaySumAmounts,
        orderPayClientsList: formatClientOrder(action.payload.data.resourceOrderPaySumAmountsList),
        orderPayFirmsList: formatFirmOrder(action.payload.data.companyOrderPaySumAmountsList),
        // 成交单数
        orderSum: action.payload.data.businessAmounts,
        orderClientsSum: action.payload.data.resourceBusinessAmounts,
        orderFirmsSum: action.payload.data.companyBusinessAmounts,
        orderClientsList: formatClientOrder(action.payload.data.resourceBusinessList),
        orderFirmsList: formatFirmOrder(action.payload.data.companyBusinessList),
        // 回款总额
        payBackSum: action.payload.data.payBackSum,
        payBackSumList: action.payload.data.payBackSumList,
        // 欠款总额
        ownPaySum: action.payload.data.payBackOweSum,
        ownPayList: action.payload.data.payBackOweSumList,
        isFetching: false,
      });
    case cs.GET_GROSS_STATUS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
      });

    default:
      return state;
  }
}
