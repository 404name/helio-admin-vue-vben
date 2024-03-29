import { BasicColumn, FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Tag } from 'ant-design-vue';
import { DescItem } from '/@/components/Description';

/**
 * 表格列
 */
export const columns: BasicColumn[] = [
  {
    title: '账号',
    dataIndex: 'username',
    width: 80,
  },
  {
    title: '昵称',
    dataIndex: 'nickname',
    width: 80,
  },
  {
    title: '性别',
    dataIndex: 'gender',
    width: 50,
    customRender: ({ record }) => {
      const value = record.gender;
      let color, text;

      switch (value) {
        case 0:
          color = 'gray';
          text = '未知';
          break;
        case 1:
          color = 'blue';
          text = '男';
          break;
        case 2:
          color = 'pink';
          text = '女';
          break;
      }
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '部门',
    dataIndex: 'deptTitle',
    width: 80,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 80,
  },
  {
    title: '手机号',
    dataIndex: 'phoneNo',
    width: 80,
  },
  {
    title: '最后登录时间',
    dataIndex: 'lastLoginAt',
    width: 80,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      const value = record.status;
      let color, text;

      switch (value) {
        case 0:
          color = 'red';
          text = '封禁';
          break;
        case 1:
          color = 'green';
          text = '正常';
          break;
      }
      return h(Tag, { color: color }, () => text);
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 80,
  },
];

/**
 * 查询条件
 */
export const queryFormSchema: FormSchema[] = [
  {
    field: 'phoneNo',
    label: '手机号',
    component: 'Input',
    componentProps: {},
    colProps: { span: 8 },
  },
];

/**
 * 查看详情表单
 */
export const retrieveDetailFormSchema: DescItem[] = [
  {
    field: 'username',
    label: '账号',
  },
  {
    field: 'nickname',
    label: '昵称',
  },
  {
    field: 'statusLabel',
    label: '状态',
  },
  {
    field: 'genderLabel',
    label: '性别',
  },
  {
    field: 'deptTitle',
    label: '部门',
  },
  {
    field: 'email',
    label: '邮箱',
  },
  {
    field: 'phoneNo',
    label: '手机号',
  },
  {
    field: 'lastLoginAt',
    label: '最后登录时间',
  },
  {
    field: 'createdAt',
    label: '创建时间',
  },
  {
    field: 'updatedAt',
    label: '更新时间',
  },
];

/**
 * 新增/编辑表单
 */
const isUpdateView = (id: string) => {
  return !!id;
};
export const insertOrUpdateFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '主键ID(只是为了带过来)',
    component: 'Render',
    show: false,
  },
  {
    field: 'username',
    label: '账号',
    required: true,
    component: 'Input',
    componentProps: {},
  },
  {
    field: 'passwordOfNewUser',
    label: '密码',
    required: true,
    component: 'InputPassword',
    componentProps: {
      placeholder: '建议使用强密码',
    },
    show: ({ values }) => !isUpdateView(values.id),
  },
  {
    field: 'nickname',
    label: '昵称',
    required: true,
    component: 'Input',
    componentProps: {},
  },
  {
    field: 'status',
    label: '状态',
    required: false,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '封禁', value: 0 },
        { label: '正常', value: 1 },
      ],
    },
  },
  {
    field: 'gender',
    label: '性别',
    required: false,
    component: 'RadioButtonGroup',
    defaultValue: 0,
    componentProps: {
      options: [
        { label: '未知', value: 0 },
        { label: '男', value: 1 },
        { label: '女', value: 2 },
      ],
    },
  },
  {
    field: 'email',
    label: '邮箱',
    required: true,
    component: 'Input',
    componentProps: {},
  },
  {
    field: 'phoneNo',
    label: '手机号',
    required: true,
    component: 'Input',
    componentProps: {},
  },
  {
    field: 'deptId',
    label: '所属部门',
    required: false,
    component: 'TreeSelect',
    // 拉取树状数据放在drawer.vue中
  },
];
