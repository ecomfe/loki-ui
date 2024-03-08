import type {CSSTransitionProps} from 'react-transition-group/CSSTransition';
import type {InputRef} from '../Input/interface';
import type {PlacesType} from '../Tooltip/interface';

export type OnActiveValue = (active: RawValueType, index: number, info?: {source?: 'keyboard' | 'mouse'}) => void;

export type RenderNode = React.ReactNode | ((props: any) => React.ReactNode);

export type RenderDOMFunc = (props: any) => HTMLElement;

export type Mode = 'multiple' | 'tags' | 'combobox';

export type DisplayInfoType = 'add' | 'remove' | 'clear';

export type OnInternalSelect = (value: LabelInValueType, info: {selected?: boolean; clear?: 'all'}) => void;

export type RawValueType = string | number;
export interface LabelInValueType {
    label: React.ReactNode;
    value: RawValueType;
    disabled?: boolean;
    style?: React.CSSProperties;
    children?: LabelInValueType[];
    renderCustomOption?: (option: {
        label: React.ReactNode;
        value: RawValueType;
    }, isSelect: boolean) => React.ReactNode;
}

export type OnActiveValue = (active: RawValueType, index: number, info?: {source?: 'keyboard' | 'mouse'}) => void;

export type DraftValueType = LabelInValueType | LabelInValueType[] | null;

export interface FieldNames {
    value?: string;
    label?: string;
    groupLabel?: string;
    options?: string;
}

export interface BaseOptionType {
    disabled?: boolean;
    [name: string]: any;
}

export interface DefaultOptionType extends BaseOptionType {
    label: React.ReactNode;
    value?: string | number | null;
    children?: Omit<DefaultOptionType, 'children'>[];
}

export type SelectHandler = (value: RawValueType | RawValueType[]) => void;

export interface SelectProps<ValueType = any, OptionType extends BaseOptionType = LabelInValueType> {
    /**
     * @description 加给select的id
     * @default -
     */
    id?: string;
    /**
     * @description 是否可以搜索
     * @default false
     */
    showSearch?: boolean;
    /**
     * @description input的内容
     * @default []
     */
    searchValue?: string;
    /**
     * @description input的内容变化的回调
     * @default -
     */
    onSearch?: (value: string, fromTyping: boolean, isCompositing: boolean) => boolean;
    /**
     * @description 选中内容的回调
     * @default -
     */
    onSelect?: SelectHandler;
    /**
     * @description 取消选择的回调
     * @default -
     */
    onDeselect?: SelectHandler;
    /**
     * @description 数据化配置选项内容
     * @default []
     */
    options?: OptionType[];
    /**
     * @description 自定义渲染下拉选项
     * @param -
     */
    optionRender?: (oriOption: LabelInValueType, info: {index: number}, selected: boolean) => React.ReactNode;
    /**
     * @description 是否高亮第一个选项
     * @default false
     */
    defaultActiveFirstOption?: boolean;
    /**
     * @description 是否在选中项后清空搜索框，只在 mode 为 multiple 时有效
     * @default true
     */
    autoClearSearchValue?: boolean;
    /**
     * @description 设置弹窗滚动高度
     * @default 256
     */
    listHeight?: number;
    /**
     * @description 设置弹窗滚动高度
     * @default 256
     */
    menuItemSelectedIcon?: RenderNode;
    /**
     * @description 设置多选
     * @default -
     */
    mode?: 'multiple';
    value?: ValueType | null;
    /**
     * @description 默认选中初始值
     * @default - OptionItem {value: string, label: string}
     */
    defaultValue?: ValueType | null;
    /**
     * @description 是否默认打开下拉框
     * @default false
     */
    defaultOpen?: false;
    /**
     * @description 是否展开下拉菜单, 传递后变成受控组件
     * @default -
     */
    open?: boolean;
    /**
     * @description 展开下拉菜单的回调
     * @default false
     */
    onDropdownVisibleChange?: (isOpen: boolean) => void;
    /**
     * @description 当下拉列表为空时显示的内容
     * @default -
     */
    notFoundContent?: React.ReactNode;
    /**
     * @description 下拉列表的 className 属性
     * @default -
     */
    listWrapperClassName?: string;
    /**
     * @description 下拉菜单的 className 属性
     * @default -
     */
    popupClassName?: string;
    /**
     * @description 下拉的loading样式，配合远程搜索
     * @default -
     */
    loading?: boolean;
    /**
     * @description 按键按下时回调
     * @default -
     */
    onInputKeyDown?: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    /**
     * @description 选择框弹出的位置
     * @default "bottom"
     */
    placement?: PlacesType;
    /**
     * @description 选择框默认文本
     * @default -
     */
    placeholder?: string;
    /**
     * @description 响应式折叠，多选有效
     * @default -
     */
    maxTagCount?: 'responsive';
    /**
     * @description 下拉菜单和选择器同宽。默认将设置 min-width，当值小于选择框宽度时会被忽略
     * @default -
     */
    popupMatchSelectWidth?: number | boolean;
    /**
     * @description 下拉菜单的 style 属性
     * @default -
     */
    dropdownStyle?: React.CSSProperties;
    /**
     * @description 控制 motion 动画，参数为CSSTransition的props，详情见[react-transition-group](https://reactcommunity.org/react-transition-group/css-transition#CSSTransition-prop-onExited)
     * @default -
     */
    motion?: Partial<CSSTransitionProps>;
    /**
     * @description 自定义下拉菜单的 jsx
     * @default -
     */
    menuList?: React.ReactNode;
    /**
     * @description 展示或自定义清除按钮
     * @default -
     */
    allowClear?: boolean | {clearIcon?: ReactNode};
    /**
     * @description 对选中的值的format，比如想要加一些icon标识等等
     * @default -
     */
    formatChooseValue?: (value: LabelInValueType[]) => React.ReactNode;
    /**
     * @description 是否禁用
     * @default -
     */
    disabled?: boolean;
    /**
     * @description 选项发生改变的回调，参数为当前选中的项
     * @default -
     */
    onChange?: SelectHandler;
    /**
     * @description 尺寸，默认m
     * @default m
     */
    size?: 's' | 'm' | 'l';
    /**
     * @description 展开按钮
     * @default -
     */
    expandIcon?: React.ReactNode;
    /**
     * @description 下拉菜单的style样式
     * @default -
     */
    dropdownMenuColumnStyle?: React.CSSProperties;
    /**
     * @description 自定义Selector组件
     * @default -
     */
    customSelect?: React.FC<SelectorProps>;
    /**
     * @description 下拉菜单loading的占位样式
     * @default -
     */
    loadingPlaceholder?: React.ReactNode;
    type?: 'cascade',
}

