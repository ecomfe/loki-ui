
import type {Placement, MessageArgs} from '../NotifyBase/interface';

export interface NotificationProps {
    content: React.ReactNode;
    id?: React.Key;
    onClose?: () => void;
    duration?: number | null;
    icon?: React.ReactNode;
    placement?: Placement;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
    role?: 'alert' | 'status';
}

export interface GlobalConfigProps {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
    duration?: number;
    getContainer?: () => HTMLElement;
    placement?: Placement;
    maxCount?: number;
}
type StaticFn = (args: MessageArgs) => void;
export interface NotificationInstance {
    open: StaticFn;
    destroy(key?: React.Key): void;
  }

export interface NotificationContext {
    instance: NotificationInstance;
}
