import _ from 'lodash';
import * as cs from '../constants';
import {ErrorCode} from '../web-config';


export function regEmailTest(value) {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(value);
}


export function formatRecords(dataSource) {
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

export function formatClients(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        clientId: item.resourceId,
        id: item.id,
        clientAvailable: item.shareStatus,
        clientName: item.resourceName,
        certificate: item.certificate,
        remark: item.info,
        createDate: item.createDate,
        expireDate: item.endDate,
        status: item.status,
        tel: item.phone,
        qq: item.qq,
        employeeName: item.employeeName,
        employeeId: item.employeeId,
        province: item.province,
        city: item.city,
        gender: item.gender,
        email: item.email,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};

export function formatFirms(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        id: item.id,
        firmId: item.companyId,
        firmAvailable: item.shareStatus,
        firmName: item.companyName,
        category: item.companyCategory,
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

export function findErrorMessage(code) {
  const thisError = _.find(ErrorCode, ds => ds.code === code);
  if(thisError) {
    return thisError.msg;
  }
  return 'Operation failed.';
}

export function formatClientOrder(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        orderId: item.businessId,
        firmId: item.companyId,
        firmName: item.companyName,
        createDate: item.createDate,
        employeeId: item.employeeId,
        employeeName: item.employeeName,
        remark: item.info,
        orderPaySum: item.orderPaySum,
        clientId: item.resourceId,
        clientName: item.resourceName,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};
export function formatFirmOrder(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        orderId: item.businessId,
        firmId: item.companyId,
        firmName: item.companyName,
        createDate: item.createDate,
        employeeId: item.employeeId,
        employeeName: item.employeeName,
        remark: item.info,
        orderPaySum: item.orderPaySum,
        clientLists: item.resource,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};
export function formatOrderBack(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        orderPaySum: item.orderPaySum, // 成交总额
        owePay: item.orderPaySum, // 欠款金额
        backPay: item.orderPaySum, // 回款金额
        laterBackPay: item.orderPaySum, // 最后回款金额
        laterBackDate: item.orderPaySum, // 最后回款时间
        backTimes: item.orderPaySum, // 回款次数
        recordDate: item.orderPaySum, // 录入时间
        updateDate: item.orderPaySum, // 修改时间
        createDate: item.orderPaySum, // 最后成交时间
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};