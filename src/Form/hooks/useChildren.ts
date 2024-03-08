import type {FormItemProps} from '../FormItem';
import {toArray} from '../util';

export default function useChildren(children?: FormItemProps['children']): FormItemProps['children'] {
    if (typeof children === 'function') {
        return children;
    }

    const childList = toArray(children);
    return childList.length <= 1 ? childList[0] : childList;
}
