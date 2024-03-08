---
nav: 组件
group: 基础组件
---

## Empty 空

#### 是否有标题


```tsx
import {Empty} from 'loki-ui';
const src = 'https://pic.rmb.bdstatic.com/82ba815c1f279d88ae795f97e8a44169.png';
export default () => (
    <div className="flex gap-4">
        <Empty src={src} title="有图有标题" text="这里是提示文案"/>
        <Empty src={src} text="这里是提示文案"/>
        <Empty title="无图有标题" text="这里是提示文案"/>
        <Empty text="这里是提示文案"/>
    </div>
);
```

#### 操作引导类型


```tsx
import {Empty} from 'loki-ui';
const src = 'https://pic.rmb.bdstatic.com/82ba815c1f279d88ae795f97e8a44169.png';
export default () => {
    const handleClick= () => {
        alert('发生点击');
    }
    return (
        <div className="flex gap-4">
        <Empty
            src={src}
            title="有图有标题"
            text="这里是提示文案"
            buttonType="primary"
            buttonText="按钮"
            onClick={handleClick}
        />
        <Empty src={src} text="这里是提示文案" buttonType="primary" buttonText="按钮" onClick={handleClick}/>
        <Empty title="有图有标题" text="这里是提示文案" buttonType="link" buttonText="按钮" onClick={handleClick}/>
        <Empty text="这里是提示文案" buttonType="link" buttonText="按钮" onClick={handleClick}/>
    </div>
    )
};
```

### API属性

| Property | Description                      | Type                              | Default   |
| -------- | -------------------------------- | --------------------------------- | --------- |
| src    | 图片地址                             | `'string' \| 'ReactNode'`            |   |
| title     | 标题                            | `'string'` |
| text     | 提示文字 | `string`             |           |
| buttonType    | 按钮类型  | `'primary' \| 'link'`                       |           |
| buttonText      | 按钮文案                   | `string`                          |           |
| onClick      | 按钮点击事件                   | `(event: MouseEvent) => void`                          |           |