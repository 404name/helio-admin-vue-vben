import type { ErrorMessageMode } from '/@/utils/http/axios/types';

import { defineStore } from 'pinia';
import { store } from '/@/store';

import { PageEnum } from '/@/enums/pageEnum';
import { PERMISSIONS_KEY, ROLES_KEY, TOKEN_KEY, USER_INFO_KEY } from '/@/enums/cacheEnum';

import { getAuthCache, setAuthCache } from '/@/utils/auth';
import { SysUserGetUserInfoApiResult, SysUserLoginForm } from '/@/api/sys/model/SysUserModel';

import { getUserInfoApi, loginApi, logoutApi } from '/@/api/sys/SysUserApi';

import { useI18n } from '/@/hooks/web/useI18n';
import { useMessage } from '/@/hooks/web/useMessage';
import router from '/@/router';

interface UserState {
  userInfo: Nullable<SysUserGetUserInfoApiResult>;
  token?: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): UserState => ({
    // user info
    userInfo: null,
    // token
    token: undefined,
  }),
  getters: {
    getUserInfo(): SysUserGetUserInfoApiResult {
      return this.userInfo || getAuthCache<SysUserGetUserInfoApiResult>(USER_INFO_KEY) || {};
    },
    getToken(): string {
      return this.token || getAuthCache<string>(TOKEN_KEY);
    },
  },
  actions: {
    setToken(info: string) {
      this.token = info;
      setAuthCache(TOKEN_KEY, info);
    },
    setUserInfo(info: SysUserGetUserInfoApiResult) {
      this.userInfo = info;
      setAuthCache(USER_INFO_KEY, info);
    },
    resetState() {
      this.userInfo = null;
      this.token = '';
    },
    /**
     * @description: login
     */
    async login(
      params: SysUserLoginForm & {
        goHome?: boolean;
        mode?: ErrorMessageMode;
      }
    ): Promise<SysUserGetUserInfoApiResult | null> {
      try {
        const { goHome = true, mode, ...loginParams } = params;
        const data = await loginApi(loginParams, mode);
        const { tokenValue, roles, permissions } = data;

        // save token
        this.setToken(tokenValue);
        // 记录角色和权限值
        setAuthCache(ROLES_KEY, roles);
        setAuthCache(PERMISSIONS_KEY, permissions);
        // get user info
        const userInfo = await this.getUserInfoAction();

        goHome && (await router.replace(PageEnum.BASE_HOME));
        return userInfo;
      } catch (error) {
        return null;
      }
    },
    async getUserInfoAction() {
      const userInfo = await getUserInfoApi();
      // const { roles } = userInfo;
      // const roleList = roles.map((item) => item.value) as RoleEnum[];
      this.setUserInfo(userInfo);
      // this.setRoleList(roleList);
      return userInfo;
    },
    /**
     * @description: logout
     */
    async logout(goLogin = false) {
      await logoutApi();
      goLogin && router.push(PageEnum.BASE_LOGIN);
    },

    /**
     * @description: Confirm before logging out
     */
    confirmLoginOut() {
      const { createConfirm } = useMessage();
      const { t } = useI18n();
      createConfirm({
        iconType: 'warning',
        title: t('sys.app.logoutTip'),
        content: t('sys.app.logoutMessage'),
        onOk: async () => {
          await this.logout(true);
        },
      });
    },
  },
});

// Need to be used outside the setup
export function useUserStoreWidthOut() {
  return useUserStore(store);
}
