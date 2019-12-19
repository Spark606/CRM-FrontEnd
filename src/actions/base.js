import _ from 'lodash';
import * as cs from '../constants';
import { ErrorCode } from '../web-config';


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
        shareStatus: item.shareStatus,
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
        shareStatus: item.shareStatus,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};

export function findErrorMessage(code) {
  const thisError = _.find(ErrorCode, ds => ds.code === code);
  if (thisError) {
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
export function formatOrderBackDetail(dataSource) {
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

export function formatOrderBack(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        orderPaySum: item.orderPaySum, // 成交总额
        owePay: item.orderPaySum, // 欠款金额
        backPay: item.backPay, // 回款金额
        laterBackPay: item.laterBackPay, // 最后回款金额
        laterBackDate: item.laterBackDate, // 最后回款时间
        backTimes: item.backTimes, // 回款次数
        recordDate: item.recordDate, // 录入时间
        updateDate: item.updateDate, // 修改时间
        createDate: item.createDate, // 最后成交时间
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};

export function formatEmployeesSalary(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        employeeId: item.employeeId || null, // 成交总额
        employeeName: item.employeeName || null, // 欠款金额
        performance: item.performance || null, // 回款金额
        penalty: item.penalty || null, // 最后回款金额
        baseSalary: item.baseSalary || null, // 最后回款时间
        salary: item.salary || null, // 回款次数
        info: item.info || null, // 录入时间
        clientOrderData: item.resourceBusinessList ? item.resourceBusinessList.map(e => {
          return {
            clientName: e.clientName || null,
            businessId: e.businessId || null,
            createDate: e.createDate || null,
            orderPaySum: e.orderPaySum || null,
            curretMonthPayBackSum: e.curretMonthPayBackSum || null,
            owePay: e.owePay || null,
          };
        }) : [],
        firmOrderData: item.comapnyBusinessList ? item.comapnyBusinessList.map(e => {
          return {
            firmName: e.firmName || null,
            businessId: e.businessId || null,
            createDate: e.createDate || null,
            orderPaySum: e.orderPaySum || null,
            curretMonthPayBackSum: e.curretMonthPayBackSum || null,
            owePay: e.owePay || null,
          };
        }) : null,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};


export function formatemployeeSalaryRegulation(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        employeeId: item.employeeId,
        employeeName: item.employeeName,
        baseSalary: item.baseSalary,
        clientSumPay: item.clientSumPay,
        clientSumPayRatio: item.clientSumPayRatio,
        firmSumPay: item.firmSumPay,
        firmSumPayRatio: item.firmSumPayRatio,
        positionSalary: item.positionSalary,
        positionAge: item.positionAge,
        employeeLeave: item.employeeLeave,
        employeeLate: item.employeeLate,
        penalty: item.penalty,
        bonus: item.bonus,
        insurance: item.insurance,
        other: item.other,
        info: item.info,
      }));
    });
    return seriesData;
  } else {
    return [];
  }
};
