import {AigcSystemClear} from 'loki-icon';
import {cva} from 'class-variance-authority';
import cn from 'classnames';
import React, {useContext, useMemo, useRef, useState} from 'react';
import {AigcSystemPullDown} from 'loki-icon';
import type {InputRef} from '../Input/interface';
import {KeyCode} from '../_utils/keyboard';
import {isValidReactComponent} from '../_utils/reactNode';
import MultipleSelector from './MultipleSelector';
import SelectContext from './SelectContext';
import SingleSelector from './SingleSelector';
import type {LabelInValueType, RawValueType, SelectorProps, SelectorRefType} from './interface';
const selectVariants = cva('flex rounded-[--border-radius-lg] border', {
    variants: {
        active: {
            true: 'shadow-[0_0_0_2px_rgba(5,145,255,0.1)]',
            false: 'shadow-none',
        },
        size: {
            l: 'pt-[--padding-sm] pr-[--padding-lg] pb-[--padding-sm] pl-[--padding-sm] min-h-[42px]',
            m: 'pt-[--padding-xs] pr-[--padding-lg] pb-[--padding-xs] pl-[--padding-xs] min-h-[38px]',
            s: 'pt-[--padding-xs] pr-[--padding-lg] pb-[--padding-xs] pl-[--padding-xs]  min-h-[34px]',
        },
    },
    defaultVariants: {
        active: false,
        size: 'm',
    },
});
const defaultExpandIcon = <AigcSystemPullDown />;
const Selector = React.forwardRef<
    SelectorRefType,
    SelectorProps & {
        onSearch: (searchText: string, fromTyping: boolean, isCompositing: boolean) => void;
        onSearchSubmit?: (searchText: string) => void;
        onToggleOpen: (open?: boolean) => void;
        customSelect?: React.FC<SelectorProps>;
        value: RawValueType | RawValueType[];
            }
            >((props, ref) => {
                const inputRef = useRef<InputRef>(null);
                const compositionStatusRef = useRef<boolean>(false);

                const {
                    open,
                    mode,
                    showSearch,
                    autoClearSearchValue,
                    onSearch,
                    onSearchSubmit,
                    onToggleOpen,
                    onInputKeyDown,
                    size,
                    disabled = false,
                    allowClear,
                    status,
                    expandIcon,
                    customSelect: CustomSelect,
                } = props;
                const mergeExpandIcon = React.isValidElement(expandIcon) ? expandIcon : defaultExpandIcon;
                // const [getInputMouseDown, setInputMouseDown] = useLock(0);
                const [active, setActive] = useState(false);
                const selectorRef = useRef<HTMLElement>(null);
                const {onSelect} = useContext(SelectContext);
                const userCustomSelect = useMemo(
                    () =>
                        (isValidReactComponent(CustomSelect) ? <CustomSelect {...props} /> : false),
                    [CustomSelect, props]
                );

                const mergedAllowClear =
        allowClear === true ? (
            <span
                className={cn('cursor-pointer inline-flex items-center text-[--color-text-quaternary]')}
                onClick={(e: React.MouseEvent) => {
                    e?.stopPropagation?.();
                    onSelect('' as unknown as LabelInValueType, {clear: 'all'});
                }}
            >
                <AigcSystemClear />
            </span>
        ) : (
            (allowClear as React.ReactNode)
        );
                const onInternalInputKeyDown: React.KeyboardEventHandler<HTMLInputElement> = event => {
                    const {which} = event;
                    if (which === KeyCode.UP || which === KeyCode.DOWN) {
                        event.preventDefault();
                    }

                    if (onInputKeyDown) {
                        onInputKeyDown(event);
                    }

                    if (which === KeyCode.ENTER && mode === 'tags' && !compositionStatusRef.current && !open) {
                        onSearchSubmit?.((event.target as HTMLInputElement).value);
                    }

                    onToggleOpen(true);
                };

                const triggerOnSearch = (value: string) => {
                    if (onSearch(value, true, compositionStatusRef.current) !== false) {
                        onToggleOpen(true);
                    }
                };

                const onInputCompositionStart = () => {
                    compositionStatusRef.current = true;
                };

                const onInputCompositionEnd: React.CompositionEventHandler<HTMLInputElement> = e => {
                    compositionStatusRef.current = false;

                    triggerOnSearch((e.target as HTMLInputElement).value);
                };

                const onInputChange = (value: string) => {
                    triggerOnSearch(value);
                };
                const onMouseDown: React.MouseEventHandler<HTMLElement> = event => {
                    if (!showSearch || !open) {
                        if (open && autoClearSearchValue !== false) {
                            onSearch('', true, false);
                        }
                        onToggleOpen();
                    }
                };

                const handleClick = () => {
                    if (disabled) {
                        return;
                    }
                    if (showSearch) {
                        inputRef.current?.input?.focus();
                    }
                    setActive(true);
                };

                const handleBlur = () => {
                    setActive(false);
                };

                React.useImperativeHandle(ref, () => ({
                    focus: () => {
                        if (showSearch) {
                            inputRef.current?.input?.focus();
                        }
                    },
                    blur: () => {
                        if (showSearch) {
                            inputRef.current?.input?.blur?.();
                        }
                    },
                    active,
                    setActive,
                }));

                const sharedProps = {
                    inputRef,
                    onInputKeyDown: onInternalInputKeyDown,
                    onInputChange,
                    onInputCompositionStart,
                    onInputCompositionEnd,
                    showSearch,
                    size,
                };

                return (
                    <span
                        tabIndex={0}
                        onMouseDown={onMouseDown}
                        onClick={handleClick}
                        onBlur={handleBlur}
                        onKeyDown={e => {
                            if (e.which === KeyCode.ENTER) {
                                handleClick();
                            }
                        }}
                        ref={selectorRef}
                        className={userCustomSelect ? '' : cn(
                            'transition duration-200 ease-in-out outline-none',
                            selectVariants({active, size}),
                            disabled // eslint-disable-next-line max-len
                                ? 'pointer-events-none border-[--color-border] border-solid bg-[--color-fill-tertiary] hover:border-[--color-border]'
                                : status === 'error'
                                    ? 'border-[--color-error-border]'
                                    : 'cursor-pointer border-[--color-border]'
                        + (active ? ' border-[--color-primary]' : ' hover:border-[--color-primary-border-hover]'),
                        )}
                    >
                        {
                            userCustomSelect ? userCustomSelect : (
                                <>
                                    {mode === 'multiple' || mode === 'tags' ? (
                                    // @ts-ignore
                                        <MultipleSelector
                                            {...props}
                                            {...sharedProps}
                                            clearIcon={mergedAllowClear}
                                            expandIcon={mergeExpandIcon}
                                        />
                                    ) : (
                                    // @ts-ignore
                                        <SingleSelector
                                            {...props}
                                            {...sharedProps}
                                            clearIcon={mergedAllowClear}
                                            expandIcon={mergeExpandIcon}
                                        />
                                    )}
                                </>
                            )
                        }
                    </span>
                );
            });

Selector.displayName = 'Selector';

export default React.memo(Selector);
