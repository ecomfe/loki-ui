import {cva} from 'class-variance-authority';
import cn from 'classnames';
import React from 'react';

export interface AvatarProps {
    shape?: 'circle' | 'square'; // 形状
    size?: 'large' | 'small' | 'default'; // 尺寸
    src?: React.ReactNode; // 可能是字符串或React Node
    icon?: React.ReactNode; // 自定义图标
    style?: React.CSSProperties;
    className?: string;
    children?: React.ReactNode;
    alt?: string;
}

const avatarVariants = cva(cn('inline-flex items-center justify-center'), {
    variants: {
        shape: {
            circle: 'rounded-full',
            square: 'rounded-[--border-radius-lg]',
        },
        size: {
            large: 'w-[64px] h-[64px]',
            default: 'w-[44px] h-[44px]',
            small: 'h-[32px] w-[32px]',
        },
    },
    defaultVariants: {
        shape: 'circle',
        size: 'default',
    },
});

const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
    ({shape = 'circle', size = 'default', src, icon, alt, className, children, ...rest}, ref) => {
        let content: React.ReactNode = <></>;
        const hasImageElement = React.isValidElement(src);

        if (typeof src === 'string') {
            // src是url
            content = (
                <img alt={alt} src={src} className={cn('w-full h-full object-cover', avatarVariants({shape, size}))} />
            );
        } else if (hasImageElement) {
            // src是react元素
            content = src;
        } else if (icon) {
            // 使用icon
            content = icon;
        } else {
            // 使用children
            content = <div>{children}</div>;
        }

        return (
            <span
                role="image"
                className={cn(className, avatarVariants({size, shape}), 'overflow-hidden')}
                {...rest}
                ref={ref}
            >
                {content}
            </span>
        );
    },
);

if (process.env.NODE_ENV !== 'production') {
    Avatar.displayName = 'Avatar';
}

export default Avatar;
