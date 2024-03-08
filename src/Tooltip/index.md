---
nav: 组件
group: 基础组件
---

## Tooltip 文字提示

### 方向
<!-- ```tsx
import { Button, Tooltip } from 'loki-ui';

export default () => {
    const CustomTooltip = ({children}) => (
        <Tooltip placement="top" trigger="click" content={"哈哈哈哈哈"} placement="top">
            {children}
        </Tooltip>
    )
    const CustomBtn = () =>  <Button>click</Button>
    return (
        <div className="flex gap-20 relative">
            <CustomTooltip>
               <CustomBtn />
            </CustomTooltip>
            <CustomTooltip>
               <span>双节点</span>
               <span>双节点</span>
            </CustomTooltip>
            <CustomTooltip>
                <span className="absolute top-8 left-20">绝对定位</span>
            </CustomTooltip>
        </div>
    );
};
``` -->

共有12个方向

```tsx
import { Button, Tooltip } from 'loki-ui';

const TooltipExample = () => {
    const content = (
        <div className="text-center text-[0px]">
            <span className="text-white text-center text-xs not-italic font-normal leading-[18px]">文本提示文本</span>
            <div className="text-white text-center text-xs not-italic font-normal leading-[18px] opacity-50">
                ⌘&nbsp;⇧&nbsp;滚轮
            </div>
        </div>
    );

    return (
        <>
            <div className="flex gap-20">
                <Tooltip id="test-tooltip-top" content={content} placement="top">
                    <Button width={120}>top</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="top-start">
                    <Button width={120}>top-start</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="top-end">
                    <Button width={120}>top-end</Button>
                </Tooltip>
            </div>
            <div className="flex gap-20 mt-10">
                <Tooltip id="test-tooltip-top" content={content} placement="bottom">
                    <Button width={120}>bottom</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="bottom-start">
                    <Button width={120}>bottom-start</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="bottom-end">
                    <Button width={120}>bottom-end</Button>
                </Tooltip>
            </div>
            <div className="flex gap-20 mt-10">
                <Tooltip id="test-tooltip-top" content={content} placement="left">
                    <Button width={120}>left</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="left-start">
                    <Button width={120}>left-start</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="left-end">
                    <Button width={120}>left-end</Button>
                </Tooltip>
            </div>
                        <div className="flex gap-20 mt-10">
                <Tooltip id="test-tooltip-top" content={content} placement="right">
                    <Button width={120}>right</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="right-start">
                    <Button width={120}>right-start</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" content={content} placement="right-end">
                    <Button width={120}>right-end</Button>
                </Tooltip>
            </div>
        </>
    );
};

export default TooltipExample;
```

### 触发条件

支持click和hover两种触发方式

```tsx
import { Button, Tooltip } from 'loki-ui';

export default () => {
    const content = (
        <div className="text-center text-[0px]">
            <span className="text-white text-center text-xs not-italic font-normal leading-[18px]">文本提示文本</span>
            <div className="text-white text-center text-xs not-italic font-normal leading-[18px] opacity-50">
                ⌘&nbsp;⇧&nbsp;滚轮
            </div>
        </div>
    );
    return (
       <div className="flex gap-20">
                <Tooltip id="test-tooltip-top" content={content} placement="top">
                    <Button>hover</Button>
                </Tooltip>
                <Tooltip id="test-tooltip-top" trigger="click" content={content} placement="top">
                    <Button>click open</Button>
                </Tooltip>
                 <Tooltip id="test-tooltip-top" trigger="click" content={content} noArrow defaultOpen placement="top">
                    <Button>defaultOpen</Button>
                </Tooltip>
            </div>
    );
};
```

### 偏移量调整

支持偏移量调整，[y轴, x轴]

```tsx
import { Button, Tooltip } from 'loki-ui';

export default () => {
    const content = (
        <div>
            <span className="text-white text-center text-xs not-italic font-normal leading-[18px]">文本提示文本</span>
        </div>
    );
    return (
        <div className="flex gap-20">
            <Tooltip offset={[40, 20]} trigger="click" content={content} placement="top">
                <Button>click</Button>
            </Tooltip>
        </div>
    );
};
```

### 距离检测

滚动元素的定位需要是relative，默认开启autoAdjustOverflow，ToolTip非可视区域会自动调整位置，也可以手动关闭。

```tsx
import { Button, Tooltip } from 'loki-ui';

export default () => {
    const ref = React.useRef(null);
    const content = (
        <span className="text-white text-center text-xs not-italic font-normal leading-[18px]">文本提示文本</span>
    );
    return (
        <div className="h-[150px] overflow-scroll">
            <div className="h-[300px] w-[1500px] mt-20 relative" ref={ref}>
                <Tooltip trigger="click" getPopupContainer={() => ref.current} content={content} placement="top">
                    <Button className="ml-10">click</Button>
                </Tooltip>
                <Tooltip trigger="click" getPopupContainer={() => ref.current} content={content} placement="left">
                    <Button className="ml-20">click</Button>
                </Tooltip>
            </div>
        </div>
    );
};
```

