import {useEffect, useRef} from 'react';

// 定义通用的 Props 类型，它是一个对象，键是字符串，值可以是任何内容
type Props = Record<string, any>;

function useWhyDidYouUpdate(name: string, props: Props) {
    // useRef 的泛型参数用于指明 current 属性的类型
    const previousProps = useRef<Props>();

    useEffect(() => {
        if (previousProps.current) {
            // 获取所有的 key (props 名)
            const allKeys = Object.keys({...previousProps.current, ...props});
            // 使用这些 key 来检查变化的 props
            const changesObj: Record<string, { from: any, to: any }> = {};
            allKeys.forEach(key => {
                if (previousProps.current && previousProps.current[key] !== props[key]) {
                    changesObj[key] = {
                        from: previousProps.current[key],
                        to: props[key]
                    };
                }
            });

            // 如果有变化的 props，则在控制台中打印它们
            if (Object.keys(changesObj).length) {
                console.log('[why-did-you-update]', name, changesObj);
            }
        }

        // 最后，将当前的 props 设置为下一次运行时的“之前的 props”
        previousProps.current = props;
    }); // 每次组件中的 props 更新时，都会重新运行这个 Hook
}

export default useWhyDidYouUpdate;
