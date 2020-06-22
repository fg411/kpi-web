const baseUrl = '';
const httpStatusCode: any = {
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
  createActiveXObject: function() {
    try {
      return new window.ActiveXObject("Microsoft.XMLHttp");
    } catch(e) {
      console.error(e);
    }
  },
  createStandardXHR: function(){
    try {
      return new window.XMLHttpRequest();
    } catch(e) {
      console.error(e);
    }
  },
  getXHR: function(){
    var xhr = null;
    if(typeof window.ActiveXObject != 'undefined'){
      xhr = XHR.createActiveXObject();
    }else{
      xhr = XHR.createStandardXHR();
    }
    return xhr;
  },
  onreadystatechange: (xhr: any, callback: any) => {
    if(!callback){return;}
    if(xhr.readyState == 4){
        if((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304){
            callback(xhr.responseText);
        }
    }
  },
  ontimeout: (callback: any) => {
      if(!callback){return;}
      callback();
  },
  onprogress: (event: any, callback: any) => {
      if(!callback){return;}
      callback(event);
  }
};

export default async(url: string, data: any = {}, type: string = 'POST', method: string = 'fetch') => {
  const Type: string = type.toUpperCase();
  const Url: string = baseUrl + url;
  if (Type === 'GET') {
    let dataStr: string = '';
    Object.keys(data).forEach((key) => {
      dataStr += `${key}=${data[key]}`;
    });
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url += `?${dataStr}`;
    }
  }

  if (window.fetch && method === 'fetch') {
    let requestConfig: any = {
      credentials: 'include',
      method: Type,
      headers : {},
      mode: 'cors',
      cache: 'force-cache'
    };
    if(Type === 'POST' || Type === 'PUT') {
      Object.defineProperty(requestConfig, 'body', {
        value: JSON.stringify(data),
      });
    } else if(Type === 'FILE') {
      requestConfig = {
        method: 'POST',
        body: data,
        Accept: 'application/json',
      };
    }

    try {
      const response = await fetch(Url, requestConfig);
      const status = response.status;
      if (status !== 200) {
        let res: any = { code: status };
        if(status in Object.keys(httpStatusCode)) {
          return {...res, message: httpStatusCode[status]};
        } else {
          return {...res, message: '无法连接服务器，请检查网络是否可用'};
        }
      }
      return await response.json();
    } catch(error) {
      return error
    }
    console.log(1);
    
  } else {
    return new Promise((resolve, reject) => {
      let sendData = '';
      let xhr = XHR.getXHR();
      xhr.timeout=10000;
      if(Type === 'POST' || Type === 'PUT') {
        sendData = JSON.stringify(data);
      }

      xhr.open(Type, Url, true)
      if(Type === 'GET') {
        xhr.send(null);
      } else {
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.send(sendData);
      }
      xhr.onreadystatechange = () => {
        if(xhr.readyState==4){
            var status=xhr.status;
            if(status >= 200 && status < 300 || xhr.status == 304) {
              let obj = xhr.response;
              if (typeof obj !== 'object') {
                obj = JSON.parse(obj);
              }
              resolve(obj);
            } else {
              reject(xhr);
            }
        }
      }
    })
  }
};