### 强制更新

可以通过传递`destroyTooltipOnHide`强制组件在展现与关闭的时候装载再卸载，检查页面在关闭的时候看不到dom

```tsx
import { Button, Tooltip } from 'loki-ui';

export default () => {
    const content = (
        <span className="text-white text-center not-italic font-normal">文本提示文本</span>
    );
    return (
        <div className="flex gap-20">
            <Tooltip
                destroyTooltipOnHide
                defaultOpen
                offset={[20, 30]}
                trigger="click"
                content={content}
                placement="top"
            >
                <Button>click</Button>
            </Tooltip>
        </div>
    );
};
```

### 受控与非受控

如果传递了`open`属性，将会变成受控组件

```tsx
import { Button, Tooltip } from 'loki-ui';

export default () => {
    const [open, setOpen] = React.useState(false);
    const content = (
        <span className="text-white text-sm">提示内容</span>
    );
    const handleOpen = (status) => {
        setOpen(status);
    }
    return (
        <div className="flex gap-20">
            <Tooltip destroyTooltipOnHide open={open} trigger="click" content={content} onOpenChange={handleOpen} placement="top">
                <Button>toggle open</Button>
            </Tooltip>
        </div>
    );
};
```

### 基于固定位置打开

支持`position`参数，控制Tooltip基于position的位置展示

```tsx
import { Tooltip } from 'loki-ui';

export default () => {
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const handleClick = (e) => {
        setPosition({
            x: e.clientX,
            y: e.clientY,
        });
        setOpen(true);
    };
    const content = (
        <span className="text-white text-center text-xs not-italic font-normal leading-[18px]">文本提示文本</span>
    );
    return (
        <div className="flex h-16 justify-center items-center" onClick={handleClick}>
            <span className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">点击这块区域</span>
            <Tooltip
                id="fix-position"
                positionStrategy="fixed"
                open={open}
                closeOnScroll
                position={position}
                trigger="click"
                content={content}
                placement="top"
            />
        </div>
    );
};
```

### API属性

| Property             | Description                                              | Is Necessary | Type                              | Default      |
| -------------------- | -------------------------------------------------------- | ------------ | --------------------------------- | ------------ |
| className            | 样式类名                                                 | No           | `string`                          | `""`         |
| classNameArrow       | 箭头样式类名                                             | No           | `string`                          | `""`         |
| content              | 面板内容                                                 | No           | `React.ReactNode`                 | `null`       |
| contentWrapperRef    | 驱动tooltip位置更新的引用                                | No           | `React.RefObject<HTMLDivElement>` | `undefined`  |
| placement            | tooltip的放置位置                                        | No           | `PlacesType`                      | `"top"`      |
| offset               | 偏移量（y轴, x轴）                                       | No           | `[number, number]`                | `[10, 0]`    |
| id                   | tooltip的ID                                              | No           | `string`                          | `""`         |
| wrapper              | ToolTip被渲染的DOM类型                                   | Yes          | `WrapperType`                     | `"div"`      |
| trigger              | 触发方式                                                 | No           | `'hover' \| 'click'`              | `"hover"`    |
| positionStrategy     | 气泡放置样式策略                                         | No           | `PositionStrategy`                | `"absolute"` |
| delayShow            | 延迟展示时间                                             | No           | `number`                          | `0`          |
| delayHide            | 延迟隐藏时间                                             | No           | `number`                          | `0`          |
| noArrow              | 是否隐藏箭头                                             | No           | `boolean`                         | `false`      |
| style                | 自定义样式                                               | No           | `CSSProperties`                   | `-`          |
| position             | 定位锚点                                                 | No           | `IPosition`                       | `undefined`  |
| opacity              | 气泡的不透明度                                           | No           | `CSSProperties['opacity']`        | `1`          |
| getPopupContainer    | container，具体参考Portal组件，没有指定就是document.body | No           | `() => HTMLElement`               | `null`       |
| children             | 定位的元素                                               | No           | `React.ReactNode`                 | `null`       |
| autoAdjustOverflow   | 是否应用翻转策略                                         | Yes          | `boolean`                         | `true`       |
| defaultOpen          | 默认是否开启                                             | No           | `boolean`                         | `null`       |
| onOpenChange         | tooltip显示/隐藏回调函数                                 | No           | `(open: boolean) => void`         | `undefined`  |
| destroyTooltipOnHide | 是否在隐藏时销毁tooltip                                  | No           | `boolean`                         | `false`      |
| border               | CSS属性border的值（注：需要进一步明确）                  | No           | `number`         | `-`          |
