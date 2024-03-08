---
nav: 组件
group: 基础组件
---


## 上传

文件选择上传和拖拽上传控件。

## 何时使用

上传是将信息（网页、文字、图片、视频等）通过网页或者上传工具发布到远程服务器上的过程。

- 当需要上传一个或一些文件时。
- 当需要展现上传的进度时。
- 当需要使用拖拽交互时。


## 代码演示

<!-- prettier-ignore -->
<code src="../../demo/Upload/basic.tsx">点击上传</code>

## API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| accept | 接受上传的文件类型，详见 [input accept Attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) | string | - |
| action | 上传的地址 | string \| (file) => Promise&lt;string> | - |
| beforeUpload | 上传文件之前的钩子，参数为上传的文件，若返回 `false` 则停止上传。支持返回一个 Promise 对象，Promise 对象 reject 时则停止上传，resolve 时开始上传（ resolve 传入 `File` 或 `Blob` 对象则上传 resolve 传入对象）；也可以返回 `Upload.LIST_IGNORE`，此时列表中将不展示此文件。 **注意：IE9 不支持该方法** | (file, fileList) => boolean \| Promise&lt;File> \| `Upload.LIST_IGNORE` | - |
| customPost |	通过覆盖默认的上传行为，可以自定义自己的上传实现  |	function	-	|
| maxCount | 限制上传数量。当为 1 时，始终用最新上传的文件代替当前文件 | number | - |
| drawCover | 是否自动抽帧来作为封面 | boolean | true |
| multiple | 是否支持多选文件，`ie10+` 支持。开启后按住 ctrl 可选择多个文件 | boolean | false |
| listType | 上传列表的内建样式，支持四种基本样式 `text`, `picture`, `picture-card` 和 `picture-circle` | string | `text` |
| imageSize | 图片大小，单位为M | number | 20 |
| VideoSize | 视频大小，单位为M | number | 200 |
| minWithAndHeight | 图片最小宽高，单位为px | number | 100 |
| onChange | 上传文件改变时的回调，上传每个阶段都会触发该事件 | function | - |
| disabled | 是否禁用 | boolean | false |
| fileList | 已经上传的文件列表 | [UploadFile](#uploadfile)\[] | - |


### UploadFile

继承自 File，附带额外属性用于渲染。

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| name | 文件名 | string | - |
| percent | 上传进度 | number | - |
| status | 上传状态，不同状态展示颜色也会有所不同 | `error` \| `done` \| `uploading` \| `removed` | - |
| thumbUrl | 缩略图地址 | string | - |
| uid | 唯一标识符，不设置时会自动生成 | string | - |
| url | 下载地址 | string | - |

### onChange

💡 上传中、完成、失败都会调用这个函数。文件状态改变的回调，返回为：
```js
{
  file: { /* ... */ },
  fileList: [ /* ... */ ],
  event: { /* ... */ },
}
```
1. `file` 当前操作的文件对象。
```js
{
    uid: 'uid',      // 文件唯一标识，建议设置为负数，防止和内部产生的 id 冲突
    name: 'xx.png',   // 文件名
    status: 'done' | 'uploading' | 'error' | 'removed' , //  beforeUpload 拦截的文件没有 status 状态属性
    response: '{"status": "success"}', // 服务端响应内容
    linkProps: '{"download": "image"}', // 下载链接额外的 HTML 属性
}
```
2. `fileList` 当前的文件列表。
3. `event` 上传中的服务端响应内容，包含了上传进度等信息，高级浏览器支持。
