import React from 'react';
import {isReactNode} from '../_utils/reactNode';
import notification from '../Notification';
import type {NoticeType, MessageArgs} from './interface';

export const methods: NoticeType[] = ['success', 'info', 'warning', 'error', 'loading'];

function createMessage(type?: NoticeType) {
    // 函数重载签名
    function messageOpen(content: React.ReactNode, duration?: number, onClose?: () => void): Promise<void>;
    function messageOpen(config: MessageArgs): Promise<void>;
    function messageOpen(configOrContent: React.ReactNode | MessageArgs, duration = 2, onClose?: () => void) {
        const isNode = isReactNode(configOrContent);
        if (isNode) {
            const config = {
                content: configOrContent,
                duration,
                type,
                onClose,
                placement: 'top',
            } as const;
            return notification.open(config);
        } else {
            return notification.open({
                placement: 'top',
                type,
                ...configOrContent,
            });
        }
    }
    return messageOpen;
}

export default createMessage;
