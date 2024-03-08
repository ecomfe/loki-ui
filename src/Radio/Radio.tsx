import React, {useContext, useEffect, useMemo} from 'react';
import cn from 'classnames';
import {CSSTransition} from 'react-transition-group';
import useEvent from '../_hooks/useEvent';
import useMergeSignal from '../_hooks/useMergeSignal';
import {KeyCode} from '../_utils/keyboard';
import type {RadioProps} from './interface';
import RadioContext from './context';

const disabledClass = 'border border-[--color-border] border-solid text-[--color-text-quaternary]';
const ButtonRadio = (props: RadioProps & { onKeyDown: (e: React.KeyboardEvent) => void}) => {
    const {value, checked, className, style, disabled, children, onChange, onKeyDown} = props;

    return (
        <label
            className={cn(
                'inline-flex items-center justify-center relative rounded-[--border-radius-lg] border border-solid',
                'py-[--padding-xs] px-[--padding-lg]',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                checked ? (disabled ? disabledClass
                    : 'bg-transparent text-[--color-primary-text] border border-[--color-primary-border-hover]')
                    : (disabled ? disabledClass
                        : 'hover:bg-[--color-neutral-bg-hover] border-[--color-border] hover:border-transparent'),
                'transition-colors duration-200 ease',
                className)}
            style={style}
            onClick={() => {
                onChange?.(value);
            }}
            tabIndex={disabled ? 0 : 1}
            onKeyDown={onKeyDown}
        >
            <input className="absolute appearance-none" type="radio" value={value} checked={checked} />
            <span>{children}</span>
        </label>
    );
};
const noop = {};
const Radio = (props: RadioProps) => {
    const {
        value: radioValue, className, onChange,
        optionType, style = noop, children,
        disabled, checked, defaultChecked
    } = props;
    const [getChecked, updateValue] = useMergeSignal(
        checked,
        defaultChecked,
    );
    const {value, onChange: onInternalChange, gaps} = useContext(RadioContext);

    const handleChange = useEvent(value => {
        if (disabled) {
            return;
        }
        onInternalChange?.(value);
        onChange?.(value);
    });

    useEffect(
        () => {
            if (!value) {
                return;
            }
            const newVal = radioValue?.toString();
            if (value !== newVal && getChecked()) {
                updateValue(false);
            } else if (value.toString() === newVal && !getChecked()) {
                updateValue(true);
            }
        },
        [value, radioValue]
    );
    const mergeStyle = useMemo(
        () => {
            const newStyle: React.CSSProperties = {};
            if (gaps?.[0]) {
                newStyle.marginRight = gaps?.[0];
            }
            if (gaps?.[1]) {
                newStyle.marginBottom = gaps?.[1];
            }
            return {...newStyle, ...style};
        },
        [style, gaps]
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.keyCode === KeyCode.ENTER) {
            handleChange(radioValue);
        }
    };
    const classNames = useMemo(
        () => {
            return cn(
                'relative inline-block w-4 h-4 border transition-all rounded-full duration-200 ease',
                'border-[--color-border]',
                !getChecked() && !disabled && 'hover:border-[--color-primary-border-hover]',
                // eslint-disable-next-line max-len
                getChecked() && 'border-none outline outline-2 outline-[--color-primary-border]',
                disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                disabled && getChecked() && 'opacity-50'
            );
        }, 
        [disabled, getChecked()]
    );

    if (optionType === 'button') {
        return (
            <ButtonRadio
                checked={getChecked()}
                disabled={disabled}
                style={mergeStyle}
                className={className}
                onChange={() => handleChange(radioValue)}
                value={radioValue}
                onKeyDown={handleKeyDown}
            >
                {children}
            </ButtonRadio>
        );
    }


    return (
        <label
            className={cn('inline-flex items-center', className)}
            style={mergeStyle}
        >
            <span
                className={classNames}
                tabIndex={disabled ? 0 : 1}
                onClick={() => handleChange(radioValue)}
                onKeyDown={handleKeyDown}
            >
                <input
                    type="radio"
                    className={cn(
                        'absolute inset-0 rounded-full appearance-none',
                        getChecked() ? 'bg-[--color-primary]' : 'bg-[--color-bg-container]'
                    )}
                    value={radioValue}
                />
                <CSSTransition
                    timeout={200}
                    key={radioValue}
                    classNames={{
                        appear: 'scale-0',
                        appearActive: '!scale-[0.3] transition-transform duration-200 ease',
                        appearDone: '!scale-[0.3]',
                        enter: 'scale-0',
                        enterActive: '!scale-[0.3] transition-transform duration-200 ease',
                        enterDone: '!scale-[0.3]',
                    }}
                    appear
                    in={getChecked()}
                >
                    <span className={cn(
                        'absolute rounded-full origin-center inset-0',
                        'bg-[--color-bg-container]'
                    )}
                    >
                    </span>
                </CSSTransition>
            </span>
            <span className="pl-[--padding]">{children}</span>
        </label>
    );
};
Radio.Button = props => {
    return (
        <Radio {...props} optionType="button" />
    );
};
export default Radio;
