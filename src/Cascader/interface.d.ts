import { LabelInValueType, SelectProps } from "../Select/interface";

type Option = LabelInValueType;

export interface CascadingMenuItemProps {
    item: Option;
    onExpand: (item: Option) => void;
    handleCollectItems: (item: Option) => void;
    isSelected: boolean;
    expandTrigger: 'click' | 'hover';
    dropdownMenuColumnStyle?: React.CSSProperties;
    style?: React.CSSProperties;
}

export interface CascaderListProps {
    /**
     * @description  传入的菜单配置
     * @default "click"
     */
    options: Option[];
    /**
     * @description  触发方式
     * @default "click"
     */
    expandTrigger?: 'click' | 'hover';
    /**
     * @description  下拉菜单的样式
     * @default -
     */
    dropdownStyle?: React.CSSProperties;
    /**
     * @description  菜单每一列的最小宽度
     * @default 112
     */
    controlItemWidth?: number;
    dropdownMenuColumnStyle?: React.CSSProperties;
    toggleOpen: (open: boolean) => void;
    multiple: boolean;
}

export interface CascaderProps extends SelectProps {
    dropdownMenuColumnStyle?: React.CSSProperties;
    dropdownStyle?: React.CSSProperties;
    expandTrigger?: 'click' | 'hover';
    options: Option[];
    controlItemWidth?: number;
}