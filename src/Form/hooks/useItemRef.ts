import * as React from 'react';
import {fillRef} from '../../_utils/ref';
import {FormContext} from '../context';
import type {InternalNamePath} from '../interface';
function composeRef<T>(...refs: Array<React.Ref<T>>): React.Ref<T> {
    const refList = refs.filter(ref => ref);
    if (refList.length <= 1) {
        return refList[0];
    }

    return (node: T) => {
        refs.forEach(ref => {
            fillRef(ref, node);
        });
    };
}
export default function useItemRef() {
    const {itemRef} = React.useContext(FormContext);
    const cacheRef = React.useRef<{
        name?: string;
        originRef?: React.Ref<any>;
        ref?: React.Ref<any>;
    }>({});

    function getRef(name: InternalNamePath, children: any) {
        const childrenRef: React.Ref<React.ReactElement> = children && typeof children === 'object' && children.ref;
        const nameStr = name.join('_');
        if (cacheRef.current.name !== nameStr || cacheRef.current.originRef !== childrenRef) {
            cacheRef.current.name = nameStr;
            cacheRef.current.originRef = childrenRef;
            cacheRef.current.ref = composeRef(itemRef(name), childrenRef);
        }

        return cacheRef.current.ref;
    }

    return getRef;
}
