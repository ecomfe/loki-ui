import {autoUpdate} from '@floating-ui/dom';
import React, {useCallback, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState} from 'react';
import {findDOMNode} from 'react-dom';
import useEvent from '../_hooks/useEvent';
import {computeTooltipPosition} from '../_utils/computePositions';
import debounce from '../_utils/debounce';
import {isFragment} from '../_utils/reactNode';
import Popup from './Popup';
import './index.css';
import type {IPosition, ITooltip, PrefixPlaceType, ITooltipRef} from './interface';

const OffsetDefault = [5, 0] as [number, number];
const Tooltip = React.forwardRef<ITooltipRef, ITooltip>((props, ref) => {
    const {
        // props
        id,
        className,
        classNameArrow,
        placement = 'top',
        offset = OffsetDefault,
        trigger = 'hover',
        autoAdjustOverflow = true,
        positionStrategy = 'absolute',
        defaultOpen = false,
        // middlewares,
        wrapper = 'div',
        delayShow = 0,
        delayHide = 40,
        noArrow = false,
        style: externalStyles = {},
        position,
        content: outerContent,
        title,
        contentWrapperRef,
        open,
        onOpenChange,
        border = 5,
        opacity,
        children,
        destroyTooltipOnHide = false,
        getPopupContainer,
        arrowOffset,
        arrowSlot = false,
        motion,
        wrapWidth
    } = props;
    if (props.color) {
        externalStyles.backgroundColor = props.color;
    }
    const content = outerContent || title;
    const tooltipRef = useRef<HTMLElement | null>(null);
    const tooltipArrowRef = useRef<HTMLElement>(null);
    const tooltipShowDelayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const tooltipHideDelayTimerRef = useRef<NodeJS.Timeout | null>(null);
    const [inlineStyles, setInlineStyles] = useState({});
    const [inlineArrowStyles, setInlineArrowStyles] = useState({});
    const [actualPlacement, setActualPlacement] = useState<PrefixPlaceType>(
        placement.split?.('-')?.[0] as PrefixPlaceType,
    );
    const [show, setShow] = useState(defaultOpen);
    const [rendered, setRendered] = useState(defaultOpen);
    const wasShowing = useRef(false);
    const childRef = useRef<HTMLElement>(null);
    const [hasRef, forceSpan] = useState(false);
    const isCustom = React.isValidElement(children) && !isFragment(children) && !hasRef;
    const child = useMemo(
        () => {
            return isCustom ? (
            // @ts-ignore
                React.cloneElement(children, {ref: childRef})
            ) : (
                <span className="text-[--seed-token-white]" ref={childRef}>{children}</span>
            );
        },
        [isCustom, children]
    );
    const [activeAnchor, setActiveAnchor] = useState<HTMLElement | null>(null);
    useEffect(
        () => {
            let activeAnchor = null as unknown as Element | Text;
            if (isCustom) {
                // eslint-disable-next-line react/no-find-dom-node
                activeAnchor = findDOMNode(childRef.current);
            } else {
                activeAnchor = (
                    (childRef.current?.childElementCount === 1)
                        ? childRef.current?.firstElementChild : childRef.current
                );
            }
            setActiveAnchor(activeAnchor as HTMLElement);
        },
        [child, isCustom]
    );
    useLayoutEffect(
        () => {
            if (!childRef.current) {
                forceSpan(true);
            }
        },
        []
    );
    const mounted = useRef(false);
    // mark mounted
    useLayoutEffect(
        () => {
            mounted.current = true;
            return () => {
                mounted.current = false;
            };
        }, 
        []
    );

    const handleShow = useEvent((value: boolean) => {
        if (!mounted.current) {
            return;
        }
        if (value) {
            setRendered(true);
        }
        // Delay display, waiting for position calculation to be completed
        setTimeout(() => {
            if (!mounted.current) {
                return;
            }

            if (open === undefined) {
                setShow(value);
            } else {
                onOpenChange?.(value);
            }
        }, 10);
    });

    //  when `open` is changed from outside
    useEffect(
        () => {
            if (open === undefined) {
                return () => null;
            }
            if (open) {
                setRendered(true);
            }
            const timeout = setTimeout(() => {
                setShow(open);
            }, 10);
            return () => {
                clearTimeout(timeout);
            };
        }, 
        [open]
    );

    useEffect(
        () => {
            if (show === wasShowing.current) {
                return;
            }
            wasShowing.current = show;
            // if no control
            if (open === undefined) {
                onOpenChange?.(show);
            }
        },
        [show]
    );

    const handleShowTooltipDelayed = useEvent(() => {
        if (tooltipShowDelayTimerRef.current) {
            clearTimeout(tooltipShowDelayTimerRef.current);
        }

        tooltipShowDelayTimerRef.current = setTimeout(() => {
            handleShow(true);
        }, delayShow);
    });

    const handleHideTooltipDelayed = useEvent((delay = delayHide) => {
        if (tooltipHideDelayTimerRef.current) {
            clearTimeout(tooltipHideDelayTimerRef.current);
        }
        tooltipHideDelayTimerRef.current = setTimeout(() => {
            handleShow(false);
        }, delay);
    });

    const handleShowTooltip = useEvent((event?: Event) => {
        if (!event) {
            return;
        }

        if (delayShow) {
            handleShowTooltipDelayed();
        } else {
            handleShow(true);
        }

        if (tooltipHideDelayTimerRef.current) {
            clearTimeout(tooltipHideDelayTimerRef.current);
        }
    });

    const ToggleShowTooltip = useEvent((e?: Event) => {
        if (show) {
            handleHideTooltipDelayed(0);
        } else {
            handleShowTooltip(e);
        }
    });

    const handleHideTooltip = useEvent(() => {
        if (delayHide) {
            handleHideTooltipDelayed();
        } else {
            handleShow(false);
        }

        if (tooltipShowDelayTimerRef.current) {
            clearTimeout(tooltipShowDelayTimerRef.current);
        }
    });

    const handleTooltipPosition = useEvent(({x, y}: IPosition) => {
        const virtualElement = {
            getBoundingClientRect() {
                return {
                    x,
                    y,
                    width: 0,
                    height: 0,
                    top: y,
                    left: x,
                    right: x,
                    bottom: y,
                };
            },
        } as Element;
        computeTooltipPosition({
            placement,
            offset,
            autoAdjustOverflow,
            elementReference: virtualElement,
            tooltipReference: tooltipRef.current,
            tooltipArrowReference: tooltipArrowRef.current,
            strategy: positionStrategy,
            arrowOffset,
            // middlewares: null,
            border: noArrow ? 0 : border,
        }).then(computedStylesData => {
            if (Object.keys(computedStylesData.tooltipStyles).length) {
                setInlineStyles(computedStylesData.tooltipStyles);
            }
            if (Object.keys(computedStylesData.tooltipArrowStyles).length) {
                setInlineArrowStyles(computedStylesData.tooltipArrowStyles);
            }
            setActualPlacement(computedStylesData.place as PrefixPlaceType);
        });
    });

    const updateTooltipPosition = useEvent(() => {
        if (!show) {
            return;
        }
        
        if (position) {
            // if `position` is set, override regular and `float` positioning
            handleTooltipPosition(position);
            return;
        }
        computeTooltipPosition({
            placement,
            autoAdjustOverflow,
            offset,
            elementReference: activeAnchor,
            tooltipReference: tooltipRef.current,
            tooltipArrowReference: tooltipArrowRef.current,
            strategy: positionStrategy,
            // middlewares: null,
            border: noArrow ? 0 : border,
            arrowOffset,
        }).then(computedStylesData => {
            if (!mounted.current) {
                return;
            }
            if (Object.keys(computedStylesData.tooltipStyles).length) {
                setInlineStyles(computedStylesData.tooltipStyles);
            }
            if (Object.keys(computedStylesData.tooltipArrowStyles).length) {
                setInlineArrowStyles(computedStylesData.tooltipArrowStyles);
            }
            setActualPlacement(computedStylesData?.place?.split('-')?.[0] as PrefixPlaceType);
        });
    });

    const debouncedHandleShowTooltip = debounce(handleShowTooltip, 50, true);
    const debouncedHandleHideTooltip = debounce(handleHideTooltip, 50, true);
    const debouncedToggleShowTooltip = debounce(ToggleShowTooltip, 50, true);

    useEffect(
        () => {
            requestAnimationFrame(updateTooltipPosition);
        },
        []
    );

    useEffect(
        () => {
            if (!contentWrapperRef?.current) {
                return () => null;
            }
            const contentObserver = new ResizeObserver(() => {
                updateTooltipPosition();
            });
            contentObserver.observe(contentWrapperRef.current);
            return () => {
                contentObserver.disconnect();
            };
        }, 
        [content, contentWrapperRef?.current]
    );

    useEffect(
        () => {
            return () => {
                if (tooltipShowDelayTimerRef.current) {
                    clearTimeout(tooltipShowDelayTimerRef.current);
                }
                if (tooltipHideDelayTimerRef.current) {
                    clearTimeout(tooltipHideDelayTimerRef.current);
                }
            };
        }, 
        []
    );
    const handleClickOutsideToolTip = useEvent((event: MouseEvent) => {
        if (!tooltipRef.current || childRef.current?.contains(event.target as HTMLElement)
        || tooltipRef.current?.contains(event.target as HTMLElement)) {
            return;
        }

        handleShow(false);
        if (tooltipShowDelayTimerRef.current) {
            clearTimeout(tooltipShowDelayTimerRef.current);
        }
    });

    const handleTransitionEnd = useCallback(
        () => {
            if (show) {
                return;
            }
            setRendered(false);
        },
        [show],
    );

    useImperativeHandle(ref, () => ({
        close: () => {
            handleShow(false);
        },
        open: () => {
            handleShow(true);
        },
        tooltipRef: tooltipRef,
    }));

    useEffect(
        () => {
            if (trigger === 'hover') {
                childRef.current?.addEventListener('mouseenter', debouncedHandleShowTooltip);
                tooltipRef.current?.addEventListener('mouseenter', debouncedHandleShowTooltip);
                childRef.current?.addEventListener('mouseleave', debouncedHandleHideTooltip);
                tooltipRef.current?.addEventListener('mouseleave', handleHideTooltip);
            }
            if (trigger === 'click') {
                childRef.current?.addEventListener('click', debouncedToggleShowTooltip);
                window.addEventListener('click', handleClickOutsideToolTip);
            }
            return () => {
                if (trigger === 'hover') {
                    childRef.current?.removeEventListener('mouseenter', debouncedHandleShowTooltip);
                    tooltipRef.current?.addEventListener('mouseenter', debouncedHandleShowTooltip);
                    childRef.current?.removeEventListener('mouseleave', debouncedHandleHideTooltip);
                    tooltipRef.current?.addEventListener('mouseleave', handleHideTooltip);
                }
                if (trigger === 'click') {
                    childRef.current?.removeEventListener('click', debouncedToggleShowTooltip);
                    window.removeEventListener('click', handleClickOutsideToolTip);
                }
            };
        }, 
        [hasRef]
    );

    // update position onresize onscroll
    useLayoutEffect(
        () => {
            if (!activeAnchor || !tooltipRef.current) {
                return;
            }
            if (!show) {
                return;
            }
            const updateTooltipCleanup = autoUpdate(activeAnchor, tooltipRef.current, updateTooltipPosition, {
                ancestorResize: true,
                elementResize: true,
                layoutShift: true,
            });
            return () => {
                updateTooltipCleanup?.();
            };
        },
        [activeAnchor, rendered, show]
    );
    const canShow = content && show;
    const renderPortal = () => (
        <Popup
            ref={tooltipRef}
            getPopupContainer={getPopupContainer}
            id={id}
            positionStrategy={positionStrategy}
            className={className
                ? className : 'pt-[--padding] pr-[--padding-md] pb-[--padding] pl-[--padding-md]'}
            canShow={canShow || false}
            handleTransitionEnd={handleTransitionEnd}
            classNameArrow={classNameArrow}
            wrapper={wrapper}
            externalStyles={externalStyles || {}}
            inlineStyles={inlineStyles}
            inlineArrowStyles={inlineArrowStyles}
            tooltipArrowRef={tooltipArrowRef}
            noArrow={noArrow}
            opacity={opacity}
            placement={actualPlacement}
            arrowSlot={arrowSlot}
            motion={motion}
            wrapWidth={wrapWidth}
            unmountOnExit={destroyTooltipOnHide}
        >
            {content}
        </Popup>
    );

    return (
        <>
            {/* {destroyTooltipOnHide ? (rendered ? renderPortal() : null) : renderPortal()} */}
            {renderPortal()}
            {child}
        </>
    );
});

if (process.env.NODE_ENV !== 'production') {
    Tooltip.displayName = 'Tooltip';
}

export default Tooltip;
export {ITooltip as ToolTipProps};
