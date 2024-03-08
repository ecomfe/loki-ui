import cn from 'classnames';
import React from 'react';
import {modalFooterTheme} from '../theme';
import type {ModalFooterProps} from '../types';

const ModalFooter: React.FC<ModalFooterProps> = React.forwardRef<HTMLAllCollection, ModalFooterProps>(
    ({className, children, theme: customTheme, tag: Tag = 'div', ...props}, ref) => {
        const theme = {...modalFooterTheme, ...customTheme};

        const classes = cn(theme.wrapper, className);

        return (
            <Tag className={classes} {...props} ref={ref}>
                {children}
            </Tag>
        );
    },
);

export default ModalFooter;
