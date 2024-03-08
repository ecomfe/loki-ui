import notification from '../Notification';
export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
// 消息参数接口
export interface MessageArgs {
    content: React.ReactNode;
    type?: NoticeType;
    duration?: number;
    onClick?: () => void;
    onClose?: () => void;
    key?: string;
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactNode;
    showClose?: boolean;
    onRemove?: (key: string) => void;
    id?: string;
}

type MessageFunction = {
    (content: string, duration?: number, onClose?: () => void): Promise<void>;
    (config: MessageArgs): Promise<void>;
};

type NotificationType = typeof notification;
export type MsgMethodsType = {
    [K in NoticeType]: MessageFunction;
}
interface StaticMessageFunction extends MsgMethodsType {
    open: (args: MessageArgs) => void;
    close: (key: React.Key) => void;
    destroy: () => void;
    config: NotificationType['config']
};
