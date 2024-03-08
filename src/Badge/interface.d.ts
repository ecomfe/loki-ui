export interface BadgeProps {
    /**
     * @description 自定义小圆点的颜色
     * @default "red"
     */
    color?: string;
    /**
     * @description 展示的数字，大于 overflowCount 时显示为 `${overflowCount}+`，为 0 时隐藏
     * @default 99
     */
    count?: React.ReactNode;
    classNames?: {
        root?: string;
        indicator?: string;
    };
    styles?: {
        root?: React.CSSProperties;
        indicator?: React.CSSProperties;
    };
    /**
     * @description 展示封顶的数字值
     * @default 99
     */
    overflowCount?: number;
    /**
     * @description 只有数字 背景透明
     * @default false
     */
    ghost?: boolean;
    /**
     * @description 当数值为 0 时，是否展示 Badge
     * @default false
     */
    showZero?: boolean;
    /**
     * @description 设置鼠标放在状态点上时显示的文字
     * @default -
     */
    title?: string;
    /**
     * @description 设置状态点的位置偏移量
     * @default -
     */
    offset?: [number, number];
    children?: React.ReactNode;
    position?: 'relative' | 'absolute';
}
