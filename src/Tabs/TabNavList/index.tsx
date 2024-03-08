import React, {useEffect, useLayoutEffect, useMemo, useRef, useState} from 'react';
import cn from 'classnames';
import useBatchUpdate from '../../_hooks/useBatchUpdate';
import useEvent from '../../_hooks/useEvent';
import ResizeObserver from '../../ResizeObserver';
import type {TabsProps} from '../interface';
import TabItem from './TabItem';
import FoldButton from './FoldButton';

interface GetIndicatorSize {
    width: number; height: number; x: number; y: number; isInView: boolean; offsetLeft: number;
}
const noop = {};
const noopMap = new Map();
const TabNavList = (props: TabsProps) => {
    const {
        items,
        tabBarGutter = 40,
        indicatorStyle = noop,
        indicator,
        onTabClick,
        onChange,
        activeKey,
        tabBarItemStyle,
        tabBarStyle,
        centered,
        renderNavItem,
        showIndicator = true,
        ...restProps
    } = props;

    const tabListRef = useRef<HTMLDivElement>(null);
    const [tabSize, setTabSize] =
    useState<Map<string, GetIndicatorSize>>(noopMap);
    const tabSizeRef = useRef(tabSize);
    const batchSetTabSize = useBatchUpdate(() => setTabSize(tabSizeRef.current));
    const activeTab = useMemo(
        () => items.findIndex(item => item.key === activeKey),
        [items, activeKey]
    );
    const scrollInView = useEvent((activeKey: string) => {
        const btnNode = tabListRef.current?.querySelector<HTMLElement>(
            `[data-node-key="${activeKey}"]`,
        );
        if (btnNode && btnNode.scrollIntoView) {
            const originalScrollY = window.scrollY || document.documentElement.scrollTop;

            btnNode.scrollIntoView({block: 'nearest'});
            window.scrollTo({top: originalScrollY});
        }
    });

    useLayoutEffect(
        () => {
            scrollInView(activeKey);
        },
        [activeKey]
    );

    const handleTabClick = useEvent((key: string, e: React.KeyboardEvent | React.MouseEvent) => {
        onTabClick?.(key, e);
    });

    const updateTabSizes = useEvent(() => {
        const tabSizeMap = new Map();
        const parentRect = tabListRef.current?.getBoundingClientRect();
        const {left: parentLeft, right: parentRight} = parentRect;
        items.forEach(item => {
            const btnNode = tabListRef.current?.querySelector<HTMLElement>(
                `[data-node-key="${item.key}"]`,
            );
            if (btnNode) {
                const {width, height, x, y, left, right} = btnNode.getBoundingClientRect();
                const offsetLeft = left - parentLeft;
                // 检查btnNode是否在可见范围内
                const isInView = right <= parentRight && left >= parentLeft;
                tabSizeMap.set(item.key, {width, height, x, y, offsetLeft, isInView});
            }
        });
        tabSizeRef.current = tabSizeMap;
        batchSetTabSize();
    });

    const sliderStyle = useMemo(
        () => {
            if (!tabListRef.current || showIndicator === false) {
                return {};
            }
            const sliderWidth = tabSize.get(activeKey)?.width;
            const offsetLeft = tabSize.get(activeKey)?.offsetLeft;
            let size = sliderWidth;
            if (typeof indicator?.size === 'function') {
                size = indicator.size(sliderWidth);
            } else if (indicator?.size !== undefined) {
                size = indicator.size;
            }
            return {
                width: size,
                left: `calc(${sliderWidth * 0.5}px + ${offsetLeft}px + ${tabListRef.current.scrollLeft}px)`,
                transform: 'translateX(-50%)',
                transition: 'width 0.3s ease, left 0.3s ease'
            };
        }
        ,
        [activeKey, activeTab, tabSize, indicator?.size, items.length, showIndicator]
    );
    const hiddenTabs = useMemo(
        () => {
            return items.filter(item => tabSize.get(item.key)?.isInView === false);
        }, 
        [tabSize, items]
    );
    return (
        <div
            className={cn('relative flex w-full', centered && 'justify-center',)}
            style={tabBarStyle}
            role="tablist"
        >
            <ResizeObserver onResize={updateTabSizes}>
                <div
                    className={cn(
                        'grid grid-flow-col auto-cols-max relative items-center w-max overflow-auto',
                        'loki-scrollbar-none'
                    )}
                    ref={tabListRef}
                    onScroll={updateTabSizes}
                    style={{
                        gap: tabBarGutter,
                    }}
                >
                    {
                        items.map(item => {
                            return (
                                <div key={item.key}>
                                    <TabItem
                                        item={item}
                                        active={activeKey === item.key}
                                        onClick={handleTabClick}
                                        style={tabBarItemStyle}
                                        onFocus={() => scrollInView(item.key)}
                                        renderNavItem={renderNavItem}
                                    />
                                </div>

                            );
                        })
                    }
                    {
                        showIndicator && (
                            <div
                                className="absolute h-[2px] bg-[--color-primary] bottom-0"
                                style={{
                                    ...sliderStyle,
                                    ...(indicatorStyle || {}),
                                }}
                            />
                        )
                    }
                </div>
            </ResizeObserver>
            {
                hiddenTabs.length > 0 && (
                    <FoldButton items={hiddenTabs} onSelect={onTabClick} />
                )
            }
        </div>
    );
};

export default TabNavList;
