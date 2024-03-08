---
nav: 组件
group:
    title: 提示
    order: 2
---
## Notification 通知提醒框

全局展示通知提醒信息。


### 基础使用

```tsx
import React from 'react';
import { Button, notification } from 'loki-ui';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  let count = 0;

  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      content: 'Notification Title' + count++,
    });
  };
  return (
    <>
      {contextHolder}
      <div className="flex gap-4">
        <Button onClick={() => openNotificationWithIcon('success')}>Success</Button>
        <Button onClick={() => openNotificationWithIcon('info')}>Info</Button>
        <Button onClick={() => openNotificationWithIcon('warning')}>Warning</Button>
        <Button onClick={() => openNotificationWithIcon('error')}>Error</Button>
      </div>
    </>
  );
};

export default App;
```
自定义通知框自动关闭的延时，默认 4.5s，取消自动关闭只要将该值设为 0 即可。
```tsx
import React from 'react';
import { Button, notification } from 'loki-ui';
const Content = () => {
  const [count, setCount] = React.useState(0);
  return (
    <div>
      <p className="mb-2 text-gray-700 text-lg">I will never close automatically.</p>
      <Button onClick={() => setCount(count + 1)}>click me</Button>: {count}
    </div>
  )
}
const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      content: <Content />,
      duration: 0,
    });
  };

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={openNotification}>
        Open the notification box
      </Button>
    </>
  );
};

export default App;
```
使用 placement 可以配置通知从右上角、右下角、左下角、左上角弹出。
```tsx
import React from 'react';
import { Button, notification } from 'loki-ui';


const App: React.FC = () => {
  const [api, contextHolder] = notification.useNotification();
  const count = React.useRef(0);
  const openNotification = (placement) => {
    api.info({
      content: <p className="w-[200px]">This is the content of the notification. This is the content of the notification. This is the content of the notification.{"no" + count.current}</p>,
      placement,
      key: 'no' + count.current,
      duration: 1000
    });
    count.current += 1;
  };

  return (
    <>
      {contextHolder}
      <div className="flex gap-4">
        <Button type="primary" onClick={() => openNotification('top')}>
          top
        </Button>
        <Button
          type="primary"
          onClick={() => openNotification('bottom')}
        >
          bottom
        </Button>
        <Button
          type="primary"
          onClick={() => openNotification('topLeft')}
        >
          topLeft
        </Button>
        <Button
          type="primary"
          onClick={() => openNotification('topRight')}
        >
          topRight
        </Button>
        <Button
          type="primary"
          onClick={() => openNotification('bottomLeft')}
        >
          bottomLeft
        </Button>
        <Button
          type="primary"
          onClick={() => openNotification('bottomRight')}
        >
          bottomRight
        </Button>
      </div>
    </>
  );
};

export default App;
```
支持静态方法调用
```tsx
import React from 'react';
import { Button, notification } from 'loki-ui';

const openNotification = () => {
  notification.open({
    content: 'Notification call by api',
  });
};
const App: React.FC = () => (
  <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
);

export default App;
```
调节距离的位置，通过`config`method进行全局设置
```tsx
import React from 'react';
import { Button, notification } from 'loki-ui';

const openNotification = () => {
  notification.success({
    content: 'Notification call by api',
    placement: 'bottomRight',
    duration: 0
  });
};
notification.config({bottom: 200});
const App: React.FC = () => (
  <Button type="primary" onClick={openNotification}>
    Open the notification box
  </Button>
);

export default App;
```