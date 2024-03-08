import React, {createRef, useLayoutEffect, useRef, useState} from 'react';
import {CSSTransition} from 'react-transition-group';
import cn from 'classnames';
import type {TabPanelListProps} from '../interface';
import TabPanel from './TabPanel';
const noop = {};
const TabsMotions = {
    enter: 'hidden',
    enterActive: '!block',
    exitActive: 'hidden',
    exitDone: 'hidden',
};

const TabContent = props => {
    const {
        id: key,
        forceRender,
        style,
        className,
        unmountOnExit,
        show,
        animated,
        nodeRef,
        ...restTabProps
    } = props;
    const [rendered, setRendered] = useState(forceRender || false);

    useLayoutEffect(
        () => {
            if (show) {
                setRendered(true); // 当组件首次渲染时设置为 true
            }
        },
        [show]
    );

    return (
        <>
            {rendered && ( // 只有在组件至少渲染过一次之后才会包含 CSSTransition
                <CSSTransition
                    key={key}
                    timeout={0}
                    in={show}
                    classNames={TabsMotions}
                    unmountOnExit={unmountOnExit}
                    {...(animated?.tabPaneMotion || noop)}
                    nodeRef={nodeRef}
                >
                    <TabPanel
                        {...restTabProps}
                        tabKey={key}
                        animated={animated}
                        active={show}
                        style={style}
                        className={cn(show ? 'block' : 'hidden', className)}
                        ref={nodeRef}
                    />
                </CSSTransition>
            )}
        </>
    );
};

const TabPanelList: React.FC<TabPanelListProps> = props => {
    const {
        activeKey, items, destroyInactiveTabPane, animated, tabPanelClassName,
        tabPanelStyle
    } = props;
    const tabPaneAnimated = animated?.tabPane || false;
    const refList = useRef<Record<string, React.RefObject<HTMLDivElement>>>({});
    return (
        <div className={cn(tabPanelClassName)} style={tabPanelStyle}>
            {items.map(item => {
                const {
                    key,
                    forceRender,
                    style,
                    className,
                    destroyInactiveTabPane: itemDestroyInactiveTabPane,
                    ...restTabProps
                } = item;
                const active = key === activeKey;
                if (!refList.current?.[key]) {
                    refList.current[key] = createRef();
                }

                return (
                    <TabContent
                        id={key}
                        key={key}
                        forceRender={forceRender}
                        style={style}
                        className={className}
                        show={active}
                        animated={tabPaneAnimated}
                        nodeRef={refList.current[key]}
                        unmountOnExit={!!(itemDestroyInactiveTabPane || destroyInactiveTabPane)}
                        {...restTabProps}
                    />
                );
            })}
        </div>
    );
};

if (process.env.NODE_ENV !== 'production') {
    TabPanelList.displayName = 'TabPanelList';
}

export default TabPanelList;
