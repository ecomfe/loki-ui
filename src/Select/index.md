---
nav: 组件
group: 基础组件
---

## Select 下拉选择

### 不同尺寸
基础用法，三种尺寸

```tsx
import {Select} from 'loki-ui';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
];
export default () => {
    return (
        <div className="flex gap-2 items-center">
            <Select options={options}></Select>
            <Select options={options} size="s"></Select>
            <Select options={options} size="l" allowClear></Select>
        </div>
    );
};
```
### 支持搜索
带搜索的

```tsx
import {Select} from 'loki-ui';
import React, {useState} from 'react';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
];
export default () => {
    const [list, setList] = useState(options);
    const handleSearch = (value) => {
        setList(value ? list.filter((i) => i.value.includes(value)) : options);
    };
    return <Select onSearch={handleSearch} options={list} showSearch></Select>;
};
```
### 多选场景
多选

```tsx
import {Select} from 'loki-ui';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
];
export default () => {
    return <Select options={options} showSearch allowClear placeholder="Please select" mode="multiple"></Select>;
};
```

自适应多选

```tsx
import {Select} from 'loki-ui';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
    {value: 'Svelte', label: 'Svelte'},
];
export default () => {
    return (
        <div className="flex gap-2 items-center w-48">
            <Select options={options} mode="multiple" maxTagCount="responsive" />
        </div>
    );
};
```
### 状态 禁用/错误
设置禁用状态

```tsx
import {Select} from 'loki-ui';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
];
export default () => {
    return (
        <div className="flex gap-2 items-center w-48">
            <Select options={options} disabled mode="multiple" maxTagCount="responsive" />
        </div>
    );
};
```

支持成功和失败状态，一般用于表单校验

```tsx
import {Select} from 'loki-ui';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
];
export default () => {
    return (
        <div className="flex gap-2 items-center">
            <Select options={options} status="error"></Select>
            <Select options={options} status="success"></Select>
        </div>
    );
};
```
### 多内容滚动
设置列表的滚动高度

```tsx
import {Select} from 'loki-ui';
import React, {useState} from 'react';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
    {value: 'svelte', label: 'Svelte'},
];
export default () => {
    return (
        <div className={'w-48'}>
            <Select options={options} mode="multiple" maxTagCount="responsive" listHeight={100} />
        </div>
    );
};
```
### 自定义样式
设置自定义`Selector`的样式，自定义样式只支持受控模式
```tsx
import React, {useState} from 'react';
import {Select} from 'loki-ui';
const options = [
    {value: 'React', label: 'React'},
    {value: 'Vue', label: 'Vue'},
    {value: 'Angular', label: 'Angular'},
    {value: 'JQuery', label: 'JQuery'},
    {value: 'Solid', label: 'Solid'},
];
const customSelect = (props) => {
    const {value} = props;
    console.log('接受到的props有', props);
    return (<label for="custom-select" class="block mb-2 text-sm font-medium text-gray-900
                       cursor-pointer transition duration-300 p-2 rounded-sm
                       hover:bg-gray-200 active:bg-gray-300">
    {value ? value: "Choose an option"}</label>)
}
export default () => {
    const [value, setValue] = useState('');
    const handleChange = (value) => {
        setValue(value);
    }

    return (
        <div className="flex gap-2 items-center">
            <Select options={options} value={value} customSelect={customSelect} onChange={handleChange}></Select>
        </div>
    );
};
```

`API`说明
| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `id` | 组件的ID | `string` | - |
| `showSearch` | 是否可以搜索 | `boolean` | `false` |
| `searchValue` | 输入框的内容 | `string` | - |
| `onSearch` | 输入框内容变化时的回调 | `(value: string) => void` | - |
| `onSelect` | 选中选项时的回调 | `SelectHandler<LabelInValueType>` | - |
| `onDeselect` | 取消选中时的回调 | `SelectHandler<LabelInValueType>` | - |
| `options` | 选项数据 | `OptionType[]` | `[]` |
| `optionRender` | 自定义渲染下拉选项的方法 | `(oriOption: FlattenOptionData<BaseOptionType>, info: { index: number }) => React.ReactNode` | - |
| `defaultActiveFirstOption` | 是否默认高亮第一个选项 | `boolean` | `false` |
| `autoClearSearchValue` | 选择完一个选项后，是否清空搜索框 | `boolean` | `true` |
| `listHeight` | 设置弹窗滚动高度 | `number` | `256` |
| `menuItemSelectedIcon` | 自定义选中的条目的图标 | `RenderNode` | - |
| `mode` | 设置 Select 的模式为多选 | `'multiple'` | - |
| `value` | 指定当前选中的条目 | `ValueType | null` | - |
| `defaultValue` | 指定默认选中的条目 | `ValueType | null` | - |
| `defaultOpen` | 是否默认展开下拉菜单 | `boolean` | `false` |
| `open` | 控制下拉菜单的打开状态 | `boolean` | - |
| `onDropdownVisibleChange` | 下拉菜单显示状态改变时调用 | `(isOpen: boolean) => void` | - |
| `notFoundContent` | 下拉列表为空时显示的内容 | `React.ReactNode` | - |
| `popupClassName` | 下拉菜单的 className | `string` | - |
| `loading` | 下拉列表加载状态 | `boolean` | `false` |
| `onInputKeyDown` | 按键按下时的回调 | `React.KeyboardEventHandler<HTMLInputElement \| HTMLTextAreaElement>` | - |
| `placement` | 选择框弹出的位置 | `PlacesType` | `"bottom"` |
| `placeholder` | 选择框默认文本 | `string` | - |
| `maxTagCount` | 响应式折叠，多选模式有效 | `'responsive'` | - |
| `popupMatchSelectWidth` | 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略 | `number`| `-` |
| `dropdownStyle`| 下拉菜单的 style 属性 | `React.CSSProperties` | `-` |
| `motion` | 控制 motion 动画的，默认对onEnterStart、onEnterActive、onLeaveStart、onLeaveActive、motionName有默认定义，可以传入覆盖进行自定义菜单的动画 | `CSSMotionProps` | `-` |
| `menuList` | 自定义下拉菜单的 jsx | `React.ReactNode` | `-` |
| `allowClear` | 展示或自定义清除按钮 | `boolean \| { clearIcon?: React.ReactNode }`| `-` |
| `formatChooseValue` | 对选中的值的format，比如想要加一些icon标识等等 | `(value: string \| string[]) => React.ReactNode` | `-` |
| `disabled` | 是否禁用 | `boolean` | `-` |
| `onChange` | 选项发生改变的回调，参数为当前选中的项 | `(value: LabelInValueType \| LabelInValueType[]) => void` | `-` |
| `size`| 尺寸选择  | `'s' \| 'm'`  | -    |
| `expandIcon`| 展开按钮 | `React.ReactNode`  | -    |
| `dropdownMenuColumnStyle` | 下拉菜单的style样式 | `React.CSSProperties`| -    |
| `customSelect`       | 自定义Selector组件 | `React.FC<SelectorProps>`     | -    |

