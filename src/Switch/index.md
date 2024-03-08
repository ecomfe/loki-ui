---
nav: 组件
group: 基础组件
---

## Switch

```tsx
import {Switch} from 'loki-ui';
export default () => (
    <div className="flex gap-4 items-center">
        <Switch />
        <Switch disabled={true} defaultValue />
        <Switch value onChange={e => console.log(e)} />
    </div>
);
```