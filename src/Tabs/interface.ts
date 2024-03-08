import type {CSSTransitionProps} from 'react-transition-group/CSSTransition';
export interface TabPaneProps {
    tab?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    disabled?: boolean;
    children?: React.ReactNode;
    closable?: boolean;
    closeIcon?: React.ReactNode;
    icon?: React.ReactNode;

    tabKey?: string;
    id?: string;
    animated?: boolean;
    active?: boolean;
    destroyInactiveTabPane?: boolean;
    centered?: boolean;
}

export interface Tab extends Omit<TabPaneProps, 'tab'> {
    /**
     * @description TabKey的值
     */
    key: string;
    /**
     * @description label展示的内容
     */
    label: React.ReactNode | ((props: Tab, active?: boolean) => React.ReactNode) | string;
    /**
     * @description 是否默认首次强制渲染
     * @default false
     */
    forceRender?: boolean;
}

export type GetIndicatorSize = number | ((origin: number) => number);

export interface TabsProps {
    /**
     * @description 外层包裹的 className
     * @default ''
     */
    className?: string;
    /**
     * @description Panel面板的 className
     * @default ''
     */
    tabPanelClassName?: string;
    /**
     * @description 外层包裹的 style
     * @default -
     */
    style?: React.CSSProperties;
    /**
     * @description tabs的参数
     * @default -
     */
    items: Tab[];
    /**
     * @description 当前active的TabKey
     * @default -
     */
    activeKey?: Tab['key'];
    /**
     * @description 默认的activeTabKey
     * @default tabs[0].key
     */
    defaultActiveKey?: string;
    /**
     * @description 是否销毁隐藏的tabPane
     * @default false
     */
    destroyInactiveTabPane?: boolean;
    /**
     * @description tab切换时触发的回调
     * @default -
     */
    onChange?: (activeKey: Tab['key']) => void;
    /**
     * @description tab点击时候触发
     * @default -
     */
    onTabClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
    /**
     * @description 指示器
     * @default -
     */
    indicator?: {
        size?: GetIndicatorSize;
        // align?: 'start' | 'center' | 'end';
    };
    /**
     * @description tab头的 className
     * @default ''
     */
    tabBarStyle?: React.CSSProperties;
    /**
     * @description tab每一项的 style
     * @default -
     */
    tabBarItemStyle?: React.CSSProperties;
    /**
     * @description tab面板的 style
     * @default -
     */
    tabPanelStyle?: React.CSSProperties;
    /**
     * @description 指示器的 style
     * @default -
     */
    indicatorStyle?: React.CSSProperties;
    /**
     * @description tabBar每一项之间的间隔
     * @default 40
     */
    tabBarGutter?: number;
    /**
     * @description tabBar是否居中
     * @default false
     */
    centered?: boolean;
    /**
     * @description 自定义渲染 tabBarItem
     * @default false
     */
    renderNavItem?: (tab: Tab, active: boolean) => React.ReactNode;
    /**
     * @description 自定义渲染 tabBar
     * @default false
     */
    renderTabBar?: RenderTabBar;
    /**
     * @description 是否显示指示器
     * @default true
     */
    showIndicator?: boolean;
    animated?: AnimatedConfig;
}

export type RenderTabBar = (
    props: TabsProps,
    DefaultTabBar: React.ComponentType<TabsProps>,
  ) => React.ReactElement;

export interface AnimatedConfig {
    inkBar?: boolean;
    tabPane?: boolean;
    tabPaneMotion?: Partial<CSSTransitionProps>;
}

export interface TabPanelListProps {
    activeKey: string;
    animated?: AnimatedConfig;
    items: Tab[];
    destroyInactiveTabPane?: boolean;
    tabPanelClassName?: string;
    tabPanelStyle?: React.CSSProperties;
}

export interface TabItemProps {
    item: Tab;
    active: boolean;
    onClick?: (activeKey: string, e: React.KeyboardEvent | React.MouseEvent) => void;
    onFocus: React.FocusEventHandler;
    style?: React.CSSProperties;
    renderNavItem?: (tab: Tab, active: boolean) => React.ReactNode;
}

export interface FoldButtonProps {
    onSelect: (key: string, e: React.KeyboardEvent | React.MouseEvent) => void;
    items: Tab[];
}
