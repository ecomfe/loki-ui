import cn from 'classnames';
import React, {useEffect, useImperativeHandle, useMemo, useRef, useState} from 'react';
import Tooltip from '../Tooltip';
import useEvent from '../_hooks/useEvent';
import OptionList from './OptionList';
import SelectContext from './SelectContext';
import Selector from './Selector';
import type {
    SelectRefType, LabelInValueType, RefOptionListProps,
    SelectProps, SelectorRefType, RawValueType
} from './interface';
import {selectMotion} from './utils/animate';
import {findOptionByValue} from './utils/format';
const defaultValueArr = [];
const noopStyle = {};
const Select = React.forwardRef<SelectRefType, SelectProps>(
    (
        {
            options,
            onSearch,
            onSelect,
            onDeselect,
            defaultValue,
            defaultOpen,
            notFoundContent,
            loading,
            value,
            open,
            onDropdownVisibleChange,
            searchValue,
            defaultActiveFirstOption,
            menuItemSelectedIcon,
            optionRender,
            // onInputKeyDown,
            autoClearSearchValue,
            mode,
            popupClassName,
            id,
            placeholder,
            placement = 'bottom',
            showSearch,
            listHeight = 256,
            listWrapperClassName,
            menuList,
            dropdownStyle = noopStyle,
            dropdownMenuColumnStyle = noopStyle,
            motion,
            popupMatchSelectWidth = true,
            disabled,
            onChange,
            loadingPlaceholder,
            type,
            ...props
        },
        ref,
    ) => {
        const defaultValueRef = useRef((Array.isArray(defaultValue ?? defaultValueArr)
            ? defaultValue : [defaultValue]) ?? defaultValueArr);
        const isMultiple = mode === 'multiple';
        const [internalValue, setInternalValue] = useState<RawValueType | RawValueType[]>(defaultValueRef.current);
        const [internalSearchValue, setInternalSearchValue] = useState(searchValue || '');
        const [innerOpen, setInnerOpen] = useState<boolean>(defaultOpen || false);
        const containerRef = React.useRef<HTMLElement>(null);
        const selectorRef = React.useRef<SelectorRefType>(null);
        const optionListRef = useRef<RefOptionListProps>(null);
        const isControlOpen = open !== undefined;
        const minWidth = typeof popupMatchSelectWidth === 'number' ? popupMatchSelectWidth : 0;
        const computeWidth = popupMatchSelectWidth === true ? '100%' : 'auto';
        // control by outside
        useEffect(
            () => {
                if (value !== undefined) {
                    setInternalValue(value);
                }
            },
            [value]
        );

        // open control by outside
        useEffect(
            () => {
                if (open !== undefined) {
                    setInnerOpen(open);
                }
            },
            [open]
        );


        // callback when the selection changes
        const handleSelect = useEvent(
            (selectedValue: LabelInValueType, {selected, clear}: { selected?: boolean, clear?: 'all' }) => {
                if (clear === 'all') {
                    setInternalValue(null);
                    return;
                }
                let selectedValueList = [] as RawValueType[] | RawValueType;
                if (selected) {
                    onSelect?.(selectedValue.value);
                    if (isMultiple) {
                        selectedValueList = (
                            [...(internalValue as string[] || []),
                                selectedValue.value]);
                    } else {
                        selectedValueList = (selectedValue.value);
                    }
                } else {
                    onDeselect?.(selectedValue.value);
                    if (isMultiple) {
                        selectedValueList = (
                            ((internalValue as string[]) || [])?.filter?.(
                                val => val !== selectedValue?.value,
                            )
                        );
                    } else {
                        selectedValueList = (null);
                    }
                }
                setInternalValue(selectedValueList);
                onChange?.(selectedValueList);

                selectorRef.current?.focus?.();
            },
        );

        // callback when search input changes
        const handleSearch = useEvent((inputValue: string, fromTyping, isCompositing) => {
            setInternalSearchValue(inputValue);
            return onSearch?.(inputValue, fromTyping, isCompositing);
        });

        const toggleOpen = useEvent((isOpen?: boolean) => {
            // eslint-disable-next-line no-negated-condition
            if (isOpen !== undefined) {
                if (isControlOpen) {
                    onDropdownVisibleChange?.(isOpen);
                } else {
                    setInnerOpen(isOpen);
                }
            } else if (isControlOpen) {
                onDropdownVisibleChange?.(!value);
            } else {
                setInnerOpen(!innerOpen);
            }
        });

        const handleSearchSubmit = useEvent(
            () => {
                toggleOpen(true);
            },
        );

        const rawValues: Set<string | number> = useMemo(
            () => {
                if (!internalValue) {
                    return new Set();
                }
                return new Set(Array.isArray(internalValue) ? internalValue : [internalValue]);
            },
            [internalValue]
        );
        const optionsList = useMemo(
            () => (
                <OptionList
                    ref={optionListRef}
                    toggleOpen={toggleOpen}
                    multiple={mode === 'multiple'}
                    notFoundContent={notFoundContent}
                    optionClassName={popupClassName}
                    id={id}
                    open={innerOpen}
                    listHeight={listHeight}
                    searchValue={internalSearchValue}
                    dropdownStyle={dropdownMenuColumnStyle}
                />
            ),
            [toggleOpen, innerOpen, notFoundContent,
                popupClassName, id, internalSearchValue, listHeight, mode, dropdownMenuColumnStyle]
        );
        const content = useMemo(
            () => {
                const loadingCom = React.isValidElement(loadingPlaceholder) ? loadingPlaceholder : (<>loading...</>);
                return (
                    loading ? loadingCom : React.isValidElement(menuList) ? React.cloneElement(menuList, {
                        // @ts-ignore
                        toggleOpen,
                        multiple: isMultiple,
                    }) : optionsList
                );
            },
            [loading, loadingPlaceholder, menuList, optionsList, toggleOpen, isMultiple]
        );
        const contextValue = useMemo(
            () => {
                const filterValue = findOptionByValue(options, internalValue, type, isMultiple);
                return ({
                    options,
                    optionRender,
                    defaultActiveFirstOption,
                    onSelect: handleSelect,
                    menuItemSelectedIcon,
                    rawValues,
                    internalValue: filterValue
                });
            },
            [
                rawValues,
                options,
                optionRender,
                defaultActiveFirstOption,
                handleSelect,
                menuItemSelectedIcon,
                internalValue,
                isMultiple,
                type
            ],
        );
        const handleClickOutside = useEvent((event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                innerOpen && setInnerOpen(false);
                // no active
                selectorRef.current?.setActive(false);
            }
        });

        const handleKeyDown = useEvent((event: React.KeyboardEvent) => {
            if (disabled) {
                return;
            }
            optionListRef.current?.onKeyDown(event);
        });

        useEffect(
            () => {
                window.addEventListener('mousedown', handleClickOutside, false);
                return () => {
                    window.removeEventListener('mousedown', handleClickOutside, false);
                };
            },
            []
        );

        useImperativeHandle(ref, () => ({
            value,
            searchValue: internalSearchValue,
            containerRef,
            selectorRef,
            open: innerOpen,
            setOpen: setInnerOpen,
        }));
        const motionProps = useMemo(
            () => (
                {
                    classNames: selectMotion,
                    timeout: 100,
                    ...(motion || {})
                }
            ),
            [motion]
        );
        return (
            // @ts-ignore
            <SelectContext.Provider value={contextValue}>
                <span
                    onKeyDown={handleKeyDown}
                    ref={containerRef}
                    className={cn('relative w-full inline-block', {'cursor-not-allowed': disabled})}
                >
                    <Tooltip
                        content={content}
                        getPopupContainer={() => containerRef.current}
                        placement={placement}
                        noArrow
                        offset={[4, 0]}
                        trigger="click"
                        // eslint-disable-next-line max-len
                        className="shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08),0px_9px_28px_8px_rgba(0,0,0,0.05)] rounded-[--border-radius-lg] z-50"
                        style={{
                            '--color-bg-tooltips': 'var(--color-bg-elevated)',
                            width: computeWidth,
                            minWidth,
                            ...dropdownStyle,
                        }}
                        open={innerOpen}
                        motion={motionProps}
                        destroyTooltipOnHide
                    >
                        <>
                            {/* @ts-ignore */}
                            <Selector
                                ref={selectorRef}
                                showSearch={showSearch}
                                searchValue={internalSearchValue}
                                onToggleOpen={toggleOpen}
                                onSearch={handleSearch}
                                onSearchSubmit={handleSearchSubmit}
                                open={innerOpen}
                                autoClearSearchValue={autoClearSearchValue}
                                mode={mode}
                                placeholder={placeholder}
                                disabled={disabled}
                                value={value}
                                {...props}
                            />
                        </>
                    </Tooltip>
                </span>
            </SelectContext.Provider>
        );
    },
);

export default Select;
export {SelectProps};
