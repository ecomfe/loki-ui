---
nav: 组件
group:
    title: 定制主题
    order: 3
---

## ThemeProvider

### 使用

提供light、dark两种模式的token，可以通过覆盖token的方式进行自定义主题配置。通过根组件包裹ThemeProvider的方式，方便全局拿到设置属性的方法

```tsx
import { ThemeProvider, useTheme, Button, Popover } from 'loki-ui';

const Com = () => {
    const { api, theme } = useTheme();
    const handleChange = (type) => {
        api[type]();
    }
    return (
        <div>
            <div className="bg-[--color-bg-container] transition-colors duration-500">
                <div className="p-8 max-w-md mx-auto">
                    <div className="text-[--color-text-secondary] mb-6">
                        <h1 className="flex text-xl items-center font-semibold">主题设置
                        <Popover title="主题切换的介绍" footer={null} content="通过切换design token实现主体切换的能力">
                            <div class="w-2 h-2 bg-[--gray-600] rounded-full flex items-center justify-center relative p-2.5">
                            <span class="text-xs text-[--gray-100]">?</span>
                            </div>
                        </Popover>
                        </h1>
                        <p>
                            当前主题：<span id="current-theme">{theme === 'light' ? '亮色': '暗黑'}</span>
                        </p>
                    </div>
                    <div className="flex flex-col space-y-4">
                        <Button onClick={() => handleChange('setLight')}>
                            亮色
                        </Button>
                        <Button onClick={() => handleChange('setDark')}>
                            暗黑
                        </Button>
                        <Button onClick={() => handleChange('setSystem')}>
                            跟随系统
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default  () => (
    <ThemeProvider>
        <Com />
    </ThemeProvider>
);
```

## API介绍
`useTheme`返回context上下文，包含主题和设置主题的api
| 属性/方法    | 类型         | 默认值  | 描述                                    |
|--------------|--------------|---------|-----------------------------------------|
| `theme`      | `Theme`      | "light" | 当前的主题，可能为 "light" 或 "dark"。     |
| `api.setLight` | `() => void` |         | 设置亮色模式的方法。                      |
| `api.setDark`  | `() => void` |         | 设置暗黑模式的方法。                      |
| `api.setSystem` | `() => void` |         | 设置并监听跟随系统主题的方法。             |
