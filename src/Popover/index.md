---
nav: 组件
group: 基础组件
---

## Popover 气泡

Popover支持Tooltip的全部属性

### 触发方式

支持click和hover两种

```tsx
import {Button, Popover} from 'loki-ui';
export default () => {
    const content = <div className="w-[232px]">气泡内容文本区域，放置详情解释</div>;
    return (
        <div className="flex gap-4 bg-[--cool-gray-100] h-32 p-[--padding-xl]">
            <Popover title="气泡标题" id="top" content={content} className="">
                <Button type="primary">hover top</Button>
            </Popover>
            <Popover title="气泡标题" id="left" content={content} className="" placement="left">
                <Button type="primary">hover left</Button>
            </Popover>
            <Popover title="气泡标题" content={content} trigger="click" className="" placement="right">
                <Button type="default">click right</Button>
            </Popover>
            <Popover title="气泡标题" content={content} trigger="click" className="" placement="bottom">
                <Button type="default">click bottom</Button>
            </Popover>
        </div>
    );
};
```

### 受控组件

```tsx
import React, {useState} from 'react';
import {Button, Popover} from 'loki-ui';
export default () => {
    const content = <div className="w-[232px]">气泡内容文本区域，放置详情解释</div>;
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    return (
        <div className="flex gap-4 bg-[--cool-gray-100] h-32 p-[--padding-xl]">
            <Popover
                title="气泡标题"
                onOk={handleClose}
                onCancel={handleClose}
                trigger="click"
                content={content}
                open={open}
                onOpenChange={setOpen}
            >
                <Button type="primary">hover top</Button>
            </Popover>
        </div>
    );
};
```

### API属性

| Property         | Description               | Is Necessary | Type                                       | Default  |
| ---------------- | ------------------------- | ------------ | ------------------------------------------ | -------- |
| cancelText       | 取消按钮的文案            | No           | string                                     | "取消"   |
| okText           | 确认按钮的文案            | No           | string                                     | "确认"   |
| content          | Popover面板的内容区域     | No           | React.ReactNode \| (() => React.ReactNode) | null     |
| title            | Popover的标题             | No           | string                                     | null     |
| footer           | Popover的操作栏，支持插槽 | No           | React.ReactElement \| false                | true     |
| btnSize          | 操作栏按钮的尺寸          | No           | BaseButtonProps['size']                    | "s"      |
| className        | 整体的class               | No           | string                                     | ""       |
| classNameContent | 面板的class               | No           | string                                     | ""       |
| onOK             | 确认的回调                | No           | () => void                                 | () => {} |
| onCancel         | 取消的回调                | No           | () => void                                 | () => {} |
