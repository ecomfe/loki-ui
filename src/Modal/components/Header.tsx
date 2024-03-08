import cn from 'classnames';
import React from 'react';
import {modalHeaderTheme} from '../theme';
import type {ModalHeaderProps} from '../types';

const ModalHeader: React.FC<ModalHeaderProps> = React.forwardRef<HTMLAllCollection, ModalHeaderProps>(
    ({className, children, theme: customTheme, tag: Tag = 'div', ...props}, ref) => {
        const theme = {...modalHeaderTheme, ...customTheme};
        const classes = cn(theme.wrapper, className);

        return (
            <Tag className={classes} {...props} ref={ref}>
                {children}
            </Tag>
        );
    },
);

export default ModalHeader;
