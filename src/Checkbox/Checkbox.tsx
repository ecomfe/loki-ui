import {AigcSystemCheckbox} from 'loki-icon';
import {cva} from 'class-variance-authority';
import cn from 'classnames';
import React, {forwardRef, useContext, useEffect, useState} from 'react';
import useEvent from '../_hooks/useEvent';
import type {CheckboxProps} from './interface';
import GroupContext from './groupContext';

const checkboxVariants = cva(cn('w-[16px] h-[16px] focus:ring-0 focus:ring-offset-0 focus-visible:outline-offset-0'), {
    variants: {
        status: {
            checked: `appearance-none border-none flex p-[--padding-xxs] bg-none bg-auto cursor-pointer
                justify-center items-center  rounded-[--border-radius] bg-[--color-primary-text]
                hover:bg-[--color-primary-hover] active:bg-[--color-primary]`,
            normal: `appearance-none rounded-[--border-radius] border border-[--color-border] border-solid
                hover:border-[--color-primary] cursor-pointer`,
        },
    },
    defaultVariants: {
        status: 'normal',
    },
});

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({
        disabled = false,
        defaultChecked = false,
        checked = false,
        children,
        className,
        onChange,
        value,
        checkboxClassName,
        checkboxStyle = {},
        style = {}, ...rest
    }, ref) => {
        const [isChecked, setChecked] = useState(checked || defaultChecked);
        const checkboxGroup = useContext(GroupContext);
        const handleChange = useEvent(
            (event: React.ChangeEvent<HTMLInputElement>) => {
                if (checkboxGroup?.toggleOption) {
                    checkboxGroup.toggleOption({label: children, value});
                }
                setChecked(event.target.checked);
                onChange?.(event);
            },
        );

        useEffect(
            () => {
                setChecked(checked);
            },
            [checked]
        );

        const disabledCss = isChecked
            ? `appearance-none bg-[--color-fill-secondary] bg-auto flex rounded-[--border-radius]
            border border-[--color-border] border-solid cursor-not-allowed`
            : `appearance-none bg-[--color-fill-secondary]
            rounded-[--border-radius] border border-[--color-border] border-solid cursor-not-allowed`;

        return (
            <label className={className} style={style}>
                <span className="h-[16px] flex items-center relative">
                    <input
                        ref={ref}
                        onChange={handleChange}
                        checked={isChecked}
                        disabled={disabled}
                        type="checkbox"
                        id={rest.id}
                        {...rest}
                        className={cn(
                            'w-[16px] bg-none h-[16px]',
                            disabled
                                ? disabledCss
                                : checkboxVariants({
                                    status: isChecked ? 'checked' : 'normal',
                                }),
                            'transition ease-in-out',
                            checkboxClassName,
                        )}
                        style={checkboxStyle}
                    />
                    {children !== undefined && (
                        <span className="font-pingfang font-[400] text-[14px] leading-[22px] ml-[8px] cursor-pointer">
                            {children}
                        </span>
                    )}
                    <span
                        className={cn(
                            `flex justify-center items-center
                        absolute top-[2px] left-[2px] cursor-pointer text-xs pointer-events-none`,
                            disabled && isChecked
                                ? 'text-[--color-text-quaternary]'
                                : isChecked
                                    ? 'text-[--seed-token-white]'
                                    : 'hidden',
                        )}
                    >
                        <AigcSystemCheckbox />
                    </span>
                </span>
            </label>
        );
    },
);

export default Checkbox;
