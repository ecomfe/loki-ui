import {Button, Modal} from 'loki-ui';
import React, {useState} from 'react';

const App: React.FC = () => {
    const [open, setOpen] = useState(false);

    const onOk = () => {
        setOpen(false);
    };

    const showModal = () => {
        setOpen(true);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                带「了解更多」链接
            </Button>

            <Modal
                mask={false}
                link="https://www.baidu.com"
                open={open}
                onOk={() => onOk()}
                onCancel={() => handleCancel()}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default App;
