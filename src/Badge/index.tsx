import React, {forwardRef, useMemo} from 'react';
import cn from 'classnames';
import type {BadgeProps} from './interface';

const noop: BadgeProps['styles'] = {};
const Badge = forwardRef((props: BadgeProps, ref: React.RefObject<HTMLSpanElement>) => {
    const {
        children, count, overflowCount = 99, ghost = false,
        showZero = false, offset = [0, 0], color, classNames, styles = noop,
        position = 'absolute',
        ...rest
    } = props;
    const countElement = typeof count === 'number'
        ? (count > overflowCount ? <span>{overflowCount}+</span>
            : (count === 0 && !showZero ? null : count)) : count;

    const mergedStyles = useMemo(
        () => {
            const mergeColor = ghost ? '' : color || 'var(--color-error-base)';
            const textColor = ghost ? 'var(--color-text-quaternary)' : 'var(--seed-token-white)';
            const transformClass = ghost ? 'translate-x-full' : 'translate-x-2/4 -translate-y-2/4 ';
            return {
                mergeColor,
                textColor,
                transformClass
            };
        },
        [ghost, color]
    );

    return (
        <span
            className={cn('inline-block relative', classNames?.root)}
            style={{
                ...(styles?.root || {}),
            }}
            ref={ref}
            {...rest}
        >
            {children}
            <sup
                className={cn('text-xs top-0 right-0',
                    'origin-top-right rounded-full px-[--padding-sm]',
                    position === 'absolute' ? 'block' : 'inline',
                    'text-center', mergedStyles?.transformClass
                )}
                style={{
                    position,
                    top: offset[0],
                    right: -1 * offset[1],
                    color: mergedStyles.textColor,
                    backgroundColor: mergedStyles.mergeColor,
                    ...(styles?.indicator || {}),
                }}
            >
                {countElement}
            </sup>
        </span>
    );
});

if (process.env.NODE_ENV === 'development') {
    Badge.displayName = 'Badge';
}

export default Badge;
export {BadgeProps};
