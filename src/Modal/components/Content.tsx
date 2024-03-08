import cn from 'classnames';
import React, {useContext} from 'react';
import {ModalContext} from '../Context';
import {modalContentTheme} from '../theme';
import {ModalContentProps} from '../types';

const ModalContent: React.FC<ModalContentProps> = React.forwardRef<HTMLAllCollection, ModalContentProps>(
    ({className, children, theme: customTheme, pure, isPlayer, tag: Tag = 'div', ...props}, ref) => {
        const theme = {...modalContentTheme, ...customTheme};

        const {scrollable} = useContext(ModalContext);

        const classes = cn(theme.wrapper, scrollable && theme.scrollable, pure ? 'bg-transparent' : 'shadow-lg', isPlayer ? theme.adaptive : theme.full, isPlayer ? 'bg-[--seed-token-white] rounded-2xl' : 'shadow-lg', className);

        return (
            <Tag className={classes} {...props} ref={ref}>
                {children}
            </Tag>
        );
    },
);

export default ModalContent;
