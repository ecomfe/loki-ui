import React, {useMemo} from 'react';
import cn from 'classnames';
import type {TrackProps} from './interface';
import SliderContext from './context';

const noop = {};
const Track = (props: TrackProps) => {
    const {style = noop, start = 0, end, onStartMove, children} = props;
    const {min, max, disabled, classNames} = React.useContext(SliderContext);
    const onInternalStartMove = (e: React.MouseEvent | React.TouchEvent) => {
        if (!disabled && onStartMove) {
            onStartMove(e);
        }
    };
    const slierStyle = useMemo(
        () => {
            // 获取宽度 计算百分比
            // start保留字段 暂时用不到
            const positionStyle: React.CSSProperties = {
                left: `${start}%`,
                width: `${(end - min) / (max - min) * 100}%`
            };
            return {
                ...positionStyle,
                ...style
            };
        },
        [style, end, start, min, max]
    );

    return (
        <div
            style={slierStyle}
            className={cn(
                'h-1 bg-[--color-primary-white] absolute flex items-center rounded-[--border-radius]',
                classNames)}
            onMouseDown={onInternalStartMove}
            onTouchStart={onInternalStartMove}
        >
            {children}
        </div>
    );
};
export default Track;
