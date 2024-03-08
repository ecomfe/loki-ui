import React from 'react';
import cn from 'classnames';
import useMergeSignal from '../_hooks/useMergeSignal';
import useEvent from '../_hooks/useEvent';
import type {TabsProps} from './interface';
import TabNavList from './TabNavList';
import TabPanelList from './TabPanelList';

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
    const {
        className,
        style,
        activeKey: externalActiveKey,
        tabBarGutter,
        onTabClick,
        onChange,
        indicatorStyle,
        indicator,
        items,
        defaultActiveKey,
        destroyInactiveTabPane,
        tabBarItemStyle,
        centered,
        renderTabBar,
        renderNavItem,
        showIndicator,
        tabBarStyle,
        tabPanelClassName,
        tabPanelStyle,
        animated
    } = props;
    const [activeKey, setActiveKey] = useMergeSignal(externalActiveKey, defaultActiveKey || items[0].key,);
    const onInternalTabClick = useEvent((key: string, e: React.MouseEvent | React.KeyboardEvent) => {
        onTabClick?.(key, e);
        const isActiveChanged = key !== activeKey();
        setActiveKey(key);
        if (isActiveChanged) {
            onChange?.(key);
        }
    });
    const sharedProps = {
        activeKey: activeKey(),
        items
    };

    const tabNavBarProps = {
        items,
        tabBarGutter,
        indicatorStyle,
        indicator,
        onTabClick: onInternalTabClick,
        defaultActiveKey,
        tabBarItemStyle,
        centered,
        renderNavItem,
        showIndicator,
        tabBarStyle,
    };

    const renderTabNav = () => {
        const tabsProps = {...sharedProps, ...tabNavBarProps};
        if (typeof renderTabBar === 'function') {
            return renderTabBar(tabsProps, TabNavList);
        } else {
            return <TabNavList {...tabsProps} />;
        }
    };

    return (
        <div
            ref={ref}
            className={cn(className)}
            style={style}
        >
            {renderTabNav()}
            <TabPanelList
                destroyInactiveTabPane={destroyInactiveTabPane}
                {...sharedProps}
                tabPanelClassName={tabPanelClassName}
                tabPanelStyle={tabPanelStyle}
                animated={animated}
            />
        </div>
    );
});

if (process.env.NODE_ENV !== 'production') {
    Tabs.displayName = 'Tabs';
}

export default Tabs;
export {TabsProps};
