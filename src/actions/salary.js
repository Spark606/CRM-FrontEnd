import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';
import { message } from 'antd';

export function getEmployeesSalaryList(params) {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/test',
        method: 'POST',
        mode: "cors",
        body: params,
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_EMPLOYEES_SALARYLIST_REQUEST, cs.GET_EMPLOYEES_SALARYLIST_SUCCESS, cs.GET_EMPLOYEES_SALARYLIST_FAIL],
      },
    });
    return action;
  };
}