import { Toast } from 'mand-mobile';
import fetch from './_util/fetch';

const bastUrl = process.env.NODE_ENV === 'production' ? '/kpi' : '/api';

export const apiRequest = (vm, apiFunc, success) => apiFunc.then((response) => {
  Toast.hide();
  if (response.retCode !== '00000') {
    let errorMsg = response.resultMsg ? response.resultMsg : response.message;
    errorMsg = errorMsg == null ? '接口服务异常' : errorMsg;
    console.error(errorMsg);
    Toast.failed(errorMsg);
    if (response.retCode === '00009') {
      vm.$router.push('/');
    }
  } else {
    success(response);
  }
});

/**
 * 查询用户信息
 * @param params
 * @returns {Promise<*>}
 */
export const userInfo = (params) => fetch(`${bastUrl}/userinfo/kpi`, params, 'GET');

/**
 * 查询用户首页图表信息
 * @param params
 * @returns {Promise<*>}
 */
export const queryIndex = (params) => fetch(`${bastUrl}/qryIndex`, params, 'GET');

/**
 * 查询各项得分
 * @param params
 * @returns {Promise<*>}
 */
export const qryScore = (params) => fetch(`${bastUrl}/qryScore`, params, 'GET');

/**
 * 查询排名
 * @param params
 * @returns {Promise<*>}
 */
export const qryOrder = (params) => fetch(`${bastUrl}/qryOrder`, params, 'GET');

/**
 * 查询个金产品经理岗绩效（分行）
 * @returns {Promise<*>}
 */
export const qryPerPMScore = (params) => fetch(`${bastUrl}/userDetail`, params, 'GET');

/**
 * 查询个金产品经理岗绩效排名（分行）
 * @returns {Promise<*>}
 */
export const qryPerPMScoreOrder = (params) => fetch(`${bastUrl}/qryPerPMScoreOrder`, params, 'GET');

/**
 * 查询个金员工绩效排名
 * @returns {Promise<*>}
 */
export const qryPerScoreOrder = (params) => fetch(`${bastUrl}/qryPerScoreOrder`, params, 'GET');

/**
 * 查询企金客户经理岗绩效（分行）
 * @returns {Promise<*>}
 */
export const qryComCMScore = (params) => fetch(`${bastUrl}/qryComCMScore`, params, 'GET');

/**
 * 查询企金客户经理岗绩效排名（分行）
 * @returns {Promise<*>}
 */
export const qryComCMScoreOrder = (params) => fetch(`${bastUrl}/qryComCMScoreOrder`, params, 'GET');

/**
 * 查询角色下岗位平均分
 * @param params
 * @returns {Promise<*>}
 */
export const qryPosScoreByEmp = (params) => fetch(`${bastUrl}/qryPosScoreByEmp`, params, 'GET');

/**
 * 查询岗位下机构平均分
 * @param params
 * @returns {Promise<*>}
 */
export const qryOrgScoreByPos = (params) => fetch(`${bastUrl}/qryOrgScoreByPos`, params, 'GET');

/**
 * 查询机构下员工平均分
 * @param params
 * @returns {Promise<*>}
 */
export const qryEmpScoreByOrg = (params) => fetch(`${bastUrl}/qryEmpScoreByOrg`, params, 'GET');
