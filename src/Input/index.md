---
nav: 组件
group: 基础组件
---

## Input 输入框

### 基础用法

我们提供三种尺寸的`input`

```tsx
import {Input} from 'loki-ui';
export default () => (
    <div className="flex gap-2 items-center">
        <Input size="s" />
        <Input size="m" />
        <Input size="l" />
    </div>
);
```

### 带清除图标的

带移除图标的输入框，点击图标删除所有内容。

```tsx
import {Input} from 'loki-ui';
export default () => (
    <div className="flex items-center">
        <Input placeholder="input with clear icon" allowClear />
    </div>
);
```

### 计数能力

在某些场景下，需要定制计数能力（例如 emoji 长度以 1 计算），可以通过 `count` 属性来实现。在该模式下，通过 `count.max` 属性来超出原生 `maxLength` 的限制。

```tsx
import {Input} from 'loki-ui';
function countEmojis(str) {
    const regexAstralSymbols = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
    return str.replace(regexAstralSymbols, '_').length;
}

function customSlice(str, start, end) {
    const units = [];
    let match;
    if (countEmojis(str) <= end) return str;

    for (const symbol of str) {
        const isEmojiPart = (match = emojiRegex.exec(symbol)) !== null;

        if (units.length > 0 && isEmojiPart && units[units.length - 1].includes(match[0])) {
            units[units.length - 1] += symbol;
        } else {
            units.push(symbol);
        }
    }

    const slicedUnits = units.slice(start, end);

    return slicedUnits.join('');
}

export default () => (
    <div className="flex flex-col gap-4">
        <div>
            <label className="block text-[14px] leading-[22px] font-medium text-gray-700 mb-1">
                Default Input exceed (max 10 characters)
            </label>
            <Input
                count={{
                    show: true,
                    max: 10,
                }}
                defaultValue="Hello, loki-ui!"
            />
        </div>

        <div>
            <label className="block text-[14px] leading-[22px] font-medium text-gray-700 mb-1">Emoji Counter Input (max 20 emojis)</label>
            <Input
                count={{
                    show: true,
                    max: 20,
                    strategy: (txt) => countEmojis(txt),
                    exceedFormatter: (txt, {max}) => customSlice(txt, 0, max).join(''),
                }}
                defaultValue="😈👪库洛米"
            />
        </div>

        <div>
            <label className="block text-[14px] leading-[22px] font-medium text-gray-700 mb-1">Custom exceed formatter</label>
            <Input
                count={{
                    show: true,
                    max: 10,
                    strategy: (txt) => countEmojis(txt),
                    exceedFormatter: (txt, {max}) => txt.slice(0, max),
                }}
                defaultValue="Love me"
            />
        </div>
    </div>
);
```

### 状态

支持成功/失败的不同状态，这常常用于表单校验

```tsx
import {Input} from 'loki-ui';
export default () => (
    <div className="flex items-center gap-2">
        <Input placeholder="error status" allowClear status="error" placeholder="请输入邮箱" defaultValue="11123" />
        <Input placeholder="success status" count={{show: true, max: 10}} status="success" />
    </div>
);
```

### 前缀和后缀

```tsx
import {AigcSystemSearch} from 'loki-icon';
import {Input} from 'loki-ui';
export default () => (
    <div className="flex items-center gap-2">
        <Input
            placeholder="input with search addon"
            addonBefore={
                <span className="text-[--color-text-quaternary] pr-[--padding-xs]">
                    <AigcSystemSearch />
                </span>
            }
            allowClear
        />
        <Input placeholder="disable Input" disabled />
    </div>
);
```

### 受控组件

传递`value`将变成受控组件

```tsx
import {Input} from 'loki-ui';
export default () => {
    const [value, setValue] = React.useState('受控的Input');
    return (
        <div className="flex items-center">
            <Input placeholder="input with clear icon" maxLength={100} value={value} onChange={setValue} />
        </div>
    );
};
```

### 多行输入
多行输入支持高度自动变化，如果想要限制最大高度，请传递原生maxHeight属性，会自动判断，比如实现两行的限制，请测量两行的高度，传入即可
```tsx
import {Input} from 'loki-ui';
export default () => {
    const [value, setValue] = React.useState('自动高多行输入支持高度自动变化，传递autosize属性即开启，如果想要限制最大高度，请传递原生maxHeight属性，会自动判断，比如实现两行的限制，请测量两行的高度，传入即可');
    return (
        <div className="flex items-center gap-2">
            <Input.TextArea placeholder="auto height textarea" value={value}
            autosize
             count={{show: true, max: 200}} onChange={setValue} />
              <Input.TextArea placeholder="max height limit textarea" value={value}
            autosize
             count={{show: true, max: 200}} onChange={setValue} styles={{textarea: {maxHeight: 100}}} />
        </div>
    );
};
```
多行输入支持禁用、错误等状态
```tsx
import {Input} from 'loki-ui';
export default () => {
    const [value, setValue] = React.useState('');
    return (
        <div className="flex items-center gap-2">
            <Input.TextArea placeholder="disabled textarea" value={value} disabled
             count={{show: true, max: 200}} onChange={setValue} />
              <Input.TextArea placeholder="error status textarea" value={value} status="error"
             count={{show: true, max: 200}} onChange={setValue} styles={{textarea: {maxHeight: 100}}} />
        </div>
    );
};
```
多行输入支持无边框、取消计数
```tsx
import {Input} from 'loki-ui';
export default () => {
    const [value, setValue] = React.useState('');
    return (
        <div className="flex items-center gap-2">
              <Input.TextArea placeholder="no border textarea" value={value} bordered={false} count={false}
             onChange={setValue} styles={{textarea: {maxHeight: 100}}} />
             <Input.TextArea placeholder="max height limit textarea" value={value}
             count={false} onChange={setValue} styles={{textarea: {maxHeight: 100}}} />
        </div>
    );
};
```

