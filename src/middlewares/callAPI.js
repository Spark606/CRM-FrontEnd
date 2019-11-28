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
  const token = store.getState().sessions.token ? store.getState().sessions.token : localStorage.getItem('sessions');
  const { types, schema, method = 'GET', body, headers = {
    Authorization: `Bearer ${token}`.trim(),//string.trim()去除首尾空格
    'Content-Type': 'application/json;charset=utf-8', //默认就是这个
  }, loading = true } = callAPI;
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
    endpoint = _fetch(fetch(endpoint, options).then(response => {
      // console.log('请求结束', response);
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
    }), 1000);
    
    // 封装可timeout的fetch-------start
    function _fetch(fetch_promise, timeout) {
      var abort_fn = null;
      //这是一个可以被reject的promise
      var abort_promise = new Promise(function (resolve, reject) {
        abort_fn = function () {
          reject('abort promise');
        };
      });
      //这里使用Promise.race，以最快 resolve 或 reject 的结果来传入后续绑定的回调
      var abortable_promise = Promise.race([
        fetch_promise,
        abort_promise
      ]);
      setTimeout(function () {
        abort_fn();
      }, timeout);
      return abortable_promise;
    }
    // 封装可timeout的fetch-------end


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
