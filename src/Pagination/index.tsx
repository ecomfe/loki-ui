/* eslint-disable max-statements */
/* eslint-disable complexity */
import cn from 'classnames';
import React from 'react';
import {AigcSystemLeft, AigcSystemPullInto, AigcSystemMore, AigcSystemDown} from 'loki-icon';
import {KeyCode} from '../_utils/keyboard';
import useMergeSignal from '../_hooks/useMergeSignal';
import type {PaginationProps} from './interface';
import type {PagerProps} from './Pager';
import Pager from './Pager';


const defaultItemRender: PaginationProps['itemRender'] = (
    page,
    type,
    element,
) => element;
function isInteger(v: number) {
    const value = Number(v);
    return (
        typeof value === 'number'
      && !Number.isNaN(value)
      && isFinite(value)
      && Math.floor(value) === value
    );
}

function noop() {}
const showLessItems = false;

function calculatePage(p: number | undefined, pageSize: number, total: number) {
    const pg = typeof p === 'undefined' ? pageSize : p;
    return Math.floor((total - 1) / pg) + 1;
}

const getNormalIcon = (Icon: React.ReactElement, border: boolean = true) => {
    return ({disabled}) => (
        <span className={cn(
            'flex items-center justify-center border rounded-lg border-[--color-border] w-8 h-8 ml-2',
            'transition-colors duration-200 ease',
            disabled ? 'cursor-not-allowed text-[--color-text-quaternary]'
                : 'cursor-pointer text-[--color-text]',
            border ? 'border' : 'border-none',
        )}
        >
            {Icon}
        </span>
    );
};
const HoverIcon = ({direction}: {direction: 'left' | 'right'}) => {
    const directionClass = direction === 'left' ? 'rotate-90' : '-rotate-90';
    return (
        <span className="w-8 h-8 block relative group">
            <span className="flex absolute inset-0 w-full h-full
            items-center justify-center opacity-100 group-hover:opacity-0 transition-all duration-200"
            >
                <AigcSystemMore className={directionClass} />
            </span>
            <span className="flex absolute inset-0 w-full h-full
            items-center justify-center opacity-0 group-hover:opacity-100
            group-hover:text-[--color-primary] transition-all duration-200"
            >
                <AigcSystemDown className={directionClass} />
            </span>
        </span>
    );
};
const Pagination: React.FC<PaginationProps> = props => {
    const {
    // cls
        className,

        // control
        current: currentProp,
        defaultCurrent = 1,
        total = 0,
        pageSize: pageSizeProp,
        defaultPageSize = 10,
        onChange = noop,

        hideOnSinglePage,
        showPrevNextJumpers = true,
        showTitle = true,
        style,
        disabled,

        // render
        itemRender = defaultItemRender,
        jumpPrevIcon = getNormalIcon(<HoverIcon direction="left" />, false),
        jumpNextIcon = getNormalIcon(<HoverIcon direction="right" />, false),
        prevIcon = getNormalIcon(<AigcSystemLeft />),
        nextIcon = getNormalIcon(<AigcSystemPullInto />),
    } = props;

    const paginationRef = React.useRef<HTMLUListElement>(null);

    // TODO: 暂时不支持调整 pageSize
    const [getPageSize, setPageSize] = useMergeSignal<number>(
        pageSizeProp,
        defaultPageSize,
    );

    const [getCurrent, setCurrent] = useMergeSignal<number>(
        currentProp,
        defaultCurrent,
    );

    function isValid(page: number) {
        return isInteger(page) && page !== getCurrent() && isInteger(total) && total > 0;
    }

    const jumpPrevPage = Math.max(1, getCurrent() - (showLessItems ? 3 : 5));
    const jumpNextPage = Math.min(
        calculatePage(undefined, getPageSize(), total),
        getCurrent() + (showLessItems ? 3 : 5),
    );

    function getItemIcon(
        icon: React.ReactNode | React.ComponentType<PaginationProps>,
        label: string,
    ) {
        let iconNode = icon || (
            <button
                type="button"
                aria-label={label}
                // className={`${prefixCls}-item-link`}
            />
        );
        if (typeof icon === 'function') {
            iconNode = React.createElement<PaginationProps>(icon, {...props});
        }
        return iconNode as React.ReactNode;
    }


    function handleChange(page: number) {
        if (isValid(page) && !disabled) {
            const currentPage = calculatePage(undefined, getPageSize(), total);
            let newPage = page;
            if (page > currentPage) {
                newPage = currentPage;
            } else if (page < 1) {
                newPage = 1;
            }
            setCurrent(newPage);
            onChange?.(newPage, getPageSize());

            return newPage;
        }

        return getCurrent();
    }
    const pageSize = getPageSize();
    const current = getCurrent();

    const hasPrev = current > 1;
    const hasNext = current < calculatePage(undefined, pageSize, total);
    // const showSizeChanger =
    // showSizeChangerProp ?? total > totalBoundaryShowSizeChanger;

    function prevHandle() {
        if (hasPrev) {
            handleChange(current - 1);}
    }

    function nextHandle() {
        if (hasNext) {
            handleChange(current + 1);}
    }

    function jumpPrevHandle() {
        handleChange(jumpPrevPage);
    }

    function jumpNextHandle() {
        handleChange(jumpNextPage);
    }

    function runIfEnter(
        event: React.KeyboardEvent<HTMLLIElement>,
        callback,
        ...restParams
    ) {
        if (
            event.key === 'Enter'
      || event.charCode === KeyCode.ENTER
      || event.keyCode === KeyCode.ENTER
        ) {
            callback(...restParams);
        }
    }

    function runIfEnterPrev(event: React.KeyboardEvent<HTMLLIElement>) {
        runIfEnter(event, prevHandle);
    }

    function runIfEnterNext(event: React.KeyboardEvent<HTMLLIElement>) {
        runIfEnter(event, nextHandle);
    }

    function runIfEnterJumpPrev(event: React.KeyboardEvent<HTMLLIElement>) {
        runIfEnter(event, jumpPrevHandle);
    }

    function runIfEnterJumpNext(event: React.KeyboardEvent<HTMLLIElement>) {
        runIfEnter(event, jumpNextHandle);
    }

    function renderPrev(prevPage: number) {
        const prevButton = itemRender(
            prevPage,
            'prev',
            getItemIcon(prevIcon, 'prev page'),
        );
        return React.isValidElement<HTMLButtonElement>(prevButton)
            ? React.cloneElement(prevButton, {disabled: !hasPrev})
            : prevButton;
    }

    function renderNext(nextPage: number) {
        const nextButton = itemRender(
            nextPage,
            'next',
            getItemIcon(nextIcon, 'next page'),
        );
        return React.isValidElement<HTMLButtonElement>(nextButton)
            ? React.cloneElement(nextButton, {disabled: !hasNext})
            : nextButton;
    }


    let jumpPrev: React.ReactElement = null;

    let jumpNext: React.ReactElement = null;

    const allPages = calculatePage(undefined, pageSize, total);

    if (hideOnSinglePage && total <= pageSize) {
        return null;
    }

    const pagerList: Array<React.ReactElement<PagerProps>> = [];

    const pagerProps: PagerProps = {
        onClick: handleChange,
        onKeyPress: runIfEnter,
        showTitle,
        itemRender,
        page: -1,
        className: 'ml-2',
    };

    const prevPage = current - 1 > 0 ? current - 1 : 0;
    const nextPage = current + 1 < allPages ? current + 1 : allPages;
    // const goButton = showQuickJumper && (showQuickJumper as any).goButton;


    // ====================== Normal ======================
    const pageBufferSize = showLessItems ? 1 : 2;
    if (allPages <= 3 + pageBufferSize * 2) {
        if (!allPages) {
            pagerList.push(
                <Pager
                    {...pagerProps}
                    key="noPager"
                    page={1}
                    // disable
                    className="cursor-not-allowed"
                />,
            );
        }

        for (let i = 1; i <= allPages; i += 1) {
            pagerList.push(
                <Pager {...pagerProps} key={i} page={i} active={current === i} />,
            );
        }
    } else {
        const jumpPrevContent = itemRender(
            jumpPrevPage,
            'jump-prev',
            getItemIcon(jumpPrevIcon, 'prev page'),
        );
        const jumpNextContent = itemRender(
            jumpNextPage,
            'jump-next',
            getItemIcon(jumpNextIcon, 'next page'),
        );

        if (showPrevNextJumpers) {
            jumpPrev = jumpPrevContent ? (
                <li
                    // title={showTitle ? prevItemTitle : null}
                    key="prev"
                    onClick={jumpPrevHandle}
                    tabIndex={0}
                    onKeyDown={runIfEnterJumpPrev}
                    className=""
                >
                    {jumpPrevContent}
                </li>
            ) : null;

            jumpNext = jumpNextContent ? (
                <li
                    // title={showTitle ? nextItemTitle : null}
                    key="next"
                    onClick={jumpNextHandle}
                    tabIndex={0}
                    onKeyDown={runIfEnterJumpNext}
                    className=""
                >
                    {jumpNextContent}
                </li>
            ) : null;
        }

        let left = Math.max(1, current - pageBufferSize);
        let right = Math.min(current + pageBufferSize, allPages);

        if (current - 1 <= pageBufferSize) {
            right = 1 + pageBufferSize * 2;
        }
        if (allPages - current <= pageBufferSize) {
            left = allPages - pageBufferSize * 2;
        }

        for (let i = left; i <= right; i += 1) {
            pagerList.push(
                <Pager {...pagerProps} key={i} page={i} active={current === i} />,
            );
        }

        if (current - 1 >= pageBufferSize * 2 && current !== 1 + 2) {
            pagerList[0] = React.cloneElement<PagerProps>(pagerList[0], {
                className: cn(
                    // `${prefixCls}-item-after-jump-prev`,
                    pagerList[0].props.className,
                ),
            });

            pagerList.unshift(jumpPrev);
        }

        if (allPages - current >= pageBufferSize * 2 && current !== allPages - 2) {
            const lastOne = pagerList[pagerList.length - 1];
            pagerList[pagerList.length - 1] = React.cloneElement(lastOne, {
                className: cn(
                    // `${prefixCls}-item-before-jump-next`,
                    lastOne.props.className,
                ),
            });

            pagerList.push(jumpNext);
        }

        if (left !== 1) {
            pagerList.unshift(<Pager {...pagerProps} key={1} page={1} />);
        }
        if (right !== allPages) {
            pagerList.push(<Pager {...pagerProps} key={allPages} page={allPages} />);
        }
    }

    let prev = renderPrev(prevPage);
    if (prev) {
        const prevDisabled = !hasPrev || !allPages;
        prev = (
            <li
                onClick={prevHandle}
                tabIndex={prevDisabled ? null : 0}
                onKeyDown={runIfEnterPrev}
                aria-disabled={prevDisabled}
            >
                {prev}
            </li>
        );
    }

    let next = renderNext(nextPage);
    if (next) {
        const nextDisabled = !hasNext || !allPages;
        const nextTabIndex = nextDisabled ? null : 0;

        next = (
            <li
                // title={showTitle ? locale.next_page : null}
                onClick={nextHandle}
                tabIndex={nextTabIndex}
                onKeyDown={runIfEnterNext}
                aria-disabled={nextDisabled}
            >
                {next}
            </li>
        );
    }

    return (
        <ul
            className={cn('flex flex-wrap -ml-2', className)}
            style={style}
            ref={paginationRef}
        >
            {prev}
            {pagerList}
            {next}
        </ul>
    );
};

if (process.env.NODE_ENV !== 'production') {
    Pagination.displayName = 'Pagination';
}
export type {PaginationProps};
export default Pagination;
