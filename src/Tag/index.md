---
nav: 组件
group: 基础组件
---

## Tag

```tsx
import {Tag} from 'loki-ui';
export default () => (
    <div className="flex gap-4 items-center">
        <Tag>内容1</Tag>
        <Tag disabled>禁用</Tag>
        <Tag closeIcon={null}>无关闭</Tag>
         <Tag size="s">小号</Tag>
        <Tag closeIcon={null} size="s">小号无关闭</Tag>
    </div>
);
```