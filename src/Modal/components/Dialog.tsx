import cn from 'classnames';
import React, {useContext, useEffect, useRef, useState} from 'react';
import {useTransition} from '../../_hooks/useTransition';
import {ModalContext} from '../Context';
import {modalDialogTheme} from '../theme';
import {ModalDialogProps} from '../types';

const ModalDialog: React.FC<ModalDialogProps> = ({
    className,
    centered,
    position,
    children,
    size,
    width,
    isPlayer,
    theme: customTheme,
    ...props
}) => {
    const theme = {...modalDialogTheme, ...customTheme};

    const {isOpenModal, setTransitionDuration, scrollable} = useContext(ModalContext);

    const [isOpen, setIsOpen] = useState(false);

    const dialogRef = useRef<HTMLDivElement>(null);

    const classes = cn(
        theme.wrapper,
        isOpen ? theme.show : theme.hidden,
        scrollable && theme.scrollable,
        centered && theme.centered,
        position ? theme[position] : theme.wrapperPositionDefault,
        isPlayer ? '' : size && theme[size] ? theme[size] : theme.sizeDefault,
        className,
    );

    const dialogWidth = width ? (Number.isNaN(+width) ? width : `${width}px`) : '';
    const dialogStyle = dialogWidth
        ? {
              width: dialogWidth,
          }
        : {};

    const {transitionDuration} = useTransition(dialogRef.current);

    useEffect(() => {
        setTransitionDuration(transitionDuration);
    }, [transitionDuration]);

    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/init-declarations
        let timer: ReturnType<typeof setTimeout>;

        if (isOpenModal) {
            timer = setTimeout(() => {
                setIsOpen(true);
            }, 50);
        } else {
            setIsOpen(false);
        }

        return () => {
            clearTimeout(timer);
        };
    }, [isOpenModal]);

    return (
        <div className={classes} {...props} ref={dialogRef} style={dialogStyle}>
            {children}
        </div>
    );
};

export default ModalDialog;
