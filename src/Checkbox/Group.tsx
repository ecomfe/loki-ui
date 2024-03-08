import React, {useEffect, useMemo} from 'react';
import useEvent from '../_hooks/useEvent';
import Checkbox from './Checkbox';
import GroupContext from './groupContext';
import type {CheckboxGroupProps, CheckboxValueType, CheckboxOptionType} from './interface';

const noop = () => {};
const InternalGroup: React.ForwardRefRenderFunction<HTMLDivElement, CheckboxGroupProps> = (
    props,
    ref,
) => {
    const {
        defaultValue,
        children,
        options = [],
        style,
        className,
        onChange = noop,
        ...restProps
    } = props;

    const [value, setValue] = React.useState<CheckboxValueType[]>(
        restProps.value || defaultValue || [],
    );

    // merge state from outside
    useEffect(
        () => {
            if ('value' in restProps) {
                setValue(restProps.value || []);
            }
        }, 
        [restProps.value]
    );

    const memoOptions = React.useMemo(
        () =>
            options.map<CheckboxOptionType>(option => {
                if (typeof option === 'string' || typeof option === 'number') {
                    return {label: option, value: option};
                }
                return option;
            }),
        [options],
    );

    const toggleOption = useEvent((option: CheckboxOptionType) => {
        const optionIndex = value.indexOf(option.value);
        const newValue = [...value];
        if (optionIndex === -1) {
            newValue.push(option.value);
        } else {
            newValue.splice(optionIndex, 1);
        }
        // if no control，setValue directly
        if (!('value' in restProps)) {
            setValue(newValue);
        }
        onChange?.(
            newValue
                .sort((a, b) => {
                    const indexA = memoOptions.findIndex(opt => opt.value === a);
                    const indexB = memoOptions.findIndex(opt => opt.value === b);
                    return indexA - indexB;
                }),
        );
    });

    const childrenNode = options.length
        ? memoOptions.map<React.ReactNode>(option => (
            <Checkbox
                key={option.value.toString()}
                disabled={('disabled' in option ? option.disabled : restProps.disabled) || restProps?.disabled}
                checked={value.includes(option.value)}
                onChange={option.onChange || noop}
                className={option.className}
                style={option.style}
                id={option.id}
                value={option.value}
            >
                {option.label}
            </Checkbox>
        ))
        : children;

    const context = useMemo(
        () => ({
            toggleOption,
            value,
            disabled: restProps.disabled,
        }),
        [value, restProps.disabled,]
    );

    return (
        <div className={className} style={style} ref={ref}>
            <GroupContext.Provider value={context}>{childrenNode}</GroupContext.Provider>
        </div>
    );
};

export {GroupContext};

const CheckboxGroup = React.forwardRef<HTMLDivElement, CheckboxGroupProps>(InternalGroup);

export default React.memo(CheckboxGroup);
