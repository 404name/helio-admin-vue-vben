<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button v-if="hasPermission('SysRole:create')" type="primary" @click="handleInsert">
          新增
        </a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              show: hasPermission('SysRole:retrieve'),
              icon: 'ant-design:eye-outlined',
              onClick: handleRetrieveDetail.bind(null, record),
            },
            {
              show: hasPermission('SysRole:update'),
              icon: 'clarity:note-edit-line',
              onClick: handleUpdate.bind(null, record),
            },
            {
              show: hasPermission('SysDept:delete'),
              icon: 'ant-design:delete-outlined',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <SysRoleDetailDrawer @register="registerDetailDrawer" />
    <SysRoleUpdateDrawer @register="registerUpdateDrawer" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, TableAction, useTable } from '/@/components/Table';
  import { useDrawer } from '/@/components/Drawer';
  import { hasPermission } from '/@/utils/auth';
  import { columns, queryFormSchema } from './data';
  import { deleteSysRoleApi, listSysRoleApi } from '/@/api/sys/SysRoleApi';
  import SysRoleDetailDrawer from './detail-drawer.vue';
  import SysRoleUpdateDrawer from './update-drawer.vue';
  import { listAllMenu } from '/@/api/sys/SysMenuApi';
  import { TreeItem } from '/@/components/Tree';
  import { notification } from 'ant-design-vue';

  export default defineComponent({
    name: 'SysRoleIndex',
    components: { BasicTable, TableAction, SysRoleDetailDrawer, SysRoleUpdateDrawer },
    setup() {
      // 查看详情
      const [registerDetailDrawer, { openDrawer: openDetailDrawer }] = useDrawer();
      // 新增/编辑
      const [registerUpdateDrawer, { openDrawer: openUpdateDrawer }] = useDrawer();
      const [registerTable, { reload }] = useTable({
        title: '后台角色【需要退出后重新登录，才能看到新授权的菜单】',
        api: listSysRoleApi,
        columns,
        formConfig: {
          labelWidth: 80,
          schemas: queryFormSchema,
        },
        useSearchForm: true,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 80,
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
          fixed: undefined,
        },
      });

      // 提前拉取菜单树状数据
      const menuTreeData = ref<TreeItem[]>([]);
      const didMenuTreeDataLoaded = ref<boolean>(false);
      listAllMenu().then((ret: any) => {
        menuTreeData.value = ret as TreeItem[];
        didMenuTreeDataLoaded.value = true;
      });

      function handleRetrieveDetail(record: Recordable) {
        openDetailDrawer(true, { record });
      }

      function handleInsert() {
        if (!isMenuTreeDataLoaded()) {
          return;
        }
        openUpdateDrawer(true, {
          isUpdateView: false,
          menuTreeData,
        });
      }

      function handleUpdate(record: Recordable) {
        if (!isMenuTreeDataLoaded()) {
          return;
        }
        openUpdateDrawer(true, {
          record,
          isUpdateView: true,
          menuTreeData,
        });
      }

      async function handleDelete(record: Recordable) {
        await deleteSysRoleApi([record.id]);
        await reload();
      }

      function handleSuccess() {
        reload();
      }

      function isMenuTreeDataLoaded(): boolean {
        if (!didMenuTreeDataLoaded.value) {
          notification.warn({
            message: '加载中',
            description: '数据准备中，请5秒后再试',
            duration: 2,
          });
          return false;
        }

        return true;
      }

      return {
        hasPermission,
        registerTable,
        registerDetailDrawer,
        registerUpdateDrawer,
        handleRetrieveDetail,
        handleInsert,
        handleUpdate,
        handleDelete,
        handleSuccess,
        menuTreeData,
      };
    },
  });
</script>
