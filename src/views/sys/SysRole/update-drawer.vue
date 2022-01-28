<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="registerDrawer"
    showFooter
    :title="getTitle"
    width="40%"
    @ok="handleSubmit"
  >
    <BasicForm @register="registerForm">
      <template #menu>
        <BasicTree
          v-model:value="menuIds"
          :treeData="menuTreeData"
          :replaceFields="{ key: 'idStr' }"
          checkable
          toolbar
        />
      </template>
    </BasicForm>
  </BasicDrawer>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { BasicDrawer, useDrawerInner } from '/@/components/Drawer';
  import { insertOrUpdateFormSchema } from '/@/views/sys/SysRole/data';
  import { createSysRoleApi, updateSysRoleApi } from '/@/api/sys/SysRoleApi';
  import { BasicTree, TreeItem } from '/@/components/Tree';

  export default defineComponent({
    name: 'SysRoleUpdateDrawer',
    components: { BasicDrawer, BasicForm, BasicTree },
    emits: ['success', 'register'],
    setup: function (_, { emit }) {
      const isUpdateView = ref(true);
      let recordId: string;
      // 树状菜单数据
      const menuTreeData = ref<TreeItem[]>([]);
      // 已勾选的菜单ID数组
      const checkedMenuIds = ref<string[]>([]);

      const [registerForm, { resetFields, setFieldsValue, validate }] = useForm({
        labelCol: {
          span: 4,
        },
        wrapperCol: {
          span: 24 - 4,
        },
        schemas: insertOrUpdateFormSchema,
        showActionButtonGroup: false,
      });

      const [registerDrawer, { setDrawerProps, closeDrawer }] = useDrawerInner(async (data) => {
        resetFields();
        setDrawerProps({ confirmLoading: false });
        isUpdateView.value = !!data?.isUpdateView;

        // 主键ID
        recordId = data.record?.id || null;

        /*
        从列表页带来的菜单树状数据，需要提前设定赋值
         */
        menuTreeData.value = data?.menuTreeData || [];

        if (unref(isUpdateView)) {
          // 已勾选的菜单
          checkedMenuIds.value = data.record.menuIds;

          setFieldsValue({
            ...data.record,
          });
        } else {
          // 新增的话，重置已勾选的菜单
          checkedMenuIds.value = [];
        }
      });

      const getTitle = computed(() => (!unref(isUpdateView) ? '新增' : '编辑'));

      async function handleSubmit() {
        try {
          const values = await validate();
          // 这里需要覆盖赋值为已勾选菜单ID
          values.menuIds = checkedMenuIds.value;

          setDrawerProps({ confirmLoading: true });

          if (recordId) {
            await updateSysRoleApi(recordId, values);
          } else {
            await createSysRoleApi(values);
          }

          closeDrawer();
          emit('success');
        } finally {
          setDrawerProps({ confirmLoading: false });
        }
      }

      return {
        registerDrawer,
        registerForm,
        getTitle,
        handleSubmit,
        menuTreeData,
        menuIds: checkedMenuIds,
      };
    },
  });
</script>
