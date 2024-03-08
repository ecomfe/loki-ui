import React from 'react';
import cn from 'classnames';
import {AigcSystemClear} from 'loki-icon';
import type {InputProps} from '../interface';

const getClearIcon = (handleClear: (e: React.MouseEvent) => void, show: boolean = false,
    allowClear: InputProps<HTMLInputElement>['allowClear']) => {
    let mergedAllowClear: React.ReactNode | null = null;
    if (typeof allowClear === 'object' && allowClear?.clearIcon) {
        mergedAllowClear = allowClear?.clearIcon;
    } else if (allowClear) {
        mergedAllowClear = (
            <span
                className={cn(
                    'cursor-pointer inline-flex items-center text-[--color-text-quaternary] text-[16px]',
                    'hover:text-[--color-text-tertiary] transition duration-200',
                    'opacity-0 group-focus-within:opacity-100',
                )}
                onClick={handleClear}
            >
                <AigcSystemClear />
            </span>
        );
    }

    return (
        show ? mergedAllowClear : null
    );
};

export default getClearIcon;
