---
nav: 组件
group:
    title: 工具组件
    order: 2
---

## Portal

用于将children通过portal的方式插入到界面，如果没有提供container，默认插入到document.body。下面例子展示

```tsx
import { Button, Portal } from 'loki-ui';
export default () => {
    const [render, setRender] = React.useState(false);
    const ref = React.useRef<HTMLElement>(null);
    return (
        <div className="w-[200px]" ref={ref}>
            <Button
                ghost
                size="m"
                onClick={() => setRender(!render)}
                className="bg-gradient-to-r from-cyan-500 to-blue-500"
            >
                点击插入
            </Button>
            {render && (
                <Portal getContainer={() => ref.current}>
                    <div class="bg-white p-4 rounded-lg shadow-lg">
                        <div class="text-center">
                            <h2 class="text-xl font-bold">气泡标题</h2>
                            <p class="text-lg text-gray-700">气泡内容</p>
                        </div>
                    </div>
                </Portal>
            )}
        </div>
    );
};
```
