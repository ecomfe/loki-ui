---
nav: 组件
group: 基础组件
---

## Checkbox 复选框

### 普通
```tsx
import {Checkbox} from 'loki-ui';
import React, {useState, useCallback} from 'react';
export default () => {
    const [isChecked, setChecked] = useState(false);

    const onChange = (e) => {
        console.log(`checked = ${e.target.checked}`);
        setChecked(e.target.checked);
    };

    return (
        <div className="flex gap-4">
            <Checkbox checked={isChecked} onChange={onChange}>
                测试
            </Checkbox>
        </div>
    );
};
```

### 类型
禁用状态
```tsx
import {Checkbox} from 'loki-ui';
export default () => (
    <div className="flex gap-4">
        <Checkbox>测试</Checkbox>
        <Checkbox checked>测试</Checkbox>
        <Checkbox disabled>测试</Checkbox>
        <Checkbox disabled checked>
            测试
        </Checkbox>
    </div>
);
```
### 受控
联动 checkbox。
```tsx
import React, { useState } from 'react';
import { Button, Checkbox } from 'loki-ui';

const App: React.FC = () => {
  const [checked, setChecked] = useState(true);
  const [disabled, setDisabled] = useState(false);

  const toggleChecked = () => {
    setChecked(!checked);
  };

  const toggleDisable = () => {
    setDisabled(!disabled);
  };

  const onChange = (e) => {
    console.log('checked = ', e.target.checked);
    setChecked(e.target.checked);
  };

  const label = `${checked ? 'Checked' : 'Unchecked'}-${disabled ? 'Disabled' : 'Enabled'}`;

  return (
    <>
      <p style={{ marginBottom: '20px' }}>
        <Checkbox checked={checked} disabled={disabled} onChange={onChange}>
          {label}
        </Checkbox>
      </p>
      <p>
        <Button type="primary" size="small" onClick={toggleChecked}>
          {!checked ? 'Check' : 'Uncheck'}
        </Button>
        <Button style={{ margin: '0 10px' }} type="primary" size="small" onClick={toggleDisable}>
          {!disabled ? 'Disable' : 'Enable'}
        </Button>
      </p>
    </>
  );
};

export default App;
```


### Checkbox组（CheckboxGroup）
支持全组禁用
```tsx
import {Checkbox} from 'loki-ui';

const onChange = (checkedValues) => {
    console.log('checked = ', checkedValues);
};

const plainOptions = ['Apple', 'Pear', 'Orange'];

const options = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange'},
];

const optionsWithDisabled = [
    {label: 'Apple', value: 'Apple'},
    {label: 'Pear', value: 'Pear'},
    {label: 'Orange', value: 'Orange', disabled: true},
];

const App: React.FC = () => (
    <>
        <Checkbox.Group className="flex gap-2" options={plainOptions} defaultValue={['Apple']} onChange={onChange} />
        <br />
        <Checkbox.Group className="flex gap-2" options={options} defaultValue={['Pear']} onChange={onChange} />
        <br />
        <Checkbox.Group disabled className="flex gap-2" options={options} defaultValue={['Pear']} onChange={onChange} />
        <br />
        <Checkbox.Group
            className="flex gap-2"
            options={optionsWithDisabled}
            defaultValue={['Apple']}
            onChange={onChange}
        />
    </>
);

export default App;
```

### API属性

checkbox 的 API 属性如下：

| 属性名称            | 类型                                                   | 默认值      | 描述                           |
| ------------------- | ------------------------------------------------------ | ----------- | ------------------------------ |
| `disabled`          | `boolean`                                              | `undefined` | 如果为真，复选框将被禁用。     |
| `checked`           | `boolean`                                              | `undefined` | 如果为真，复选框将被选中。     |
| `onChange`          | `(event: React.ChangeEvent<HTMLInputElement>) => void` | -           | 当复选框状态改变时调用的函数。 |
| `className`         | `string`                                               | `undefined` | 外层label的 CSS 类名。         |
| `children`          | `React.ReactNode`                                      | `undefined` | 可以放置在复选框旁边的子元素。 |
| `style`             | `React.CSSProperties`                                  | `undefined` | 定义复选框的内联样式。         |
| `id`                | `string`                                               | `undefined` | 复选框的唯一标识符。           |
| `defaultChecked`    | `boolean`                                              | `undefined` | 设置复选框的默认选中状态。     |
| `value`             | `CheckboxValueType`                                    | `undefined` | 复选框的值。                   |
| `checkboxClassName` | `string`                                               | `undefined` | 复选框的 CSS 类名。            |
| `checkboxStyle` | `string`                                               | `undefined` | 复选框的 style样式。            |

checkbox group 的 API 属性如下：
| 属性名称 | 类型 | 默认值 | 描述 |
|----------|--------------------------------------|----------|--------------------------------|
| `options` | `Array<CheckboxOptionType>` | string | `undefined` | 指定可选项 |
| `disabled` | `boolean` | `undefined` | 整组失效 |
| `style` | `React.CSSProperties` | `undefined` | 定义复选框组的内联样式。 |
| `className` | `string` | `undefined` | 复选框组的 CSS 类名。 |
| `defaultValue` | `CheckboxValueType[]` | `undefined` | 设置复选框组的默认选中值数组。 |
| `value` | `CheckboxValueType[]` | `undefined` | 设置复选框组的选中值数组。 |
| `onChange` | `(checkedValue: CheckboxValueType[]) => void` | `undefined` | 当复选框组的选中项发生变化时调用的函数。 |
| `children` | `React.ReactNode` | `undefined` | 可以放置在复选框组内的子元素。 |

Option

```ts
export interface CheckboxOptionType {
    label: React.ReactNode;
    value: CheckboxValueType;
    style?: React.CSSProperties;
    disabled?: boolean;
    className?: string;
}
```
