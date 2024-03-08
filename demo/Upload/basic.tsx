import React from 'react';
import {Button, Upload} from 'loki-ui';

const props = {
    name: 'file',
    action: {
        upload: 'https://run.mocky.io/v3/6f917f11-87d2-4a42-888c-887eb7fbdcae',
    },
    needDrawFrame: true,
    onChange: (status: any) => {
        console.log({
            onStatusChange: status,
        });
    },
};

const App: React.FC = () => (
    // @ts-ignore
    <Upload {...props}>
        <Button>Click to Upload</Button>
    </Upload>
);

export default App;
