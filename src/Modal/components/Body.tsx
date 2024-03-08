import cn from 'classnames';
import React, {useContext} from 'react';
import {ModalContext} from '../Context';
import {modalBodyTheme} from '../theme';
import type {ModalBodyProps} from '../types';

const ModalBody: React.FC<ModalBodyProps> = React.forwardRef<HTMLAllCollection, ModalBodyProps>(
    ({className, children, theme: customTheme, pure, isPlayer, tag: Tag = 'div', ...props}, ref) => {
        const theme = {...modalBodyTheme, ...customTheme};

        

        const {scrollable} = useContext(ModalContext);

        const classes = cn(theme.wrapper, (!pure && !isPlayer) ? 'px-[--padding-xxl] pb-[--padding-xxl] pt-[--padding-sm]' : '',
            scrollable && theme.scrollable, className);

        return (
            <Tag className={classes} {...props} ref={ref}>
                {children}
            </Tag>
        );
    },
);

export default ModalBody;
