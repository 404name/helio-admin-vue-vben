import { BasicColumn, FormSchema } from '/@/components/Table';
import { DescItem } from '/@/components/Description';

/**
 * 表格列
 */
export const columns: BasicColumn[] = [
  {
    title: '键名',
    dataIndex: 'key',
    width: 80,
  },
  {
    title: '值',
    dataIndex: 'value',
    width: 60,
  },
  {
    title: '描述',
    dataIndex: 'description',
    width: 80,
  },
];

/**
 * 查询条件
 */
export const queryFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: '键名',
    component: 'Input',
    componentProps: {},
    colProps: { span: 8 },
  },
  {
    field: 'description',
    label: '描述',
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
    field: 'key',
    label: '键名',
  },
  {
    field: 'value',
    label: '值',
  },
  {
    field: 'description',
    label: '描述',
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
export const insertOrUpdateFormSchema: FormSchema[] = [
  {
    field: 'id',
    label: '主键ID(只是为了带过来)',
    component: 'Render',
    show: false,
  },
  {
    field: 'key',
    label: '键名',
    required: true,
    component: 'Input',
    componentProps: {},
  },
  {
    field: 'value',
    label: '值',
    required: true,
    component: 'Input',
    componentProps: {},
  },
  {
    field: 'description',
    label: '描述',
    required: true,
    component: 'Input',
    componentProps: {},
  },
];
