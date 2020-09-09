import { Toast } from 'mand-mobile';
import Store from '../../store';

const baseUrl = '';
const httpStatusCode = {
  400: '服务器不理解请求的语法',
  401: '请求要求用户的身份认证',
  403: '服务器拒绝执行此请求',
  404: '服务器无法根据客户端的请求找到资源',
  405: '请求方法对指定的资源不适用',
  500: '服务器内部错误，无法完成请求',
  501: '服务器不具备完成请求的功能',
  502: '服务器作为网关或代理，从上游服务器收到无效响应',
  503: '服务器目前无法使用'
};

const XHR = {
  createActiveXObject() {
    try {
      return new window.ActiveXObject('Microsoft.XMLHttp');
    } catch (e) {
      console.log(1);
      console.error(e);
      return false;
    }
  },
  createStandardXHR() {
    try {
      return new window.XMLHttpRequest();
    } catch (e) {
      console.log(2);
      console.error(e);
      return false;
    }
  },
  getXHR() {
    let xhr = null;
    if (typeof window.ActiveXObject !== 'undefined') {
      xhr = XHR.createActiveXObject();
    } else {
      xhr = XHR.createStandardXHR();
    }
    return xhr;
  },
  onreadystatechange: (xhr, callback) => {
    if (!callback) { return; }
    if (parseInt(xhr.readyState, 10) === 4) {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
        callback(xhr.responseText);
      }
    }
  },
  ontimeout: (callback) => {
    if (!callback) { return; }
    callback();
  },
  onprogress: (event, callback) => {
    if (!callback) { return; }
    callback(event);
  }
};

export default async(url, data = {}, type = 'GET', method = 'fetch') => {
  let needLoading = true;
  if (url.indexOf('userinfo') !== -1) {
    needLoading = false;
  }
  const Type = type.toUpperCase();
  let Url = baseUrl + url;
  if (Type === 'GET') {
    let dataStr = '';
    // Object.keys(data).forEach((key) => {
    //   dataStr += `${key}=${data[key]}`;
    // });
    Object.keys(data).forEach((key) => {
      dataStr += `/${data[key]}`;
    });
    if (dataStr !== '') {
      // dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      // Url += `?${dataStr}`;
      Url += `${dataStr}`;
    }
  }

  if (window.fetch && method === 'fetch') {
    let requestConfig = {
      credentials: 'include',
      method: Type,
      headers: {
        token: Store.state.token
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        // 'Content-Type': 'multipart/form-data',
      },
      mode: 'cors',
      cache: 'force-cache'
    };
    if (Type === 'POST' || Type === 'PUT') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data)
      });
    } else if (Type === 'FILE') {
      requestConfig = {
        method: 'POST',
        body: data,
        Accept: 'application/json'
      };
    }

    try {
      if (needLoading) {
        Toast.loading();
      }
      const response = await fetch(Url, requestConfig);
      if (response && needLoading) {
        Toast.hide();
      }
      const { status } = response;
      if (status !== 200) {
        const res = { code: status };
        if (status in Object.keys(httpStatusCode)) {
          return { ...res, message: httpStatusCode[status] };
        }
        return { ...res, message: '无法连接服务器，请检查网络是否可用' };
      }
      return await response.json();
    } catch (error) {
      if (needLoading) {
        Toast.hide();
      }
      return error;
    }
  } else {
    return new Promise((resolve, reject) => {
      let sendData = '';
      const xhr = XHR.getXHR();
      xhr.timeout = 10000;
      if (Type === 'POST' || Type === 'PUT') {
        sendData = JSON.stringify(data);
      }

      xhr.open(Type, Url, true);
      if (Type === 'GET') {
        xhr.send(null);
      } else {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('token', Store.state.token);
        xhr.send(sendData);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const { status } = xhr;
          if ((status >= 200 && status < 300) || xhr.status === 304) {
            let obj = xhr.response;
            if (typeof obj !== 'object') {
              obj = JSON.parse(obj);
            }
            resolve(obj);
          } else {
            if (status in Object.keys(httpStatusCode)) {
              Toast.failed(httpStatusCode[status]);
            }
            Toast.failed('无法连接服务器，请检查网络是否可用');
            reject(xhr);
          }
        }
      };
    });
  }
};
