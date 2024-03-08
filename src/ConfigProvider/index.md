---
nav: 组件
group:
    title: 工具组件
    order: 2
---

## 使用

使用`Config Provider`可以帮助你快速重新定义token，这种方式轻松帮你局部覆盖样式，而不用写恼人的css

```tsx
import { Button, ConfigProvider } from 'loki-ui';
export default () => (
    <ConfigProvider
        config={{
            '--color-fill-button-temp': '#40E0D0',
            '--color-primary-hover': '#80FFA5',
        }}
    >
        <Button type="primary" size="s">
            按钮
        </Button>
    </ConfigProvider>
);
```
