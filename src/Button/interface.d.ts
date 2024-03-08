type SizeType = 'xs' | 's' | 'm' | 'l' | 'xl';
export interface BaseButtonProps {
    /**
     * @description 按钮类型
     * @default "primary"
     */
    type?: 'primary' | 'outline' | 'default' | 'text' | 'link';
    /**
     * @description 按钮的图标
     * @default undefined
     */
    icon?: React.ReactNode;
    /**
     * @description 尺寸
     * @default m
     */
    size?: SizeType;
    /**
     * @description 是否禁用
     * @default false
     */
    disabled?: boolean;
    /**
     * @description 是否是加载中
     * @default false
     */
    loading?: boolean | { delay?: number };
    /**
     * @description 生成的css前缀
     * @default loki
     */
    prefixCls?: string;
    /**
     * @description class属性
     * @default ""
     */
    className?: string;
    /**
     * @description 透明背景
     * @default false
     */
    ghost?: boolean;
    /**
     * @description 使用父亲的宽度
     * @default false
     */
    block?: boolean;
    /**
     * @description React children
     * @default null
     */
    children?: React.ReactNode;
    /**
     * @description Icon的样式
     * @default {}
     */
    iconStyle?: React.CSSProperties;
    /**
     * @description 按钮的宽度
     * @default {}
     */
    width?: React.CSSProperties['width'];
}
