import React, {forwardRef, useEffect, useMemo, useRef, useState} from 'react';
import cn from 'classnames';
import useEvent from '../_hooks/useEvent';
import type {RadioGroupProps, RadioGroupContextProps, RadioOptionType} from './interface';
import RadioContext from './context';
import Radio from './Radio';
const noop = () => { };
const noopArr: [] = [];
type gapsType = [string | number, string | number];
function parseNumbersWithUnits(input: string): gapsType {
    if (!input) {
        return;
    }
    let matches: gapsType = input.toString().match(/\d+\S+/g) as gapsType;
    if (matches?.[0] && !matches?.[1]) {
        matches[1] = matches?.[0];
    }
    matches = matches.map(i => {
        if (!isNaN(+i)) {
            return +i;
        }
        return i;
    }) as gapsType;
    return matches;
}
const RadioGroup = forwardRef<HTMLDivElement, RadioGroupProps>((props, ref) => {
    const {
        value, defaultValue,
        disabled,
        options = [], optionType,
        style,
        className,
        onChange = noop,
        children,
        gap = '16 16'
    } = props;
    const firstRef = useRef(false);
    const [checkedValue, updateCheckedValue] = useState(defaultValue);
    useEffect(
        () => {
            if (!firstRef.current) {
                return;
            }
            updateCheckedValue(value);
            firstRef.current = true;
        },
        [value]
    );
    const Provider = RadioContext.Provider;
    const memoOptions: RadioOptionType[] = React.useMemo(
        () =>
            options.map(option => {
                if (typeof option === 'string' || typeof option === 'number') {
                    return {label: option, value: option};
                }
                return option;
            }),
        [options],
    );
    const childrenNode = options.length ? memoOptions.map(option => (
        <Radio
            key={option.value.toString()}
            disabled={('disabled' in option ? option.disabled : disabled) || disabled}
            checked={checkedValue === option.value}
            onChange={option?.onChange || noop}
            className={option.className}
            style={option.style}
            id={option.id}
            value={option.value}
        >
            {option.label}
        </Radio>
    )) : children;
    const gaps: gapsType | [] = useMemo(
        () => parseNumbersWithUnits(gap) || noopArr,
        [gap]
    );
    const mergeStyle = useMemo(
        () => {
            let customStyle: React.CSSProperties = {};
            if (gaps[0]) {
                customStyle.marginRight = -gaps[0];
            }
            if (gaps[1]) {
                customStyle.marginBottom = -gaps[1];
            }
            customStyle = {
                ...customStyle,
                ...style
            };
            return customStyle;
        },
        [style, gaps]
    );
    const handleChange = useEvent(value => {
        updateCheckedValue(value);
        onChange?.(value);
    });
    const store: RadioGroupContextProps = useMemo(
        () => {
            return ({
                onChange: handleChange,
                value: checkedValue ? checkedValue?.toString() : undefined,
                disabled,
                optionType,
                gaps: gaps,
            });
        },
        [checkedValue, disabled, gaps, optionType]
    );
    return (
        <div
            className={cn('inline-flex flex-wrap', className)}
            style={mergeStyle}
            ref={ref}
        >
            <Provider value={store}>
                {childrenNode}
            </Provider>
        </div>
    );
});

export default RadioGroup;
