---
nav: 组件
group: 基础组件
---

## Loading 加载中

#### loading态


```tsx
import {Loading} from 'loki-ui';
const src = 'https://pic.rmb.bdstatic.com/ea4a3fb21fbe609806bd6d0a1e5de0ce.png';
export default () => {
    const blackLoading = 'https://pic.rmb.bdstatic.com/93da7bf6b72679a66c0f3df0c1c5349f.png';
    const whiteLoading = <img
        src="https://pic.rmb.bdstatic.com/889d2145f77fddea166af67dfd2342c9.png"
        className="object-contain w-full h-full"
    />;
    return (
        <div className="flex gap-4 items-center">
            <Loading src={src} className="h-[60px]" />
            <Loading src={blackLoading} className="h-[40px] w-[40px]" />
            <Loading src={whiteLoading} className="bg-black h-[40px]" />
        </div>
    )
};
```

### API属性

| Property | Description                      | Type                              | Default   |
| -------- | -------------------------------- | --------------------------------- | --------- |
| src    | 图片地址                             | `'string' \| 'ReactNode'`            |   |
| className     | css样式                            | `'string'` |
