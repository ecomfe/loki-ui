---
nav: 组件
group: 基础组件
---

# Modal

## 何时使用

需要用户处理事务，又不希望跳转页面以致打断工作流程时，可以使用 `Modal` 在当前页面正中打开一个浮层，承载相应的操作。

## 代码演示

<code src="../../demo/Modal/basic.tsx">基本</code>
<code src="../../demo/Modal/size.tsx">不同尺寸</code>
<code src="../../demo/Modal/withIcon.tsx">带图标</code>
<code src="../../demo/Modal/customFooter.tsx">自定义页脚</code>
<code src="../../demo/Modal/withLink.tsx">了解更多</code>
<code src="../../demo/Modal/active.tsx">活动型弹窗</code>
<code src="../../demo/Modal/static.tsx">静态方法调用</code>

## API

|    参数    |     说明         |    类型     |     默认值     |
|:--------------:|:--------------:|:--------------:|:------------:|
|    type    |    图标的类型   |   `'primary' \| 'warning' \| 'success' \| 'error'`   |        |
|   okText   |     确认按钮文字     |  ReactNode  |     `确定`     |
|   okType   |     确认按钮类型     |   string    |   `primary`    |
|  centered  |  垂直居中展示 Modal  |   boolean   |     false      |
|   title    |         标题         |  ReactNode  |       -        |
|    open    |    对话框是否可见    |   boolean   |       -        |
|  closable  |        是否显示右上角的关闭按钮        |   boolean   |     false      |
|   width    |         宽度         |       string \| number        |      520       |
| className |      配置弹窗内置模块的 className      | string |       -        |
| headerClassName |      配置弹窗内置模块的 className      | string |       -        |
| bodyClassName |      配置弹窗内置模块的 className      | string |       -        |
| footerClassName |      配置弹窗内置模块的 className      | string |       -        |
| cancelText |     取消按钮文字     |  ReactNode  |     `取消`     |
|  centered  |  垂直居中展示 Modal  |   boolean   |     false      |
|  keyboard  |         是否支持键盘 esc 关闭          |   boolean   |      true      |
|    mask    |     是否展示遮罩     |   boolean   |      true      |
|    size    |     设置按钮大小     |       s \| m \| l \| xl       |       m        |
|   footer   | 底部内容，当不需要默认底部按钮时，可以设为 footer={null} |          (params:footerRenderParams)=> React.ReactNode \| React.ReactNode  | (确定取消按钮) |     |
|    link    |       链接地址       |   string    |       |
|  linkText  |       链接文字       |   string    |   `了解更多`   |
|  pure  |   活动型纯弹窗 (不带 header \/ footer)   |   boolean   |     false   |
|  onCancel  |  点击遮罩层或右上角叉或取消按钮的回调  |          function(e)          |       -        |
|    onOk    |     点击确定回调     |          function(e)          |       -        |
|    onClickLink    |     点击文本时候触发的回调     |          function(e)          |       -        |

