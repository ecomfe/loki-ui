---
nav: 组件
group: 基础组件
---

## Tabs菜单项

### 基础用法
默认选中第一项
```tsx
import React from 'react';
import { Tabs } from 'loki-ui';
import type { TabsProps } from 'loki-ui';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;

export default App;
```

标签居中展示
```tsx
import React from 'react';
import { Tabs } from 'loki-ui';

const App: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    centered
    items={new Array(3).fill(null).map((_, i) => {
      const id = String(i + 1);
      return {
        label: `Tab ${id}`,
        key: id,
        children: `Content of Tab Pane ${id}`,
      };
    })}
  />
);

export default App;
```
自定义指示器宽度
```tsx
import React from 'react';
import { Tabs } from 'loki-ui';
import type { TabsProps } from 'loki-ui';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: 'Tab 2',
    children: 'Content of Tab Pane 2',
  },
  {
    key: '3',
    label: 'Tab 3',
    children: 'Content of Tab Pane 3',
  },
];

const App: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    indicator={{
            size: (origin) => origin * 0.5,
            align: 'center'
        }}
  />
);

export default App;
```

容纳更多标签，支持折叠
```tsx
import React, { useState } from 'react';
import { Tabs } from 'loki-ui';


const App: React.FC = () => {

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        style={{ height: 220 }}
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />
    </div>
  );
};

export default App;
```
自定义的tab样式渲染
```tsx
import React from 'react';
import { Tabs, Badge } from 'loki-ui';
import type { TabsProps } from 'loki-ui';

const onChange = (key: string) => {
  console.log(key);
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: '待发布',
    children: 'Content of Tab Pane 1',
  },
  {
    key: '2',
    label: '已发布',
    children: 'Content of Tab Pane 2',
  },
];
const countInfo = {
  1: 12,
  2: 40
}
const App: React.FC = () => (
  <Tabs
    defaultActiveKey="1"
    items={items}
    onChange={onChange}
    showIndicator={false}
    renderNavItem={
      ((item, active) => (
      <Badge ghost position="relative" count={countInfo[item.key]} offset={[-6, -4]}>
        <span>
          {item.label}
        </span>
      </Badge>
    ))
    }
  />
);

export default App;
```
首次全部渲染
```tsx
import React, {useEffect} from 'react';
import { Tabs } from 'loki-ui';
import type { TabsProps } from 'loki-ui';
const Content = ({value, children}) => {
  useEffect(() => {
    console.log('render', value);
  }, []);
  return (<div>{children}</div>);
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: <Content value="1">Content of Tab Pane 1</Content>,
    forceRender: true,
  },
  {
    key: '2',
    label: 'Tab 2',
    children: <Content value="2">Content of Tab Pane 2</Content>,
    forceRender: true,
  },
  {
    key: '3',
    label: 'Tab 3',
    children: <Content value="3">Content of Tab Pane 3</Content>,
    forceRender: true,
  },
];

const App: React.FC = () => <Tabs defaultActiveKey="2" items={items} />;

export default App;
```
不可见的tab内容销毁 可见重新挂载
```tsx
import React, {useEffect} from 'react';
import { Tabs } from 'loki-ui';
import type { TabsProps } from 'loki-ui';

const onChange = (key: string) => {
  console.log(key);
};

const Content = ({value, children}) => {
  useEffect(() => {
    console.log('render', value);
  }, []);
  return (<div>{children}</div>);
}

const items: TabsProps['items'] = [
  {
    key: '1',
    label: 'Tab 1',
    children: <Content value="1">Content of Tab Pane 1</Content>,
  },
  {
    key: '2',
    label: 'Tab 2',
    children: <Content value="2">Content of Tab Pane 2</Content>,
  },
  {
    key: '3',
    label: 'Tab 3',
    children: <Content value="3">Content of Tab Pane 3</Content>,
  },
];

const App: React.FC = () => <Tabs defaultActiveKey="1" destroyInactiveTabPane items={items} />;

export default App;
```

### API属性
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `className` | 外层包裹的 className | `string` | `''` |
| `tabPanelClassName` | Panel面板的 className | `string` | `''` |
| `style` | 外层包裹的 style | `React.CSSProperties` | - |
| `items` | tabs的参数 | `Tab[]` | - |
| `activeKey` | 当前active的TabKey | `string` | - |
| `defaultActiveKey` | 默认的activeTabKey | `string` | `tabs[0].key` |
| `destroyInactiveTabPane` | 是否销毁隐藏的tabPane | `boolean` | `false` |
| `onChange` | tab切换时触发的回调 | `(activeKey: string) => void` | - |
| `onTabClick` | tab点击时候触发 | `(activeKey: string, e: React.KeyboardEvent \| React.MouseEvent) => void` | - |
| `indicator` | 指示器 | `{ size?: GetIndicatorSize; }` | - |
| `tabBarStyle` | tab头的 className | `React.CSSProperties` | `''` |
| `tabBarItemStyle` | tab每一项的 style | `React.CSSProperties` | - |
| `tabPanelStyle` | tab面板的 style | `React.CSSProperties` | - |
| `indicatorStyle` | 指示器的 style | `React.CSSProperties` | - |
| `tabBarGutter` | tabBar每一项之间的间隔 | `number` | `40` |
| `centered` | tabBar是否居中 | `boolean` | `false` |
| `renderNavItem` | 自定义渲染 tabBarItem | `(tab: Tab, active: boolean) => React.ReactNode` | - |
| `renderTabBar` | 自定义渲染 tabBar | `RenderTabBar` | - |
| `showIndicator` | 是否显示指示器 | `boolean` | `true` |

其中 `Tab` 类型定义如下：
| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `key` | TabKey的值 | `string` | - |
| `label` | label展示的内容 | `React.ReactNode \| ((props: Tab, active?: boolean) => React.ReactNode) \| string` | - |
| `forceRender` | 是否默认首次强制渲染 | `boolean` | `false` |
