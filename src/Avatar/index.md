---
nav: 组件
group: 基础组件
---

## Avatar 头像

#### 类型

头像有两种类型：圆形和方形

```tsx
import {Avatar} from 'loki-ui';
const src = 'https://pic.rmb.bdstatic.com/82ba815c1f279d88ae795f97e8a44169.png';
export default () => (
    <div className="flex gap-4">
        <Avatar shape="circle" size="default" src={src} />
        <Avatar shape="square" size="default" src={src} />
    </div>
);
```

#### 尺寸

尺寸有三种类型：大、小和默认

```tsx
import {Avatar} from 'loki-ui';
const srcIcon = (
    <div>
        <img src={'https://pic.rmb.bdstatic.com/ec618cd39d0c667bee76d1a42ff3ccf2.png'} />
    </div>
);
export default () => (
    <div className="flex gap-4">
        <Avatar shape="circle" size="small" src={srcIcon} />
        <Avatar shape="circle" size="default" src={srcIcon} />
        <Avatar shape="circle" size="large" src={srcIcon} />
        <Avatar shape="square" size="small" src={srcIcon} />
        <Avatar shape="square" size="default" src={srcIcon} />
        <Avatar shape="square" size="large" src={srcIcon} />
    </div>
);
```

### API属性

| Property | Description                      | Type                              | Default   |
| -------- | -------------------------------- | --------------------------------- | --------- |
| shape    | 形状                             | `'circle' \| 'square'`            | `circle`  |
| size     | 尺寸                             | `'large' \| 'small' \| 'default'` | `default` |
| src      | 图片类头像的资源地址或者图片元素 | `string \| ReactNode`             |           |
| icon     | 头像的自定义图标(优先级低于src)  | `ReactNode`                       |           |
| alt      | 图像的替代文本                   | `string`                          |           |