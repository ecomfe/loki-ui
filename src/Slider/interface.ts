export type SemanticName = 'track' | 'handle';

export type SliderClassNames = Partial<Record<SemanticName, string>>;

export type SliderStyles = Partial<Record<SemanticName, React.CSSProperties>>;

export type OnStartMove = (
    e: React.MouseEvent | React.TouchEvent,
    startValue?: number
) => void;

interface RenderProps {
    value: number;
    dragging: boolean;
}

export interface TrackProps {
    style?: React.CSSProperties;
    start: number;
    end: number;
    onStartMove?: OnStartMove;
    children: React.ReactNode;
}

export interface HandleProps {
    style?: React.CSSProperties;
    value: number;
    dragging: boolean;
    onStartMove: OnStartMove;
    onOffsetChange: (value: number | 'min' | 'max') => void;
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;
    render?: (origin: React.ReactElement<HandleProps>, props: RenderProps) => React.ReactElement;
    onChangeComplete?: () => void;
}


export interface SliderProps<ValueType = number | number[]> {
    // Status
    /**
     * @desc 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * @desc 是否支持键盘操作
     * @default true
     */
    keyboard?: boolean;
    /**
     * @desc 是否自动获取焦点
     * @default false
     */
    autoFocus?: boolean;
    /**
     * @desc 获取焦点的回调
     * @default -
     */
    onFocus?: (e: React.FocusEvent<HTMLDivElement>) => void;
    /**
     * @desc 失去焦点的回调
     * @default -
     */
    onBlur?: (e: React.FocusEvent<HTMLDivElement>) => void;

    // Value
    // range?: boolean;
    // count?: number;
    /**
     * @desc 最小值
     * @default 0
     */
    min?: number;
    /**
     * @desc 最大值
     * @default 100
     */
    max?: number;
    /**
     * @desc 步长
     * @default 1
     */
    step?: number | null;
    /**
     * @desc 当前值，传递后为受控模式
     * @default -
     */
    value?: number;
    /**
     * @desc 默认初始值
     * @default 0
     */
    defaultValue?: number;
    /**
     * @desc 当前值变化时的回调
     * @default -
     */
    onChange?: (value: ValueType) => void;
    /**
     * @desc 当前值变化结束的回调
     * @default -
     */
    onChangeComplete?: (value: ValueType) => void;

    // Style
    included?: boolean;
    startPoint?: number;

    /**
     * @desc 自定义类名
     */
    className?: string;
    /**
     * @desc 样式
     */
    style?: React.CSSProperties;
    /**
     * @desc 细粒度的类名，包含track(颜色进度条)和handle(拖动手柄)
     */
    classNames?: SliderClassNames;
    /**
     * @desc 细粒度的样式，包含track(颜色进度条)和handle(拖动手柄)
     */
    styles?: SliderStyles;

    /**
     * @desc 自定义handle
     */
    handleRender?: HandleProps['render'];

    // Accessibility
    // tabIndex?: number | number[];
}

export interface SliderRef {
    focus: () => void;
    blur: () => void;
}
