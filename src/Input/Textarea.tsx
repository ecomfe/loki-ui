import React, {useState, useEffect, useRef, forwardRef} from 'react';
import cn from 'classnames';
import {cva} from 'class-variance-authority';
import autosize from '../_utils/autosize';
import useEvent from '../_hooks/useEvent';
import useExceed from './hooks/useExceed';
import useInputInteraction from './hooks/useInputInteraction';
import type {InputRef, CountConfig} from './interface';
const textareaVariants = cva('', {
    variants: {
        size: {
            s: 'text-[14px] leading-[22px]',
            m: 'text-[16px] leading-[24px]',
        },
        bordered: {
            true: 'border focus-within:ring-[--color-ring] focus-within:ring-2',
            false: 'shadow-none border-none focus-within:border-none! focus-within:shadow-none!',
        },
        status: {
            normal: 'hover:border-[--color-primary-border-hover] focus-within:border-[--color-primary]',
            error: 'focus-within:shadow-[0_0_0_2px_rgba(255,182,173,0.4)] border-[--color-error-border-hover]',
            disabled: `border-[--color-border] border bg-[--color-fill-tertiary] hover:border-[--color-border]
           cursor-not-allowed`
        },
    },
    defaultVariants: {
        size: 'm',
        bordered: true,
        status: 'normal'
    },
});
interface AutoTextAreaProps extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, 'onChange'> {
  autosize?: boolean;
  classNames?: {
      wrapper?: string;
      textarea?: string;
      count?: string;
  };
  styles?: {
    wrapper?: React.CSSProperties;
    textarea?: React.CSSProperties;
    count?: React.CSSProperties;
  };
  maxLength?: number;
  value?: string;
  onChange?: (value: string, e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  defaultValue?: string;
  count?: CountConfig;
  size?: 'm' | 's';
  bordered?: boolean;
  status?: 'normal' | 'error';
}

const AutoTextArea = forwardRef<InputRef, AutoTextAreaProps>(({
    autosize: auto = false,
    classNames,
    styles,
    maxLength,
    value: controlledValue,
    onChange,
    onPressEnter,
    defaultValue,
    count,
    disabled,
    size = 'm',
    bordered = true,
    status = 'normal',
    ...props
}, ref) => {
    const [inputValue, setInputValue] = useState(defaultValue || controlledValue || '');
    // TODO: exceed对应的UI
    const [countTag, isExceed,] = useExceed(
        {count, value: inputValue, maxLength, className: classNames?.count});
    const {inputProps} = useInputInteraction<React.ForwardedRef<InputRef>, HTMLTextAreaElement>({
        maxLength,
        count,
        onChange,
        onPressEnter,
        setValue: setInputValue,
        ref,
        exceed: isExceed
    });
    const textareaRef = inputProps.ref;
    const [borderStyle, setBorderStyle] = React.useState({});

    const isError = status === 'error';
    const updateHeight = useEvent(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            autosize.update(textarea);
        }
    });

    const handleFocus = useEvent(() => {
        if (disabled) {
            return;
        }
        if (bordered) {
            setBorderStyle({
                border: isError ? '1px solid var(--color-error-base)' : '1px solid var(--color-primary)',
            });
        }
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.focus?.();
        }
    });

    const handleBlur = useEvent(() => {
        setBorderStyle({});
    });


    useEffect(
        () => {
            if (auto) {
                const textarea = textareaRef.current;
                if (textarea) {
                    autosize(textarea);

                    setTimeout(() => {
                        autosize.update(textarea);
                    }, 10);

                    return () => {
                        autosize.destroy(textarea);
                    };
                }
            }
        },
        [auto]
    );


    useEffect(
        () => {
            if (auto) {
                return updateHeight();
            }
        },
        [inputValue, auto]
    );

    useEffect(
        () => {
            if (controlledValue !== undefined) {
                setInputValue(controlledValue);
            }
        },
        [controlledValue]
    );

    return (
        <span
            className={cn('relative w-full',
                'transition duration-200 ease-in-out',
                'border-[--color-border]',
                'border border-solid rounded-[--border-radius-lg]',
                'focus-within:border-[--color-primary]',
                'py-[--padding] text-[--color-text]',
                auto ? 'inline-block' : 'inline-flex flex-col',
                textareaVariants({size, bordered, status: disabled ? 'disabled' : status}),
                classNames?.wrapper)}
            onClick={handleFocus}
            onBlur={handleBlur}
            style={{
                ...borderStyle,
                '--color-ring': '#ebf4ff',
                ...(styles?.wrapper ?? {})
            }}
        >
            <textarea
                className={cn(
                    'w-full bg-transparent leading-[24px] focus:outline-none resize-none px-[--padding-lg]',
                    'loki-scrollbar flex-1',
                    'placeholder:text-[--color-text-quaternary]',
                    disabled ? 'cursor-not-allowed' : '',
                    classNames?.textarea)}
                style={styles?.textarea || {}}
                maxLength={maxLength}
                value={inputValue}
                {...inputProps}
                {...props}
                disabled={disabled}
            />
            {count?.show && (
                <span
                    className="flex w-full justify-end pt-[--padding-sm] px-[--padding-lg]"
                    style={styles?.count ?? {}}
                >
                    {countTag}
                </span>
            )}
        </span>
    );
});

export default AutoTextArea;
