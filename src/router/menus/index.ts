import type {Menu, MenuModule} from '/@/router/types';

import {usePermissionStore} from '/@/store/modules/permission';
import {getAllParentPath, transformMenuModule} from '/@/router/helper/menuHelper';

const menuModules: MenuModule[] = [];

// ===========================
// ==========Helper===========
// ===========================
// const isBackMode = () => {
//   const appStore = useAppStoreWidthOut();
//   return appStore.getProjectConfig.permissionMode === PermissionModeEnum.BACK;
// };

const staticMenus: Menu[] = [];
(() => {
  menuModules.sort((a, b) => {
    return (a.sort || 0) - (b.sort || 0);
  });

  for (const menu of menuModules) {
    staticMenus.push(transformMenuModule(menu));
  }
})();

async function getAsyncMenus() {
  const permissionStore = usePermissionStore();
  return permissionStore.getBackMenuList;
}

export const getMenus = async (): Promise<Menu[]> => {
  return await getAsyncMenus();
};

export async function getCurrentParentPath(currentPath: string) {
  const menus = await getAsyncMenus();

  const allParentPath = await getAllParentPath(menus, currentPath);

  return allParentPath?.[0];
}

// Get the level 1 menu, delete children
export async function getShallowMenus(): Promise<Menu[]> {
  const menus = await getAsyncMenus();
  return menus.map((item) => ({...item, children: undefined}));
}

// Get the children of the menu
export async function getChildrenMenus(parentPath: string) {
  const menus = await getMenus();
  const parent = menus.find((item) => item.path === parentPath);
  if (!parent || !parent.children || !!parent?.meta?.hideChildrenInMenu) return [] as Menu[];

  return parent.children;
}
