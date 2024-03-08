---
nav: 组件
group: 基础组件
---

## Form 表单

高性能表单控件，自带数据域管理。包含数据录入、校验以及对应样式。

## 何时使用

-   用于创建一个实体或收集信息。
-   需要对输入的数据类型进行校验时。

## 代码演示

```tsx
import {Button, Form, Input, Select, Checkbox} from 'loki-ui';
import {useState} from 'react';
const options = [
    {value: 'man', label: '男生'},
    {value: 'woman', label: '女生'},
];
const serviceAreas = [
    {value: 'Ionia', label: '艾欧尼亚'},
    {value: 'Zuan', label: '祖安'},
    {value: 'Noxas', label: '诺克萨斯'},
];
export default () => {
    const [formItemName, setName] = useState('name');
    function onFinish(values) {
        console.log('Finish:', values);
    }

    return (
        <div className="flex gap-4 p-[--padding-xl]">
            <Form onFinish={onFinish} labelWidth={80}>
                <Form.Item
                    name={formItemName}
                    label="用户名"
                    required
                    rules={[{required: true}]}
                >
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="password" label="密码">
                    <Input type="password" placeholder="请输入" />
                </Form.Item>
                <Form.Item name="sex" label="性别" required rules={[
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value) {
                                    return Promise.reject(new Error('必须填写性别'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}>
                    <Select options={options} placeholder="请选择" />
                </Form.Item>
                <Form.Item
                    name="service-area"
                    label="区服"
                    required
                    rules={[
                        ({getFieldValue}) => ({
                            validator(_, value) {
                                if (!value?.length) {
                                    return Promise.reject(new Error('必须选择区服'));
                                }
                                return Promise.resolve();
                            },
                        }),
                    ]}
                    className="items-center"
                >
                    <Checkbox.Group className="flex gap-2 items-center h-[38px] pt-[8px]">
                        {serviceAreas.map((item, index) => {
                            return (
                                <div className="flex items-center">
                                    <Checkbox value={item.value} />
                                    <span className="text-zinc-500 text-[14px] leading-[22px]">{item.label}</span>
                                </div>
                            );
                        })}
                    </Checkbox.Group>
                </Form.Item>
                <div className="flex justify-center">
                    <Button htmlType="submit">提交</Button>
                </div>
            </Form>
        </div>
    );
};
```

```tsx
import {Button, Form, Input} from 'loki-ui';
import {useState} from 'react';

export default () => {
    const [formItemName, setName] = useState('name');
    function onFinish(values) {
        console.log('Finish:', values);
    }
    return (
        <div className="flex gap-4 px-[70px] py-[12px]">
            <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                    name={formItemName}
                    label="用户名"
                    required
                    rules={[{required: true, message: '该选项必填'}]}
                >
                    <Input placeholder="请输入" />
                </Form.Item>
                <Form.Item name="password" label="密码">
                    <Input type="password" placeholder="请输入" />
                </Form.Item>

                <Button htmlType="submit">提交</Button>
            </Form>
        </div>
    );
};
```

