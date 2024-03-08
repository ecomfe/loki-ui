import {useLayoutEffect, useRef, useState} from 'react';

export default function useBatchUpdate(callback: VoidFunction): () => void {
    const [count, setCount] = useState(0);
    const isFirstRender = useRef(true);
    const effectRef = useRef(0);
    const callbackRef = useRef<VoidFunction>();
    callbackRef.current = callback;

    // Trigger on `useLayoutEffect`
    useLayoutEffect(
        () => {
            if (!isFirstRender.current) {
                callbackRef.current?.();
                return;
            }
            isFirstRender.current = false;
        },
        [count]
    );

    // Trigger to update count
    return () => {
        if (effectRef.current !== count) {
            return;
        }

        effectRef.current += 1;
        setCount(effectRef.current);
    };
}

