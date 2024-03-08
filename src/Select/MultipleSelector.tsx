/* eslint-disable complexity */
import cn from 'classnames';
import React, {useContext, useLayoutEffect, useRef, useState} from 'react';
import Input from '../Input';
import ResizeObserverComponent from '../ResizeObserver';
import Tag from '../Tag';
import useEvent from '../_hooks/useEvent';
import SelectContext, {SelectContextProps} from './SelectContext';
import useHoverIcon from './hooks/useHoverIcon';
import useMeasureWidth from './hooks/useMeasureWidth';
import type {LabelInValueType, SelectorProps} from './interface';

const MultipleSelector = ({
    showSearch = false,
    open,
    placeholder,
    inputRef,
    size,
    maxTagCount,
    searchValue,
    onInputChange,
    clearIcon,
    expandIcon
}: SelectorProps) => {
    const {rawValues, internalValue, onSelect} = useContext<SelectContextProps<'multiple'>>(SelectContext);
    const [visibleTags, setVisibleTags] = useState(internalValue);
    const [hiddenCount, setHiddenCount] = useState(0);
    const isResponsive = maxTagCount === 'responsive';
    const containerRef = useRef<HTMLDivElement>(null);
    const tagWrapperRef = useRef<HTMLDivElement>(null);
    const [measureDom, inputWidth] = useMeasureWidth(searchValue);
    const handleSearchChange = (value: string) => {
        onInputChange?.(value);
    };

    const showInput = showSearch && open;

    const handleToggle = (item: LabelInValueType) => {
        onSelect(item, {selected: !rawValues.has(item.value)});
    };

    const tagSize = size !== 's' ? 'm' : 's';
    // 隐藏的tag
    const countTagRef = useRef<HTMLSpanElement>(null);
    const getCountTagWidth = (num: number) => {
        if (num !== 0) {
            const countTag = countTagRef.current;
            if (countTag) {
                countTag.innerText = `+${num}...`;
                return countTag.offsetWidth;
            }
            return 0;
        }
        return 0;
    };
    // 更新标签可见性的逻辑
    const updateTagsVisibility = useEvent(() => {
        const tagWidth = getCountTagWidth(internalValue.length);
        if (!containerRef.current || !tagWrapperRef.current) {
            return;
        }
        const totalTagWidth = tagWrapperRef.current?.offsetWidth;
        if (totalTagWidth <= containerRef.current?.offsetWidth) {
            setVisibleTags(internalValue.slice(0, internalValue.length));
            setHiddenCount(internalValue.length - internalValue.length);
            return;
        }
        const containerWidth = containerRef.current?.offsetWidth - tagWidth;
        let totalWidth = 0;
        let visibleCount = 0;

        for (let i = 0; i < internalValue.length; i++) {
            const tagWidth = (tagWrapperRef.current?.children[i] as HTMLSpanElement)?.offsetWidth || 0;
            if (totalWidth + tagWidth <= containerWidth) {
                totalWidth += tagWidth;
                visibleCount++;
            } else {
                break;
            }
        }
        setVisibleTags(internalValue.slice(0, visibleCount));
        setHiddenCount(internalValue.length - visibleCount);
    });

    // 当容器尺寸变化时的回调
    const handleContainerResize = () => {
        updateTagsVisibility();
    };

    useLayoutEffect(
        () => {
            if (!isResponsive) {
                return;
            }
            updateTagsVisibility();
        }, 
        [internalValue]
    );
    const domRef = useRef<HTMLDivElement>(null);
    const suffixIcon = useHoverIcon(domRef, internalValue?.length ? clearIcon : false, open, expandIcon);
    const chooseValue = isResponsive ? visibleTags : internalValue;
    return (
        <ResizeObserverComponent onResize={handleContainerResize}>
            <div className="relative w-full flex justify-between" ref={domRef}>
                <div className={cn('flex w-[0px] items-center flex-1 flex-wrap relative')} ref={containerRef}>
                    <div
                        className={cn(
                            'text-[--color-text] gap-y-1 text-[14px] leading-[22px] not-italic font-normal',
                            'flex flex-shrink-0 w-full items-center pl-[--padding]',
                            {'flex-wrap': !isResponsive},
                        )}
                    >
                        {chooseValue || open ? (
                            (isResponsive ? visibleTags : internalValue)?.map(i => (
                                <span className="pr-1 inline-flex" key={i.value}>
                                    <Tag size={tagSize} onClose={() => handleToggle(i)}>
                                        {i.label || i.value}
                                    </Tag>
                                </span>
                            ))
                        ) : (
                            <span className="text-[--color-text-quaternary]">{placeholder || 'Please Search ...'}</span>
                        )}
                        <div className="opacity-0 pointer-events-none absolute flex" ref={tagWrapperRef}>
                            {internalValue?.map(i => (
                                <span className="pr-1 inline-flex" key={i.value}>
                                    <Tag size={tagSize} onClose={() => handleToggle(i)}>
                                        {i.label || i.value}
                                    </Tag>
                                </span>
                            ))}
                        </div>
                        {/* 隐藏占位提前计算 */}
                        <Tag
                            ref={countTagRef}
                            size={tagSize}
                            className="opacity-0 absolute pointer-events-none -z-0"
                            onClose={() => {}}
                        />
                        {hiddenCount > 0 && isResponsive && (
                            <span className="pr-1 inline-flex">
                                <Tag className="pr-1" size={tagSize} closeIcon={null}>
                                    +{hiddenCount}...
                                </Tag>
                            </span>
                        )}
                        <Input
                            styles={{
                                wrapper: {
                                    padding: 0,
                                    height: 'auto',
                                    width: inputWidth,
                                },
                                input: {
                                    width: inputWidth,
                                },
                            }}
                            classNames={{
                                wrapper: showInput ? 'w-auto h-[22px]' : 'hidden',
                            }}
                            ref={inputRef}
                            type="text"
                            value={searchValue}
                            onChange={handleSearchChange}
                            bordered={false}
                        />
                        {measureDom}
                    </div>
                </div>
                {suffixIcon}
            </div>
        </ResizeObserverComponent>
    );
};

export default MultipleSelector;
