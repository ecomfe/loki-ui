import React, {useLayoutEffect, useRef} from 'react';
import useEvent from '../_hooks/useEvent';

const ResizeObserverComponent = ({onResize, children}) => {
    const child = React.Children.only(children);
    const childRef = useRef(null);

    const setRef = node => {
    // Keep your own reference
        childRef.current = node;
        // Call the original ref, if any
        const {ref} = child;
        if (typeof ref === 'function') {
            ref(node);
        } else if (ref !== null) {
            ref.current = node;
        }
    };

    const initObserver = useEvent(() => {
        const resizeObserver = new ResizeObserver(entries => {
            for (const entry of entries) {
                const {offsetWidth, offsetHeight} = entry.target as HTMLElement;
                onResize({
                    offsetWidth, offsetHeight
                });
            }
        });
        return resizeObserver;
    });

    useLayoutEffect(
        () => {
            const resizeObserver = initObserver();
            if (childRef.current) {
                resizeObserver.observe(childRef.current);
            }

            return () => {
                if (childRef.current) {
                    resizeObserver.unobserve(childRef.current);
                }
            };
        },
        []
    );

    return React.cloneElement(child, {ref: setRef});
};

export default ResizeObserverComponent;
