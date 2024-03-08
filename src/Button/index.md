---
nav: 组件
group: 基础组件
---

## Button 按钮

#### 类型

按钮有五种类型：主按钮、线框按钮、次按钮、文本按钮和链接按钮。

```tsx
import { Button } from 'loki-ui';
export default () => (
    <div className="flex gap-4">
        <Button type="primary" size="s">
            按钮
        </Button>
        <Button type="outline" size="s">
            按钮
        </Button>
        <Button type="default" size="s">
            按钮
        </Button>
        <Button type="link" size="s">
            按钮
        </Button>
        <Button type="text" size="s">
            按钮
        </Button>
    </div>
);
```

#### 尺寸

总共有五种尺寸，从大到小，xl,l,m,s,xs,默认是m

```tsx
import { Button } from 'loki-ui';
export default () => (
    <div className="flex gap-4">
        <Button type="primary" size="xl">
            按钮
        </Button>
        <Button type="primary" size="l">
            按钮
        </Button>
        <Button type="primary" size="m">
            按钮
        </Button>
        <Button type="primary" size="s">
            按钮
        </Button>
        <Button type="primary" size="xs">
            按钮
        </Button>
    </div>
);
```

#### 禁用

添加 `disabled` 属性即可让按钮处于不可用状态，同时按钮样式也会改变。

```tsx
import { Button } from 'loki-ui';
export default () => (
    <div className="flex gap-4">
        <Button disabled size="l">
            按钮
        </Button>
        <Button disabled type="outline" size="l">
            按钮禁用
        </Button>
        <Button disabled type="default" size="l">
            按钮
        </Button>
        <Button disabled type="link" size="l">
            按钮禁用
        </Button>
        <Button disabled type="text" size="l">
            按钮禁用
        </Button>
    </div>
);
```

#### 加载中

加载中状态
添加 `loading` 属性即可让按钮处于加载状态，点击最后按钮演示点击后进入加载状态。

```tsx
import { AigcSystemZoomin } from 'loki-icon';
import { Button } from 'loki-ui';
export default () => {
    const [loading, setIsLoading] = React.useState([false, false]);

    const handleClick = (idx) => {
        loading[idx] = true;
        setIsLoading([...loading]);
        setTimeout(() => {
            loading[idx] = false;
            setIsLoading([...loading]);
        }, 2000);
    };
    return (
        <div className="flex gap-4">
            <Button loading disabled size="xl">
                加载中
            </Button>
            <Button loading disabled type="outline" size="xl">
                加载中
            </Button>
            <Button icon={<AigcSystemZoomin />} onClick={() => handleClick(0)} loading={loading[0]} disabled={loading[0]} size="xl">
                点击
            </Button>
            <Button onClick={() => handleClick(1)} disabled={loading[1]} size="xl">
                点击
            </Button>
        </div>
    );
};
```

#### 适应父元素

Block 按钮
`block` 属性将使按钮适合其父宽度。

```tsx
import { Button } from 'loki-ui';
export default () => (
    <div>
        <div style={{ width: 200 }}>
            <Button block size="m">
                Sign In
            </Button>
        </div>
    </div>
);
```

#### 透明背景

`ghost`属性可以让你变透明背景，你可以传递className或者style来定义你的炫彩颜色

```tsx
import { Button } from 'loki-ui';
export default () => (
    <div>
        <div style={{ width: 200 }}>
            <Button ghost size="m" className="bg-gradient-to-r from-cyan-500 to-blue-500">
                Sign In
            </Button>
        </div>
    </div>
);
```

### API属性

| Property  | Description    | Type                                                      | Default     |
| --------- | -------------- | --------------------------------------------------------- | ----------- |
| type      | 按钮类型       | `'primary' \| 'outline' \| 'default' \| 'text' \| 'link'` | `"primary"` |
| icon      | 按钮的图标     | `React.ReactNode`                                         | `undefined` |
| size      | 尺寸           | `SizeType`                                                | `m`         |
| disabled  | 是否禁用       | `boolean`                                                 | `false`     |
| loading   | 是否是加载中   | `boolean \| { delay?: number }`                           | `false`     |
| prefixCls | 生成的css前缀  | `string`                                                  | `loki`       |
| className | class属性      | `string`                                                  | `""`        |
| ghost     | 透明背景       | `boolean`                                                 | `false`     |
| block     | 使用父亲的宽度 | `boolean`                                                 | `false`     |
| children  | React children | `React.ReactNode`                                         | `null`      |
| iconStyle | Icon的样式     | `React.CSSProperties`                                     | `{}`        |
| width     | 按钮的宽度     | `React.CSSProperties['width']`                            | `{}`        |
