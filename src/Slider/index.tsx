import React, {useEffect, useMemo, useRef, useState} from 'react';
import cn from 'classnames';
import useMergeSignal from '../_hooks/useMergeSignal';
import type {SliderProps} from './interface';
import Track from './Track';
import Handle from './Handle';
import SliderContext from './context';
import useDrag from './useDrag';
import {formatValue} from './utils';

const noop = {};
const Slider = (props: SliderProps) => {
    const {
        className, style = noop, classNames, styles = noop as SliderProps['styles'],
        // Status
        disabled = false, keyboard = true, autoFocus, onFocus, onBlur,
        // Value
        min = 0, max = 100, step = 1, value, defaultValue,
        handleRender, onChangeComplete, onChange
    } = props;
    const [getValue, setValue] = useMergeSignal<number>(value, defaultValue);
    const mergedMin = React.useMemo(() => (isFinite(min) ? min : 0), [min]);
    const mergedMax = React.useMemo(() => (isFinite(max) ? max : 100), [max]);
    const mergedStep = React.useMemo(() => (step !== null && step <= 0 ? 1 : step), [step]);
    const containerRef = useRef<HTMLDivElement>(null);
    const handleRef = useRef<HTMLDivElement>(null);
    const handleChange = (val: number) => {
        if (val !== getValue()) {
            setValue(val);
        }
        onChange && onChange(val);
    };
    const handelChangeComplete = () => {
        onChangeComplete && onChangeComplete(getValue());
    };
    const [isDragging, draggingValue, onStartMove] = useDrag({
        containerRef,
        min: mergedMin, max: mergedMax,
        value: getValue(), onChangeComplete: handelChangeComplete, onChange: handleChange,
        step: mergedStep
    });

    const contextVal = useMemo(
        () => {
            return {
                min: mergedMin,
                max: mergedMax,
                styles: styles || {},
                classNames: classNames || {},
                disabled,
                keyboard,
                step: mergedStep,
            };
        },
        [mergedMin, mergedMax, styles, classNames, disabled, keyboard, mergedStep]
    );

    const onHandleOffsetChange = (offset: number | 'min' | 'max') => {
        const val = offset === 'min' ? mergedMin : (offset === 'max' ? mergedMax : getValue() + offset);
        handleChange(val);
    };

    // 点击的时候 跳过去 但是要format到step的值
    const onSliderMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        if (disabled) {
            return;
        }
        // 将值计算最近的step
        const {clientX} = e;
        // 获取容器的宽度
        const {width, left} = containerRef.current.getBoundingClientRect();
        // 计算相对于整体容器的百分比
        const percent = (clientX - left) / width;
        // 换算出值
        const computeVal = mergedMin + percent * (mergedMax - mergedMin);
        const formatData = formatValue(mergedMin, mergedMax, computeVal, mergedStep);
        handleChange(formatData);
        if (e) {
            onStartMove(e, formatData);
        }
    };

    useEffect(
        () => {
            if (autoFocus) {
                handleRef.current.focus();
            }
        },
        []
    );

    return (
        <SliderContext.Provider value={contextVal}>
            <div
                style={style}
                className={cn(
                    'relative w-full h-1 bg-[--color-divider-line] flex items-center rounded-[--border-radius]',
                    disabled ? 'cursor-not-allowed' : 'cursor-pointer',
                    className)}
                ref={containerRef}
                onMouseDown={onSliderMouseDown}
            >
                <Track
                    start={0}
                    end={draggingValue}
                    onStartMove={onSliderMouseDown}
                    style={styles.track}
                >
                    <Handle
                        value={getValue()}
                        onStartMove={onStartMove}
                        render={handleRender}
                        dragging={isDragging}
                        onOffsetChange={onHandleOffsetChange}
                        onFocus={onFocus}
                        onBlur={onBlur}
                        style={styles.handle}
                        ref={handleRef}
                        onChangeComplete={handelChangeComplete}
                    />
                </Track>
            </div>
        </SliderContext.Provider>
    );
};

if (process.env.NODE_ENV !== 'production') {
    Slider.displayName = 'Slider';
}

export default Slider;
export {SliderProps};
