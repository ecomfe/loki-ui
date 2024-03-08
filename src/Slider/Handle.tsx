/* eslint-disable complexity */
import React, {useState} from 'react';
import cn from 'classnames';
import {cva} from 'class-variance-authority';
import {KeyCode} from '../_utils/keyboard';
import SliderContext from './context';
import type {HandleProps} from './interface';

const sliderVariants = cva(
    // eslint-disable-next-line max-len
    'w-3 h-3 right-0 rounded-full translate-x-1/2 absolute border-2 box-border hover:transition-all duration-200 origin-center ease bg-[--color-bg-container]',
    {
        variants: {
            disabled: {
                true: 'border-[--color-divider-line] cursor-not-allowed',
                // eslint-disable-next-line max-len
                false: 'border-[--color-primary-border-white-hover] hover:scale-125 hover:border-[--color-primary-border-white-hover] cursor-pointer'
            },
            active: {
                true: '!border-[--color-primary-white-active] scale-125',
                false: ''
            }
        },
        defaultVariants: {
            disabled: false,
            active: false,
        }
    }
);
const Handle = React.forwardRef<HTMLDivElement, HandleProps>((props, ref) => {
    const {
        value,
        onStartMove,
        style,
        render,
        dragging,
        onOffsetChange,
        onChangeComplete,
        ...restProps
    } = props;
    const {
        min,
        max,
        disabled,
        keyboard,
        styles,
        classNames,
    } = React.useContext(SliderContext);
    const [active, setActive] = useState(false);
    const onInternalStartMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!disabled) {
            setActive(true);
            onStartMove(e);
        }
    };
    const handleKeyUp = (e: React.KeyboardEvent<HTMLDivElement>) => {
        switch (e.which || e.keyCode) {
            case KeyCode.LEFT:
            case KeyCode.RIGHT:
            case KeyCode.HOME:
            case KeyCode.END:
            case KeyCode.PAGE_UP:
            case KeyCode.PAGE_DOWN:
                onChangeComplete?.();
                setActive(false);
                break;
        }
    };
    const onKeyDown: React.KeyboardEventHandler<HTMLDivElement> = e => {
        if (!disabled && keyboard) {
            let offset: number | 'min' | 'max' = null;

            switch (e.which || e.keyCode) {
                case KeyCode.LEFT:
                    offset = -1;
                    break;

                case KeyCode.RIGHT:
                    offset = 1;
                    break;

                case KeyCode.HOME:
                    offset = 'min';
                    break;

                case KeyCode.END:
                    offset = 'max';
                    break;

                case KeyCode.PAGE_UP:
                    offset = 2;
                    break;

                case KeyCode.PAGE_DOWN:
                    offset = -2;
                    break;
            }
            setActive(true);
            if (offset !== null) {
                e.preventDefault();
                onOffsetChange(offset);
            }
        }
    };

    let handleNode = (
        <div
            className={cn(
                sliderVariants({disabled, active}),
                classNames.handle)}
            style={{
                ...style,
                ...styles.handle,
            }}
            onMouseDown={onInternalStartMove}
            onTouchStart={onInternalStartMove}
            onMouseUp={() => {
                setActive(false);
                // TODO: 这里鼠标离开比较远就不执行
            }}
            onKeyDown={onKeyDown}
            onKeyUp={handleKeyUp}
            role="slider"
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={value}
            aria-disabled={disabled}
            tabIndex={disabled ? null : 0}
            ref={ref}
            {...restProps}
        />
    );
    if (render) {
        handleNode = render(handleNode, {
            value,
            dragging,
        });
    }
    return handleNode;
});
export default Handle;
