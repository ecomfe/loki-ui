import React, {useLayoutEffect} from 'react';

type AnyFunction = (...args: any[]) => any;

// eslint-disable-next-line @reskript/no-excessive-hook, camelcase
function useEvent_shouldNotBeInvokedBeforeMount() {
    throw new Error(
        'INVALID_USEEVENT_INVOCATION: the callback from useEvent cannot be invoked before the component has mounted.'
    );
}

export function useEvent<TCallback extends AnyFunction>(callback: TCallback): TCallback {
    // Keep track of the latest callback:
    // eslint-disable-next-line camelcase
    const latestRef = React.useRef<TCallback>(useEvent_shouldNotBeInvokedBeforeMount as any);
    useLayoutEffect(
        () => {
            latestRef.current = callback;
        },
        [callback]
    );

    // Create a stable callback that always calls the latest callback:
    // using useRef instead of useCallback avoids creating and empty array on every render
    const stableRef = React.useRef<TCallback>(null as any);
    if (!stableRef.current) {
        stableRef.current = function (this: any) {
            // eslint-disable-next-line prefer-rest-params
            return latestRef.current.apply(this, arguments as any);
        } as TCallback;
    }

    return stableRef.current;
}

export default useEvent;
