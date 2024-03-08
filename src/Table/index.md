---
nav: 组件
group: 基础组件
---

## Table

展示行列数据。
<code src="../../demo/Table/basic.tsx">基本</code>
<code src="../../demo/Table/loading.tsx">分页发起请求</code>
<code src="../../demo/Table/sticky.tsx">头部sticky的效果</code>
<code src="../../demo/Table/empty.tsx">无元素的时候，空内容占位</code>
<code src="../../demo/Table/infinite.tsx">无限滚动的表格</code>

## API 属性
| 属性 | 类型 | 描述 | 是否必须 |
| --- | --- | --- | --- |
| columns | `Array<ColumnDef<DataSourceItem>>` | 列定义的数组。参考[列定义](https://tanstack.com/table/v8/docs/guide/column-defs)以获取更多信息。 | ✓ |
| dataSource | `DataSourceItem[]` | 表格的数据源。 | ✓ |
| loading | boolean | 表示表格是否处于加载状态。 |  |
| spin | React.ReactElement | 作为加载中指示器显示的 React 元素。 |  |
| loadingIcon | React.ReactElement | 作为spin内的图标，传递spin无需传递loadingIcon |  |
| pagination | PaginationProps | 分页相关参数。传递 `null` 禁用分页。 |  |
| minHeight | number | 表格的最小高度。 |  |
| maxHeight | number | 表格的最大高度。启用 sticky 时必填。 |  |
| sticky | boolean | 表示表头是否固定。 |  |
| style | React.CSSProperties | 表格的样式。 |  |
| className | string | 表格的类名。 |  |
| classNames | object | 包含表头、表体、表行和单元格的类名的对象。 |  |
| scrollRef | `React.RefObject<HTMLDivElement>` | 表格内容区滚动时的滚动容器的引用。 |  |
| empty | React.ReactElement | 在表格为空时显示的 React 元素。 |  |
