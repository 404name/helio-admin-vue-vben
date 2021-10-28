import { Persistent, BasicKeys } from '/@/utils/cache/persistent';
import { CacheTypeEnum, PERMISSIONS_KEY } from '/@/enums/cacheEnum';
import projectSetting from '/@/settings/projectSetting';
import { TOKEN_KEY } from '/@/enums/cacheEnum';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return getAuthCache(TOKEN_KEY);
}

export function getAuthCache<T>(key: BasicKeys) {
  const fn = isLocal ? Persistent.getLocal : Persistent.getSession;
  return fn(key) as T;
}

export function setAuthCache(key: BasicKeys, value) {
  const fn = isLocal ? Persistent.setLocal : Persistent.setSession;
  return fn(key, value, true);
}

export function hasPermission(permission: string): boolean {
  const ownedPermissions = getAuthCache<string[]>(PERMISSIONS_KEY);
  if (!ownedPermissions) {
    return false;
  }
  return ownedPermissions.indexOf(permission) > -1;
}
