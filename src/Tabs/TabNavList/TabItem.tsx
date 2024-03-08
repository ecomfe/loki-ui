import React, {useMemo} from 'react';
import cn from 'classnames';
import {KeyCode} from '../../_utils/keyboard';
import type {TabItemProps} from '../interface';

const TabItem = React.forwardRef((props: TabItemProps, ref: React.RefObject<HTMLDivElement>) => {
    const {item, style, active, onClick, onFocus, renderNavItem} = props;
    const {key, label, disabled, icon} = item;
    const customRenderNav = typeof renderNavItem === 'function';
    const onInternalClick = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (disabled) {
            return;
        }
        onClick?.(key, e);
    };
    const renderLabel = useMemo(
        () => {
            if (customRenderNav) {
                return renderNavItem(item, active);
            }
            if (typeof label === 'string') {
                return <span>{label}</span>;
            } else if (typeof label === 'function') {
                return label(item, active);
            } else {
                return label;
            }
        },
        [active, label, item, renderNavItem, customRenderNav]
    );
    return (
        <div
            role="tab"
            data-node-key={key}
            aria-selected={active}
            aria-disabled={disabled}
            tabIndex={disabled ? null : 0}
            className={cn(
                'text-base font-medium cursor-pointer py-[--padding-md]',
                active ? 'text-[--color-text]' : 'text-[--color-text-tertiary]'
            )}
            style={style}
            onClick={e => {
                e.stopPropagation();
                onInternalClick(e);
            }}
            onKeyDown={e => {
                if ([KeyCode.SPACE, KeyCode.ENTER].includes(e.which)) {
                    e.preventDefault();
                    onInternalClick(e);
                }
            }}
            onFocus={onFocus}
            ref={ref}
        >
            {icon && <span>{icon}</span>}
            {renderLabel}
        </div>
    );
});

if (process.env.NODE_ENV === 'development') {
    TabItem.displayName = 'TabItem';
}

export default TabItem;
