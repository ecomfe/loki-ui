import React, {useEffect} from 'react';
import cn from 'classnames';
import {useRef} from 'react';
import {cva} from 'class-variance-authority';
import {
    AigcSystemClear, AigcSystemTipsFace, AigcSystemRightFace, AigcSystemClose
} from 'loki-icon';
import LoadingIcon from '../Button/LoadingIcon';
import {KeyCode} from '../_utils/keyboard';
import {composeRef} from '../_utils/ref';
import type {MessageArgs} from './interface';

const iconVariants = cva(
    'inline-flex items-center justify-center pr-[--padding] text-lg',
    {
        variants: {
            type: {
                info: 'text-[--color-info-base]',
                success: 'text-[--color-success-base]',
                warning: 'text-[--color-warning-base]',
                error: 'text-[--color-error-base]',
                loading: 'text-[--color-info-base]'
            }
        },
        defaultVariants: {
            type: 'info'
        }
    }
);
const iconTypeMap = {
    info: <AigcSystemTipsFace />,
    warning: <AigcSystemTipsFace />,
    error: <AigcSystemClear />,
    success: <AigcSystemRightFace />,
    loading: <LoadingIcon loading />
};
const Notice = React.forwardRef<HTMLDivElement, MessageArgs>(
    ({
        content, type, duration = 4.5, onClose, style: noticeStyle = {},
        className, icon, showClose,
        id,
    }, ref) => {
        const nodeRef = useRef<HTMLDivElement>();
        const timerRef = useRef<number>();

        const handleClose = () => {
            onClose?.(id);
            clearTimeout(timerRef.current);
        };

        // auto close
        useEffect(
            () => {
                if (duration !== 0) {
                    const timer = window.setTimeout(() => handleClose(), duration * 1000);
                    timerRef.current = timer;
                    return () => {
                        clearTimeout(timer);
                    };
                }
            },
            [duration]
        );

        return (
            <div
                className={
                    cn('flex rounded-[--border-radius-lg] border border-[--color-border-secondary] ',
                        'pt-[--margin-sm] pr-[--margin-md] pb-[--margin-sm] pl-[--margin-md]',
                        'items-center shadow-[0px_6px_16px_0px_rgba(0,0,0,0.08)] w-max',
                        'border-solid text-[--color-text] bg-[--color-bg-elevated] text-sm', className)}
                style={{zIndex: 1000, ...noticeStyle}}
                ref={composeRef(nodeRef, ref)}
            >
                {
                    React.isValidElement(icon) ? icon
                        : <span className={iconVariants({type})}>{iconTypeMap[type]}</span>
                }
                {typeof content === 'string' ? (
                    <span className="w-max">{content}</span>
                ) : content}
                {
                    (showClose ?? true) && (
                        <span
                            className={`float-right cursor-pointer pl-[--margin-lg] inline-flex items-center
                                    text-[--color-text-tertiary] hover:text-[--color-text-quaternary]
                                    transition-colors duration-200`}
                            onClick={e => {
                                e.stopPropagation();
                                e.preventDefault();
                                handleClose();
                            }}
                            tabIndex={0}
                            onKeyDown={e => {
                                if (e.key === 'Enter' || e.code === 'Enter' || e.keyCode === KeyCode.ENTER) {
                                    handleClose();
                                }
                            }}
                        >
                            <AigcSystemClose />
                        </span>
                    )
                }
            </div>
        );
    });

export default Notice;
