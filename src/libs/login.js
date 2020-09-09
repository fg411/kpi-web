import { Toast } from 'mand-mobile';
import { userInfo } from './api';
import utils from './_util/index';
import Store from '../store/index';

const checkUserInfo = (info) => {
  let msg = '';
  if (!info || !info.empNo) {
    msg = '没有此用户';
  } else if (!info.positionId) {
    msg = '该用户没有分配岗位';
  }
  return msg;
};

const deadline = () => {
  const date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
};

export default (call) => {
  const code = utils.storage_get('code');
  userInfo({ code }).then((response) => {
    if (response.retCode === '00000' && response.obj) {
      const { employee, positionList, token } = response.obj;
      const msg = checkUserInfo(employee);
      if (msg) {
        call({ state: false, msg });
        return;
      }
      Store.dispatch('saveUserInfo', {
        ...employee,
        imgUrl: response.obj && response.obj.imgUrl
      });
      Store.dispatch('saveToken', token);
      if (positionList && positionList.length) {
        Store.dispatch('saveDeadLine', deadline());
        Store.dispatch('saveIsManager', true);
      }
      Store.dispatch('saveUserPosition', positionList);
      call({ state: true });
      return;
    }
    // 本地测试
    if (process.env.NODE_ENV !== 'production') {
      const employee = {
        empName: '测试877805',
        empNo: 'F8877805',
        lineCode: 'D0102',
        lineName: '企金条线',
        orgCode: '043400',
        orgName: '清算中心',
        supBr: '043999',
        branchBr: '043999',
        branchNm: '总行',
        positionId: 'P001',
        positionName: '企金客户经理（分行）',
        imgUrl: 'http://wework.qpic.cn/bizmail/qypVwdLNEwntHm1OLNUwzib0h3iay8XZSkQYpAghLKJ5Wh1H5RibFaXMw/100'
      };
      // const positionList = [];
      const positionList = [
        {
          positionId: 'P002',
          positionName: '企金客户经理（分行）',
          pdpart: 'D0102',
          pflg: 1,
          pcreatdt: null
        }
      ];
      Store.dispatch('saveUserInfo', employee);
      Store.dispatch('saveToken', 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9');
      if (positionList && positionList.length) {
        Store.dispatch('saveDeadLine', deadline());
        Store.dispatch('saveIsManager', true);
      }
      Store.dispatch('saveIsManager', positionList && (positionList.length > 0));
      Store.dispatch('saveUserPosition', positionList);
      call({ state: true });
      return;
    }
    call({ state: false, msg: response.retMsg });
  }).catch((e) => {
    Toast.failed('登录失败');
    console.log(e);
  });
};
