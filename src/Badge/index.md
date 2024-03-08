---
nav: 组件
group: 基础组件
---

## Badge 徽标数
图标右上角的徽标数字

### 基础用法 
简单的徽章展示，当 count 为 0 时，默认不显示，但是可以使用 showZero 修改为显示。

```tsx
import React from 'react';
import { Badge, Avatar } from 'loki-ui';

export default () => {
    return (
        <div className="flex gap-8">
            <Badge count={100}>
                <Avatar shape="square" src="https://pic.rmb.bdstatic.com/82ba815c1f279d88ae795f97e8a44169.png" />
            </Badge>
            <Badge count={100} color="#faad14" >
                <Avatar shape="square" src="https://pic.rmb.bdstatic.com/82ba815c1f279d88ae795f97e8a44169.png" />
            </Badge>
            <Badge count={0} color="#2bd397" >
                <Avatar shape="square" src="https://pic.rmb.bdstatic.com/82ba815c1f279d88ae795f97e8a44169.png" />
            </Badge>
            <Badge count={0} color="#2bd397" showZero>
                <Avatar shape="square" src="https://pic.rmb.bdstatic.com/82ba815c1f279d88ae795f97e8a44169.png" />
            </Badge>
        </div>
    )
}
```
支持`ghost`模式，设置为 true 时，背景透明，仅展示数字。支持offset 属性设置位置偏移。
```tsx
import React from 'react';
import { Badge } from 'loki-ui';

export default () => {
    return (
        <Badge ghost count={10} offset={[0, -4]}>
            <div class="text-base font-medium">待发布</div>
        </Badge>
    )
}
```
```tsx
import React from 'react';
import { Badge } from 'loki-ui';

export default () => {
    return (
        <Badge ghost count={10} offset={[-6, -4]} position="relative">
            <span class="text-base font-medium">待发布</span>
        </Badge>
    )
}
```


### API参数
| Property       | Type                | Default | Description                                                 |
|----------------|---------------------|---------|-------------------------------------------------------------|
| `color`        | `string`            | `"red"` | 自定义小圆点的颜色。                                         |
| `count`        | `React.ReactNode`   | `99`    | 展示的数字，大于 `overflowCount` 时显示为 `${overflowCount}+`，为 0 时隐藏。 |
| `classNames`   | `{ root?: string; indicator?: string; }` | - | 自定义类名，包括根元素和指示器元素的类名。 |
| `styles`       | `{ root?: React.CSSProperties; indicator?: React.CSSProperties; }` | - | 自定义样式，包括根元素和指示器元素的样式。 |
| `overflowCount`| `number`            | `99`    | 展示封顶的数字值。                                           |
| `ghost`        | `boolean`           | `false` | 设置为 `true` 时，只显示数字，背景透明。                    |
| `showZero`     | `boolean`           | `false` | 当数值为 0 时，是否展示 Badge。                            |
| `title`        | `string`            | `-`     | 设置鼠标放在状态点上时显示的文字。                         |
| `offset`       | `[number, number]`  | `-`     | 设置状态点的位置偏移量。                                   |
