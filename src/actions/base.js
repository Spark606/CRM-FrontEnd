import _ from 'lodash';
import * as cs from '../constants';
import {ErrorCode} from '../web-config';
// common action, some of them used to UI changing
export default function setUIElement(domain, key, value) {
  return {
    domain,
    type: cs.SET_UI_ELEMENT,
    payload: {key, value},
  };
}

export function format(params) {
  const paramsArr = [];
  if(params) {
    Object.keys(params).forEach(key => {
      const value = params[key];
      paramsArr.push(`${key}=${value}`);
    });
  }

  return paramsArr.length > 0 ? `?${paramsArr.join('&')}` : '';
}

export function downloadFile(url, cb) {
  const dowloadElem = document.getElementById('download');
  if(dowloadElem) {
    dowloadElem.remove();
  }
  const iframe = document.createElement('iframe');
  iframe.id = 'download';
  iframe.src = url;
  iframe.style.display = 'none';
  iframe.onload = (event) => cb(event);
  document.body.appendChild(iframe);
}

export function findErrorMessage(code) {
  const thisError = _.find(ErrorCode, ds => ds.code === code);
  if(thisError) {
    return thisError.msg;
  }
  return 'Operation failed.';
}

export function regEmailTest(value) {
  const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
  return reg.test(value);
}
