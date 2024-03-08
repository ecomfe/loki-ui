import type {CSSTransitionProps} from 'react-transition-group/CSSTransition';
export type PlacesType =
    | 'top'
    | 'top-start'
    | 'top-end'
    | 'right'
    | 'right-start'
    | 'right-end'
    | 'bottom'
    | 'bottom-start'
    | 'bottom-end'
    | 'left'
    | 'left-start'
    | 'left-end';
export type PrefixPlaceType = Exclude<PlacesType, `${string}-${string}`>;
export interface IPosition {
    x: number;
    y: number;
}
export type WrapperType = React.ElementType | 'div' | 'span';
export type PositionStrategy = 'absolute' | 'fixed';
export interface ITooltip {
    /**
     * @description className
     * @default ""
     */
    className?: string;
    /**
     * @description 箭头的class
     * @default ""
     */
    classNameArrow?: string;
    /**
     * @description 面板的内容
     * @default null
     */
    content?: React.ReactNode;
    /**
     * @description 驱动tooltip位置更新的wrap
     * @default undefined
     */
    contentWrapperRef?: React.RefObject<HTMLDivElement>;
    /**
     * @description 放置的位置
     * @default top
     */
    placement?: PlacesType;
    /**
     * @description 偏移量[y轴, x轴]
     * @default [10, 0]
     */
    offset?: [number, number];
    /**
     * @description ToolTip的id
     * @default ""
     */
    id?: string;
    /**
     * @description ToolTip被render展示的dom类型
     * @default "div"
     */
    wrapper?: WrapperType;
    /**
     * @description 触发器
     * @default "hover"
     */
    trigger?: 'hover' | 'click';
    /**
     * @description 气泡放置的样式策略，可选absolute/fixed
     * @default "absolute"
     */
    positionStrategy?: PositionStrategy;
    /**
     * @description 延迟展示
     * @default 0
     */
    delayShow?: number;
    /**
     * @description 延迟隐藏
     * @default 0
     */
    delayHide?: number;
    /**
     * @description 是否没有箭头
     * @default false
     */
    noArrow?: boolean;
    /**
     * @description 透传的样式
     * @default false
     */
    style?: React.CSSProperties;
    /**
     * @description 定位锚点，传递后气泡将会以position为定位锚点展示
     * @default undefined
     */
    position?: IPosition;
    /**
     * @description 气泡打开或者关闭，传递后将会变成受控组件
     * @default false
     */
    open?: boolean;
    /**
     * @description 气泡显示隐藏发生的回掉
     * @default undefined
     */
    onOpenChange?: (open: boolean) => void;
    /**
     * @description 气泡是否在关闭时卸载
     * @default false
     */
    destroyTooltipOnHide?: boolean;
    /**
     * @description 箭头的高度
     * @default 5
     */
    border?: number;
    /**
     * @description 气泡的不透明度
     * @default 1
     */
    opacity?: React.CSSProperties['opacity'];
    /**
     * @description container，具体参考Portal组件，没有指定就是document.body
     * @default null
     */
    getPopupContainer?: () => HTMLElement;
    /**
     * @description 定位的元素
     * @default null
     */
    children?: React.ReactNode;
    /**
     * @description 是否应用翻转策略
     * @default true
     */
    autoAdjustOverflow?: boolean;
    /**
     * @description 默认是否开启
     * @default false
     */
    defaultOpen?: boolean;
    /**
     * @description 箭头的偏移量
     * @default 0
     */
    arrowOffset?: number;
    /**
     * @description 是否启用自定义箭头，如果启用你需要传递border属性
     * @default false
     */
    arrowSlot?: boolean | React.ReactElement;
    /**
     * @description 控制 motion 动画，参数为CSSTransition的props，详情见[react-transition-group](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExited)
     * @default -
     */
    motion?: Partial<CSSTransitionProps>;
    color?: string;
    title?: React.ReactNode;
    wrapWidth?: number;
}

export interface IPopup {
    id?: string;
    positionStrategy?: 'absolute' | 'fixed';
    className?: string;
    canShow: boolean;
    getPopupContainer?: () => HTMLElement;
    handleTransitionEnd: (e: HTMLElement) => void;
    classNameArrow?: string;
    wrapper?: WrapperType;
    externalStyles: React.CSSProperties;
    inlineStyles: React.CSSProperties;
    inlineArrowStyles: React.CSSProperties;
    // tooltipRef: React.RefObject<HTMLDivElement>
    tooltipArrowRef: React.RefObject<HTMLElement>;
    children: React.ReactNode;
    noArrow?: boolean;
    placement: PrefixPlaceType;
    opacity?: React.CSSProperties['opacity'];
    arrowSlot?: boolean | React.ReactElement;
    motion?: ITooltip['motion'];
    wrapWidth?: number;
    unmountOnExit?: boolean;
}

export interface ITooltipRef {
    close: () => void;
    open: () => void;
    tooltipRef: React.MutableRefObject<HTMLElement>;
}