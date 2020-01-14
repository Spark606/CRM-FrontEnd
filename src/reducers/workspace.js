import * as cs from '../constants';
import { formatClients, formatRecords, formatClientOrder, formatFirmOrder, formatFirms } from '../actions/base';
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
  payBackClientsSum: null,
  payBackFirmsSum: null,
  payBackClientsList: null,
  payBackFirmsList: null,

  ownPaySum: null,
  ownPayList: null,
  clientOwnPaySum: null,
  firmOwnPaySum: null,
  clientOwnPayList: null,
  firmOwnPayList: null,
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
        newResourceList: formatClients(action.payload.data.newResourceClientsAmountsList),
        newCompanyList: formatFirms(action.payload.data.newCompanyClientsAmountsList),

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

        payBackClientsSum: action.payload.data.resourcePayBackSum,
        payBackFirmsSum: action.payload.data.companyPayBackSum,
        payBackClientsList: action.payload.data.resourcePayBackSumList,
        payBackFirmsList: action.payload.data.companyPayBackSumList,
        // 欠款总额
        ownPaySum: action.payload.data.payBackOweSum,
        ownPayList: action.payload.data.payBackOweSumList,

        clientOwnPaySum: action.payload.data.resourcePayBackOweSum,
        firmOwnPaySum: action.payload.data.companyPayBackOweSum,
        clientOwnPayList: action.payload.data.resourcePayBackOweSumList,
        firmOwnPayList: action.payload.data.companyPayBackOweSumList,

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
