---
nav: 组件
group: 基础组件
---

## Cascader 级联选择

基础用法 单选，带清除的，支持点击展开和hover展开菜单两种方式
```tsx
import {Cascader} from 'loki-ui';
import React from 'react';

interface Option {
    value: string | number;
    label: string;
    children?: Option[];
}

const options: Option[] = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                        children: [
                          {
                              value: 'duan Qiao',
                              label: 'duan Qiao',
                          },
                      ],
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
    {
        value: 'fujian',
        label: 'fujian',
    },
    {
        value: 'shanghai',
        label: 'shanghai',
    },
    {
        value: 'other',
        label: 'other',
    }
];

const onChange = (value: string[]) => {
    console.log(value);
};

const App: React.FC = () => (
    <div className="flex gap-2 items-center">
        <Cascader options={options} dropdownStyle={{maxHeight: 120}} onChange={onChange} popupMatchSelectWidth={false}  placeholder="Please select" />
        <Cascader options={options} onChange={onChange}  expandTrigger="hover" placeholder="Please select" allowClear />
    </div>
);

export default App;
```

## API属性
除了`Select`的通用api之外，级联的api有
| 属性              | 描述                                       | 类型                        | 默认值    |
| ----------------- | ------------------------------------------ | --------------------------- | --------- |
| `options`         | 传递给组件的菜单配置                       | `Option[]`                  | -         |
| `expandTrigger`   | 展开触发方式（click或hover）               | `'click' \| 'hover'`        | `'click'` |
| `dropdownStyle`   | 下拉菜单样式                                | `React.CSSProperties`       | -         |
| `controlItemWidth`| 菜单每列的最小宽度                         | `number`                    | `112`     |


其中菜单Option的类型
| 字段       | 描述                                     | 类型                    | 默认值    |
| ---------- | ---------------------------------------- | ----------------------- | --------- |
| `label`    | 菜单项显示的文本                          | `string`                | -         |
| `value`    | 菜单项的值                                | `string`                | -         |
| `disabled` | 是否禁用该菜单项                          | `boolean`               | `undefined` |
| `children` | 子菜单项数组                              | `Option[]`              | `undefined` |
