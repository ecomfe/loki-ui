import {useRef, useImperativeHandle} from 'react';
import type {ForwardedRef} from 'react';
import type {InputProps} from '../interface';

function useInputInteraction<T extends ForwardedRef<any>,
 P extends(HTMLTextAreaElement | HTMLInputElement)>({
    maxLength,
    count,
    onChange,
    setValue,
    onPressEnter,
    ref,
    exceed
}: Pick<InputProps<P>,
'maxLength'| 'count' | 'onChange' | 'onPressEnter' >
& {setValue: (v: string) => void, ref: T, exceed?: boolean}) {
    const isComposing = useRef(false);
    const inputRef = useRef<P>(null);

    const mergedMaxLength = count?.max || maxLength || 0;

    const handleChange = (event: React.ChangeEvent<P>) => {
        const currentValue = event.target.value;
        let cutValue = currentValue;

        if (
            !isComposing.current
      && count?.exceedFormatter
      && count?.max
      && count?.strategy?.(currentValue)! > mergedMaxLength
        ) {
            cutValue = count.exceedFormatter(currentValue, {max: mergedMaxLength});
        }

        setValue(cutValue);
        onChange && onChange(cutValue, event);
    };

    const handleKeyPress = (event: React.KeyboardEvent<P>) => {
        if (event.key === 'Enter' && onPressEnter) {
            onPressEnter(event);
        }
    };

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current?.focus();
        },
        blur: () => {
            inputRef.current?.blur();
        },
        setSelectionRange: (
            start: number,
            end: number,
            direction?: 'forward' | 'backward' | 'none',
        ) => {
            inputRef.current?.setSelectionRange(start, end, direction);
        },
        select: () => {
            inputRef.current?.select();
        },
        input: inputRef.current,
        exceed,
    }));

    return {
        inputProps: {
            onChange: handleChange,
            onKeyDown: handleKeyPress,
            ref: inputRef,
        },
        isComposing: isComposing.current,
    } as const;
}

export default useInputInteraction;
