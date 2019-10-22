import {normalize} from 'normalizr';
import NProgress from 'nprogress';

import 'nprogress/nprogress.css';
// const defaultTypeSuffixes = ['REQUEST', 'SUCCESS', 'FAILURE'];
// Action key that carries API call info interpreted by this Redux middleware.

export const CALL_API = Symbol('Call API');
// A Redux middleware that interprets actions with CALL_API info specified.
// Performs the call and promises when such actions are dispatched.
export default store => next => action => {
  const callAPI = action[CALL_API];
  if(typeof callAPI === 'undefined') {
    return next(action);
  }

  let {endpoint} = callAPI;
  if(!endpoint) {
    throw new Error('Endpoint is missing.');
  }
  const token = store.getState().sessions.token;
  const {types, schema, method = 'GET', body, headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`.trim(),
    'Content-Type': 'application/json',
  }, loading = true} = callAPI;
  if(typeof endpoint === 'string') {
    const options = {
      method,
      headers,
      loading
    };

    if(body) options.body = JSON.stringify(body);
    if(options.loading) {
      NProgress.start();
    }
    console.log(endpoint);
    const apiUrl = endpoint;
    endpoint = fetch(endpoint, options).then(response => {
      if(response.status === 401 && apiUrl === '/api/v1/user/refresh_token') {
        localStorage.removeItem('sessions');
        location.href = '/login';
      }
      return response.json().then(json => {
        NProgress.done();
        // 请求后自动滚动到顶端;
        if(options.loading) {
          const lyContent = document.getElementById('od-content');
          if(lyContent && lyContent.firstElementChild && lyContent.firstElementChild.scrollTo) {
            lyContent.firstElementChild.scrollTo(0, 0);
          }
          if(lyContent && lyContent.firstChild && lyContent.firstChild.scrollTo) {
            lyContent.firstChild.scrollTo(0, 0);
          }
        }
        if(!response.ok) {
          return Promise.reject(json);
        }
        return json;
      });
    });
  }
  if(!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if(!types.every(type => typeof type === 'string')) {
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
        error: err || {message: 'Something bad happened'},
      }));
    });
};
