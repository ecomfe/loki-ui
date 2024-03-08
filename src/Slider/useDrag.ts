import {useEffect, useRef, useState} from 'react';
import useEvent from '../_hooks/useEvent';
import type {OnStartMove} from './interface';
import {formatValue} from './utils';

function useDrag({
    containerRef,
    min,
    max,
    step,
    value,
    onChange,
    onChangeComplete,
}) {
    const [isDragging, setDragging] = useState(false);
    const [draggingValue, setDraggingValue] = useState(value);
    const mouseMoveEventRef = useRef<(event: MouseEvent) => void>(null);
    const mouseUpEventRef = useRef<(event: MouseEvent) => void>(null);
    const updateDraggingVal = useEvent((value: number) => {
        if (value !== undefined && draggingValue !== value) {
            setDraggingValue(value);
        }
    });
    useEffect(
        () => {
            updateDraggingVal(value);
        },
        [value]
    );
    useEffect(
        () => () => {
            document.removeEventListener('mousemove', mouseMoveEventRef.current);
            document.removeEventListener('mouseup', mouseUpEventRef.current);
            document.removeEventListener('touchmove', mouseMoveEventRef.current);
            document.removeEventListener('touchend', mouseUpEventRef.current);
        },
        [],
    );

    const onStartMove: OnStartMove = (e, stVal) => {
        e.stopPropagation();
        setDragging(true);
        const obj = 'touches' in e ? e.touches[0] : e;
        const {pageX: startX} = obj;
        const onMouseMove = (event: MouseEvent | TouchEvent) => {
            event.preventDefault();
            const obj = 'touches' in event ? event.touches[0] : event;
            const {pageX} = obj;
            const {width} = containerRef.current.getBoundingClientRect();
            const move = pageX - startX;
            const offset = (move / width) * (max - min);
            const formatVal = formatValue(min, max, (stVal || draggingValue) + offset, step);
            setDraggingValue(formatVal);
            onChange(formatVal);
        };
        const onMouseUp = (event: MouseEvent | TouchEvent) => {
            event.preventDefault();
            // 取消侦听器
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('touchend', onMouseUp);
            document.removeEventListener('touchmove', onMouseMove);
            mouseMoveEventRef.current = null;
            mouseUpEventRef.current = null;
            setDragging(false);
            // 结束 抬起
            onChangeComplete && onChangeComplete();
        };
        // 鼠标移动事件
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('touchmove', onMouseMove);
        // 鼠标松开事件
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchend', onMouseUp);
        mouseMoveEventRef.current = onMouseMove;
        mouseUpEventRef.current = onMouseUp;
    };
    return [isDragging, draggingValue, onStartMove];
}

export default useDrag;
