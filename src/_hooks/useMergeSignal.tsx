import {useState, useRef, useEffect, useMemo} from 'react';
import shallowCompare from '../_utils/shallowCompare';
import useBatchUpdate from './useBatchUpdate';

function useMergeSignal<T>(
    externalValue: T,
    defaultValue?: T,
    compare: (prev: T, next: T) => boolean = shallowCompare
) {
    const [, forceUpdate] = useState([]);
    const dataRef = useRef(defaultValue);
    useEffect(
        () => {
            if (externalValue === undefined) {
                return;
            }
            if (compare(dataRef.current, externalValue)) {
                return;
            }
            dataRef.current = externalValue;
            forceUpdate([]);
        },
        [externalValue]
    );

    const batchUpdate = useBatchUpdate(() => {
        forceUpdate([]);
    });

    const updateState = (v: T) => {
        dataRef.current = v;
        batchUpdate();
    };
    const getDataRef = useRef(() => dataRef.current);

    const getData = useMemo(
        () => getDataRef.current,
        []
    );

    return [
        getData,
        updateState,
    ] as const;
}

export default useMergeSignal;
