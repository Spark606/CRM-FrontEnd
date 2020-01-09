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
        resourceName: item.resourceName,
        employeeName: item.employeeName,
        recordId: item.recorderId,
        createDate: item.createDate,
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
        tel: item.phoneNumber,
        qq: item.qq,
        employeeName: item.employeeName,
        employeeId: item.employeeId,
        province: item.province,
        city: item.city,
        gender: item.gender,
        email: item.email,
        shareStatus: item.shareStatus,
        checkedStatus: item.checkedStatus,
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



export function formatEmployeesSalary(dataSource) {
  if (dataSource) {
    const seriesData = [];
    dataSource.map(item => {
      seriesData.push(Object.assign({}, {
        employeeId: item.employeeId,
        employeeName: item.employeeName, 
        performance: item.performance, 
        penalty: item.penalty,
        baseSalary: item.baseSalary, 
        salary: item.salary,
        info: item.info, 
        clientOrderData: item.resourceBusinessList ? item.resourceBusinessList.map(e => {
          return {
            clientName: e.clientName,
            businessId: e.businessId,
            createDate: e.createDate,
            orderPaySum: e.orderPaySum,
            curretMonthPayBackSum: e.paybackSum,
            owePay: e.oweSum,
          };
        }) : [],
        firmOrderData: item.comapnyBusinessList ? item.comapnyBusinessList.map(e => {
          return {
            firmName: e.firmName,
            businessId: e.businessId,
            createDate: e.createDate,
            orderPaySum: e.orderPaySum,
            curretMonthPayBackSum: e.paybackSum,
            owePay: e.oweSum,
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
    return Object.assign({}, {
      employeeId: dataSource.employeeId,
      employeeName: dataSource.employeeName,
      baseSalary: dataSource.baseSalary,
      clientSumPay: dataSource.resourcePaySum,
      clientSumPayRatio: dataSource.resourceRatio,
      firmSumPay: dataSource.companyPaySum,
      firmSumPayRatio: dataSource.companyRatio,
      positionSalary: dataSource.positionWage,
      positionAge: dataSource.positionAge,
      employeeLeave: dataSource.employeeLeave,
      employeeLate: dataSource.employeeLate,
      penalty: dataSource.penalty,
      bonus: dataSource.bonus,
      insurance: dataSource.insurance,
      other: dataSource.other,
      info: dataSource.info,
    });;
  } else {
    return [];
  };
}

export function changeSelectedKeys(params) {
  return {
    type: 'CHANGE_SELECTED_KEY',
    payload: params
  };
}