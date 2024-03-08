---
nav: 组件
group: 基础组件
---

## Radio
基础使用
```tsx
import React from 'react';
import {Radio} from 'loki-ui';

export default () => {
    return (
        <Radio>React</Radio>
    )
}
```
`radio group`的使用
```tsx
import React, { useState } from 'react';
import { Radio } from 'loki-ui';

const App: React.FC = () => {
  const [value, setValue] = useState(1);

  const onChange = (e) => {
    console.log('radio checked', e);
    setValue(e);
  };

  return (
    <Radio.Group onChange={onChange} gap="16" value={value}>
      <Radio value={1}>A</Radio>
      <Radio value={2}>B</Radio>
      <Radio value={3}>C</Radio>
      <Radio value={4}>D</Radio>
    </Radio.Group>
  );
};

export default App;
```
按钮风格的样式
```tsx
import React from 'react';
import {Radio} from 'loki-ui';

const onChange = (value) => {
    console.log(`radio checked:${value}`);
};

const App: React.FC = () => (
    <Radio.Group onChange={onChange} defaultValue="a" gap="16">
        <Radio.Button value="a">React</Radio.Button>
        <Radio.Button value="b">Vue</Radio.Button>
        <Radio.Button value="c">Angular</Radio.Button>
        <Radio.Button value="d">San</Radio.Button>
    </Radio.Group>
);

export default App;
```
`disabled`属性禁用
```tsx
import React from 'react';
import {Radio} from 'loki-ui';

const onChange = (value) => {
    console.log(`radio checked:${value}`);
};

const App: React.FC = () => (
  <div className="">
    <Radio.Group onChange={onChange} defaultValue="a" gap="16" style={{marginTop: 16}}>
        <Radio.Button value="a">React</Radio.Button>
        <Radio.Button value="b" disabled>
            Vue
        </Radio.Button>
        <Radio.Button value="c">Angular</Radio.Button>
        <Radio.Button value="d">San</Radio.Button>
    </Radio.Group>
    <div className="mt-1">
      <Radio.Group onChange={onChange} defaultValue="b" gap="16" style={{marginTop: 16}}>
          <Radio value="a">React</Radio>
          <Radio value="b" disabled>
              Vue
          </Radio>
          <Radio value="c">Angular</Radio>
          <Radio value="d">San</Radio>
      </Radio.Group>
    </div>
  </div>
);

export default App;
```
### Radio/Radio.Button

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| checked | 指定当前是否选中 | boolean | false |
| defaultChecked | 初始是否选中 | boolean | false |
| disabled | 禁用 Radio | boolean | false |
| value | 根据 value 进行比较，判断是否选中 | any | - |

### Radio.Group

单选框组合，用于包裹一组 `Radio`。
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| buttonStyle | RadioButton 的风格样式，目前有描边和填色两种风格 | `outline` \| `solid` | `outline` |
| defaultValue | 默认选中的值 | any | - |
| disabled | 禁选所有子单选器 | boolean | false |
| options | 以配置形式设置子元素 | string\[] \| number\[] \| Array&lt;{ label: ReactNode; value: string; disabled?: boolean; }> | - |
| optionType | 用于设置 Radio `options` 类型 | `default` \| `button` | `default` |
| size | 大小，只对按钮样式生效 | `large` \| `middle` \| `small` | - |
| value | 用于设置当前选中的值 | any | - |
| onChange | 选项变化时的回调函数 | function(value: string \| number) | - |
| gap | 子项之间的间隔 "16"、"16 16"、"16px 16px"这些均表示x轴间隔16px，y轴间隔16px | string | "16 16" |