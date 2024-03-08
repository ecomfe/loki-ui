import {Button, Modal} from 'loki-ui';
import React, {useState} from 'react';

const App: React.FC = () => {
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    };
    const handleOk = () => {
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    };

    const [open2, setOpen2] = useState(false);

    const showModal2 = () => {
        setOpen2(true);
    };
    const handleOk2 = () => {
        setOpen2(false);
    };

    const handleCancel2 = () => {
        setOpen2(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Primary Modal
            </Button>

            <Modal open={open} title="标题" centered type="primary" onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Button type="primary" onClick={showModal2} className="ml-10">
                Open Success Modal
            </Button>

            <Modal open={open2} title="标题" centered type="success" onOk={handleOk2} onCancel={handleCancel2}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default App;
