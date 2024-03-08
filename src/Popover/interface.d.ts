import type { BaseButtonProps } from '../Button/interface';
import type { ITooltip } from '../Tooltip/interface';
export interface IPopover extends ITooltip {
    /**
     * @description 取消按钮的文案
     * @default "取消"
     */
    cancelText?: string;
    /**
     * @description 确认按钮的文案
     * @default "确认"
     */
    okText?: string;
    /**
     * @description Popover面板的内容区域
     * @default null
     */
    content?: React.ReactNode | (() => React.ReactNode);
    /**
     * @description Popover的标题
     * @default null
     */
    title?: string;
    /**
     * @description Popover的操作栏，支持插槽
     * @default true
     */
    footer?: React.ReactElement | false | null;
    /**
     * @description 操作栏按钮的尺寸
     * @default "s"
     */
    btnSize?: BaseButtonProps['size'];
    /**
     * @description 整体的class
     * @default ""
     */
    className?: string;
    /**
     * @description 面板的class
     * @default ""
     */
    classNameContent?: string;
    /**
     * @description 确认的回调
     * @default () => {}
     */
    onOk?: () => void;
    /**
     * @description 取消的回调
     * @default () => {}
     */
    onCancel?: () => void;
    contentStyle?: React.CSSProperties;
}
