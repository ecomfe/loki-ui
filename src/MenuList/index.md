---
nav: 组件
group: 基础组件
---

## MenuList 菜单项

### 基础用法
非常基础的菜单项的UI，他是`Dropdown`组件的基础，如果你只需要一个简单的菜单项，可以直接使用这个组件

本组件只支持受控的模式

```tsx
import React from 'react';
import { MenuList } from 'loki-ui';
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
    const onSelect = (value: string, index) => {
        console.log(value, index);
        window.open(value.url);
    }
    return (
        <div className="w-40 pt-[--padding] pr-[--padding-md] pb-[--padding] pl-[--padding-md]">
            <MenuList menu={items} onSelect={onSelect} />
        </div>
    );
}
```

支持可选的MenuList

```tsx
import React from 'react';
import { MenuList } from 'loki-ui';
const items = [
  {
    value: '1',
    label: 'React',
    url: 'https://react.dev/',
    selectable: true,
  },
  {
    value: '2',
    label: 'Vue',
    url: 'https://vuejs.org/',
    selectable: true,
  },
  {
    value: '3',
    label: 'Angular',
    url: 'https://angular.io/',
    selectable: true,
  },
];
export default () => {
    const [menus, setMenus] = React.useState(items);
    const onSelect = (value: string, index) => {
        const isSelected = value.selected;
        const newMenu = menus.reduce((memo, cur)=> {
            if (cur.selected) {
                return [...memo, { ...cur, selected: false }];
            }
            return [...memo, cur];
        }, []);
        newMenu[index] = {...newMenu[index], selected: !isSelected};
        setMenus([...newMenu]);
    }
    return (
        <div className="shadow-md rounded-lg p-4 max-w-sm w-full">
            <p class="m-2 text-gray-600">What library do you prefer?</p>
            <MenuList menu={menus} onSelect={onSelect} />
        </div>
    );
}
```