/* eslint-disable complexity */
import React, {useLayoutEffect, useMemo, useState} from 'react';
import cn from 'classnames';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import useEvent from '../_hooks/useEvent';
import type {NotifyListProps, Placement} from './interface';
import Notify from './Notify';
import {motionMap} from './consts';

function splitPosition(position: Placement) {
    const direction = {} as Record< 'left' | 'right', boolean>;
    if (position.includes('Left')) {
        direction.left = true;}
    if (position.includes('Right')) {
        direction.right = true;}

    return direction;
}
const NotifyItem = ({onClose, gap, placement, itemIndex, configList, isCollapse, offset, motion, ...props}) => {

    const config = configList[itemIndex];
    const [customStyle, setStyle] = useState<React.CSSProperties>({
        right: ['bottomRight', 'topRight'].includes(placement) ? 0 : undefined,
        left: ['bottomLeft', 'topLeft'].includes(placement) ? 0 : undefined,
    });
    const {className, style, id, nodeRef} = config;
    let verticalOffset = 0;
    const calculateStyle = useEvent(() => {
        const newStyle = {} as React.CSSProperties;
        for (let i = 0; i < itemIndex; i++) {
            const offset = configList[i].nodeRef?.current?.offsetHeight || 0;
            verticalOffset = verticalOffset + offset;
        }
        newStyle.zIndex = 1000 - itemIndex;
        const transformY = (
            isCollapse ? (itemIndex * offset) : verticalOffset
        );
        if (placement.startsWith('top')) {
            newStyle.top = transformY + 'px';
        } else {
            newStyle.bottom = transformY + 'px';
        }
        if (configList.findIndex(i => i.id === id) === -1) {
            return null;
        }
        setStyle({...customStyle, ...newStyle});
    });
    useLayoutEffect(
        () => {
            calculateStyle();
        }, 
        [...configList, isCollapse]
    );
    return (
        <CSSTransition
            timeout={300}
            key={config.id}
            appear
            classNames={motion ? motion : motionMap[placement]}
            unmountOnExit
            nodeRef={nodeRef}
            {...props}
        >
            <div
                className={cn('absolute w-max',
                    'transition-all duration-300 ease-in-out',
                    ['top', 'bottom'].includes(placement) && motionMap[placement].appear,
                    ['topRight', 'bottomRight'].includes(placement) && motionMap[placement].appear,
                    ['topLeft', 'bottomLeft'].includes(placement) && motionMap[placement].appear,
                )}
                ref={nodeRef}
                style={customStyle}
            >
                <div>
                    <Notify
                        style={style}
                        className={cn(className,)}
                        {...config}
                        onClose={onClose}
                    />
                    <div style={{width: '100%', height: gap}}></div>
                </div>
            </div>

        </CSSTransition>
    );
};

const MARGIN = 16;
const NotifyList = (props: NotifyListProps & {onClose?: (key: React.Key) => void}) => {
    const {
        configList, onClose, collapse = true, placement = 'top',
        bottom = MARGIN, top = MARGIN, left = MARGIN, right = MARGIN, motion, className, style
    } = props;
    const isNeedCollapse = !!collapse;
    const [isHover, setHover] = useState(false);
    const {minNum = 8, offset = 8, gap = 8} = isNeedCollapse ? (typeof collapse === 'object' ? collapse : {}) : {};

    const isCollapse = useMemo(
        () => {
            if (!!isNeedCollapse && configList.length > minNum) {
                if (!isHover) {
                    return true;
                }
            }
            return false;
        },
        [configList.length, isNeedCollapse, minNum, isHover]
    );
    const onMouseEnter = useEvent(() => setHover(true));
    const onMouseLeave = useEvent(() => setHover(false));
    return (
        <div className={className} style={style}>
            <TransitionGroup
                className="fixed z-[1010]"
                style={{
                    top: placement.startsWith('top') ? top : undefined,
                    bottom: placement.startsWith('bottom') ? bottom : undefined,
                    left: splitPosition(placement).left ? left
                        : (['top', 'bottom'].includes(placement) ? window.innerWidth / 2 : undefined),
                    right: splitPosition(placement).right ? right : undefined,
                }}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                appear
            >
                {
                    configList.map((config, itemIndex) => {
                        return (
                            <NotifyItem
                                key={config.id}
                                configList={configList}
                                itemIndex={itemIndex}
                                onClose={onClose}
                                gap={gap}
                                placement={placement}
                                isCollapse={isCollapse}
                                offset={offset}
                                motion={motion}
                                showClose={config.showClose}
                            />
                        );
                    })
                }
            </TransitionGroup>
        </div>
    );
};

export default NotifyList;
