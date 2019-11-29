import * as cs from '../constants';
import {CALL_API} from '../middlewares/callAPI';

const url = 'http://192.168.205.221:8000';

// client page
export function getDeletCientsList(){
  return async (dispatch) => {
    const action = await dispatch({
      [CALL_API]: {
        endpoint: url + '/crm/employee/getCompanyList',
        method: 'GET',
        header: {
          'Content-Type': 'application/json',
        },
        timeout: 3000,
        types: [cs.GET_DELETE_CLIENT_REQUEST, cs.GET_DELETE_CLIENT_SUCCESS, cs.GET_DELETE_CLIENT_FAIL],
      },
    });
    return action;
  };
}
