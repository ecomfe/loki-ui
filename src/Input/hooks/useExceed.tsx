import React from 'react';
import cn from 'classnames';
import type {CountConfig} from '../interface';

const strategy = (text: string) => text?.length;
const useExceed = ({count, value = '', className, style, maxLength}: {
    count?: CountConfig;
    value?: string;
    maxLength?: number;
    className?: string;
    style?: React.CSSProperties;
}) => {
    const valueLength = (count?.strategy ?? strategy)?.(value);
    const mergedMaxLength = count?.max || maxLength;
    const isExceed = !!mergedMaxLength && valueLength > mergedMaxLength;
    const handleCount = (value: string): React.ReactNode => {
        if (typeof count === 'object' && count.formatter && typeof count.formatter === 'function') {
            return count.formatter({value, count: value.length, maxLength: mergedMaxLength});
        }
        return `${valueLength}/${mergedMaxLength}`;
    };
    const exceedTag = (
        <>{count?.show && (
            <span
                className={cn(
                    'text-right text-xs',
                    isExceed ? 'text-[--color-error-text]' : 'text-[--color-text-tertiary]',
                    // classNames?.count,
                    className,
                )}
                style={
                    // styles?.count
                    style
                }
            >
                {handleCount(value || '')}
            </span>
        )}
        </>
    );
    return [
        exceedTag,
        isExceed,
        mergedMaxLength,
    ] as const;
};

export default useExceed;
