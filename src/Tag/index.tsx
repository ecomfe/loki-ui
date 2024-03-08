import React from 'react';
import cn from 'classnames';
import {AigcSystemClose} from 'loki-icon';
import {cva} from 'class-variance-authority';

export interface TagProps {
    closeIcon?: boolean | React.ReactNode;
    iconClassName?: string;
    className?: string;
    color?: string;
    onClose?: (e: React.MouseEvent) => void;
    children?: React.ReactNode;
    disabled?: boolean;
    size: 'm'| 's';
    style?: React.CSSProperties;
}

const tagVariants = cva(
    'flex items-center rounded-[--border-radius] flex-shrink-0 leading-[22px]',
    {
        variants: {
            size: {
                s: 'pt-[--padding-xxs] pr-[--padding] pb-[--padding-xxs] pl-[--padding]',
                m: 'pt-[--padding-xs] pr-[--padding] pb-[--padding-xs] pl-[--padding]'
            }
        },
        defaultVariants: {
            size: 'm'
        }
    }
);

const Tag = React.forwardRef<HTMLElement, TagProps>((tagProps, ref) => {
    const {
        className,
        iconClassName,
        children,
        color,
        onClose,
        closeIcon,
        disabled,
        size = 'm',
        style = {},
        ...props
    } = tagProps;
    const noCloseIcon = closeIcon === null || closeIcon === false;
    const closeHolder = !noCloseIcon && (
        <span
            onClick={onClose}
            className={cn(
                'pl-2 cursor-pointer text-[--color-text-tertiary] hover:text-[--color-text-quaternary]',
                'transition-colors duration-200',
                iconClassName)}
        >
            {closeIcon || <AigcSystemClose />}
        </span>
    );
    return (
        <span
            {...props}
            ref={ref}
            className={cn(tagVariants({size}), className)}
            style={{
                background: color ? color : 'var(----color-fill-secondary, rgba(0, 0, 0, 0.05))',
                ...style
            }}
        >
            <span className={cn(disabled ? 'text-[--color-text-tertiary]' : 'text-[--color-text]',)}>
                {children}
            </span>
            {!disabled && closeHolder}
        </span>
    );
});

if (process.env.NODE_ENV !== 'production') {
    Tag.displayName = 'Tag';
}

export default Tag;
