/* eslint-disable complexity */
import cn from 'classnames';
import React, {useContext, useRef} from 'react';
import Input from '../Input';
import getStatusIcon from '../Input/utils/getStatusIcon';
import SelectContext, {SelectContextProps} from './SelectContext';
import useHoverIcon from './hooks/useHoverIcon';
import useMeasureWidth from './hooks/useMeasureWidth';
import type {SelectorProps} from './interface';

const SingleSelector = ({
    showSearch = false,
    open,
    placeholder,
    inputRef,
    onInputChange,
    searchValue,
    clearIcon,
    formatChooseValue,
    status,
    expandIcon,
}: SelectorProps) => {
    const {internalValue} = useContext<SelectContextProps<'single'>>(SelectContext);
    const [measureDom, inputWidth] = useMeasureWidth(searchValue);
    const domRef = useRef<HTMLDivElement>(null);
    const handleSearchChange = (value: string) => {
        onInputChange?.(value);
    };

    const showInput = showSearch && open;
    const showTag = !showSearch || (showSearch && !open);
    const choseValue = internalValue?.label ?? internalValue?.value;
    const formatValue = typeof formatChooseValue === 'function' ? formatChooseValue(internalValue) : choseValue;
    const suffixIcon = useHoverIcon(domRef, formatValue ? clearIcon : false, open, expandIcon);
    const statusIcon = getStatusIcon(status);
    return (
        <div ref={domRef} className="relative w-full flex justify-between pl-[--padding] leading-[22px]">
            <div className={cn('flex items-center flex-1 relative')}>
                <span className={cn('text-[--color-text] text-[14px] leading-[22px] not-italic font-normal',
                    {hidden: !showTag})}
                >
                    {formatValue ?? (
                        <span className="text-[--color-text-quaternary]">{placeholder || 'Please Search ...'}</span>
                    )}
                </span>
                <Input
                    styles={{
                        wrapper: {
                            padding: 0,
                            height: 'auto',
                            width: inputWidth,
                        },
                        input: {
                            width: inputWidth,
                        },
                    }}
                    classNames={{
                        wrapper: showInput ? 'h-[22px]' : 'hidden',
                        input: 'h-[22px]',
                    }}
                    ref={inputRef}
                    type="text"
                    value={searchValue}
                    bordered={false}
                    onChange={handleSearchChange}
                />
                {measureDom}
            </div>
            {statusIcon && <span className="flex items-center mr-[--margin-xxs]">{statusIcon}</span>}
            {suffixIcon}
        </div>
    );
};

export default SingleSelector;
