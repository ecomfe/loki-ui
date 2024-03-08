// render ToolTip UI

import {cva} from 'class-variance-authority';
import cn from 'classnames';
import React, {forwardRef, useRef} from 'react';
import {CSSTransition} from 'react-transition-group';
import Portal from '../Portal';
import {composeRef} from '../_utils/ref';
import type {IPopup} from './interface';

const arrowVariants = cva('w-0 h-0  absolute', {
    variants: {
        placement: {
            top: 'border-x-[5px] border-t-[5px] border-t-[--color-bg-tooltips] border-x-transparent',
            bottom: 'border-x-[5px] border-b-[5px] border-b-[--color-bg-tooltips] border-x-transparent',
            left: 'border-y-[5px] border-l-[5px] border-l-[--color-bg-tooltips] border-y-transparent',
            right: 'border-y-[5px] border-r-[5px] border-r-[--color-bg-tooltips] border-y-transparent',
        },
    },
    defaultVariants: {
        placement: 'top',
    },
});
const popupMotion = {
    appear: 'opacity-0 scale-90',
    appearActive: '!opacity-100 !scale-100 transition-[opacity,transform] duration-100 ease',
    enter: 'opacity-0 scale-90',
    enterActive: '!opacity-100 !scale-100 transition-[opacity,transform] duration-100 ease',
    exit: 'opacity-100 scale-100',
    exitActive: '!opacity-0 !scale-75 transition-all duration-150',
    exitDone: 'opacity-0',
};
const arrowStyle: Record<IPopup['placement'], React.CSSProperties> = {
    top: {},
    bottom: {transform: 'rotate(180deg)'},
    left: {
        transform: 'rotate(270deg) translate(50%, 0)',
        transformOrigin: 'bottom right'
    },
    right: {
        transform: 'rotate(90deg) translate(-50%, 0)',
        transformOrigin: 'bottom left'
    },
};


const Popup = forwardRef<any, IPopup>((props, ref) => {
    const {
        getPopupContainer,
        id,
        positionStrategy,
        className,
        canShow,
        handleTransitionEnd,
        classNameArrow,
        wrapper: WrapperElement = 'div',
        externalStyles,
        inlineStyles = {},
        inlineArrowStyles,
        tooltipArrowRef,
        noArrow = false,
        opacity,
        placement,
        children,
        arrowSlot,
        motion,
        wrapWidth,
        unmountOnExit
    } = props;
    if (typeof wrapWidth === 'number') {
        inlineStyles.maxWidth = wrapWidth;
    }

    const motionRef = useRef(null);
    return (
        <Portal getContainer={getPopupContainer}>
            <CSSTransition
                in={canShow}
                timeout={150}
                onExited={handleTransitionEnd}
                nodeRef={motionRef}
                appear
                classNames={popupMotion}
                unmountOnExit={unmountOnExit}
                {...motion}
            >
                <WrapperElement
                    id={id}
                    role="tooltip"
                    className={cn(
                        positionStrategy === 'absolute' ? positionStrategy : 'fixed',
                        'box-border z-50 text-[--seed-token-white] text-[14px]',
                        'flex flex-col items-center rounded-[--border-radius] bg-[--color-bg-tooltips]',
                        canShow ? '' : 'opacity-0 pointer-events-none',
                        className,
                    )}
                    style={{
                        top: 0,
                        left: 0,
                        // ...initialStyle,
                        display: 'block',
                        ...inlineStyles,
                        ...externalStyles,
                        opacity: opacity !== undefined && canShow ? opacity : undefined,
                    }}
                    ref={composeRef(motionRef, ref)}
                >
                    {children}
                    <WrapperElement
                        className={cn(
                            !arrowSlot
                                ? arrowVariants({
                                    placement,
                                })
                                : 'absolute',
                            classNameArrow,
                            {hidden: noArrow},
                        )}
                        style={{
                            ...(arrowSlot ? arrowStyle[placement || 'top'] : {}),
                            ...inlineArrowStyles,
                        }}
                        ref={tooltipArrowRef}
                    >
                        {arrowSlot ? arrowSlot : null}
                    </WrapperElement>
                </WrapperElement>
            </CSSTransition>
        </Portal>
    );
});

export default Popup;
