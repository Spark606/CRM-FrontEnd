import * as cs from '../constants';
import { CALL_API } from '../middlewares/callAPI';
import { message } from 'antd';

export function getGrossStatus() {
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: '/crm/employee/test',
        method: 'POST',
        body: {},
        mode: "cors",
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_GROSS_STATUS_REQUEST, cs.GET_GROSS_STATUS_SUCCESS, cs.GET_GROSS_STATUS_FAIL],
      },
    });
    return action;
  };
}
