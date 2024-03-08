import cn from 'classnames';
import React from 'react';
import {cva} from 'class-variance-authority';
import type {PaginationProps} from './interface';

export interface PagerProps extends Pick<PaginationProps, 'itemRender'> {
  page: number;
  active?: boolean;
  className?: string;
  showTitle: boolean;
  onClick?: (page: number) => void;
  onKeyPress?: (
    e: React.KeyboardEvent<HTMLLIElement>,
    onClick: PagerProps['onClick'],
    page: PagerProps['page'],
  ) => void;
}
const pagerVariants = cva(
    'cursor-pointer rounded-lg w-8 h-8 text-sm flex items-center justify-center',
    {
        variants: {
            active: {
                false: 'text-[--color-text] border border-[--color-border]',
                true: 'text-[--seed-token-white] bg-[--color-primary]'
            },
        },
        defaultVariants: {
            active: false
        },
    }
);

const Pager: React.FC<PagerProps> = props => {
    const {
        page,
        active,
        className,
        showTitle,
        onClick,
        onKeyPress,
        itemRender,
    } = props;

    const handleClick = () => {
        onClick(page);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLLIElement>) => {
        onKeyPress(e, onClick, page);
    };

    const pager = itemRender(page, 'page', <span>{page}</span>);

    return pager ? (
        <li
            title={showTitle ? String(page) : null}
            className={cn(pagerVariants({active}), className)}
            onClick={handleClick}
            onKeyDown={handleKeyPress}
            tabIndex={0}
        >
            {pager}
        </li>
    ) : null;
};

if (process.env.NODE_ENV !== 'production') {
    Pager.displayName = 'Pager';
}

export default Pager;
