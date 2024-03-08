import type {CSSTransitionProps} from 'react-transition-group/CSSTransition';
export interface MessageArgs {
    content: React.ReactNode;
    type?: NoticeType;
    duration?: number;
    onClose?: (id: React.Key) => void;
    className?: string;
    style?: React.CSSProperties;
    icon?: React.ReactNode;
    showClose?: boolean;
    onRemove?: (key: string) => void;
    id?: string;
    key?: string;
    placement?: Placement;
}
export type ConfigListType = Array<MessageArgs & {placement?: Placement, nodeRef?: React.RefObject<HTMLDivElement>}>;
export type Placement = 'top' | 'topLeft' | 'topRight' | 'bottom' | 'bottomLeft' | 'bottomRight';
export type Placements = Record<Placement, ConfigListType>;
export type CollapseConfig =
    | boolean
    | {
       /**
        * @description 超过minNum个通知时，是否折叠
        */
        minNum?: number;
        /**
         * @description 折叠时，通知之间的偏移量
         * @default 8
         */
        offset?: number;
        /**
         * @description 展开的通知，之间的距离
         */
        gap?: number;
    };

export interface NotifyListProps {
    placement?: Placement;
    collapse?: CollapseConfig;
    className?: string;
    style?: React.CSSProperties;
    getContainer?: () => HTMLElement;
    configList?: ConfigListType;
    bottom?: number;
    top?: number;
    left?: number;
    right?: number;
    motion?: CSSTransitionProps["classNames"]
}

export interface NotifyBaseRef {
    open: (args: MessageArgs) => void;
    close: (key: React.Key) => void;
    destroy: () => void;
}

export interface NotifyBaseProps extends NotifyListProps {
    maxCount?: number;
    getClassName?: (placement: Placement) => string;
    style?: (placement: Placement) => React.CSSProperties;
}
export type NoticeType = 'info' | 'success' | 'error' | 'warning' | 'loading';
export type NoticeMethodsType = {
    [K in NoticeType]: MessageFunction;
}
export interface NotifyAPI {
    open: (config: OptionalConfig) => void;
    close: (key: React.Key) => void;
    destroy: (key?: React.Key) => void;
}
