/**
 * description: 支持`Modal.success`、`Modal.error`、`Modal.warning`、`Modal.confirm`等静态方法，会返回一个引用，可以通过该引用更新和关闭弹窗。
 */
import React, {useRef} from 'react';
import {Button, Modal} from 'loki-ui';
export default () => {
    const ModalRef = useRef(null);
    const timeRef = useRef(null);
    const openModal = () => {
        ModalRef.current = Modal.warning({
            title: '积分不足',
            content: '当前积分不足，做任务获取积分，5秒后弹窗自动关闭',
            size: 'm',
            okText: '获取积分',
            cancelText: '取消',
            onCancel: () => {
                console.log('cancel');
                clearInterval(timeRef.current);
            },
        });
        timeRef.current = setTimeout(() => {
            ModalRef.current.destroy();
        }, 5000);
    };
    return (
        <div>
            <Button onClick={openModal}>点击提示</Button>
        </div>
    );
};
