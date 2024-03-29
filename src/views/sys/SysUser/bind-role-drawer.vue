<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    title="配置角色"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu="{ model, field }">
        <BasicTree
          v-model:value="model[field]"
          :treeData="roleTreeData"
          :replaceFields="{ key: 'id' }"
          checkable
          toolbar
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { listSysRoleApi } from '/@/api/sys/SysRoleApi';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { bindRolesApi } from '/@/api/sys/SysUserApi';

  export default defineComponent({
    name: 'BindRoleDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdateView = ref(true);
      let userId: string;
      const roleTreeData = ref<TreeItem[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 24 - 4,
        },
        schemas: [
          {
            label: '角色列表',
            field: 'roleIds',
            slot: 'menu',
            component: 'Input',
          },
        ],
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdateView.value = !!data?.isUpdateView;

        if (unref(isUpdateView)) {
          setFieldsValue({
            ...data.record,
          });
        }

        // 用户ID
        userId = data.record?.id || null;

        // 更新角色树状数据
        let awaitRet = await listSysRoleApi({ pageNum: 1, pageSize: 1000 });
        roleTreeData.value = awaitRet['records'] as TreeItem[];
      });

      async function handleSubmit() {
        try {
          const values = await validate();
          setDrawerProps({ confirmLoading: true });

          if (userId) {
            await bindRolesApi({ userId, roleIds: values.roleIds });
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return { registerDrawer, registerForm, handleSubmit, roleTreeData };
    },
  });
</script>
