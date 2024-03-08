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


    const [open2, setOpen2] = useState(false);

    const onOk2 = () => {
        setOpen2(false);
    };

    const showModal2 = () => {
        setOpen2(true);
    };

    const handleCancel2 = () => {
        setOpen2(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>

            <Modal pure title="Basic Modal" open={open} onOk={() => onOk()} onCancel={() => handleCancel()}>
                <div className="bg-white rounded-[10px] p-10 text-[--black]">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </div>
            </Modal>


            <Button type="primary" className="ml-10" onClick={showModal2}>
                Open Modal
            </Button>

            <Modal pure title="Basic Modal" size="xl" centered open={open2} onOk={() => onOk2()} onCancel={() => handleCancel2()}>
                <div className="bg-white rounded-[10px] p-10 text-[--black]">
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </div>
            </Modal>
        </>
    );
};

export default App;
