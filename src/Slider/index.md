---
nav: 组件
group: 基础组件
---

## Slider 滑块

### 描述

基本用法，disabled禁用

```tsx
import React, {useState} from 'react';
import {Slider, Switch} from 'loki-ui';

const App: React.FC = () => {
    const [disabled, setDisabled] = useState(false);

    const onChange = (checked: boolean) => {
        setDisabled(checked);
    };

    return (
        <div className="w-64">
            <Slider defaultValue={30} disabled={disabled} />
            <div className="mt-3 flex items-center">
                <span className="text-sm text-gray-500">Disabled: </span>
                <Switch size="small" checked={disabled} onChange={onChange} />
            </div>
        </div>
    );
};

export default App;
```

事件

```tsx
import React from 'react';
import {Slider} from 'loki-ui';

const onChange = (value: number | number[]) => {
    console.log('onChange: ', value);
};

const onChangeComplete = (value: number | number[]) => {
    console.log('onChangeComplete: ', value);
};

const App: React.FC = () => (
    <div className="w-64">
        <Slider defaultValue={30} onChange={onChange} onChangeComplete={onChangeComplete} />
    </div>
);

export default App;
```

设置最大值最小值，以及固定的步长

```tsx
import React, {useState} from 'react';
import {Slider} from 'loki-ui';

const MIN = 80;
const MAX = 200;
const App: React.FC = () => {
    const [speed, setSpeed] = useState(140);
    const handleSpeedChange = (value: number | number[]) => {
        console.log('onChange: ', value);
        setSpeed(value);
    };
    return (
        <div className="w-64 flex flex-col item-center">
            <div className="w-full flex justify-between text-xs text-gray-500">
                <span>min: {MIN}</span>
                <span>max: {MAX}</span>
            </div>
            <Slider value={speed} min={80} max={200} step={10} onChange={(val) => handleSpeedChange(val)} />
        </div>
    );
};

export default App;
```

### API属性

| 属性名           | 描述                            | 类型                                            | 默认值  | 是否必须 |
| ---------------- | ------------------------------- | ----------------------------------------------- | ------- | -------- |
| disabled         | 是否禁用                        | `boolean`                                       | `false` | 否       |
| keyboard         | 是否支持键盘操作                | `boolean`                                       | `true`  | 否       |
| autoFocus        | 是否自动获取焦点                | `boolean`                                       | `false` | 否       |
| onFocus          | 获取焦点的回调                  | `(e: React.FocusEvent<HTMLDivElement>) => void` | -       | 否       |
| onBlur           | 失去焦点的回调                  | `(e: React.FocusEvent<HTMLDivElement>) => void` | -       | 否       |
| min              | 最小值                          | `number`                                        | `0`     | 否       |
| max              | 最大值                          | `number`                                        | `100`   | 否       |
| step             | 步长                            | `number` \| `null`                              | `1`     | 否       |
| value            | 当前值，传递后为受控模式        | `number`                                        | -       | 否       |
| defaultValue     | 默认初始值                      | `number`                                        | `0`     | 否       |
| onChange         | 当前值变化时的回调              | `(value: ValueType) => void`                    | -       | 否       |
| onChangeComplete | 当前值变化结束的回调            | `(value: ValueType) => void`                    | -       | 否       |
| included         | (未提供描述)                    | `boolean`                                       | -       | 否       |
| startPoint       | (未提供描述)                    | `number`                                        | -       | 否       |
| className        | 自定义类名                      | `string`                                        | -       | 否       |
| style            | 样式                            | `React.CSSProperties`                           | -       | 否       |
| classNames       | 细粒度的类名，包含track和handle | `SliderClassNames`                              | -       | 否       |
| styles           | 细粒度的样式，包含track和handle | `SliderStyles`                                  | -       | 否       |
| handleRender     | 自定义handle                    | `HandleProps['render']`                         | -       | 否       |
