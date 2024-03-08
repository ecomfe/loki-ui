import {AigcSystemPullDown} from 'loki-icon';
import cn from 'classnames';
import React, {useRef, useState} from 'react';
import SelectContext from '../Select/SelectContext';
import useEvent from '../_hooks/useEvent';
import type {CascaderListProps, CascadingMenuItemProps,} from './interface';

const CascadingMenuItem = ({
    item,
    onExpand,
    handleCollectItems, isSelected, expandTrigger, style
}: CascadingMenuItemProps) => {
    const triggerExpand = () => {
        onExpand(item);
    };
    const [highlighted, setHighlighted] = useState(false);

    return (
        <div
            className={cn(
                'flex items-center rounded w-full',
                'justify-between pt-[--padding] pr-[--padding-lg] pb-[--padding] pl-[--padding]',
                'transition-colors duration-500',
                'text-[--color-text] text-justify text-[14px] leading-[22px] font-normal',
                item?.disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                'mb-[4px] last:mb-0',
                isSelected ? 'bg-[--color-primary-bg]' : highlighted ? 'bg-[--color-neutral-bg-hover]' : '',
            )}
            style={style}
            onMouseEnter={e => {
                setHighlighted(true);
                if (expandTrigger === 'hover') {
                    handleCollectItems(item);
                }
            }}
            onMouseLeave={() => setHighlighted(false)}
            onClick={triggerExpand}
        >
            {item.label}
            {item.children && item.children.length > 0 && (
                <span className="ml-2 rotate-[-90deg]">
                    <AigcSystemPullDown />
                </span>
            )}
        </div>
    );
};
type OptionType = CascaderListProps['options'][number];
const OptionList = ({
    options,
    expandTrigger = 'click',
    dropdownStyle = {},
    controlItemWidth = 112,
    dropdownMenuColumnStyle = {},
    toggleOpen,
    multiple,
}: CascaderListProps) => {
    const {
        // defaultActiveFirstOption,
        internalValue,
        onSelect,
    } = React.useContext(SelectContext);
    const isHoverTrigger = expandTrigger === 'hover';
    const [activePath, setActivePath] = useState<OptionType[]>(internalValue as any);
    const [selectedPath, setSelectedPath] = useState<OptionType[]>(internalValue as any);
    const depthRef = useRef(0);
    const handleExpand = useEvent((item: OptionType, depth: number) => {
        // 如果有子元素则展开子元素，选中上一个步骤的
        const newPath = activePath.slice(0, depth);
        if (!item.children || item.children.length === 0) {
            newPath[depth] = item;
            setSelectedPath(newPath);
            // 说明是叶子节点
            onSelect?.(
                {
                    label: newPath.map(i => i.label),
                    // @ts-ignore
                    value: newPath.map(i => i.value),
                },
                {selected: true},
            );
            // 收起面板
            if (!multiple) {
                toggleOpen?.(false);
            }
        } else if (!isHoverTrigger) {
            setSelectedPath([...newPath]);
            newPath[depth] = item;
            setActivePath(newPath);
        }
    });

    const handleCollectItems = (item: CascaderListProps['options'][number], depth: number) => {
        const newPath = activePath.slice(0, depth);
        newPath[depth] = item;
        setActivePath(newPath);
    };

    const isSelected = (item: CascaderListProps['options'][number]) => {
        // 如果是叶子节点判断当前是否是选中，否则判断是否在activePath里面
        if (!item.children || item.children.length === 0) {
            return selectedPath.includes(item);
        }
        return activePath.includes(item);
    };

    const renderMenu = (options: CascaderListProps['options'], depth: number) => {
        if (depthRef.current < depth) {
            depthRef.current = depth;
        }
        return (
            <div
                className={cn(
                    'menu-column flex-shrink-0 pr-[--padding] pl-[--padding] w-max loki-scrollbar-none overflow-y-auto',
                    'border-r border-[--stroke-border] last:border-r-0 flex-grow',
                )}
                style={{
                    minWidth: controlItemWidth,
                }}
            >
                {options.map(option => (
                    <CascadingMenuItem
                        key={option.value}
                        item={option}
                        onExpand={item => handleExpand(item, depth)}
                        handleCollectItems={item => handleCollectItems(item, depth)}
                        isSelected={isSelected(option)}
                        expandTrigger={expandTrigger}
                        style={dropdownMenuColumnStyle}
                    />
                ))}
            </div>
        );
    };
    return (
        <>
            <div className="flex pt-[--padding] pb-[--padding]" style={dropdownStyle}>
                {renderMenu(options, 0)}
                {activePath.map((item, index) => !!item?.children?.length && renderMenu(item.children, index + 1))}
            </div>
        </>
    );
};

export default OptionList;