export interface InnerSelectorProps {
    id: string;
    mode: Mode;
    title?: string;

    inputRef: React.Ref<InputRef>;
    placeholder?: React.ReactNode;
    disabled?: boolean;
    autoFocus?: boolean;
    autoComplete?: string;
    value: DisplayValueType[];
    showSearch?: boolean;
    searchValue: string;
    autoClearSearchValue?: boolean;
    activeDescendantId?: string;
    open: boolean;
    tabIndex?: number;
    maxTagCount?: number | 'responsive';
    allowClear?: boolean | {clearIcon?: ReactNode};

    onInputKeyDown: React.KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputMouseDown: React.MouseEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputChange: (value: string) => void;
    onInputCompositionStart: React.CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
    onInputCompositionEnd: React.CompositionEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

export interface SelectorProps extends Omit<InnerSelectorProps, 'onInputMouseDown'> {
    size: 'm' | 's' | 'l';
    onSearch?: SelectProps['onSearch'];
    clearIcon?: React.ReactNode;
    formatChooseValue?: (value: any) => React.ReactNode;
    status?: 'error' | 'success';
    expandIcon?: React.ReactNode;
}

export interface RefOptionListProps {
    onKeyDown: React.KeyboardEventHandler;
    onKeyUp: React.KeyboardEventHandler;
    scrollTo?: (args: number) => void;
}

export interface SelectorRefType {
    focus: () => void;
    blur: () => void;
    active: boolean;
    setActive: (value: boolean) => void;
}

export interface SelectRefType {
    value: LabelInValueType;
    searchValue?: string;
    containerRef: React.RefObject<HTMLElement>;
    selectorRef: React.RefObject<{focus: (e: MouseEvent) => void, blur: (e: MouseEvent) => void}>;
    open: boolean;
    setOpen: (isOpen: boolean) => void;
}