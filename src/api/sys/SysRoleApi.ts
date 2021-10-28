import { defHttp } from '/@/utils/http/axios';
import { ErrorMessageMode } from '/@/utils/http/axios/types';
import { SysRoleApiResult, SysRoleInsertOrUpdateForm } from '/@/api/sys/model/SysRoleModel';

enum Api {
  REST = '/api/v1/sys/roles',
}

/**
 * 后台角色-分页列表
 */
export const listSysRoleApi = (queryForm: any, mode: ErrorMessageMode = 'modal') => {
  if (queryForm.timeRangePicker) {
    queryForm['beginAt'] = queryForm.timeRangePicker[0];
    queryForm['endAt'] = queryForm.timeRangePicker[1];
  }

  return defHttp.get<SysRoleApiResult[]>(
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
 * 后台角色-详情
 */
export const retrieveSysRoleApi = (id: string, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get<SysRoleApiResult>(
    {
      url: Api.REST + '/' + id,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台角色-新增
 */
export const createSysRoleApi = (
  insertForm: SysRoleInsertOrUpdateForm,
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
 * 后台角色-编辑
 */
export const updateSysRoleApi = (
  id: string,
  updateForm: SysRoleInsertOrUpdateForm,
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
 * 后台角色-删除
 */
export const deleteSysRoleApi = (ids: string[], mode: ErrorMessageMode = 'modal') => {
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
