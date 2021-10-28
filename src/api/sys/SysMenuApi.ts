import { defHttp } from '/@/utils/http/axios';
import {
  ListSideMenuApiResult,
  SysMenuApiResult,
  SysMenuInsertOrUpdateForm,
} from '/@/api/sys/model/SysMenuModel';
import { ErrorMessageMode } from '/@/utils/http/axios/types';

enum Api {
  LIST_SIDE_MENU = '/api/v1/sys/menus/side',
  LIST_ALL_MENU = '/api/v1/sys/menus/all',
  REST = '/api/v1/sys/menus',
}

/**
 * 取当前账号可见侧边菜单
 */
export const listSideMenu = () => {
  return defHttp.get<ListSideMenuApiResult>({ url: Api.LIST_SIDE_MENU });
};

/**
 * 取当前账号所有可见菜单
 */
export const listAllMenu = () => {
  return defHttp.get<SysMenuApiResult>({ url: Api.LIST_ALL_MENU });
};

/**
 * 后台菜单-分页列表
 */
export const listSysMenuApi = (queryForm: any, mode: ErrorMessageMode = 'modal') => {
  if (queryForm.timeRangePicker) {
    queryForm['beginAt'] = queryForm.timeRangePicker[0];
    queryForm['endAt'] = queryForm.timeRangePicker[1];
  }

  queryForm['parentId'] = 0;

  return defHttp.get<SysMenuApiResult[]>(
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
 * 后台菜单-详情
 */
export const retrieveSysMenuApi = (id: string, mode: ErrorMessageMode = 'modal') => {
  return defHttp.get<SysMenuApiResult>(
    {
      url: Api.REST + '/' + id,
    },
    {
      errorMessageMode: mode,
    }
  );
};

/**
 * 后台菜单-新增
 */
export const createSysMenuApi = (
  insertForm: SysMenuInsertOrUpdateForm,
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
 * 后台菜单-编辑
 */
export const updateSysMenuApi = (
  id: string,
  updateForm: SysMenuInsertOrUpdateForm,
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
 * 后台菜单-删除
 */
export const deleteSysMenuApi = (ids: string[], mode: ErrorMessageMode = 'modal') => {
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
