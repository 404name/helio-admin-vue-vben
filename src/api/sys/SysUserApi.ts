import { defHttp } from '/@/utils/http/axios';
import {
  SysUserLoginForm,
  SysUserLoginApiResult,
  SysUserGetUserInfoApiResult,
  SysUserInsertOrUpdateForm,
  SysUserApiResult,
  SysUserBindRoleForm,
  SysUserUpdatePasswordForm,
  SysUserResetPasswordForm,
} from '/@/api/sys/model/SysUserModel';

import { ErrorMessageMode } from '/@/utils/http/axios/types';

enum Api {
  LOGIN = '/api/v1/auth/login',
  LOGOUT = '/api/v1/auth/logout',
  GET_USER_INFO = '/api/v1/sys/users/info',
  GET_PERM_CODE = '/getPermCode',
  REST = '/api/v1/sys/users',
  RESET_PASSWORD = '/api/v1/sys/users/resetPassword',
  UPDATE_PASSWORD = '/api/v1/sys/users/updatePassword',
  BIND_ROLES = '/api/v1/sys/users/bindRoles',
  KICK_OUT = '/api/v1/sys/users/kickOut',
}

/**
 * 后台用户-登录
 */
export function loginApi(params: SysUserLoginForm, mode: ErrorMessageMode = 'modal') {
  return defHttp.post<SysUserLoginApiResult>(
    {
      url: Api.LOGIN,
      params,
    },
    {
      errorMessageMode: mode,
    }
  );
}

/**
 * 后台用户-取用户信息
 */
export function getUserInfoApi() {
  return defHttp.get<SysUserGetUserInfoApiResult>({
    url: Api.GET_USER_INFO,
  });
}

export function getPermCodeApi() {
  return defHttp.get<string[]>({
    url: Api.GET_PERM_CODE,
  });
}

/**
 * 后台用户-登出
 */
export function logoutApi() {
  return defHttp.post({
    url: Api.LOGOUT,
  });
}

/**
 * 后台用户-分页列表
 */
export const listSysUserApi = (queryForm: any, mode: ErrorMessageMode = 'modal') => {
  if (queryForm.timeRangePicker) {
    queryForm['beginAt'] = queryForm.timeRangePicker[0];
    queryForm['endAt'] = queryForm.timeRangePicker[1];
  }

  return defHttp.get<SysUserApiResult[]>(
    {
      url: Api.REST,
      params: queryForm,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-详情
 */
export const retrieveSysUserApi = (id: string, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get<SysUserApiResult>(
    {
      url: Api.REST + '/' + id,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-新增
 */
export const createSysUserApi = (
  insertForm: SysUserInsertOrUpdateForm,
  mode: ErrorMessageMode = 'modal'
) => {
  return defHttp.post<void>(
    {
      url: Api.REST,
      params: insertForm,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-编辑
 */
export const updateSysUserApi = (
  id: string,
  updateForm: SysUserInsertOrUpdateForm,
  mode: ErrorMessageMode = 'modal'
) => {
  return defHttp.put<void>(
    {
      url: Api.REST + '/' + id,
      params: updateForm,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-删除
 */
export const deleteSysUserApi = (ids: string[], mode: ErrorMessageMode = 'modal') => {
  return defHttp.delete<void>(
    {
      url: Api.REST,
      params: {
        ids: ids,
      },
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-重置某用户密码
 */
export const resetSysUserPasswordApi = (
  form: SysUserResetPasswordForm,
  mode: ErrorMessageMode = 'modal'
) => {
  return defHttp.post<void>(
    {
      url: Api.RESET_PASSWORD,
      params: form,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-修改当前用户密码
 */
export const updateCurrentSysUserPasswordApi = (
  form: SysUserUpdatePasswordForm,
  mode: ErrorMessageMode = 'modal'
) => {
  return defHttp.post<void>(
    {
      url: Api.UPDATE_PASSWORD,
      params: form,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-绑定用户与角色关联关系
 */
export const bindRolesApi = (form: SysUserBindRoleForm, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<void>(
    {
      url: Api.BIND_ROLES,
      params: form,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台用户-踢下线
 */
export const kickOutSysUserApi = (userId: string, mode: ErrorMessageMode = 'modal') => {
  return defHttp.post<void>(
    {
      url: Api.KICK_OUT,
      params: {
        userId: userId,
      },
    },
    {
      errorMessageMode: mode,
    }
  );
};
