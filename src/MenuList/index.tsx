/* eslint-disable complexity */
import {AigcSystemDone} from 'loki-icon';
import cn from 'classnames';
import React from 'react';
import type {LabelInValueType} from './interface';
export type OptionListProps = Record<string, never>;

export interface MenuListProps {
    notFoundContent?: React.ReactNode;
    optionClassName?: string;
    listHeight?: number;
    dropdownStyle?: React.CSSProperties;
    menuItemSelectedIcon?: React.ReactNode;
    menu?: LabelInValueType[];
    optionRender?: (option: LabelInValueType, info: { index: number }, isSelect: boolean) => React.ReactNode;
    onSelect?: (value: LabelInValueType, itemIndex: number, e: React.MouseEvent | React.KeyboardEvent) => void;
}

const MenuList: React.ForwardRefRenderFunction<any, MenuListProps> = (props, ref) => {
    const {
        notFoundContent = null,
        optionClassName,
        listHeight = 256,
        dropdownStyle = {},
        menu = [],
        menuItemSelectedIcon,
        optionRender,
        onSelect,
    } = props;
    const options = React.useMemo(() => {
        const processItems = items => {
            return items.map(item => {
                if (item.key !== undefined && item.value === undefined) {
                    item.value = item.key;
                }

                // 如果 item 有 children，递归处理 children
                if (item.children) {
                    item.children = processItems(item.children);
                }

                return item;
            });
        };

        return processItems(menu);
    }, [menu]);

    const listRef = React.useRef<HTMLDivElement>(null);

    const onListMouseDown: React.MouseEventHandler<HTMLDivElement> = event => {
        event.preventDefault();
    };

    const [activeIndex, setActiveIndex] = React.useState(null);
    const setActive = (index: number) => {
        setActiveIndex(index);
    };

    // no content
    if (options.length === 0) {
        return (
            <div
                role="listbox"
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
                const {disabled, style = {}} = item;
                const selected = item.selectable && item?.selected;
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
                        onMouseLeave={() => {
                            if (activeIndex === itemIndex) {
                                setActive(null);
                            }
                        }}
                        onClick={(e: React.MouseEvent) => {
                            if (!disabled) {
                                onSelect(item, itemIndex, e);
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

const RefMenuList = React.forwardRef(MenuList);
RefMenuList.displayName = 'MenuList';

export default RefMenuList;
