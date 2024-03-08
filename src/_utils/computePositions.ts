import {arrow, computePosition, flip, offset, shift} from '@floating-ui/dom';

export interface IComputePositions {
    elementReference?: Element | HTMLElement | null;
    tooltipReference?: Element | HTMLElement | null;
    tooltipArrowReference?: Element | HTMLElement | null;
    placement?:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'right'
        | 'right-start'
        | 'right-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'left-start'
        | 'left-end';
    offset?: [number, number];
    strategy?: 'absolute' | 'fixed';
    autoAdjustOverflow: boolean;
    middlewares?: any;
    border?: number;
    arrowOffset?: number;
}

export const computeTooltipPosition = async ({
    elementReference = null,
    tooltipReference = null,
    tooltipArrowReference = null,
    placement = 'top',
    offset: offsetValue = [5, 0],
    strategy = 'absolute',
    // arrowOffset,
    middlewares,
    border: borderWidth,
    autoAdjustOverflow,
}: IComputePositions) => {
    if (!middlewares) {
        middlewares = [
            offset({
                mainAxis: offsetValue[0] + borderWidth,
                crossAxis: offsetValue[1],
            }),
        ];
    }
    if (!elementReference) {
        return {tooltipStyles: {}, tooltipArrowStyles: {}, place: placement};
    }

    if (tooltipReference === null) {
        return {tooltipStyles: {}, tooltipArrowStyles: {}, place: placement};
    }

    const middleware = middlewares;

    if (autoAdjustOverflow) {
        middleware.push(flip({padding: 5}), shift({padding: 0}));
    }
    if (tooltipArrowReference) {
        middleware.push(arrow({element: tooltipArrowReference as HTMLElement, padding: 5}));
        return computePosition(elementReference as HTMLElement, tooltipReference as HTMLElement, {
            placement,
            strategy,
            middleware,
        }).then(({x, y, placement, middlewareData}) => {
            const styles = {left: `${x}px`, top: `${y}px`};

            const {x: arrowX, y: arrowY} = middlewareData.arrow ?? {x: 0, y: 0};

            const staticSide =
                {
                    top: 'bottom',
                    right: 'left',
                    bottom: 'top',
                    left: 'right',
                }[placement.split('-')[0]] ?? 'top';


            const arrowStyle = {
                left: arrowX && arrowX !== null ? `${arrowX}px` : '',
                top: arrowY && arrowY !== null ? `${arrowY}px` : '',
                right: '',
                bottom: '',
                [staticSide]: `-${borderWidth}px`,
            };

            return {tooltipStyles: styles, tooltipArrowStyles: arrowStyle, place: placement};
        });
    }

    return computePosition(elementReference as HTMLElement, tooltipReference as HTMLElement, {
        placement: 'top',
        strategy,
        middleware,
    }).then(({x, y, placement}) => {
        const styles = {left: `${x}px`, top: `${y}px`};

        return {tooltipStyles: styles, tooltipArrowStyles: {}, place: placement};
    });
};
