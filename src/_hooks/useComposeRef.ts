// 用于多个ref合并成一个ref回调函数
import {useMemo} from 'react';
import {composeRef} from '../_utils/ref';

function useComposeRef<T>(...refs: Array<React.Ref<T>>) {
    return useMemo(() => {
        // 使用composeRef函数创建一个合并的ref回调
        return composeRef(...refs);
    }, [...refs]); // 依赖列表是refs数组，当refs数组变化时，useMemo会重新计算
}

export default useComposeRef;
