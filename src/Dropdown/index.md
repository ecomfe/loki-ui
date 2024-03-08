---
nav: 组件
group: 基础组件
---

## Dropdown 下拉菜单
向下弹出的列表
### 何时使用
当页面上的操作命令过多时，用此组件可以收纳操作元素。点击或移入触点，会出现一个下拉菜单。可在列表中进行选择，并执行相应的命令。

* 用于收罗一组命令操作。
* Select 用于选择，而 Dropdown 是命令集合。

### 基础用法
```tsx
import React from 'react';
import { Dropdown } from 'loki-ui';
const items = [
  {
    value: '1',
    label: 'React',
    url: 'https://react.dev/',
  },
  {
    value: '2',
    label: 'Vue',
    url: 'https://vuejs.org/',
  },
  {
    value: '3',
    label: 'Angular',
    url: 'https://angular.io/',
  },
];
export default () => {
    const onSelect = (value: string) => {
        window.open(value.url);
    }
    return (
        <Dropdown menu={items} onSelect={onSelect}>
            <a type="button" class="inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 w-20 focus:ring-indigo-500" aria-haspopup="true" aria-expanded="true">
             libraries
            </a>
         </Dropdown>
    )
}
```