---
nav: 组件
group: 基础组件
---

## Player 播放器

```tsx
import {Player, Button, Tooltip} from 'loki-ui';
import React, {useState, useCallback, useRef} from 'react';
const verticalUrl = 'https://aigcrender.cdn.bcebos.com/aigcrender/vrender/2024-02-01/39527547/f72fa497f547337894bc2c44ccbe5640.mp4';
const horizontalUrl = 'https://aigcrender.cdn.bcebos.com/aigcrender/vrender/2024-02-02/39666148/9d9f93236e9e2c2c863ae7a13625d8fe.mp4';

const ele = <div
                className="w-full flex h-[60px] justify-center items-center"
            >
                <Button
                    key="publish"
                    type="primary"
                    className=" right-[12px] blue-bright w-[121px] h-[40px] flex justify-center items-center rounded-lg"
                >
                    button
                </Button>
            </div>;
export default () => {

    const [visible, setVisible] = useState(false);
    const [url, setUrl] = useState('');
    const [isHorizon, setIsHorizon] = useState(false);
    const [footer, setFooter] = useState(null);

    const videoRef = useRef<HTMLVideoElement>(null);


    return (
        <div className="flex gap-4">
            <Button onClick={()=>{setVisible(true); videoRef.current?.play();setUrl(horizontalUrl);setFooter(null);setIsHorizon(true);}}>横版视频无footer</Button>
            <Button onClick={()=>{setVisible(true); videoRef.current?.play();setUrl(horizontalUrl);setFooter(ele);setIsHorizon(true);}}>横版视频有footer</Button>
            <Button onClick={()=>{setVisible(true);videoRef.current?.play();setUrl(verticalUrl);setFooter(null);setIsHorizon(false);}}>竖版视频无footer</Button>
            <Button onClick={()=>{setVisible(true); videoRef.current?.play();setUrl(verticalUrl);setFooter(ele);setIsHorizon(false);}}>竖版视频有footer</Button>
            {
                (
                    <Player
                open={visible}
                onCancel={e => {
                    setVisible(false);
                    videoRef.current?.pause();
                    e.stopPropagation();
                }}
                videoClassName={`max-h-[calc(100vh-176px)] ${isHorizon ? 'max-w-[800px]' : 'max-w-[360px]'}`}
                videoRef={videoRef}
                footer={footer}
                src={url}
            />
                )
            }
        </div>
    );
};
```