## Form API

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| colon | 配置 Form.Item 的 `colon` 的默认值。表示是否显示 label 后面的冒号 (只有在属性 layout 为 horizontal 时有效) | boolean | true |
| disabled | 设置表单组件禁用，仅对 antd 组件有效 | boolean | false |
| component | 设置 Form 渲染元素，为 `false` 则不创建 DOM 节点 | ComponentType \| false | form |
| fields | 通过状态管理（如 redux）控制表单字段，如非强需求不推荐使用。查看[示例](#components-form-demo-global-state) | [FieldData](#fielddata)[] | - |
| form | 经 `Form.useForm()` 创建的 form 控制实例，不提供时会自动创建 | [FormInstance](#forminstance) | - |
| feedbackIcons | 当 `Form.Item` 有 `hasFeedback` 属性时可以自定义图标 | [FeedbackIcons](#feedbackicons) | - |
| initialValues | 表单默认值，只有初始化以及重置时生效 | object | - |
| labelAlign | label 标签的文本对齐方式 | `left` \| `right` | `right` |
| labelWrap | label 标签的文本换行方式 | boolean | false |
| layout | 表单布局 | `horizontal` \| `vertical` \| `inline` | `horizontal` |
| name | 表单名称，会作为表单字段 `id` 前缀使用 | string | - |
| preserve | 当字段被删除时保留字段值 | boolean | true |
| requiredMark | 必选样式，可以切换为必选或者可选展示样式。此为 Form 配置，Form.Item 无法单独配置 | boolean \| `optional` \| ((label: ReactNode, info: { required: boolean }) => ReactNode) | true |
| scrollToFirstError | 提交失败自动滚动到第一个错误字段 | boolean \| [Options](https://github.com/stipsan/scroll-into-view-if-needed/tree/ece40bd9143f48caf4b99503425ecb16b0ad8249#options) | false |
| validateMessages | 验证提示模板，说明[见下](#validatemessages) | [ValidateMessages](https://github.com/ant-design/ant-design/blob/6234509d18bac1ac60fbb3f92a5b2c6a6361295a/components/locale/en_US.ts#L88-L134) | - |
| validateTrigger | 统一设置字段触发验证的时机 | string \| string[] | `onChange` |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性，用法同 labelCol | [object](/components/grid-cn#col) | - |
| onFieldsChange | 字段更新时触发回调事件 | function(changedFields, allFields) | - |
| onFinish | 提交表单且数据验证成功后回调事件 | function(values) | - |
| onValuesChange | 字段值更新时触发回调事件 | function(changedValues, allValues) | - |


## Form.Item API

表单字段组件，用于数据双向绑定、校验、布局等。
| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| colon | 配合 `label` 属性使用，表示是否显示 `label` 后面的冒号 | boolean | true |
| dependencies | 设置依赖字段，说明[见下](#dependencies) | [NamePath](#namepath)[] | - |
| extra | 额外的提示信息，和 `help` 类似，当需要错误信息和提示文案同时出现时，可以使用这个 | ReactNode | - |
| getValueFromEvent | 设置如何将 event 的值转换成字段值 | (..args: any[]) => any | - |
| getValueProps | 为子元素添加额外的属性 | (value: any) => any | - |
| hasFeedback | 配合 `validateStatus` 属性使用，展示校验状态图标，建议只配合 Input 组件使用 | boolean \| { icons: [FeedbackIcons](#feedbackicons) } | false |
| help | 提示信息，如不设置，则会根据校验规则自动生成 | ReactNode | - |
| hidden | 是否隐藏字段（依然会收集和校验字段） | boolean | false |
| htmlFor | 设置子元素 label `htmlFor` 属性 | string | - |
| initialValue | 设置子元素默认值，如果与 Form 的 `initialValues` 冲突则以 Form 为准 | string | - |
| label | `label` 标签的文本 | ReactNode | - |
| labelAlign | 标签文本对齐方式 | `left` \| `right` | `right` |
| labelCol | `label` 标签布局，同 `<Col>` 组件，设置 `span` `offset` 值，如 `{span: 3, offset: 12}` 或 `sm: {span: 3, offset: 12}` | [object](/components/grid-cn#col) | - |
| messageVariables | 默认验证字段的信息 | Record<string, string> | - |
| name | 字段名，支持数组 | [NamePath](#namepath) | - |
| normalize | 组件获取值后进行转换，再放入 Form 中 | (value, prevValue, prevValues) => any | - |
| noStyle | 为 `true` 时不带样式，作为纯字段控件使用 | boolean | false |
| preserve | 当字段被删除时保留字段值 | boolean | true |
| required | 必填样式设置 | boolean | false |
| rules | 校验规则，设置字段的校验逻辑 | [Rule](#rule)[] | - |
| shouldUpdate | 自定义字段更新逻辑 | boolean \| (prevValue, curValue) => boolean | false |
| tooltip | 配置提示信息 | ReactNode \| [TooltipProps & { icon: ReactNode }](/components/tooltip-cn#api) | - |
| trigger | 设置收集字段值变更的时机 | string | `onChange` |
| validateFirst | 当某一规则校验不通过时，是否停止剩下的规则的校验 | boolean \| `parallel` | false |
| validateDebounce | 设置防抖，延迟毫秒数后进行校验 | number | - |
| validateStatus | 校验状态，可选：'success' 'warning' 'error' 'validating' | string | - |
| validateTrigger | 设置字段校验的时机 | string \| string[] | `onChange` |
| valuePropName | 子节点的值的属性，如 Switch、Checkbox 的是 `checked` | string | `value` |
| wrapperCol | 需要为输入控件设置布局样式时，使用该属性 | [object](/components/grid-cn#col) | - |


被设置了 `name` 属性的 `Form.Item` 包装的控件，表单控件会自动添加 `value`（或 `valuePropName` 指定的其他属性） `onChange`（或 `trigger` 指定的其他属性），数据同步将被 Form 接管，这会导致以下结果：

1. 你**不再需要也不应该**用 `onChange` 来做数据收集同步（你可以使用 Form 的 `onValuesChange`），但还是可以继续监听 `onChange` 事件。
2. 你不能用控件的 `value` 或 `defaultValue` 等属性来设置表单域的值，默认值可以用 Form 里的 `initialValues` 来设置。注意 `initialValues` 不能被 `setState` 动态更新，你需要用 `setFieldsValue` 来更新。
3. 你不应该用 `setState`，可以使用 `form.setFieldsValue` 来动态改变表单值。
