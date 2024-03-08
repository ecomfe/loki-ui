import React from 'react';
import {cva} from 'class-variance-authority';
import classNames from 'classnames';
import useMergeSignal from '../_hooks/useMergeSignal';

export interface ISwitch {
    disabled?: boolean;
    autoFocus?: boolean;
    defaultValue?: boolean;
    className?: string;
    value?: boolean;
    onChange: (value: boolean) => void;
    style?: React.CSSProperties;
}

const switchHandleVariants = cva(
    'absolute top-[--padding-xxs] transition-all duration-300 ease',
    {
        variants: {
            checked: {
                false: 'left-[2px]',
                true: '!left-[calc(100%-16px)]'
            },
        },
        defaultVariants: {
            checked: true,
        }
    }
);

const switchWrapVariants = cva(
    'relative rounded-xl p-[--padding-xxs]',
    {
        variants: {
            checked: {
                false: 'bg-[--color-text-quaternary]',
                true: ' bg-[--color-primary-text-temp]',
            },
            disabled: {
                true: 'opacity-20 ',
                false: ''
            },
            hoverChecked: {
                true: 'hover:bg-[--color-primary-hover]',
                false: 'hover:bg-[--color-text-tertiary]',
                disabled: '',

            }
        },
        defaultVariants: {
            disabled: true,
            checked: true,
        }
    }
);

const Switch = React.forwardRef<HTMLElement, ISwitch>(switchProps => {
    const {
        disabled,
        autoFocus = false,
        defaultValue,
        className,
        value,
        onChange,
        style = {},
    } = switchProps;
    const [getChecked, setChecked] = useMergeSignal(value, defaultValue);
    const switchChecked = getChecked();
    const handleClick = () => {
        if (disabled) {
            return;
        }
        const checked = getChecked();
        onChange?.(!checked);
        if (('value' in switchProps)) {
            return;
        }
        setChecked(!checked);
    };
    return (
        <button
            type="button"
            autoFocus={autoFocus}
            className={classNames(
                switchWrapVariants(
                    {
                        checked: !!switchChecked,
                        disabled: !!disabled,
                        hoverChecked: disabled ? 'disabled' : !!switchChecked
                    }
                ),
                className
            )}
            style={{
                width: 32,
                height: 18,
                ...style
            }}
            onClick={handleClick}
        >
            <div
                className={`w-[14px] h-[14px] bg-white rounded-full
                    ${switchHandleVariants({checked: !!switchChecked})}`
                }
            />
        </button>
    );
});

if (process.env.NODE_ENV !== 'production') {
    Switch.displayName = 'Switch';
}

export default Switch;
