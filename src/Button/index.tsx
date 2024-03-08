import {cva} from 'class-variance-authority';
import cn from 'classnames';
import React, {useCallback, useMemo, useState} from 'react';
import LoadingIcon from './LoadingIcon';
import type {BaseButtonProps} from './interface';
type MergedHTMLAttributes = Omit<
    React.HTMLAttributes<HTMLElement> &
        React.ButtonHTMLAttributes<HTMLElement> &
        React.AnchorHTMLAttributes<HTMLElement>,
    'type'
>;

export interface ButtonProps extends BaseButtonProps, MergedHTMLAttributes {
    href?: string;
    htmlType?: 'submit' | 'button' | 'reset';
}
// disabled:opacity-[0.02]
const buttonVariants = cva(
    cn(
        'inline-flex items-center justify-center whitespace-nowrap rounded-[--border-radius-lg] text-[14px] leading-[22px]',
        'transform transition-all gap-1 not-italic px-4 py-[5px] duration-200',
        'disabled:cursor-not-allowed disabled:text-[--color-text-quaternary]',
    ),
    {
        variants: {
            type: {
                primary:
                    // eslint-disable-next-line max-len
                    'bg-[--color-fill-button-temp] hover:bg-[--color-primary-hover] text-white active:bg-[--color-primary-active] disabled:bg-[--color-fill-tertiary]',
                outline:
                    // eslint-disable-next-line max-len
                    'border border-solid border-[--color-border-button-temp] text-[--color-primary-text] hover:border-[--color-primary-border-hover] hover:text-[--color-primary-text-hover] bg-[--color-bg-container] active:border-[--color-primary-active] active:text-[--color-primary-active] disabled:border-[--color-border] disabled:bg-[--color-fill-tertiary]',
                default:
                    // eslint-disable-next-line max-len
                    'border border-[--color-border] text-[--color-text] hover:text-[--color-primary-text-hover] hover:border-[--color-primary-border-hover] active:border-[--color-primary-active] active:text-[--color-primary-active] bg-[--color-bg-container] disabled:bg-[--color-fill-tertiary]',
                // eslint-disable-next-line max-len
                link: 'text-[--color-primary-text] hover:text-[--color-primary-text-hover] active:text-[--color-primary-active]',
                text: 'text-[--color-text-secondary] hover:text-[--color-text-tertiary] active:text-[--color-text]',
            },
            size: {
                xl: 'h-10 text-[14px] leading-[22px] font-medium',
                l: 'h-9 text-[14px] leading-[22px] font-medium',
                m: 'h-8 text-[14px] leading-[22px]',
                s: 'h-7 text-[14px] leading-[22px]',
                xs: 'h-6 text-xs',
            }
        },
        defaultVariants: {
            type: 'primary',
            size: 'm',
        },
    },
);

interface LoadingConfigType {
    loading: boolean;
    delay: number;
}

function getLoadingConfig(loading: BaseButtonProps['loading']): LoadingConfigType {
    if (typeof loading === 'object' && loading) {
        let delay = loading?.delay;
        delay = !Number.isNaN(delay) && typeof delay === 'number' ? delay : 0;
        return {
            loading: delay <= 0,
            delay,
        };
    }

    return {
        loading: !!loading,
        delay: 0,
    };
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
    const {
        loading = false,
        prefixCls = 'loki',
        type = 'primary',
        size = 'm',
        iconStyle,
        disabled = false,
        className,
        children,
        icon,
        ghost = false,
        block = false,
        htmlType = 'button',
        width,
        onClick,
        ...rest
    } = props;
    const loadingOrDelay = useMemo<LoadingConfigType>(
        () => getLoadingConfig(loading),
        [loading]
    );
    const [innerLoading, setLoading] = useState<boolean>(loadingOrDelay.loading);

    React.useEffect(() => {
        let delayTimer: ReturnType<typeof setTimeout> | null = null;
        if (loadingOrDelay.delay > 0) {
            delayTimer = setTimeout(() => {
                delayTimer = null;
                setLoading(true);
            }, loadingOrDelay.delay);
        } else {
            setLoading(loadingOrDelay.loading);
        }

        function cleanupTimer() {
            if (delayTimer) {
                clearTimeout(delayTimer);
                delayTimer = null;
            }
        }

        return cleanupTimer;
    }, [loadingOrDelay]);

    const iconNode =
        icon && !innerLoading ? (
            <span className="text-[16px]" style={iconStyle}>{icon}</span>
        ) : (
            <LoadingIcon existIcon={!!icon} prefixCls={prefixCls} loading={!!innerLoading} />
        );
    const styles = useMemo(
        () => {
            const style = rest.style ? rest.style : {};
            if (width) {
                style.width = width;
            }
            return style;
        },
        [rest.style, width]
    );
    const handleClick: React.MouseEventHandler<HTMLElement> = useCallback(
        (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
            !disabled && onClick?.(e);
        },
        [disabled, onClick]
    );
    return (
        <button
            className={cn(
                'loki-button',
                buttonVariants({type, size}),
                className,
                {'bg-transparent': ghost},
                {'w-full': block},
            )}
            ref={ref}
            // eslint-disable-next-line react/button-has-type
            type={htmlType}
            disabled={disabled}
            onClick={handleClick}
            {...rest}
            style={{...styles}}
        >
            {iconNode}
            {children}
        </button>
    );
});
if (process.env.NODE_ENV !== 'production') {
    Button.displayName = 'Button';
}

export default Button;
