/* eslint-disable complexity */
import {AigcSystemDone} from 'loki-icon';
import cn from 'classnames';
import React, {useEffect} from 'react';
import useEvent from '../_hooks/useEvent';
import {isPlatformMac, KeyCode} from '../_utils/keyboard';
import type {LabelInValueType, RawValueType, RefOptionListProps} from './interface';
import SelectContext from './SelectContext';
export type OptionListProps = Record<string, never>;

interface SelectOptionsProps {
    id: string; // 通常是一个字符串
    open: boolean; // 表示下拉菜单是否展开，布尔值
    multiple: boolean; // 表示是否可以多选，布尔值
    searchValue: string; // 搜索输入的值，字符串
    toggleOpen: (open: boolean) => void; // 切换下拉菜单展开/关闭的函数
    notFoundContent: React.ReactNode; // 搜索结果为空时显示的内容，React节点
    optionClassName?: string;
    listHeight?: number;
    dropdownStyle?: React.CSSProperties;
}

const OptionList: React.ForwardRefRenderFunction<RefOptionListProps, SelectOptionsProps> = (props, ref) => {
    const {
        id,
        open,
        multiple,
        searchValue,
        toggleOpen,
        notFoundContent,
        optionClassName,
        listHeight = 256,
        dropdownStyle = {},
    } = props;
    const {
        options,
        // onActiveValue,
        defaultActiveFirstOption,
        onSelect,
        menuItemSelectedIcon,
        rawValues,
        optionRender,
    } = React.useContext(SelectContext);

    const listRef = React.useRef<HTMLDivElement>(null);

    const onListMouseDown: React.MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
    };

    const scrollIntoView = (index: number) => {
        if (listRef.current) {
            const items = listRef.current.children;
            const targetItem = items[index] as HTMLElement;
            if (targetItem) {
                const topPosition = targetItem.offsetTop;
                listRef.current.scrollTo({
                    top: topPosition,
                    behavior: 'smooth',
                });
            }
        }
    };

    const getEnabledActiveIndex = (index: number, offset: number = 1): number => {
        const len = options.length;

        for (let i = 0; i < len; i += 1) {
            const current = (index + i * offset + len) % len;

            const {disabled} = options[current];
            if (!disabled) {
                return current;
            }
        }

        return -1;
    };

    const [activeIndex, setActiveIndex] = React.useState(() => getEnabledActiveIndex(0));
    const setActive = (index: number, fromKeyboard = false) => {
        setActiveIndex(index);
    };

    // Auto active first item when list length or searchValue changed
    useEffect(
        () => {
            setActive(defaultActiveFirstOption !== false ? getEnabledActiveIndex(0) : -1);
        }, 
        [options.length, searchValue]
    );

    const handleChangeEffect = useEvent(() => {
        // setActive the active element
        const timeoutId = setTimeout(() => {
            if (!multiple && open && rawValues.size === 1) {
                const val: RawValueType = Array.from(rawValues)[0];
                const index = options.findIndex(data => data?.value === val);
                if (index !== -1) {
                    setActive(index);
                    scrollIntoView(index);
                }
            }
        });
        return timeoutId;
    });
    // Auto scroll to item position in single mode
    useEffect(
        () => {
            const timeoutId = handleChangeEffect();

            // Force trigger scrollbar visible when open
            if (open) {
                listRef.current?.scrollTo(undefined);
            }

            return () => clearTimeout(timeoutId);
        }, 
        [open, searchValue]
    );

    // click menu callback
    const onSelectValue = (value: LabelInValueType) => {
        if (value !== undefined) {
            if (multiple) {
                onSelect(value, {selected: !rawValues.has(value.value)});
            } else {
                onSelect(value, {selected: true});
            }
        }

        if (!multiple) {
            toggleOpen(false);
        }
    };

    // keyboard events
    React.useImperativeHandle(ref, () => ({
        onKeyDown: event => {
            const {which, ctrlKey} = event;
            switch (which) {
                // Arrow keys & ctrl + n/p on Mac
                case KeyCode.N:
                case KeyCode.P:
                case KeyCode.UP:
                case KeyCode.DOWN: {
                    event?.preventDefault?.();
                    let offset = 0;
                    if (which === KeyCode.UP) {
                        offset = -1;
                    } else if (which === KeyCode.DOWN) {
                        offset = 1;
                    } else if (isPlatformMac() && ctrlKey) {
                        if (which === KeyCode.N) {
                            offset = 1;
                        } else if (which === KeyCode.P) {
                            offset = -1;
                        }
                    }

                    if (offset !== 0) {
                        const nextActiveIndex = getEnabledActiveIndex(activeIndex + offset, offset);
                        scrollIntoView(nextActiveIndex);
                        setActive(nextActiveIndex, true);
                    }

                    break;
                }

                // Select
                case KeyCode.ENTER: {
                    // value
                    const item = options[activeIndex];
                    if (item && !item.disabled) {
                        onSelectValue(item);
                    } else {
                        onSelectValue(undefined);
                    }

                    if (open) {
                        event.preventDefault();
                    }

                    break;
                }

                // Close
                case KeyCode.ESC: {
                    toggleOpen(false);
                    if (open) {
                        event.stopPropagation();
                    }
                }
            }
        },
        onKeyUp: () => {},

        scrollTo: index => {
            scrollIntoView(index);
        },
        target: listRef.current,
    }));

    // no content
    if (options.length === 0) {
        return (
            <div
                role="listbox"
                id={`${id}_list`}
                // todo: empty style
                className={''}
                onMouseDown={onListMouseDown}
            >
                {notFoundContent}
            </div>
        );
    }

    return (
        <div
            ref={listRef}
            style={{
                maxHeight: listHeight,
                // @ts-ignore
                'overflow-y': 'auto',
                ...dropdownStyle,
            }}
            className={cn(
                'flex w-full items-center flex-col loki-scrollbar-none',
                'pt-[--padding-xs] pr-[--padding-xs] pb-[--padding-xs] pl-[--padding-xs]',
            )}
        >
            {options.map((item, itemIndex) => {
                const selected = rawValues.has(item.value);
                const {disabled, style = {}} = item;
                const iconVisible = !menuItemSelectedIcon || typeof menuItemSelectedIcon === 'function' || selected;
                return (
                    <div
                        // eslint-disable-next-line react/no-array-index-key
                        key={itemIndex}
                        className={cn(
                            // eslint-disable-next-line max-len
                            'flex w-full justify-between pt-[--padding] pr-[--padding-lg] pb-[--padding] pl-[--padding] items-center rounded',
                            'transition-colors duration-500',
                            'text-[--color-text] text-justify text-[14px] leading-[22px] font-normal',
                            'mb-[4px] last:mb-0',
                            disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                            selected
                                ? 'bg-[--color-primary-bg]'
                                : activeIndex === itemIndex
                                    ? 'bg-[--color-neutral-bg-hover]'
                                    : '',
                            optionClassName,
                        )}
                        onMouseMove={() => {
                            if (activeIndex === itemIndex || disabled) {
                                return;
                            }
                            setActive(itemIndex);
                        }}
                        onClick={() => {
                            if (!disabled) {
                                onSelectValue(item);
                            }
                        }}
                        style={style}
                    >
                        {
                            typeof item?.renderCustomOption === 'function' ? item.renderCustomOption(item, selected) : (
                                <>
                                    {typeof optionRender === 'function' ? (
                                        optionRender(item, {index: itemIndex}, selected)
                                    ) : (
                                        <div className="">{item.label || item.value}</div>
                                    )}
                                    {React.isValidElement(menuItemSelectedIcon) || selected}
                                    {iconVisible
                                    && (selected ? (
                                        <span className="text-[--color-primary-white] text-[16px] leading-[24px]">
                                            <AigcSystemDone />
                                        </span>
                                    ) : null)}
                                </>
                            )
                        }
                    </div>
                );
            })}
        </div>
    );
};

const RefOptionList = React.forwardRef(OptionList);
RefOptionList.displayName = 'OptionList';

export default RefOptionList;
