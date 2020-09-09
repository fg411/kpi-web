const utils = {
  DateStrFormat: (strDate) => {
    if (strDate && strDate.length && strDate.length === 8) {
      const y = strDate.substr(0, 4);
      const m = strDate.substr(4, 2);
      const d = strDate.substr(6, 2);
      if (y > 1990
        && parseInt(m, 10) > 0 && parseInt(m, 10) < 12
        && parseInt(d, 10) > 0 && parseInt(d, 10) < 32) {
        return new Date(y, m - 1, d);
      }
      return strDate;
    }
    return strDate;
  },
  // Storage: (name, value, expired) => {
  //   if (!name) return null;
  //   const storage = window.localStorage;
  //   const date = new Date();
  //   const watch = name;
  //   const key = `STORAGE_${String(name).toLocaleUpperCase()}`;
  //   if (value === null) {
  //     // if (storage.hasOwnProperty(key)) {
  //     if (Object.prototype.hasOwnProperty.call(storage, 'key')) {
  //       storage.removeItem(key);
  //     }
  //     Storage._execWatch(watch, null);
  //   } else if (!value) {
  //     let item = storage.getItem(key);
  //     if (item) {
  //       item = JSON.parse(item);
  //       if (item.expired > 0 && item.expired - date.getTime() < 0) {
  //         storage.removeItem(key);
  //         Storage._execWatch(watch, null);
  //       } else {
  //         return item.value;
  //       }
  //     }
  //   } else {
  //     let ret = storage.setItem(key, JSON.stringify({
  //       value: value,
  //       expired: expired > 0 ? date.getTime() + expired * 1000 : 0
  //     }));
  //     Storage._execWatch(_watch, ret);
  //     return ret;
  //   }
  //   return null;
  // },
  storage_set(name, value, expired = 600) {
    if (!name) return null;
    if (typeof value === 'undefined') throw new Error('The value must be filled in, may be null!');
    const storage = window.localStorage;
    const date = new Date();
    const key = `STORAGE_${String(name).toLocaleUpperCase()}`;
    if (value === null) {
      // if (storage.hasOwnProperty(key)) {
      if (Object.prototype.hasOwnProperty.call(storage, 'key')) {
        storage.removeItem(key);
      }
    } else {
      storage.setItem(key, JSON.stringify({
        value,
        expired: expired > 0 ? date.getTime() + expired * 1000 : 0,
      }));
    }
    return false;
  },
  storage_get(name, defaultValue) {
    if (!name) return null;
    const storage = window.localStorage;
    const key = `STORAGE_${String(name).toLocaleUpperCase()}`;
    const date = new Date();
    let item = storage.getItem(key);
    if (item) {
      item = JSON.parse(item);
      // console.log(item.expired - date.getTime());
      if (item.expired > 0 && item.expired - date.getTime() < 0) {
        storage.removeItem(key);
      } else {
        return item.value;
      }
    }
    return defaultValue || null;
  },
};

function isObejct(val) {
  const type = typeof val;
  return val !== null && (type === 'object');
}

function isString(str) {
  const type = typeof str;
  return type === 'string';
}

export const EncryUrl = (query) => {
  if (!isObejct(query)) {
    return '';
  }
  try {
    let qry = JSON.stringify(query);
    console.log(qry);
    qry = window.encodeURIComponent(qry);
    console.log(qry);
    return window.btoa(qry); // 编码
  } catch (err) {
    console.error(err);
  }
  return '';
};

export const DecryptUrl = (val) => {
  if (!isString(val)) {
    return false;
  }
  try {
    const decryStr = window.atob(val); // 解码
    return JSON.parse(window.decodeURIComponent(decryStr));
  } catch (err) {
    console.error(err);
  }
  return false;
};

export const isWxBrowser = () => navigator.userAgent.indexOf('MicroMessenger') > 0;

export default utils;
