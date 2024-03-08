import React, {useRef, useLayoutEffect, useState} from 'react';

const useMeasureWidth = (inputValue: string) => {
    const inputWidthRef = useRef<HTMLSpanElement>(null);
    const [inputWidth, setInputWidth] = useState(0);
    useLayoutEffect(
        () => {
            if (!inputWidthRef.current) {
                return;
            }
            setInputWidth(inputWidthRef.current?.scrollWidth);
        },
        [inputValue]
    );
    const dom = (
        <span ref={inputWidthRef} className={'absolute left-0 z-50 text-[14px] leading-[22px] inline invisible'}>
            {inputValue}&nbsp;
        </span>
    );

    return [dom, inputWidth] as const;
};
export default useMeasureWidth;
