import {cva} from 'class-variance-authority';
import cn from 'classnames';
import React, {forwardRef, useRef} from 'react';
import useEvent from '../_hooks/useEvent';
import useExceed from './hooks/useExceed';
import useInputInteraction from './hooks/useInputInteraction';
import type {InputProps, InputRef} from './interface';
import getClearIcon from './utils/getClearIcon';
import getStatusIcon from './utils/getStatusIcon';

const inputVariants = cva('', {
    variants: {
        size: {
            s: 'h-[34px]',
            m: 'h-[38px]',
            l: 'h-[42px]',
        },
        bordered: {
            true: 'border focus-within:ring-[--color-ring] focus-within:ring-2',
            false: 'shadow-none',
        },
        status: {
            // eslint-disable-next-line max-len
            normal: 'border-[--color-border] hover:border-[--color-primary-border-hover] focus-within:!border-[--color-primary]',
            success: 'hover:border-[--color-primary-border-hover] focus-within:!border-[--color-primary]',
            // eslint-disable-next-line max-len
            error: 'focus-within:shadow-[0_0_0_2px_rgba(255,182,173,0.4)] border-[--color-error-border-hover] focus-within:!border-[--color-error-base]',
            disabled: `border-[--color-border] border bg-[--color-fill-tertiary] hover:border-[--color-border]
             focus-within:border-[--color-border] cursor-not-allowed`,
        },
    },
    defaultVariants: {
        size: 'm',
        bordered: true,
        status: 'normal',
    },
});

const Input = forwardRef<InputRef, InputProps<HTMLInputElement>>((props, ref) => {
    const {
        addonAfter,
        addonBefore,
        allowClear,
        bordered = true,
        classNames,
        count,
        defaultValue,
        disabled = false,
        id,
        maxLength,
        prefix,
        status,
        styles,
        size = 'm',
        suffix,
        type = 'text',
        value: controlledValue,
        onChange,
        onPressEnter,
        ...rest
    } = props;

    // 使用内部状态来管理非受控组件的值
    const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue || '');
    const wrapperRef = useRef<HTMLSpanElement>(null);
    // 判断组件是否为受控
    const isControlled = controlledValue !== undefined;
    // const inputRef = useRef<HTMLInputElement>(null);
    // 获取当前值，基于组件是否为受控选择正确的值
    const value = isControlled ? controlledValue : uncontrolledValue;
    const isComposing = useRef(false); // 跟踪输入法状态
    // TODO: exceed对应的UI
    const [countTag, isExceed] = useExceed({count, value, maxLength, className: classNames?.count});
    const {inputProps} = useInputInteraction<React.ForwardedRef<InputRef>, HTMLInputElement>({
        maxLength,
        count,
        onChange,
        onPressEnter,
        setValue: setUncontrolledValue,
        ref,
        exceed: isExceed,
    });
    const inputRef = inputProps.ref;

    // 处理清除逻辑
    const handleClear = useEvent((e: React.MouseEvent) => {
        e.stopPropagation?.();
        inputProps.onChange({target: {value: ''}} as React.ChangeEvent<HTMLInputElement>);
    });

    return (
        <span
            ref={wrapperRef}
            className={cn(
                'inline-flex relative  rounded-[--border-radius-lg] w-full group',
                'transition duration-200 ease-in-out outline-none items-center',
                'px-[--padding-lg]',
                inputVariants({
                    size, bordered, status: disabled ? 'disabled' : status,
                }),
                classNames?.wrapper || '',
            )}
            tabIndex={-1}
            style={styles?.wrapper}
        >
            <span className="inline-flex gap-1">
                {addonBefore}
                {prefix}
            </span>
            <input
                {...rest}
                id={id}
                type={type}
                defaultValue={defaultValue}
                value={value}
                disabled={disabled}
                maxLength={maxLength}
                onCompositionStart={() => {
                    isComposing.current = true;
                }}
                onCompositionEnd={e => {
                    isComposing.current = false;
                    inputProps.onChange(e as unknown as React.ChangeEvent<HTMLInputElement>);
                }}
                {...inputProps}
                className={cn(
                    'flex-1',
                    classNames?.input || '',
                    'transition duration-200 ease-in-out outline-none bg-transparent',
                    'justify-between items-center',
                    'placeholder:text-[--color-text-quaternary] text-[14px] leading-[22px] not-italic font-normal',
                    isExceed
                        ? 'text-[--color-error-text] caret-[--color-error-text]'
                        : 'text-[--color-text] caret-[--color-primary]',
                    disabled ? 'pointer-events-none' : '',
                )}
                style={styles?.input}
                ref={inputRef}
            />
            <span className="inline-flex gap-1 items-center">
                {suffix}
                {getClearIcon(handleClear, !!(allowClear && value), allowClear)}
                {addonAfter}
                {countTag}
                {getStatusIcon(status)}
            </span>
        </span>
    );
});

export default Input;
