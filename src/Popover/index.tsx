import cn from 'classnames';
import React, {forwardRef} from 'react';
import Button from '../Button';
import Tooltip from '../Tooltip';
import type {ITooltipRef} from '../Tooltip/interface';
import {composeRef} from '../_utils/ref';
import useEvent from '../_hooks/useEvent';
import type {IPopover} from './interface';

const noop = () => {};

const Popover = forwardRef<ITooltipRef, IPopover>((props, ref) => {
    const {
        children,
        okText = '确认',
        cancelText = '取消',
        title,
        content: Content = React.Fragment,
        footer = true,
        btnSize = 's',
        className,
        classNameContent,
        onCancel = noop,
        onOk = noop,
        style = {},
        contentStyle = {},
        ...rest
    } = props;
    const tooltipRef = React.useRef<ITooltipRef>(null);
    const handleCancel = useEvent(
        (e: React.MouseEvent) => {
            e.preventDefault();
            if (rest.open === undefined) {
                tooltipRef.current?.close();
            } else {
                rest.onOpenChange?.(false);
            }
            onCancel?.();
        },
    );

    const handleOk = useEvent(
        (e: React.MouseEvent) => {
            e.preventDefault();
            if (rest.open === undefined) {
                tooltipRef.current?.close();
            } else {
                rest.onOpenChange?.(false);
            }
            onOk?.();
        },
    );

    const hasSlot = React.isValidElement(footer) || footer === null;
    // @ts-ignore
    const PopoverContent = typeof Content === 'function' ? <Content /> : Content;
    const arrow = (
        <svg width="16" height="6" viewBox="0 0 16 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                id="Union"
                fillRule="evenodd"
                clipRule="evenodd"
                // eslint-disable-next-line max-len
                d="M0 0H2.66699H7.46667H8.53333H13.3337H16V0.000242029C14.2916 0.0158864 12.7592 0.788882 11.7052 2.00841L8.77708 5.61968C8.37686 6.11327 7.62379 6.11327 7.22358 5.61968L4.30583 2.02119C3.25147 0.794286 1.71433 0.015941 0 0.000242029V0Z"
                fill="white"
            />
        </svg>
    );
    const popContent = (
        <div
            className={cn(
                'pt-[--padding] pb-[--padding] pl-[--padding-sm] pr-[--padding-sm]',
                classNameContent,
            )}
            style={contentStyle}
        >
            {title && (
                <p className="text-[--color-text] text-[14px] leading-[22px] not-italic font-medium mb-[--margin-xs]">
                    {title}
                </p>)}
            <div
                className={`text-[--color-text-secondary] text-[14px] leading-[22px]
                not-italic font-normal`}
            >
                {PopoverContent}
            </div>
            {hasSlot ? (
                footer
            ) : (
                <div className="flex justify-end mt-[--margin]">
                    <Button onClick={handleCancel} size={btnSize} className="min-w-[72px]" type="default">
                        {cancelText}
                    </Button>
                    <Button onClick={handleOk} size={btnSize} className="ml-[--margin-xs] min-w-[72px]">
                        {okText}
                    </Button>
                </div>
            )}
        </div>
    );
    return (
        <Tooltip
            content={popContent}
            arrowSlot={arrow}
            border={6}
            style={{
                '--color-bg-tooltips': 'var(--color-bg-elevated)',
                '--border-radius': '8px',
                ...style
            }}
            classNameArrow={cn('', rest.classNameArrow)}
            {...rest}
            ref={composeRef(tooltipRef, ref)}
            className={cn(
                // eslint-disable-next-line max-len
                'shadow-[0px_0px_8px_0px_rgba(8,8,7,0.05),0px_8px_20px_-8px_rgba(8,8,7,0.08)]  rounded-[--border-radius-lg]',
                'pt-[--padding] pr-[--padding-md] pb-[--padding] pl-[--padding-md]',
                className,
            )}
        >
            {children}
        </Tooltip>
    );
});

if (process.env.NODE_ENV !== 'production') {
    Tooltip.displayName = 'Popover';
}

export default Popover;
