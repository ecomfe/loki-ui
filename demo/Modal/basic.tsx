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
        console.log('handle cancel');
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>

            <Modal mask={false} title="Basic Modal" open={open} onOk={() => onOk()} onCancel={() => handleCancel()}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default App;