### API属性

| 属性           | 描述                 | 类型                                                               | 默认值  |
| -------------- | -------------------- | ------------------------------------------------------------------ | ------- |
| `addonAfter`   | 设置后置标签         | `ReactNode`                                                        | -       |
| `addonBefore`  | 设置前置标签         | `ReactNode`                                                        | -       |
| `allowClear`   | 是否允许清除内容     | `boolean` \| `{ clearIcon: ReactNode }`                            | -       |
| `bordered`     | 是否有边框           | `boolean`                                                          | `true`  |
| `classNames`   | 自定义类名           | `Record<string, string>`                                           | -       |
| `count`        | 字符计数配置         | `CountConfig`                                                      | -       |
| `defaultValue` | 输入框的默认内容     | `string`                                                           | -       |
| `disabled`     | 是否禁用状态         | `boolean`                                                          | `false` |
| `id`           | 输入框的 id          | `string`                                                           | -       |
| `maxLength`    | 最大长度             | `number`                                                           | -       |
| `prefix`       | 带有前缀图标的 input | `ReactNode`                                                        | -       |
| `status`       | 设置校验状态         | `'error'` \| `'warning'`                                           | -       |
| `styles`       | 自定义样式           | `Record<string, CSSProperties>`                                    | -       |
| `size`         | 控件大小             | `'l'` \| `'m'` \| `'m'`                                            | -       |
| `suffix`       | 带有后缀图标的 input | `ReactNode`                                                        | -       |
| `type`         | 声明 input 类型      | `string`                                                           | `text`  |
| `value`        | 输入框内容           | `string`                                                           | -       |
| `onChange`     | 内容变化时的回调函数 | `(value: string, e: React.ChangeEvent<HTMLInputElement>) => void;` | -       |
| `onPressEnter` | 按下回车的回调函数   | `(e: React.KeyboardEvent<HTMLInputElement>) => void`               | -       |

`CountConfig`的类型如下
| 属性 | 描述 | 类型 | 默认值 |
| -------------- | ----------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- | ------ |
| `max` | 最大字符数，不同于原生 `maxLength`，超出后标红但不会截断。 | `number` | 无 |
| `strategy` | 自定义字符计数，例如标准 emoji 长度大于 1，可以自定义计数策略将其改为 1。 | `(value: string) => number` | 无 |
| `show` | 决定是否显示字符计数，以及如何显示。 | `boolean \| ((args: { value: string; count: number; maxLength?: number }) => ReactNode)` | `false` |
| `exceedFormatter` | 当字符数超出 `count.max` 时的自定义裁剪逻辑，不配置时不进行裁剪。 | `(value: string, config: { max: number }) => string` | 无 |
| `formatter` | 格式化显示信息，提供 `value`，`count`，和可选的`maxLength`，返回一个React节点。 | `(info: { value: string, count: number, maxLength?: number }) => ReactNode` | 无 |


`Textarea`除了默认的浏览器支持的属性都支持，其他附加的属性如下
| 属性          | 描述                                 | 类型                                                               | 默认值     |
|--------------|-------------------------------------|-------------------------------------------------------------------|-----------|
| autosize     | 是否自动调整大小                          | `boolean`                                                         | `false`   |
| classNames   | 自定义类名对象，可指定包装器、文本区域和计数器的类名   | `{ wrapper?: string; textarea?: string; count?: string; }`        | -         |
| styles       | 自定义样式对象，可指定包装器、文本区域和计数器的样式   | `{ wrapper?: React.CSSProperties; textarea?: React.CSSProperties; count?: React.CSSProperties; }` | -         |
| maxLength    | 最大长度                                | `number`                                                          | -         |
| value        | 文本区域的值                             | `string`                                                          | -         |
| onChange     | 内容变化时的回调函数                        | `(value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void` | -         |
| onPressEnter | 按下回车键时的回调函数                      | `(e: React.KeyboardEvent<HTMLTextAreaElement>) => void`          | -         |
| defaultValue | 文本区域的默认值                          | `string`                                                          | -         |
| count        | 计数配置                                | `CountConfig`                                                     | -         |
| size         | 文本区域的大小                            | `'m' \| 's'`                                                     | `'m'`     |
| bordered     | 是否显示边框                             | `boolean`                                                         | `false`   |
| status       | 文本区域的状态，如正常或错误               | `'normal' \| 'error'`                                            | `'normal'`|
