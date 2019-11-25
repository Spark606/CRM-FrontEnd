import 'whatwg-fetch';
import { normalize } from 'normalizr';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';

export const CALL_API = Symbol('Call API');
export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  if (!endpoint) {
    throw new Error('Endpoint is missing.');
  }
  // const token = store.getState().sessions.token;
  const { types, schema, method = 'GET', body, headers = {
    'Authorization': `Bearer token xxxxxxxxxxxxxxxxxx`.trim(),
    // Authorization: `Bearer ${token}`.trim(),//string.trim()去除首尾空格
    'Content-Type': 'application/json;charset=utf-8', //默认就是这个
  }, loading = true} = callAPI;
  if (typeof endpoint === 'string') {
    const options = {
      method,
      headers,
      loading
    };
    if (body) options.body = JSON.stringify(body);
    if (options.loading) {
      NProgress.start();
    }
    const apiUrl = endpoint;
    console.log('options', options);
    // 这里开始使用fetch请求数据
    endpoint = fetch(endpoint, options).then(response => {
      console.log('请求结束', response);
      if (response.status === 401 && apiUrl === '/api/v1/user/refresh_token') {
        localStorage.removeItem('sessions');
        location.href = '/login';
      }
      return response.json().then(json => {
        NProgress.done();
        if (!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    });

  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  const actionWith = data => {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  };

  const [requestType, successType, failureType] = types;
  next(actionWith({ type: requestType }));

  return endpoint
    .then(data => next(actionWith({
      payload: schema ? normalize(data, schema) : data,
      type: successType,
    })))
    .catch(err => {
      NProgress.done();
      // console.log('error', err);
      return next(actionWith({
        type: failureType,
        error: err || { message: 'Something bad happened' },
      }));
    });
};
