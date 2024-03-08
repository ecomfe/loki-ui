import cn from 'classnames';
import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';

import {maskTheme} from '../theme';
import type {MaskProps} from '../types';

const noop: React.CSSProperties = {};
const MaskComponent: React.FC<MaskProps> = ({
    className,
    appendToBody = false,
    show,
    animate = true,
    theme: customTheme,
    style = noop,
    zIndex,
}) => {
    const theme = {...maskTheme, ...customTheme};

    const [displayMask, setDisplayMask] = useState<boolean>(show);
    const [showMask, setShowMask] = useState<boolean>(false);

    const maskTransitionTimeRef = useRef<number>(0);
    const maskRef = useRef<HTMLDivElement>(null);
    const interval = useRef<ReturnType<typeof setTimeout> | null>(null);

    const maskClasses = cn(theme.wrapper,
        displayMask ? 'block' : 'hidden', showMask ? 'opacity-50' : 'opacity-0', className);

    useEffect(
        () => {
            if (maskRef.current) {
                const {transitionDuration} = window.getComputedStyle(maskRef.current);
                const time = Number(transitionDuration.replace('s', '')) * 1000;
                maskTransitionTimeRef.current = time;
            }
        }, 
        []
    );

    useEffect(
        () => {
            if (show) {
                setDisplayMask(show);
                interval.current = setTimeout(
                    () => {
                        setShowMask(show);
                    },
                    animate ? 50 : 0,
                );
            } else {
                setShowMask(show);
                interval.current = setTimeout(
                    () => {
                        setDisplayMask(show);
                    },
                    animate ? maskTransitionTimeRef.current : 0,
                );
            }
            return () => {
                if (interval.current) {
                    clearInterval(interval.current);
                }
            };
        }, 
        [show]
    );
    if (style.zIndex === undefined) {
        style.zIndex = zIndex;
    }
    const maskTemplate = <div id="loki-mask" className={maskClasses} style={style} ref={maskRef}></div>;

    return <>{appendToBody ? ReactDOM.createPortal(maskTemplate, document.body) : maskTemplate}</>;
};

export default MaskComponent;
