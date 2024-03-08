---
nav: 组件
group: 基础组件
---

## Pagination 分页

### 代码

<code src="../../demo/Pagination/basic.tsx">基本</code>
<code src="../../demo/Pagination/more.tsx">更多</code>
<code src="../../demo/Pagination/custom.tsx">自定义上一步和下一步</code>

### API 属性

| 属性                | 类型                                                                                                                                        | 必需 | 描述                              |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- | ---- | --------------------------------- |
| className           | string                                                                                                                                      |      | 外层 className                    |
| style               | React.CSSProperties                                                                                                                         |      | 外层样式                          |
| current             | number                                                                                                                                      | ✓    | 当前页数                          |
| defaultCurrent      | number (默认值: 1)                                                                                                                          |      | 初始状态下的页数                  |
| total               | number                                                                                                                                      | ✓    | 总条目数                          |
| pageSize            | number (默认值: 10)                                                                                                                         |      | 每页显示的条目数                  |
| defaultPageSize     | number                                                                                                                                      |      | 暂时无意义                        |
| hideOnSinglePage    | boolean                                                                                                                                     |      | 是否只有一页时隐藏                |
| showTitle           | boolean                                                                                                                                     |      | 是否显示原生 tooltip 页码提示     |
| disabled            | boolean                                                                                                                                     |      | 是否禁用                          |
| jumpPrevIcon        | React.ReactElement \| React.FC                                                                                                              |      | 当页数较多时，跳转到前 5 页的按钮 |
| jumpNextIcon        | React.ReactElement \| React.FC                                                                                                              |      | 当页数较多时，跳转到后 5 页的按钮 |
| prevIcon            | React.ReactElement \| React.FC<{ disabled: boolean }>                                                                                       |      | 上一页的按钮                      |
| nextIcon            | React.ReactElement \| React.FC<{ disabled: boolean }>                                                                                       |      | 下一页的按钮                      |
| showPrevNextJumpers | boolean                                                                                                                                     |      | 是否显示上一页下一页的跳转按钮    |
| onChange            | (page: number, pageSize: number) => void                                                                                                    |      | 页码改变的回调函数                |
| itemRender          | (page: number, type: 'page' &#124; 'prev' &#124; 'next' &#124; 'jump-prev' &#124; 'jump-next', element: React.ReactNode) => React.ReactNode |      | 自定义页码的渲染函数              |
| showTotal           | (total: number, range: [number, number]) => React.ReactNode                                                                                 |      | 用于展示总共有多少数据的函数      |
