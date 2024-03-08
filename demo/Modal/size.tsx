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

    const [open3, setOpen3] = useState(false);

    const showModal3 = () => {
        setOpen3(true);
    };
    const handleOk3 = () => {
        setOpen3(false);
    };

    const handleCancel3 = () => {
        setOpen3(false);
    };

    const [open4, setOpen4] = useState(false);

    const showModal4 = () => {
        setOpen4(true);
    };
    const handleOk4 = () => {
        setOpen4(false);
    };

    const handleCancel4 = () => {
        setOpen4(false);
    };

    const [open5, setOpen5] = useState(false);
    const showModal5 = () => {
        setOpen5(true);
    };
    const handleOk5 = () => {
        setOpen5(false);
    };

    const handleCancel5 = () => {
        setOpen5(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                小号Modal
            </Button>

            <Modal size="s" open={open} title="标题" centered type="primary" onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Button type="primary" onClick={showModal2} className="ml-10">
                中号Modal
            </Button>

            <Modal size="m" open={open2} title="标题" centered type="success" onOk={handleOk2} onCancel={handleCancel2}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Button type="primary" onClick={showModal3} className="ml-10">
                大号Modal
            </Button>

            <Modal size="l" open={open3} title="标题" centered type="primary" onOk={handleOk3} onCancel={handleCancel3}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Button type="primary" onClick={showModal4} className="ml-10">
                超大号Modal
            </Button>

            <Modal
                size="xl"
                open={open4}
                title="标题"
                centered
                type="success"
                onOk={handleOk4}
                onCancel={handleCancel4}
            >
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>

            <Button type="primary" onClick={showModal5} className="ml-10">
                自定义宽度 1200px
            </Button>

            <Modal width={1200} open={open5} centered type="success" onOk={handleOk5} onCancel={handleCancel5}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </>
    );
};

export default App;
