---
nav: 组件
group:
    title: 提示
    order: 2
---

## message
### api形式调用
- `message.success(config)`
- `message.error(config)`
- `message.info(config)`
- `message.warning(config)`
- `message.loading(config)`

`config`可以是`ReactNode`或对象属性，支持对象属性如下：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| className | 自定义 CSS class | string | - |
| content | 提示内容 | ReactNode | - |
| duration | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | number | 2 |
| icon | 自定义图标 | ReactNode | - |
| key | 当前提示的唯一标志 | string \| number | - |
| style | 自定义内联样式 | CSSProperties | - |
| onClick | 点击 message 的关闭按钮触发的函数 | function | - |
| onClose | 关闭时触发的回调函数 | function | - |
| showClose | 是否展示关闭按钮 | true | - |

通过api的形式调用，使用`ReactDom.render`实现，因此你无法享受React的上下文，如需享受上下文请用hook
```tsx
import {message, Button} from 'loki-ui';
export default () => {
    return (
      <div className="flex gap-2">
        <Button type="default" onClick={() => message.success('这是一条消息')}>Success</Button>
        <Button type="default" onClick={() => message.warning('这是一条消息')}>Warning</Button>
        <Button type="default" onClick={() => message.info('这是一条消息')}>Info</Button>
        <Button type="default" onClick={() => message.error('这是一条消息')}>Error</Button>
        <Button type="default" onClick={() => message.loading('这是一条消息')}>Loading</Button>
      </div>
    )
}
```
### hook形式调用
hook形式调用，默认2s关闭，可以传递duration修改延时，传递`showClose`属性false可以不显示关闭按钮

```tsx
import { Button, message } from 'loki-ui';

export default () => {
 const [api, contextHolder] = message.useMessage();

  const success = () => {
    api.success({
      content: 'This is a prompt message for success, and it will disappear in 10 seconds',
      duration: 4,
      showClose: false,
    }).then(() => {
      api.info('do other things')
    });;
  };

  return (
    <div>
      {contextHolder}
      <Button onClick={success}>Customized display duration</Button>
    </div>
  );
};
```
### 支持单个/全部销毁
打开销毁的例子，传递key销毁key的message，不传递key全部销毁。

```tsx
import {message, Button} from 'loki-ui';
export default () => {
    return (
        <div className="flex gap-4">
            <Button onClick={() => message.success({
                content: '这是一条消息',
                key: 'success-tip',
                duration: 10,
            })}>打开</Button>
            <Button type="default" onClick={() => message.destroy('success-tip')}>关闭</Button>
        </div>
    )
}
```
### 返回Promise
除了destroy，其他api都可以通过 then 接口在关闭后运行 callback 。以上用例将在每个 message 将要结束时通过 then 显示新的 message 。
```tsx
import { Button, message } from 'loki-ui';
export default () => {
  const [messageApi, contextHolder] = message.useMessage();

  const success = () => {
    message
      .loading({
        content: 'Action in progress..',
        duration: 2.5,
      })
      .then(() => message.success('Loading finished', 2.5))
      .then(() => message.info('Loading finished', 2.5));
  };

  return (
    <div>
      {contextHolder}
      <Button onClick={success}>Display sequential messages</Button>
    </div>
  );
};
```

### 自定义的icon
```tsx
import { Button, message, notification } from 'loki-ui';
export default () => {
  const [messageApi, contextHolder] = message.useMessage();

  const handleClick = () => {
     message.open({
        content: <span className="pl-2">+10积分，完成登陆任务</span>,
        duration: 3,
        className: '',
        icon: <img
            src="https://pic.rmb.bdstatic.com/activity/2024-2/1708587059092/dc9d27ac58ce.png?x-bce-process=image/format,f_auto"
            alt=""
            width={20}
            height={20}
        />,
    });
  }

  return (
    <div>
      {contextHolder}
      <Button onClick={handleClick}>custom icon define</Button>
    </div>
  );
};
```

### 定义一次调用范围内的全局样式，如调整zIndex
```tsx
import { Button, message, notification } from 'loki-ui';
export default () => {
  const [messageApi, contextHolder] = message.useMessage({
    getClassName: (p) => {
      console.log('==>方向', p);
      return 'z-[2000]';
    }
  });

  const handleClick = () => {
     messageApi.open({
        content: <span className="pl-2">+10积分，完成登陆任务</span>,
        duration: 100,
        className: '',
        icon: <img
            src="https://pic.rmb.bdstatic.com/activity/2024-2/1708587059092/dc9d27ac58ce.png?x-bce-process=image/format,f_auto"
            alt=""
            width={20}
            height={20}
        />,
    });
  }

  return (
    <div>
      {contextHolder}
      <Button onClick={handleClick}>custom zIndex</Button>
    </div>
  );
};
```


### token覆盖
message的token覆盖请直接传递style的方式进行覆盖
